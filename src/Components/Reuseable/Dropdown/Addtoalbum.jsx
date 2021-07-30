import React, { useState, useContext } from 'react'
import { ContextApp } from '../../../ContextAPI'
import Stripalbum from '../Album/Stripalbum'
import Appinput from '../Input/Input'

const Addtoalbum = (props) => {
  const {albums, clean} = useContext(ContextApp)
  const {song} = props
  const [search, setSearch] = useState('')
  const pattern = new RegExp('\\b' + clean(search), 'i');

  const albumsrow = albums?.filter(x=> pattern.test(clean(x.title))).map(album=> {
   return  <Stripalbum album={album} song={song}/>
  })
  return (
    <div className="addsongmodal addtoalbum">
      <h2 className='addsongstitle flexcol'>
        <section>
          Add <span>{song?.title}</span> To An Album
        </section>
        <Appinput icon='fal fa-search' value={search} setValue={setSearch} placeholder='Search...'/>
      </h2>
      <div className="albumscol flexcol">
         {albumsrow}
      </div>
    </div>
  )
}
export default Addtoalbum