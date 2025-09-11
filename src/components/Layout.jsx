import React from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="container header-inner">
          <Link to="/" className="brand">Panamá Rudiments</Link>
          <nav className="nav">
            <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>Explorar</NavLink>
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