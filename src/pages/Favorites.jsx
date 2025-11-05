import React, { useEffect, useState } from 'react';
import SkeletonCard from '../components/SkeletonCard';
import { Link } from 'react-router-dom';
import { RUDIMENTS } from '../data/rudiments';
import { useFavorites } from '../hooks/useFavorites';


export default function Favorites() {
  const { favorites, toggleFavorite } = useFavorites();
  const list = RUDIMENTS.filter(r => favorites[r.slug]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // simulate short load when opening favorites
    const t = setTimeout(() => setLoading(false), 260);
    return () => clearTimeout(t);
  }, []);

  return (
    <div>
      <h1>Favoritos</h1>
      {loading ? (
        <div className="grid">
          {Array.from({length:6}).map((_, i) => (
            <SkeletonCard key={`fsk-${i}`} />
          ))}
        </div>
      ) : (
        list.length === 0 ? (
          <p>No tienes rudimentos favoritos aún.</p>
        ) : (
          <div className="grid">
            {list.map(r => (
              <div key={r.slug} className="card">
                <div className="card-title-row">
                  <Link to={`/rudiment/${r.slug}`} className="card-title">{r.name}</Link>
                  <button className="icon-btn on" onClick={() => toggleFavorite(r.slug)}>★</button>
                </div>
                <div className="rudiment-img-wrap">
                  <img
                    src={r.image ? `/40-rudiments/${r.image}` : ''}
                    alt={r.name}
                    className="rudiment-img"
                    loading="lazy"
                  />
                </div>
                <div className="card-desc">{r.description}</div>
                <div className="card-actions">
                  <Link to={`/rudiment/${r.slug}`} className="chip link">Practicar →</Link>
                </div>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
}