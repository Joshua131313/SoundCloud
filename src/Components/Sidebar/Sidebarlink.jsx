import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { ContextApp } from '../../ContextAPI'

const Sidebarlink = (props) => {
  const {link} = props
  return (
    <NavLink exact to={`/${link.link}`} className='sidebarlink' activeClassName='activelink'>
      <i className={'fal fa-'+link.icon}></i>
      <span>{link.text}</span>
    </NavLink>
  )
}
export default Sidebarlink