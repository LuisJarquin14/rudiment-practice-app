import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { LEVELS, RUDIMENTS, CATEGORIES } from '../data/rudiments';
import { useProgress } from '../hooks/useProgress';
import { useFavorites } from '../hooks/useFavorites';
import StickingViewer from '../components/StickingViewer';

export default function Explore() {
  const [level, setLevel] = useState('basic');
  const [q, setQ] = useState('');
  const [category, setCategory] = useState('');

  const filtered = useMemo(() => {
    let list = RUDIMENTS.filter((r) => r.level === level);
    if (category) list = list.filter((r) => r.category === category);
    if (!q.trim()) return list;
    const query = q.toLowerCase();
    return list.filter((r) =>
      r.name.toLowerCase().includes(query) ||
      r.description.toLowerCase().includes(query)
    );
  }, [level, q, category]);

  const { progress, markCompleted, unmark } = useProgress();
  const { favorites, toggleFavorite } = useFavorites();

  return (
    <div>
      <div className="toolbar">
        <div className="level-tabs">
          {LEVELS.map((l) => (
            <button
              key={l.id}
              className={`tab ${level === l.id ? 'active' : ''}`}
              onClick={() => setLevel(l.id)}
            >
              {l.label}
            </button>
          ))}
        </div>
        <div className="level-tabs">
          <button
            className={`tab ${category === '' ? 'active' : ''}`}
            onClick={() => setCategory('')}
          >Todas</button>
          {CATEGORIES.map(c => (
            <button
              key={c.id}
              className={`tab ${category === c.id ? 'active' : ''}`}
              onClick={() => setCategory(c.id)}
            >{c.label}</button>
          ))}
        </div>
        <input
          type="search"
          placeholder="Buscar rudimento..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="search"
        />
        <Link to="/favorites" className="chip link">★ Favoritos</Link>
      </div>

      <div className="grid">
        {filtered.map((r) => (
          <div key={r.slug} className="card">
            <div className="card-title-row">
              <Link to={`/rudiment/${r.slug}`} className="card-title">{r.name}</Link>
              <button
                className={`icon-btn ${favorites[r.slug] ? 'on' : ''}`}
                title={favorites[r.slug] ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                onClick={() => toggleFavorite(r.slug)}
              >★</button>
            </div>
            <div className="card-sub"><StickingViewer sticking={r.sticking} /></div>
            <div className="card-desc">{r.description}</div>
            <div className="card-actions">
              {progress[r.slug] ? (
                <button className="chip done" onClick={() => unmark(r.slug)}>Completado ✓</button>
              ) : (
                <button className="chip" onClick={() => markCompleted(r.slug)}>Marcar completado</button>
              )}
              <Link to={`/rudiment/${r.slug}`} className="chip link">Practicar →</Link>
            </div>
          </div>
        ))}
      </div>

      <div className="panel" style={{marginTop: 24}}>
        <div className="panel-title">Los 40 Rudiments por familia</div>
        <div className="panel-body" style={{display:'block'}}>
          {CATEGORIES.map(c => (
            <div key={c.id} style={{marginBottom: 16}}>
              <div className="tag">{c.label}</div>
              <div className="grid">
                {RUDIMENTS.filter(r => r.category === c.id).map(r => (
                  <Link key={r.slug} to={`/rudiment/${r.slug}`} className="card">
                    <div className="card-title">{r.name}</div>
                    <div className="card-sub"><StickingViewer sticking={r.sticking} /></div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}