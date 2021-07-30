import React, { useContext } from 'react'
import { ContextApp } from '../../../ContextAPI'
import { determinePlaying } from '../../../Functions'
import Dropdown from '../Dropdown/Dropdown'
import Imgloaded from '../Imgloaded/Imgloaded'
import Listening from '../Listening/Listening'
import Waves from '../Waves/Waves'
import './Songcard.css'

const Songcard = ({song}) =>{
  const {audio, listening, paused, setPaused, setLastarray, pathname} = useContext(ContextApp)
  const determineType = () => {
    if(listening.song === song.id) {
      if(paused) {
        return 'play'
      }
      else {
        return 'pause'
      }
    }
    else {
      return 'play'
    }
  }

  return (

    <div className="songcard flexcol">
      <div className="songimgplaybtn">
       <Imgloaded img={song?.img} />
      <Listening song={song}>
        {
          ({AddtoListening})=> (
            <i  className={`fal fa-${determinePlaying(listening, song, paused)?'pause':'play'} centeredt`} onClick={()=> {AddtoListening()}}></i>
          )
        }
      </Listening>
      {determinePlaying(listening, song, paused)&&<Waves />}
       </div>
      <div className="songinfocard">
        <h3>
          <span>{song?.title}</span>
          <Dropdown song={song} />
        </h3>
        <small>{song?.singer}</small>
      </div>
    </div>
  )
}
export default Songcard