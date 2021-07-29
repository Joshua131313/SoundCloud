import React, { useContext, useEffect, useState } from 'react'
import { ContextApp } from '../../../ContextAPI'
import { AddToFavs } from '../../../Functions'
import './Dropdown.css'

const Dropdown = (props) => {
  const {saved, user} = useContext(ContextApp)
  const {song, audio} = props
  const [dropdown, setDropdown] = useState(false)
  const options = [
    {
      icon: 'fal fa-album', 
      text: 'Add to Album',
      clickEvent: () => {}
    },
    {
      icon: 'fal fa-long-arrow-down',
      text: 'Download',
      download: true
    },
    {
      icon: `fa${saved.includes(song?.id)?'':'l'} fa-heart`, 
      text: saved.includes(song?.id)?'Unfavorite':'Favorite',
      clickEvent: ()=> {
        AddToFavs(song, saved, user)
      }
    },
    {
      icon: 'fal fa-arrow-to-right',
      text: 'Play Next',
      clickEvent: () => {}
    },
    {
      icon: 'fal fa-list-music',
      text: 'Add to Queue',
      clickEvent: () => {}
    }
  ]
  const optionsrow = options.map(option=> {
    if(option.download) {
      return (
        <a href='' target='__blank' className='dropoption'>
          <i className={option.icon}></i>
          <span>{option.text}</span>
        </a>
      )
    }
    else {
      return (
        <div onClick={()=> option.clickEvent()} className='dropoption'>
          <i className={option.icon}></i>
          <span>{option.text}</span>
        </div>
      )
    }
  })
  const handleDrop = () => {
    setDropdown(false)
  }
  useEffect(()=> {
    window.onclick = () => {
     if(dropdown) {
        setDropdown(false)
     }
    }
  }, [dropdown])
  return (
    <div onClick={(e)=> e.stopPropagation()} className={`dropcont ${dropdown?'activedrop':''}`}>
      <i onClick={()=> {setDropdown(!dropdown);}} className="fal fa-ellipsis-h"></i>
      <div className="dropdown">
          {optionsrow}
      </div>
    </div> 
    
  )
}
export default Dropdown