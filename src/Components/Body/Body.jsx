import React, {useState, useContext, useEffect} from 'react'
import { ContextApp } from '../../ContextAPI'
import Songcard from '../Reuseable/Songcard/Songcard'
import Stripsongcard from '../Reuseable/Songcard/Stripsongcard'
import "./Body.css"
import {sidebarlinks} from '../../Arrays'
import { Route, Switch } from 'react-router-dom'
import Albums from './RouteComponents/Albums'
import Artists from './RouteComponents/Artists'
import Foryou from './RouteComponents/Foryou'
import Genres from './RouteComponents/Genres'
import Library from './RouteComponents/Library'
import Liked from './RouteComponents/Liked'
import Radio from './RouteComponents/Radio'
import Recent from './RouteComponents/Recent'

const Body = () => {
  
  const {songs} = useContext(ContextApp)
  
  const songsrow = songs?.map((song, i)=> {
    return (
      <Stripsongcard i={i} song={song} />
    )
  })
  const componets = {
    Albums: Albums,
    Artists: Artists,
    Foryou: Foryou,
    Genres: Genres,
    Library: Library,
    Liked: Liked,
    Radio: Radio,
    Recent: Recent
  }
  const routes = sidebarlinks.map(link=> {
    if(!link.title) {
      let Component = componets[link.component]
      return (
      <Route exact={true} path={`/${link.link}`}>
        <Component />
      </Route>
    )
    }
  })
  return (
    <div className="body">
        <Switch>
            {routes}
        </Switch>
    </div>
  )
}
export default Body