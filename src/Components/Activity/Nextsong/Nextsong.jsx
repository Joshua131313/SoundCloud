import React, { useState } from 'react'
import Songinfo from '../../Playingsong/Songinfo'
import Dropdown from '../../Reuseable/Dropdown/Dropdown'
import './Nextsong.css'
const Nextsong = (props) => {
  const {song} = props
  const  [dropdown, setDropdown] = useState(false) 

  return (
    <div className="nextsong">
       <Songinfo song={song}/>
       <Dropdown song={song} />
    </div>
  )
}
export default Nextsong