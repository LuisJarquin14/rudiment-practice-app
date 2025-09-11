import React from 'react';
import { Link } from 'react-router-dom';
import { RUDIMENTS } from '../data/rudiments';
import { useFavorites } from '../hooks/useFavorites';
import StickingViewer from '../components/StickingViewer';

export default function Favorites() {
  const { favorites, toggleFavorite } = useFavorites();
  const list = RUDIMENTS.filter(r => favorites[r.slug]);
  return (
    <div>
      <h1>Favoritos</h1>
      {list.length === 0 ? (
        <p>No tienes rudimentos favoritos aún.</p>
      ) : (
        <div className="grid">
          {list.map(r => (
            <div key={r.slug} className="card">
              <div className="card-title-row">
                <Link to={`/rudiment/${r.slug}`} className="card-title">{r.name}</Link>
                <button className="icon-btn on" onClick={() => toggleFavorite(r.slug)}>★</button>
              </div>
              <div className="card-sub"><StickingViewer sticking={r.sticking} /></div>
              <div className="card-desc">{r.description}</div>
              <div className="card-actions">
                <Link to={`/rudiment/${r.slug}`} className="chip link">Practicar →</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}