
import firebase from 'firebase'

const  firebaseApp = firebase.initializeApp ({
  apiKey: "AIzaSyCj5FVGmNxzZzTQ4_rjf-KQh4ygXcLTmso",
    authDomain: "soundcloud-9491a.firebaseapp.com",
    projectId: "soundcloud-9491a",
    storageBucket: "soundcloud-9491a.appspot.com",
    messagingSenderId: "312510922879",
    appId: "1:312510922879:web:cc1c6d26e34759081eff4a",
    measurementId: "G-QYSDJ38XY3"
});

const db= firebaseApp.firestore()
const Fire = firebaseApp
export  {db, Fire}
