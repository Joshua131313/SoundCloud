import React, { useContext, useEffect, useState } from 'react'
import { ContextApp } from '../../../ContextAPI'


const Liked = (props) => {
  const {} = props
  const {albums, songs} = useContext(ContextApp)


  return (
    <div className="liked">

    </div>
  )
}
export default Liked