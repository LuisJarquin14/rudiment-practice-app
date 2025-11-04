import React, { useEffect, useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';

export default function Layout() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('theme') || 'dark';
    } catch (e) {
      return 'dark';
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('theme-light');
    } else {
      root.classList.remove('theme-light');
    }
    try { localStorage.setItem('theme', theme); } catch (e) {}
  }, [theme]);

  function toggleTheme() {
    setTheme((t) => (t === 'light' ? 'dark' : 'light'));
  }
  return (
    <div className="App">
      <header className="App-header">
        <div className="container header-inner">
          <div style={{display:'flex',flexDirection:'column'}}>
            <Link to="/" className="brand">Panamá Rudiments <span className="subtitle">Practice & refine</span></Link>
          </div>
          <nav className="nav">
            <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>Explorar</NavLink>
            <NavLink to="/favorites" className={({ isActive }) => isActive ? 'active' : ''}>Favoritos</NavLink>
            <button
              className={`icon-btn ${theme === 'light' ? 'on' : ''}`}
              onClick={toggleTheme}
              title="Cambiar tema"
              aria-label="Cambiar tema claro/oscuro"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
          </nav>
        </div>
      </header>
      <main className="container">
        <Outlet />
      </main>
      <footer className="footer">
        <div className="container">Hecho con ❤️ en Panamá</div>
      </footer>
    </div>
  );
}