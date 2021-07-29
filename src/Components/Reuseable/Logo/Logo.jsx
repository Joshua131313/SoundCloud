import React from 'react'
import { Link } from 'react-router-dom'
import './Logo.css'

const Logo = (props) => {

  const {notext, login, text} = props

  return (
    <Link to='/' className='logo'>
      <i className='fal fa-waveform'></i>
      {!notext && <span>{login?text:'SoundCloud'}</span>}
    </Link>
  )
}
export default Logo
