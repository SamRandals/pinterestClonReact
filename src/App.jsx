import './App.css'
import './index.css'
import Header from './components/Header'
import AsideMenu from './components/AsideMenu'
import FeedList from './components/FeedList'
import { useState, useEffect } from 'react'
import { db, seedIfEmpty } from './db/db' 
import FeedForm from './components/FeedForm'
import { PinView } from './components/PinView'

function App() {
  const [feedState, setFeedState] = useState("Home")
  const [feed, setFeed] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [selectedId, setSelectedId] = useState(null); // 👈 nuevo estado

  async function cargar() {
    await seedIfEmpty();
    const todas = await db.feed.orderBy("createdAt").reverse().toArray();
    setFeed(todas);
    setCargando(false);
  }

  async function deletePin(id) {
    await db.feed.delete(id);
    await cargar();
    if (selectedId === id) {
      setSelectedId(null); // 👈 si borras el que está abierto, volver al FeedList
    }
  }

  useEffect(() => {
    cargar().catch(e => console.log(e));
  }, []);

  if (cargando) return <p>Cargando...</p>;

  return (
    <div className="layout">
      <AsideMenu setFeedState={setFeedState} />
      <Header />

      {/* Mostrar PinView si hay seleccionado */}
      {selectedId ? (
        <PinView id={selectedId} onBack={() => setSelectedId(null)} />
      ) : (
        <>
          {feedState === "Home" && (
            <FeedList 
              feed={feed} 
              deletePin={deletePin} 
              onSelectPin={(id) => setSelectedId(id)} // 👈 pasamos el click
            />
          )}
          {feedState === "Form" && <FeedForm onAdd={cargar} />}
        </>
      )}
    </div>
  )
}

export default App
