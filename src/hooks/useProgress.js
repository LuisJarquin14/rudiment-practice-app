import { useState } from 'react';

export function useProgress() {
  // Single-session study mode: progress/completion tracking removed.
  // Keep a stable API that returns an empty progress object for compatibility.
  const [progress] = useState({});
  return { progress };
}
