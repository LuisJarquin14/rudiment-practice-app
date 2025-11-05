import React, { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SkeletonCard from '../components/SkeletonCard';
import { LEVELS, RUDIMENTS, CATEGORIES } from '../data/rudiments';
import { useProgress } from '../hooks/useProgress';
import { useFavorites } from '../hooks/useFavorites';


export default function Explore() {
  const [level, setLevel] = useState('basic');
  const [q, setQ] = useState('');
  const [category, setCategory] = useState('');

  const filtered = useMemo(() => {
    // Apply filters combinatorially:
    // - If category is set, filter by category.
    // - If level is set, filter by level.
    // This yields an intersection when both are selected (what was requested).
    let list = RUDIMENTS.slice();
    if (category) list = list.filter((r) => r.category === category);
    if (level) list = list.filter((r) => r.level === level);

    if (!q.trim()) return list;
    // Normalize function removes diacritics and lowercases for more robust matching
    const normalize = (s) => (s || '').toString().normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();
    const query = normalize(q);
    const tokens = query.split(/\s+/).filter(Boolean);

    return list.filter((r) => {
      // Build a searchable haystack including name, description, slug, category and sticking
      const hay = [r.name, r.description, r.slug, r.category, r.sticking].map(normalize).join(' ');
      // Require that every token is present (AND search). This helps when users type the full name
      return tokens.every((t) => hay.includes(t));
    });
  }, [level, q, category]);

  // Loading state used to show skeletons briefly while filtering/searching
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    // show skeleton when query/filters change. debounce to avoid flicker
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 260);
    return () => clearTimeout(t);
  }, [q, level, category]);

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
        {loading ? (
          // show several skeleton cards while loading (use component for consistency)
          Array.from({length:8}).map((_, i) => (
            <SkeletonCard key={`sk-${i}`} />
          ))
        ) : (
          filtered.map((r) => (
            <div key={r.slug} className="card">
            <div className="card-title-row">
              <Link to={`/rudiment/${r.slug}`} className="card-title">{r.name}</Link>
              <button
                className={`icon-btn ${favorites[r.slug] ? 'on' : ''}`}
                title={favorites[r.slug] ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                onClick={() => toggleFavorite(r.slug)}
              >★</button>
            </div>
            <div className="rudiment-img-wrap">
              {r.image ? (
                <img
                  src={`/40-rudiments/${r.image}`}
                  alt={r.name}
                  className="rudiment-img"
                  loading="lazy"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              ) : null}
            </div>
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
          ))
        )}
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
                    <div className="rudiment-img-wrap">
                      {r.image ? (
                        <img
                          src={`/40-rudiments/${r.image}`}
                          alt={r.name}
                          className="rudiment-img"
                          loading="lazy"
                          onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        />
                      ) : null}
                    </div>
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