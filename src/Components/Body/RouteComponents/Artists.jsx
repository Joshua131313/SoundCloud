import React, { useContext, useEffect, useState } from 'react'
import { ContextApp } from '../../../ContextAPI'


const Artists = (props) => {
  const {} = props
  const {albums, songs} = useContext(ContextApp)


  return (
    <div className="artists">

    </div>
  )
}
export default Artists