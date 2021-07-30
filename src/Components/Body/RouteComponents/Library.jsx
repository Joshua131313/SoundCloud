import React, { useContext, useEffect, useState } from 'react'
import { ContextApp } from '../../../ContextAPI'
import Songcard from '../../Reuseable/Songcard/Songcard'


const Library = (props) => {
  const {} = props
  const {albums, songs} = useContext(ContextApp)

  const songsrow = songs?.map(song=> {
    return (
      <Songcard song={song} />
    )
  })

  return (
    <div className="library">
      {songsrow}
    </div>
  )
}
export default Library