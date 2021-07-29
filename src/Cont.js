import React from 'react'
import Activity from './Components/Activity/Activity'
import Body from './Components/Body/Body'
import Playing from './Components/Playingsong/Playing'
import Sidebar from './Components/Sidebar/Sidebar'

const Cont = () => {

  return (
    <>
      <Sidebar />
      <Body />
      <Activity />
      <Playing />
    </>
  )
}
export default Cont