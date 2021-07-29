import React from 'react'
import './Icon.css'

const Icon = (props) => {

  const {icon, clickEvent} = props
  
  return (
    <div className="icon">
        <i className={icon} onClick={()=> clickEvent()}></i>
    </div>
  )
}
export default Icon