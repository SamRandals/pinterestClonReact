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
  const [filteredFeed, setFilteredFeed] = useState([]); // 👈 nuevo estado para la búsqueda
  const [cargando, setCargando] = useState(true);
  const [selectedId, setSelectedId] = useState(null);
  const [search, setSearch] = useState(""); // 👈 estado del input de búsqueda

  async function cargar() {
    await seedIfEmpty();
    const todas = await db.feed.orderBy("createdAt").reverse().toArray();
    setFeed(todas);
    setFilteredFeed(todas); // inicializamos filtrado con todos
    setCargando(false);
  }

  async function deletePin(id) {
    await db.feed.delete(id);
    await cargar();
    if (selectedId === id) {
      setSelectedId(null);
    }
  }

  // Filtrar cuando cambia search o feed
  useEffect(() => {
    const q = search.trim().toLowerCase();
    if (!q) {
      setFilteredFeed(feed);
    } else {
      setFilteredFeed(
        feed.filter(f =>
          f.title?.toLowerCase().includes(q) ||
          f.desc?.toLowerCase().includes(q)
        )
      );
    }
  }, [search, feed]);

  useEffect(() => {
    cargar().catch(e => console.log(e));
  }, []);

  if (cargando) return <p>Cargando...</p>;

  return (
    <div className="layout">
      <AsideMenu setFeedState={setFeedState} />
      <Header searchValue={search} setSearchValue={setSearch} />

      {/* Mostrar PinView si hay seleccionado */}
      {selectedId ? (
        <PinView id={selectedId} onBack={() => setSelectedId(null)} />
      ) : (
        <>
          {feedState === "Home" && (
            <>
              {/* 👇 FeedList recibe la lista filtrada */}
              <FeedList 
                feed={filteredFeed} 
                deletePin={deletePin} 
                onSelectPin={(id) => setSelectedId(id)}
              />
            </>
          )}

          {feedState === "Form" && <FeedForm onAdd={cargar} />}
        </>
      )}
    </div>
  )
}

export default App
