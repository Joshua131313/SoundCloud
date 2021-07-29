import React from 'react'
import './Waves.css'
const Waves = (props) => {

  const {centered = true} = props

  return (
   <div id='bars' className={`${centered && 'centeredt'} waves`}>
     <div className="bar"></div>
     <div className="bar"></div>
     <div className="bar"></div>
     <div className="bar"></div>
     <div className="bar"></div>
     <div className="bar"></div>
     <div className="bar"></div>
     <div className="bar"></div>
     <div className="bar"></div>
     <div className="bar"></div>
   </div>
  )
}
export default Waves