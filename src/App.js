import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import Explore from './pages/Explore';
import RudimentDetail from './pages/RudimentDetail';
import Favorites from './pages/Favorites';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Explore />} />
          <Route path="rudiment/:slug" element={<RudimentDetail />} />
          <Route path="favorites" element={<Favorites />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;