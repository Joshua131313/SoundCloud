import React, { useContext, useEffect, useRef, useState } from 'react'
import './Playing.css'
import Slider from 'react-custom-slider';
import SliderComp from '../Reuseable/Slider/Slider';
import Audio from '../Reuseable/Slider/Audio';
import Modal from '../Reuseable/Modal/Modal';
import Dropdown from '../Reuseable/Dropdown/Dropdown';
import Songinfo from './Songinfo';
import { ContextApp } from '../../ContextAPI';
import { db } from '../../Fire';
import { useLocation } from 'react-router-dom';
import Listening from '../Reuseable/Listening/Listening';
import Addtosaved from '../Reuseable/Addtosaved';

const Playing = (props) => {
  const {
    songs, 
    listening, 
    audio, 
    paused, 
    setPaused, 
    user,
    queue,
    recent,
    saved, 
    songsarrays,
    pathname,
    setLastarray
    } = useContext(ContextApp)


  let song = songs.find(x=> x.id === listening.song)
  const location = useLocation()
  const [value, setValue] = useState(100)
  const [progress, setProgress] = useState(0)
  const [muted, setMuted] = useState(false)
  const [songcollection, setSongcollection] = useState(songsarrays?.find(x=> x.filter === listening.lastarray)?.array)
  const [songpopup, setSongpopup] = useState(false)
  const determineSpeaker = () => {
    if(value === 0 || muted) {
      return 'volume-mute'
    } 
    else if (value > 0 && value < 50) {
      return 'volume-down'
    }
    else {
      return 'volume-up'
    }
  }

  const fastForward = (value) => {
    let aud = audio.current
    let time = aud.duration
    aud.pause()
    aud.currentTime = time*value/100
  }
  const playAudio = () => {
    let aud = audio.current
    aud.play()
    setPaused(false)
  }
  const handleRestart = () => {
    if(audio.current) {
      let aud = audio.current
      aud.currentTime = 0
    }
  }

  let index = songcollection?.findIndex(x=> x.id === listening.song)
  const handleUpdate = (song) => {
    db.collection('users').doc(user.uid).update({
      listeningto: {
        song:  song.id,
        time: 0, 
        lastarray: listening.lastarray
      }
    })
    .then(()=> {
      let aud = audio.current
      aud.play() 
      setPaused(false)
    })
  }

  const handlePlayNext = () => {
    let nextsong = songcollection[index+1]
    if(nextsong) {
      handleUpdate(nextsong)
    }
    else {
      let firstsong = songcollection[0]
      handleUpdate(firstsong)
    }
  }
  const handlePlayPrev = () => {
    let prevsong = songcollection[index-1]
    if(prevsong) {
      handleUpdate(prevsong)
    }
    else {
      let lastsong = songcollection[songcollection.length - 1]
      handleUpdate(lastsong)
    }
  }
  useEffect(()=> {
    let aud = audio.current
    aud.ontimeupdate = () => {
      setProgress(aud.currentTime/aud.duration * 100)
    }
    aud.onended = () => {
      handlePlayNext()
    }
  
  }, [])
  // useEffect(()=> {
  //   if(audio.current) {
  //     let aud = audio.current
  //     if(aud.currentTime === aud.duration) {
  //       handlePlayNext()
  //     }
  //   }
  // }, [audio])
  useEffect(()=> {
    setSongcollection(songsarrays?.find(x=> x.filter === listening.lastarray)?.array)
  }, [listening, songsarrays])
  

  useEffect(()=> {

    if(audio.current) {
      let aud = audio.current
      aud.volume = muted?0:value/100
    }
  }, [value, muted, location])
  
const [loaded, setLoaded] = useState(true)


  return (
    <>

    <div className={`playing ${songpopup&&'absoluteplaying'}`}>
      <i className='fal fa-chevron-down closeabs' onClick={()=> setSongpopup(false)}></i>
 
       <Songinfo setSongpopup={setSongpopup} song={song} />
        <div className="audio">
         <Audio  playAudio={()=> playAudio()} song={song} time={listening.time} audio={audio} handleChange={fastForward} progress={progress}/>
        </div>
        <div className="songcontrols">
          <i className='fal fa-redo' onClick={()=> {handleRestart()}}></i>
            <i className='fal theme fa-backward'onClick={()=> handlePlayPrev()}></i>
            <Listening song={song} dontupdate>
              {
                ({AddtoListening})=> (
                  <i className={`ppbtn theme fal fa-${paused?'play':'pause'}`} onClick={()=> AddtoListening()}></i>          )
              }
           </Listening>
            <i className='fal theme fa-forward' onClick={()=> handlePlayNext()}></i>
          <i  className='fal fa-random'></i>
        </div>
        <div className="songright">
          <div className="innersongright">
            <div>
              <i className={`vol fal fa-${determineSpeaker()}`} onClick={()=> setMuted(!muted)}></i>
              <div className='slidercont'>
              <SliderComp contsize={'100px'} value={muted?0:value} handleChange={(e)=>{ setValue(e); setMuted(false)}}/>
              </div>
            </div>
             <Addtosaved song={song} />
             <Dropdown song={song} />
           
          </div>
        </div>
      
    </div>
    </>
  )
}
export default Playing