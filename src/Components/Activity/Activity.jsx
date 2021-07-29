import React, { useState } from 'react'
import Songinfo from '../Playingsong/Songinfo'
import './Activity.css'
import Nextsong from './Nextsong/Nextsong'

const Activity = () => {
  return (
    <div className="activity">
      <h3>Your Queue</h3>
      <div className="queelist">
        <Nextsong />
        <Nextsong />
      </div>
    </div>
  )
}
export default Activity