import { useEffect, useState } from "react";
import { db, getPinById } from "../db/db.js";
import '../styles/PinView.css';

export function PinView({ id, onBack }) {
  const [selectedPin, setSelectedPin] = useState(null);
  const [otherPins, setOtherPins] = useState([]);

  // Cargar pin seleccionado + demás pines
  useEffect(() => {
    async function loadData() {
      if (!id) return;

      const pin = await getPinById(id);
      setSelectedPin(pin);

      const all = await db.feed.toArray();
      setOtherPins(all.filter((p) => p.id !== id));
    }

    loadData();
  }, [id]);

  if (!selectedPin) return <p>Cargando pin...</p>;

  return (
    <div className="pinview__layout">
      {/* Aside con botón para volver */}
      <aside className="pinview__aside">
        <button onClick={onBack} className="aside__toggle">⇦</button>
      </aside>

      {/* Main */}
      <main className="pinview__main">
        {/* Pin seleccionado */}
        <div className="pinview__selected">
          {selectedPin.image && (
            <img src={selectedPin.image} alt={selectedPin.title} className="pinview__image" />
          )}
          <h2>{selectedPin.title}</h2>
          <p>{selectedPin.desc}</p>
        </div>

        {/* Otros pines */}
        
          {otherPins.map((p) => (
            <div key={p.id} className="pin__container-small">
              {p.image && <img src={p.image} alt={p.title} className="image__pin-small" />}
            </div>
          ))}
        
      </main>
    </div>
  );
}
