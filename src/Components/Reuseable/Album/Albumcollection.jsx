import React, { useContext } from 'react'
import { ContextApp } from '../../../ContextAPI'
import { getSongById } from '../../../Functions'
import Imgloaded from '../Imgloaded/Imgloaded'
import Stripsongcard from '../Songcard/Stripsongcard'
import './Album.css'

const Albumcollection = (props) => {
  const {songs} = useContext(ContextApp)
  const {album} = props

  const songsrow = album?.songs.map((song, i)=> {
    return (
      <Stripsongcard i={i} song={getSongById(song, songs)}/>
    )
  })

  return (
    <div className="albumcollection flex">
        <div className="leftalbumsect">
          <Imgloaded img={album?.img} />
        </div>
        <div className="flexcol rightalbumsect">
          {songsrow}
        </div>
    </div>
  )

}
export default Albumcollection