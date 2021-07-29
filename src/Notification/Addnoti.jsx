import {useState, useEffect, useContext} from 'react'
import { ContextApp } from '../../../ContextAPI'
import Button from '../Components/Reuseable/Button/Button'
import { addNotification } from './Addnotification'

const Addnoti = (msg, icon) => {
  const {notifisystem} = useContext(ContextApp)
  const useNoti = addNotification({
    notifisystem,
    msg,
    icon
  })

  return (
    <Button />
  )
}
export default Addnoti