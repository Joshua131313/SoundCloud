import AudioPlayer from 'react-custom-audio-player';
import React, { useEffect, useRef, useState } from 'react'
import { Range } from 'react-range';
import SliderComp from './Slider';
import {Slider} from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { formatSeconds } from '../../../Functions';

const Audio = (props) => {
  const {audio, progress, handleChange, playAudio, song, time} = props
  let aud = audio.current
  const [duration, setDuration] = useState(0)
  const handleCanPlay = (e) => {
    setDuration(e.target.duration)
  }
  const muiTheme = createMuiTheme({
    overrides:{
      MuiSlider: {
        thumb:{
        color: "var(--theme-color)",
        },
        track: {
          color: 'var(--theme-color)'
        },
        rail: {
          color: 'black'
        }
      }
  }
  });
  
  

  return (
    <div className="audioplayercont" style={{zIndex: 100}}>
      <audio onCanPlay={e=> handleCanPlay(e)}  ref={audio} style={{display: 'none'}} src={song?.audio}></audio>
      <ThemeProvider theme={muiTheme}>
        <div className="smtcont">
          <span>{aud?formatSeconds(aud.currentTime):0}</span>
        <Slider  value={progress} onChangeCommitted={()=> playAudio()} onChange={(e, newval)=> handleChange(newval)} aria-labelledby="continuous-slider" />
          <span>{formatSeconds(duration)}</span>
        </div>
      </ThemeProvider>
    </div>
  )
}
export default Audio