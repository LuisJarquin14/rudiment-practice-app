import { useEffect, useState } from 'react';

export function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    try {
      const v = localStorage.getItem('rudimentFavorites');
      return v ? JSON.parse(v) : {};
    } catch {
      return {};
    }
  });
  useEffect(() => {
    localStorage.setItem('rudimentFavorites', JSON.stringify(favorites));
  }, [favorites]);
  const toggleFavorite = (slug) =>
    setFavorites((f) => ({ ...f, [slug]: !f[slug] }));
  return { favorites, toggleFavorite };
}
