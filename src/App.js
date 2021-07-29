import "./styles.css";
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import firebase from 'firebase'
import { db } from './Fire';
import ContextAppProvider from './ContextAPI';
import Checkbox from "./Components/Reuseable/Checkbox/Checkbox";
import React, {useEffect, useState} from 'react'
import Button from "./Components/Reuseable/Button/Button";
import Sidebar from "./Components/Sidebar/Sidebar";
import Body from "./Components/Body/Body";
import Playing from "./Components/Playingsong/Playing";
import Activity from "./Components/Activity/Activity";
import Notifisystem from "./Notification/Notifisystem";
import Login from "./Components/Login/Login";
import Logo from "./Components/Reuseable/Logo/Logo";
import Cont from "./Cont";

export default function App() {

    const [user, setUser] = useState('')
    const [rdy, setRdy] = useState(false)
      const authListener = () => {
      firebase.auth().onAuthStateChanged(user=>{
        if(user) {
          setUser(user)
        }
        else {
          setUser('')
        }
        setRdy(true)
      })
    }
    useEffect(()=>{
      authListener()
    }, [])

  return (
    <Router>
      <ContextAppProvider>
        <Notifisystem />
        <div className='appcont' style={{display: user?'grid':'block', padding: user?'20px 20px 0 20px':'0'}}>
          {
            rdy?
            <>
           {
            user? 
           <>
           <Cont />
           </>
            :
            <Login setUser={setUser}/>
            }
            </>
            :
            <div className='firebaseloadingauth'>
                <Logo />
                <img src='https://i.imgur.com/zbylqqy.gif'/>
            </div>
          }
        </div> 
      </ContextAppProvider>
    </Router>
  );
}
