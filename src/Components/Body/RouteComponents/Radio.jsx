import React, { useContext, useEffect, useState } from 'react'
import { ContextApp } from '../../../ContextAPI'


const Radio = (props) => {
  const {} = props
  const {albums, songs} = useContext(ContextApp)


  return (
    <div className="radio">

    </div>
  )
}
export default Radio