import React, { useContext } from 'react'
import { ContextApp } from '../../ContextAPI'
import { AddToFavs } from '../../Functions'

const Addtosaved = ({song}) => {
  const {saved, user} = useContext(ContextApp)
  
  return (
    <i onClick={()=> AddToFavs(song, saved, user)} className={`fa${saved.includes(song?.id)?'':"l"} fa-heart`}></i>
    )
}
export default Addtosaved