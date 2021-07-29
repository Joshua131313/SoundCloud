import React from 'react'
import Imgloaded from '../Reuseable/Imgloaded/Imgloaded'

const Songinfo = (props) => {
  const {setSongpopup, song} = props
  return (
   <div onClick={()=> setSongpopup?.(true)}  className="songinfo" >
    <Imgloaded img={song?.img}/>
    <div className="songtitle">
     <span>{song?.title}</span>
      <span>{song?.singer}</span>
    </div>
  </div>
  )
}
export default Songinfo