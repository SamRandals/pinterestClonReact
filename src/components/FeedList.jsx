import { useState, useRef } from 'react'
import { getPinById } from '../db/db.js';
import { PinView } from './PinView.jsx';

import '../styles/FeedList.css'

function base64ToBlob(base64, mimeType = "image/png") {
  const byteCharacters = atob(base64.split(",")[1]); 
  const byteNumbers = Array.from(byteCharacters).map(c => c.charCodeAt(0));
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: mimeType });
}

// main funcction drawer
export default function FeedList({ feed, deletePin, onSelectPin }) {
  const [hoveredId, setHoveredId] = useState(null)
  const [openMenuId, setOpenMenuId] = useState(null)

  // toggle options function
  function toggleOptions(id){
    setOpenMenuId(prev=>(prev===id ? null : id))
  }
  // download pins option
  async function downloadPin(id) {
    const pin = await getPinById(id)   // ahora sí usando Dexie
    if (!pin || !pin.image) return

    const blob = base64ToBlob(pin.image, "image/png")
    const url = URL.createObjectURL(blob)

    const a = document.createElement("a")
    a.href = url
    a.download = `pin-${id}.png`
    a.click()
    URL.revokeObjectURL(url)
  }
  return (
    <>
      <div className='feed__content-pines'>
          <div className="feed__content-pin">
            
        {feed.map((f) => (
          <div className="pin__container" key={f.id}>
            <div
              onMouseEnter={() => setHoveredId(f.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={()=>onSelectPin(f.id)}
              className="image__container-pin"
            >
              {f.image && <img src={f.image} alt="image" className='image__pin'/>}
              <div className={hoveredId === f.id ? "hover__box" : "hidde__hover"}></div>
            </div>

            <div className="options">
              <div className="more__options-button">
                <button onClick={()=>toggleOptions(f.id)} className='toggleOptions__button'><b>...</b></button>
                <div     className={
                    openMenuId === f.id
                      ? "div__options-container show"
                      : "div__options-container hidden"
                  }>
                    <small className='text__inspired-small-delete-or-download-button'>este pin esta inspirado en tu actividad reciente</small>
                  <button  onClick={() => deletePin(f.id)} className='delete__button-click'>Eliminar</button>
                  <button onClick={() => downloadPin(f.id)} className="download__button-image">Descargar</button>
                </div>
              </div>
              

            </div>
          </div>
        ))}
          </div>
      </div>
    </>
  )
}
