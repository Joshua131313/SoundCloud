import React, {useState, useContext, useEffect} from 'react'
import { sidebarlinks } from '../../Arrays'
import { ContextApp } from '../../ContextAPI'
import Button from '../Reuseable/Button/Button'
import Logo from '../Reuseable/Logo/Logo'
import Modal from '../Reuseable/Modal/Modal'
import Addsong from './Addsong'
import Addalbum from './Addalbum'
import "./Sidebar.css"
import Sidebarlink from './Sidebarlink'

const Sidebar = () => {
  const {handleLogout} = useContext(ContextApp)
  const [modal, setModal] = useState(false)
  const [album, setAlbum] = useState(false)
  const linksrow = sidebarlinks.map(link=> {
   if(link.title) {
     return (
       <h4 className='linktitle'>{link.title}</h4>
     )
   }
    return (
      <Sidebarlink link={link} />
    )
   
   
  
  })
  
  return (
    <>
    <Modal modal={modal} setModal={setModal}>
      <Addsong setModal={setModal}/>
    </Modal>
    <Modal modal={album} setModal={setAlbum}>
      <Addalbum setModal={setAlbum}/>
    </Modal>
    <div className="sidebar">

      <Logo />
      <div className="sidebarlinks">
        {linksrow}
      </div>
      <Button text='New Song' clickEvent={()=> setModal(true)} icon='fal fa-music-alt'/>
      <Button text='New Album' icon='fal fa-album' clickEvent={()=> setAlbum(true)}/>
      <Button text='Log Out' icon='fal fa-user' clickEvent={()=> handleLogout()}/>

    </div>
    </>
  )
}
export default Sidebar