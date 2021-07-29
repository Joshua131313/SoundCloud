import React, { useContext, useState } from 'react'
import Appinput from '../Reuseable/Input/Input'
import Appselect from '../Reuseable/Select/Select'
import firebase from 'firebase'
import axios from 'axios'
import Imgloaded from '../Reuseable/Imgloaded/Imgloaded'
import Button from '../Reuseable/Button/Button'
import { db } from '../../Fire'
import { ContextApp } from '../../ContextAPI'
import Loader from '../Reuseable/Loader'
const Addsong = (props) => {
  const {setModal} = props
  const {addNoti, user} = useContext(ContextApp)
 const [percent, setPercent] = useState(0)
 const [loading, setLoading] = useState(false)
  const [song, setSong] = useState({
    name: '',
    url: ''
  })
  const [img, setImg] = useState({
    name: '',
    url: ''
  })
  const [title, setTitle] = useState('')
  const [singer, setSinger] = useState('')
  const [genre, setGenre] = useState('')
  const genres = [
    {
      text: 'Hip-hop',
      value: 'hiphop',
    },
    {
      text: 'Country', 
      value: 'country', 
    },
    {
      text: 'Pop', 
      value: 'pop'
    },
    {
      text: 'Rock',
      value: 'rock'
    },
    {
      text: 'Rap',
      value: 'rap'
    },
    {
      text: 'Opera',
      value: 'opera'
    },
    {
      text: 'Jazz',
      value: 'jazz'
    },
    {
      text: 'Metal',
      value: 'metal'
    },
    {
      text: 'Classical',
      value: 'classical'
    },
    {
      text: 'Disco',
      value: 'disco'
    }
  ]
  function uploadHandle(e) {
    let file = e.target.files[0]
    if(file) {
    const storageRef = firebase
    .storage()
    .ref(`songs`)
    .child(file.name)
    const task = storageRef.put(file)
    task.on(
      "state_changes",
      function progress(snap) {
        setLoading(true);
        const percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        setPercent(percentage)
      },
      function error(err) {
        window.alert('Try Again!')
      },
      function complete() {
        setLoading(false);
        storageRef.getDownloadURL().then((url) => {
          setSong({
            url: url,
            name: file.name
          })
          setLoading(false)
        });
       
      }
    )
    }
  }
  const resetForm = () => {
    setTitle('')
    setSinger('')
    setGenre('')
    setSong({
      url: '',
      name: ''
    })
    setImg({
      url: '',
      name: ''
    })
  }
  const addSong = () => {
    db.collection('songs').doc('songs').update({
      songs: firebase.firestore.FieldValue.arrayUnion({
        date: new Date(),
        audio: song.url,
        title: title,
        singer,
        genre,
        img: img.url,
        id: db.collection('songs').doc().id,
        creatorid: user.uid
      })
    })
    
    .then(()=> {
      resetForm()
      setModal(false)      
      addNoti('Song successfully added!', 'fal fa-check-circle')
    })
    .catch(()=> {
      addNoti('Try again...', 'fal fa-exclamation-circle')
    })
  }
  function uploadImgur(e) {
    let file = e.target.files[0]

    const data = new FormData()
    data.append("image", file)
    const config = {
      headers: {
        Authorization: "Client-ID b2683e97287b24b",
      },
    }
    axios.post("https://api.imgur.com/3/image/", data, config).then((res) => {
      setImg({
        name: file.name,
        url: res.data.data.link
      })
    }).catch(err => {
      console.log(err)
    })

  }
  return (
    <>
    <div className="addsongmodal">
     <h2>Add Song</h2>
     <div className="songinputs">
       <Appinput value={title} setValue={setTitle} icon='fal fa-music-alt'  placeholder='Song Title'/>
       <Appinput value={singer} setValue={setSinger} icon='fal fa-user-music'  placeholder='Singer'/>
       <Appselect value={genre} setValue={setGenre} options={genres} defaultoption={{value: '', text: 'Select a Genre'}}/>
       <label className='appinput'>
      <input 
      placeholder={'Song Image'}
      value={img.url}
      onChange={e=>setImg({...img, url: e.target.value})}
      />
     <i className={'fal fa-images'}></i>

   </label>
        <div className="uploadersm">
          <label className="songuploader">
            <input  accept="audio/mp3,audio/*;capture=microphone" onChange={e=> uploadHandle(e)} type="file" style={{display: 'none'}}/>
            <div className='songcontup'>
              {
              loading?
              <Loader />
              :
              <>
                <i className='fal fa-music'></i>
                <h4>{song.name?song.name:"Upload Song"}</h4>
              </>
              }
            </div>
        </label>
        <label className="songuploader imguploader" style={{border: img.url?'0':'solid 3px var(--theme-color)'}}>
            <input onChange={e=> uploadImgur(e)} type="file" style={{display: 'none'}}/>
            <div>
             {
               img.url?
              <img src={img.url} alt=""/>
              :
             <> 
              <i className='fal fa-images'></i>
              <h4>{"Upload  Song Cover"}</h4>
              </>
             }
            </div>
        </label>
        </div>
        <div className='addcontrols'>
          <Button text='Add Song' clickEvent={()=> addSong()} icon='fal fa-music-alt'/>
          <Button text='Reset Form' icon='fal fa-undo'/>
        </div>
     </div>
    </div>
    </>
  )
}
export default Addsong