import React, { useContext, useState } from 'react'
import Appinput from '../Reuseable/Input/Input'
import Appselect from '../Reuseable/Select/Select'
import firebase from 'firebase'
import axios from 'axios'
import Imgloaded from '../Reuseable/Imgloaded/Imgloaded'
import Button from '../Reuseable/Button/Button'
import { db } from '../../Fire'
import { ContextApp } from '../../ContextAPI'
import Loader from '../Reuseable/Loader'
import Addsong from './Addsong'
import Modal from '../Reuseable/Modal/Modal'
import Stripsongcard from '../Reuseable/Songcard/Stripsongcard'
import Innersongsmodal from './Innersongsmodal'
import { getSongById } from '../../Functions'
const Addalbum = (props) => {
  const {setModal} = props
  const {addNoti, user, songs, clean} = useContext(ContextApp)
 const [percent, setPercent] = useState(0)
 const [loading, setLoading] = useState(false)
 const [songsmodal, setSongsmodal] = useState(false)
  const [ssongs, setSsongs] = useState([])
  const [img, setImg] = useState({
    name: '',
    url: ''
  })
  const [title, setTitle] = useState('')
  const [singer, setSinger] = useState('')
  const [genre, setGenre] = useState('')
  const [search, setSearch] = useState('')
  const pattern = new RegExp('\\b' + clean(search), 'i');
  const [limit, setLimit] = useState(30)
  const genres = [ 
    {
      text: 'Hip-hop',
      value: 'hiphop',
    },
    {
      text: 'Country', 
      value: 'country', 
    },
    {
      text: 'Pop', 
      value: 'pop'
    },
    {
      text: 'Rock',
      value: 'rock'
    },
    {
      text: 'Rap',
      value: 'rap'
    },
    {
      text: 'Opera',
      value: 'opera'
    },
    {
      text: 'Jazz',
      value: 'jazz'
    },
    {
      text: 'Metal',
      value: 'metal'
    },
    {
      text: 'Classical',
      value: 'classical'
    },
    {
      text: 'Disco',
      value: 'disco'
    }
  ]

  const resetForm = () => {
    setTitle('')
    setSinger('')
    setGenre('')
    setSsongs([])
    setImg({
      url: '',
      name: ''
    })
  }
  const addAlbum = () => {
    if(songs.length && title && singer && img.url) {
      db.collection('songs').doc('albums').update({
        albums: firebase.firestore.FieldValue.arrayUnion({
          date: new Date(),
          songs: ssongs,
          title: title,
          singer,
          img: img.url,
          id: db.collection('songs').doc().id,
          creatorid: user.uid
        })
      })
      
      .then(()=> {
        resetForm()
        setModal(false)      
        addNoti('Album successfully created!', 'fal fa-check-circle')
      })
      .catch(()=> {
        addNoti('Try again...', 'fal fa-exclamation-circle')
      })
    }
    else {
      addNoti('Fill in all the field!', 'fal fa-exclamation-circle')

    }
  }
  function uploadImgur(e) {
    let file = e.target.files[0]

    const data = new FormData()
    data.append("image", file)
    const config = {
      headers: {
        Authorization: "Client-ID b2683e97287b24b",
      },
    }
    axios.post("https://api.imgur.com/3/image/", data, config).then((res) => {
      setImg({
        name: file.name,
        url: res.data.data.link
      })
    }).catch(err => {
      console.log(err)
    })

  }
  const songsrow =
 songs?.filter(x=> pattern.test(clean(x.title)))
  .sort((a, b)=> b.date - a.date)
  .slice(0, limit)
  .map(song=> {
    return (
      <Stripsongcard albumbtn ssongs={ssongs} setSsongs={setSsongs} img={true} song={song} />
    )
  })
  return (
    <>

    <div className="addsongmodal addalbummodal">
    <Modal className='addsongsmodal' modal={songsmodal} setModal={setSongsmodal}>
     <Innersongsmodal 
        limit={limit} 
        setLimit={setLimit}
        songsrow={songsrow} 
        search={search}
        setSearch={setSearch} 
      />
    </Modal>
     <h2>Create Album</h2>
     <div className="songinputs">
       <Appinput value={title} setValue={setTitle} icon='fal fa-music-alt'  placeholder='Album Title'/>
       <Appinput value={singer} setValue={setSinger} icon='fal fa-user-music'  placeholder='Singer'/>
       <div className={`addsongs ${ssongs.length&&'activeaddsongs'}`} onClick={()=> setSongsmodal(true)}>
          <div>
            <i className='fal fa-music'></i>
            {
              ssongs.length === 0?
              <span>
                Add Songs
              </span>
              :
              <>{
                ssongs.map(song=> {
                  return (
                    getSongById(song, songs).title
                  )
                }).join(', ')
              }
              </>
            }
         </div>
          <i className='fal fa-plus'></i>
       </div>
       <label className='appinput'>
      <input 
      placeholder={'Song Image'}
      value={img.url}
      onChange={e=>setImg({...img, url: e.target.value})}
      />
     <i className={'fal fa-images'}></i>

   </label>
        <div className="uploadersm">
        <label className="songuploader imguploader" style={{border: img.url?'0':'solid 3px var(--theme-color)'}}>
            <input onChange={e=> uploadImgur(e)} type="file" style={{display: 'none'}}/>
            <div>
             {
               img.url?
              <img src={img.url} alt=""/>
              :
             <> 
              <i className='fal fa-images'></i>
              <h4>{"Upload  Album Cover"}</h4>
              </>
             }
            </div>
        </label>
        </div>
        <div className='addcontrols'>
          <Button text='Create Album' clickEvent={()=> addAlbum()} icon='fal fa-album'/>
          <Button text='Reset Form' icon='fal fa-undo'/>
        </div>
     </div>
    </div>
    </>
  )
}
export default Addalbum