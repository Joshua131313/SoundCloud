import React, { useContext, useEffect, useState } from 'react'
import { ContextApp } from '../../../ContextAPI'


const Genres = (props) => {
  const {} = props
  const {albums, songs} = useContext(ContextApp)


  return (
    <div className="genres">

    </div>
  )
}
export default Genres