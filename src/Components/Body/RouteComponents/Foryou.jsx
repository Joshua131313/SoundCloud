import React, { useContext, useEffect, useState } from 'react'
import { ContextApp } from '../../../ContextAPI'
import { getSongById } from '../../../Functions'
import Albumcollection from '../../Reuseable/Album/Albumcollection'
import Songcard from '../../Reuseable/Songcard/Songcard'


const Foryou = (props) => {
  const {} = props
  const {albums, songs, recent} = useContext(ContextApp)

  const recentrow = recent?.sort((a, b)=> getSongById(a, songs)?.date -  getSongById(b, songs)?.date).map(song=> {
    return (
      <Songcard song={getSongById(song, songs)} />
    )
  })
 
  return (
    <div className="foryou">
      <h2>Hit Albums</h2>
        <div className="albumsection">
          <Albumcollection album={albums[0]} />
        </div>
        <h2>Recently Played</h2>
        <div className="recentlyplayed flex">
          {recentrow}
        </div>
    </div>
  )
}
export default Foryou