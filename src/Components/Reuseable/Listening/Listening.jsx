import React, { useContext, useEffect } from 'react'
import { ContextApp } from '../../../ContextAPI'
import { db } from '../../../Fire'

const Listening = (props) => {
  const {song, dontupdate} = props
  const {user, audio, setPaused, setLastarray, lastarray,  paused, pathname, listening} = useContext(ContextApp)
  const AddtoListening = () => {
    db.collection('users').doc(user.uid).update({
      listeningto: {
        lastarray: dontupdate?listening.lastarray:pathname,
        song:  song.id,
      }
    }).then(()=> {
     let aud = audio.current
     if(aud.paused) {
      aud.play()
      setPaused(false)
     }
     else {
      aud.pause()
      setPaused(true)
     }
    })
  }



  return (
    <>
    {
      props.children({
        AddtoListening
      })
    }
    </>
  )
}
export default Listening