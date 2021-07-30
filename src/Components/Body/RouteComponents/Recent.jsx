import React, { useContext, useEffect, useState } from 'react'
import { ContextApp } from '../../../ContextAPI'


const Recent = (props) => {
  const {} = props
  const {albums, songs} = useContext(ContextApp)


  return (
    <div className="recent">

    </div>
  )
}
export default Recent