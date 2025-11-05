import { useEffect, useState } from 'react';

export function useFavorites() {
  // For single-session mode we keep favorites in-memory only (no persistence)
  const [favorites, setFavorites] = useState({});
  const toggleFavorite = (slug) =>
    setFavorites((f) => ({ ...f, [slug]: !f[slug] }));
  return { favorites, toggleFavorite };
}
