import React, { useEffect, useRef } from 'react'
import Appinput from '../Reuseable/Input/Input'

const Innersongsmodal = (props) => {
  const {search, setSearch, songsrow, limit, setLimit} = props
  const bottom  = useRef()

  const handleScroll = (e) => {
    const bottom = Math.abs(e.target.scrollHeight - (e.target.scrollTop + e.target.clientHeight)) <= 1

    if(bottom) {
      setLimit(prev=> prev + 10)
    }
   
  } 




  return (
    <div className="innersongsmodal" >
    <h2 className='addsongstitle flexcol'>
      <span>Add Songs</span>
      <Appinput value={search} setValue={setSearch} placeholder='Search...' icon='fal fa-search'/>
    </h2>
    <div ref={bottom} onScroll={(e)=>{handleScroll(e)}} className="songsselect flexcol">
      {songsrow}
    </div>
  </div>
  )
}
export default Innersongsmodal