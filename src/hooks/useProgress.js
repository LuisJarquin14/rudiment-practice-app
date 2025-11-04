import { useEffect, useState } from 'react';

export function useProgress() {
  const [progress, setProgress] = useState(() => {
    try {
      const v = localStorage.getItem('rudimentProgress');
      return v ? JSON.parse(v) : {};
    } catch {
      return {};
    }
  });
  useEffect(() => {
    localStorage.setItem('rudimentProgress', JSON.stringify(progress));
  }, [progress]);
  const markCompleted = (slug) => setProgress((p) => ({ ...p, [slug]: true }));
  const unmark = (slug) => setProgress((p) => {
    const n = { ...p };
    delete n[slug];
    return n;
  });
  return { progress, markCompleted, unmark };
}
