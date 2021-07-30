import React, { useContext, useEffect, useRef, useState } from 'react'
import { ContextApp } from '../../../ContextAPI'
import { AddToFavs, determinePlaying, formatSeconds } from '../../../Functions'
import Addtosaved from '../Addtosaved'
import Dropdown from '../Dropdown/Dropdown'
import Waves from '../Waves/Waves'
import './Songcard.css'
import Listening from '../Listening/Listening'
import Imgloaded from '../Imgloaded/Imgloaded'

const Stripsongcard = (props) => {
  const {song, i, img=false, albumbtn, setSsongs, ssongs} = props
  const {listening, saved, paused} = useContext(ContextApp)
  let [duration, setDuration] = useState(0)
  let songaudio = useRef()
  const handleSetDuration = (e) => {
  setDuration(e.target.duration)
  }
  const determineRender = () => {
    if(img) {
      return (
        <>
          <div className="imgstripsong">
            <Imgloaded img={song.img} />
            {
            (listening.song === song.id && !paused) && 
            <Waves />
            }
        </div>
        </>
      )
    }
    else {
      return (
          <>
              {
            (listening.song === song.id && !paused)?
            <Waves centered={false}/>
            :
            <span>{i+1}.</span>
            }
         </>
      )
    }
  }

  const handlePushSong = () => {
    let tempstate = [...ssongs]
    tempstate.push(song.id)
    setSsongs(tempstate)
  }
  const handleRemoveSong = () => {
    let tempstate = [...ssongs]
    tempstate.forEach(songc=> {
      if(songc === song.id) {
        let index = tempstate.indexOf(songc)  
        tempstate.splice(index, 1)
      }
    })
    setSsongs(tempstate)
  }

  return (
    <div className="stripsongcard flex">
      <div className="leftstripcard flex">
        <div className="leftsect flex">
            {determineRender()}
            {albumbtn? 
              <i className={`fal fa-${ssongs.includes(song.id)?'minus':'plus'}`} onClick={()=> ssongs.includes(song.id)?handleRemoveSong():handlePushSong()}></i>
              :
              <Listening song={song}>
                {
                  ({AddtoListening})=> (
                    <i  className={`fal fa-${determinePlaying(listening, song, paused)?'pause':'play'} `} onClick={()=> {AddtoListening()}}></i>
                  )
                }
              </Listening>}
        </div>
        <div className="rightsect flexcol">
          <h4>{song.title}</h4>
          <small>{song.singer}</small>
          <audio onCanPlay={(e)=> handleSetDuration(e)} src={song.audio} ref={songaudio}></audio>
        </div>
      </div>
      <div className="rightstripcard flex">
        <Dropdown song={song}/>
        <span className='time'>
            {formatSeconds(duration)}
        </span>
      </div>
    </div>
  )
}
export default Stripsongcard