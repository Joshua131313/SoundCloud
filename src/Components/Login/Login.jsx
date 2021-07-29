import React, { useContext, useState } from 'react'
import { writeUserdocuments } from '../../Functions'
import Button from '../Reuseable/Button/Button'
import Appinput from '../Reuseable/Input/Input'
import Logo from '../Reuseable/Logo/Logo'
import './Login.css'
import firebase from 'firebase'
import { ContextApp } from '../../ContextAPI'

const Login = (props) => {
  const {addNoti} = useContext(ContextApp)
  const {setUser} = props
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passworderror, setPassworderror] = useState('')
  const [emailerror, setEmailerror] = useState('')
  const [hasAccount, setHasAccount] = useState(false)
  const [forgot, setForgot] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleRenderName = () => {
    if (forgot) return <></>
    if(!hasAccount) {
      return !hasAccount && <Appinput value={name} setValue={setName} icon='fal fa-user' placeholder='Full Name'/>
    }
    
  }
  const loginwithProvider = (provider) => {
    provider.addScope('email');
    firebase.auth()
    .signInWithPopup(provider)
    .then((result)=>{
      if(result.additionalUserInfo.isNewUser) {
        const user = result.user  
        writeUserdocuments(user, user.email, user.displayName, user.photoURL)
      }
    })
  }
  const clearInputs = () =>{
    setName('')
    setEmail('')
    setPassword('')
  }
  const clearErrors = () =>{
    setEmailerror('')
    setPassworderror('')
  }
 
  const handleSendEmail = () => {
    if(email !=='') {
      firebase.auth().sendPasswordResetEmail(email)
      .then(()=>{
        addNoti('Email Sent!', 'fal fa-envelope')
      })
      .catch((err)=>{
        console.log(err)
        addNoti('Try again!', 'fal fa-exclamation-circle')
      })
    }
  }
  
  const deterMineEvent = () => {
    if(hasAccount) {
      clearErrors()
      firebase.auth().signInWithEmailAndPassword(email, password)
      .then(()=>{
        setLoading(true)
        clearInputs()
      })
      .catch(err => {
        switch(err.code) {
          case "auth/invalid-email":
            setEmailerror(err.message)

          break
          case "auth/user/disabled":
          case "auth/user-not-found":
            setEmailerror('Email does not exist')
          break
          case "auth/wrong-password":
            setPassworderror('Incorrect Password')
          break
          default: 
        } 
        setTimeout(()=>{
         clearErrors()
        },4000) 
      })
    }
    else {
      if(name !=='') {
        clearErrors()
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(()=>{
          setLoading(true)
        })
        .catch((err)=>{
          switch(err.code) {
            case "auth/email-already-in-use":
            setEmailerror(err.message)
              break
            case "auth/invalid-email":
            setEmailerror(err.message)
            break
            case "auth/weak-password":
              setPassworderror(err.message)
            break
            default: 
            setEmailerror(err.message)
            setTimeout(()=>{
              clearErrors()
            }, 4000)
          }
        })
  
        firebase.auth().onAuthStateChanged(user => {
          if(user) {
              user.updateProfile({
                displayName: name
              })
              writeUserdocuments(user, email, name, '')
            }
            else {
              setUser('')
          }
        })
      }
    }
  }


  return (
    <div className="login">
      <div className="loginscreen"> 
        <Logo login text={forgot?'Reset Password':hasAccount?'Login':'Register'}/>
        <h2>Welcome {hasAccount?"Back":''} to SoundCloud</h2>
        <h4>Listen to music anywhere.</h4>
        <div className="logincontrols flexcol">
         {handleRenderName()}
          <Appinput value={email} setValue={setEmail} icon='fal fa-envelope' placeholder='Email'/>
          { emailerror &&
            <span className="error">
            {emailerror}
            </span>
          }
          {!forgot && 
          <>
          <Appinput type='password' value={password} setValue={setPassword} icon='fal fa-lock' placeholder='Password'/>
          {passworderror && 
          <span className="error">
           {passworderror}
          </span>
          }
          </>
        }
          <div className="alreadyhaveaccount flexcol">
            {
              forgot?
              <Button text='Send Email' icon='fal fa-envelope' clickEvent={()=> handleSendEmail()}/>
              :
              <Button text={hasAccount?'Login':"Register"}  clickEvent={()=> deterMineEvent()}/>
            }

              <div className="subbtns flex">
               {
                 forgot?
                 <span onClick={()=> setForgot(false)}>Go Back</span>
                 :
                 <>
                  <span onClick={()=> setForgot(true)}>Forgot your password?</span>
                  <span onClick={()=> setHasAccount(!hasAccount)}>{!hasAccount?'Already have an account?':'Don\'t have an account?'}</span>
                 </>
               }
              </div>
            
          </div>
        </div>  
            {
              !forgot && 
              <div className="othermethods">
              <span>Or</span>
              <div className="custombtns flex">
                <div className="googlebtn" onClick={()=> loginwithProvider(new firebase.auth.GoogleAuthProvider())}>
                  <img src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-icon-png-transparent-background-osteopathy-16.png" alt=""/>
                  <span>Continue with Google</span>
                </div>
                <div className="googlebtn facebookbtn" onClick={()=> loginwithProvider(new firebase.auth.FacebookAuthProvider())}>
                  <img src="https://facebookbrand.com/wp-content/uploads/2019/04/f_logo_RGB-Hex-Blue_512.png?w=512&h=512" alt=""/>
                  <span>Continue with Facebook</span>
                </div>
              </div>
            </div>
            }
      </div>
      <div className="loginimg">
        <img src="https://i.imgur.com/dwegtJJ.jpg" alt=""/>
      </div>
    </div>
  )
}
export default Login