import React, {useContext} from 'react'
import { ContextApp } from '../../../ContextAPI'
import { AddToAlbum } from '../../../Functions'
import Button from '../Button/Button'
import Imgloaded from '../Imgloaded/Imgloaded'
import './Album.css' 

const Stripalbum = (props) => {
  const {album, song} = props
  const {user, albums} = useContext(ContextApp)
  const handleAddToAlbum = () => {
    AddToAlbum(song.id, album, user, albums)
  }

  return (
    <div className="stripalbum flex">
      <div className="firstpart flex">
        <div className="leftstripalbum">
            <Imgloaded img={album.img} />
        </div>
        <div className="rightstripalbum flexcol">
          <h4>{album.title}</h4>
          <small>{album.singer}</small>
          <span className='bubble'>
            <i className='fal fa-plus'></i>
          <span>{album.songs.length}</span>
          </span>
        </div>
      </div>
      <div className="rightpart">
        <Button className={`${album.songs.includes(song.id)?'filledbtn':''}`} text={album.songs.includes(song.id)?'Remove':'Select'} clickEvent={()=> handleAddToAlbum()}/>
      </div>
    </div>
  )
}
export default Stripalbum