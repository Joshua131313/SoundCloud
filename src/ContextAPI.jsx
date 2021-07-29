import React, { createContext, useEffect, useRef, useState } from 'react'
import firebase from 'firebase'
import { db } from './Fire'
import axios from 'axios'
import { addNotification } from './Notification/Addnotification'
import { useLocation } from 'react-router-dom'

export const ContextApp = createContext()
   
    const ContextAppProvider = props => {
      const notifisystem = useRef()
      const [songs, setSongs] = useState([])
      const [listening, setListening] = useState({
        song: '',
        lastarray: '',
        time: null
      })
      const [albums, setAlbums] = useState([])
      const [queue, setQueue] = useState([])
      const [recent, setRecent] = useState([])
      const [saved, setSaved] = useState([])
      const [userinfo, setUserinfo] = useState('')
      const [created, setCreated] = useState([])
      const audio = useRef()
      const [paused, setPaused] = useState(true)
      const songsarrays = [
        {
         array: saved,
         filter: 'liked-songs',  
        },
        {
          array: recent, 
          filter: 'recent'
        },
        {
          array: queue, 
          filter: 'queue', 
        },
        {
          array: songs, 
          filter: 'library'
        }
  
      ]
      const [lastarray, setLastarray] = useState('')
      const location = useLocation()
      const pathname = location.pathname.split('/')[1]
      const user = firebase.auth().currentUser
      const handleLogout = () =>{   
        firebase.auth().signOut()
        window.location.reload()
      }

    useEffect(()=> {
      db.collection('songs').doc('songs').onSnapshot(snap=> {
        const songsdata = snap.data()
        setSongs(songsdata.songs)
      }) 
    }, []) 
    useEffect(()=> {
    user &&  db.collection('users').doc(user.uid).onSnapshot(snap=> {
        const userdata = snap.data()
        setListening({
          song: userdata.listeningto.song,
          time: userdata.listeningto.time,
          lastarray: userdata.listeningto.lastarray
        })
        setAlbums(userdata.albums)
        setQueue(userdata.queue)
        setRecent(userdata.recent)
        setSaved(userdata.savedmusic)
        setUserinfo(userdata.userinfo)
        setCreated(userdata.added)
      })  
    }, [user])


    const addNoti = (msg, icon) => {
      addNotification({
        notifisystem,
        msg, 
        icon
      })
    }





  return <ContextApp.Provider 
      value={{ 
        notifisystem, addNoti,
        handleLogout, user,
        songs,
        listening,
        albums,
        queue,
        recent,
        saved,
        userinfo,
        created,
        audio,
        paused, 
        setPaused,
        songsarrays,
        pathname,
        lastarray, setLastarray
      }}>
      {props.children}
  </ContextApp.Provider>
}
export default ContextAppProvider