import { db } from "./Fire"
import firebase from 'firebase'
export const writeUserdocuments = (user, email, name, cover='') => {
  
  const customization =  {
    themecolor: "#b199e0",
    darkmode: false,
    gridview: false,
    hidenav: false,
    secondtheme: '#5d54a4'
  }

  db.collection('users').doc(user.uid).set({
    created: new Date(),
    uid: user.uid,
    userinfo: {
      name: name,
      cover: cover,
      age: '',
      phone: '',
      email: email,
      uid: user.uid,
    },
    customization,
    savedmusic: [],
    albums: [],
    listeningto: {
      song: '',
      lastarray: '',
    },
    added: [],
    queue: [],
    recent: []
 
  }).then(()=>{
  })
  db.collection('allusers').doc('allusers').update({
    allusers: firebase.firestore.FieldValue.arrayUnion(user.uid)
  })
}
export function formatSeconds(time) {

  let minutes = (time / 60);
  let seconds = (time % 60).toFixed(0);
  let s = seconds > 10?seconds:'0'+seconds
  return minutes.toFixed(0) + ':' + s;
}
export function AddToFavs(song, saved, user) {
  if(saved.includes(song.id)) {
    
  db.collection('users').doc(user.uid).update({
    savedmusic: firebase.firestore.FieldValue.arrayRemove(song.id)
  })
  }
  else {
  db.collection('users').doc(user.uid).update({
    savedmusic: firebase.firestore.FieldValue.arrayUnion(song.id)
  })
  }
}
export function determinePlaying (listening, song, paused) {
  if(listening.song === song.id) {
    if(paused) {
      return false
    }
    else {
      return true
    }
  }
  else {
    return false
  }
}
