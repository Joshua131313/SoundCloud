import React, {useState, useContext, useEffect} from 'react'
import { ContextApp } from '../../ContextAPI'
import Songcard from '../Reuseable/Songcard/Songcard'
import Stripsongcard from '../Reuseable/Songcard/Stripsongcard'
import "./Body.css"

const Body = () => {
  
  const {songs} = useContext(ContextApp)
  
  const songsrow = songs?.map((song, i)=> {
    return (
      <Stripsongcard i={i} song={song} />
    )
  })

  return (
    <div className="body">
      <div className="songcont">
        {songsrow}
      </div>
    </div>
  )
}
export default Body