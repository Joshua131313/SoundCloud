import React, { useContext, useEffect, useState } from 'react'
import { ContextApp } from '../../../ContextAPI'


const Albums = (props) => {
  const {} = props
  const {albums, songs} = useContext(ContextApp)


  return (
    <div className="albums">

    </div>
  )
}
export default Albums