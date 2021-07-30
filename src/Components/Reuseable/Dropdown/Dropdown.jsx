import React, { useContext, useEffect, useState } from 'react'
import { ContextApp } from '../../../ContextAPI'
import { AddToFavs, getSongById } from '../../../Functions'
import './Dropdown.css'
import { CSSTransition } from 'react-transition-group';
import Modal from '../Modal/Modal';
import Addtoalbum from './Addtoalbum';

const Dropdown = (props) => {
  const {saved, user, songs} = useContext(ContextApp)
  const {song, audio} = props
  const [dropdown, setDropdown] = useState(false)
  const [albummodal, setAlbummodal] = useState(false)
  const [songdetail, setSongdetail] = useState(getSongById(song, songs))
  const options = [
    {
      icon: 'fal fa-album', 
      text: 'Add to Album',
      clickEvent: () => {
        setAlbummodal(true)
      }
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
  useEffect(() => {
    setSongdetail(getSongById(song, songs))
  }, [song, songs])
  return (
  <>
  <Modal modal={albummodal} setModal={setAlbummodal}>
    <Addtoalbum song={song} />
  </Modal>
    <div onClick={(e)=> e.stopPropagation()} className={`dropcont ${dropdown?'activedrop':''}`}>
      <i onClick={()=> {setDropdown(!dropdown);}} className="fal fa-ellipsis-h"></i>
      <CSSTransition 
        timeout={300}
        in={dropdown}
        unmountOnExit
        classNames={`dropdown`}
       >
      <div className="dropdown" onClick={()=> setDropdown(false)}>
          {optionsrow}
      </div>
      </CSSTransition>
    </div> 

    </>
  )
}
export default Dropdown