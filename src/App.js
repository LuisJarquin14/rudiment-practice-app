import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import Rudimentos from './pages/Rudimentos';
import RudimentDetail from './pages/RudimentDetail';
import Tips from './pages/Tips';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Rudimentos />} />
          <Route path="rudiment/:slug" element={<RudimentDetail />} />
          <Route path="tips" element={<Tips />} />
          {/* Favorites removed: single-session app doesn't persist favorites */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;