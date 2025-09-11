import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [rudiments, setRudiments] = useState([]);
  const [currentRudiment, setCurrentRudiment] = useState(null);
  const [level, setLevel] = useState('basic');
  const [metronomeBPM, setMetronomeBPM] = useState(60);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState({});
  const audioContextRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    // Load rudiments
    const rudimentData = [
      // Basic
      { name: 'Single Stroke Roll', level: 'basic', description: 'Alternating strokes', sticking: 'RLRL' },
      { name: 'Single Stroke Four', level: 'basic', description: 'Four alternating strokes', sticking: 'RLRL' },
      { name: 'Single Stroke Seven', level: 'basic', description: 'Seven alternating strokes', sticking: 'RLRLRLR' },
      { name: 'Multiple Bounce Roll', level: 'basic', description: 'Continuous bounces', sticking: 'RRRR' },
      { name: 'Triple Stroke Roll', level: 'basic', description: 'Three strokes per hand', sticking: 'RRRLLL' },
      // Intermediate
      { name: 'Double Stroke Roll', level: 'intermediate', description: 'Two strokes per hand', sticking: 'RRLL' },
      { name: 'Five Stroke Roll', level: 'intermediate', description: 'Five strokes', sticking: 'RLRRR' },
      { name: 'Seven Stroke Roll', level: 'intermediate', description: 'Seven strokes', sticking: 'RLRRRRR' },
      { name: 'Flam', level: 'intermediate', description: 'Grace note followed by accent', sticking: 'rL' },
      { name: 'Flam Accent', level: 'intermediate', description: 'Flam on first of three', sticking: 'rLRL' },
      { name: 'Drag', level: 'intermediate', description: 'Two grace notes before accent', sticking: 'rrL' },
      { name: 'Single Drag Tap', level: 'intermediate', description: 'Drag followed by tap', sticking: 'rrLR' },
      // Advanced
      { name: 'Paradiddle', level: 'advanced', description: 'Alternating diddles', sticking: 'RLRR' },
      { name: 'Double Paradiddle', level: 'advanced', description: 'Two paradiddles', sticking: 'RLRRLRR' },
      { name: 'Flam Paradiddle', level: 'advanced', description: 'Flam on paradiddle', sticking: 'rLRR' },
      { name: 'Single Ratamacue', level: 'advanced', description: 'Drag on first, accent on fourth', sticking: 'rrLRL' },
      { name: 'Swiss Army Triplet', level: 'advanced', description: 'Flam triplet', sticking: 'rLRR' },
    ];
    setRudiments(rudimentData);

    // Load progress from localStorage
    const savedProgress = localStorage.getItem('rudimentProgress');
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress));
    }

    // Initialize AudioContext
    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
  }, []);

  const playTick = () => {
    if (!audioContextRef.current) return;
    const oscillator = audioContextRef.current.createOscillator();
    const gainNode = audioContextRef.current.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioContextRef.current.destination);
    oscillator.frequency.setValueAtTime(1000, audioContextRef.current.currentTime);
    gainNode.gain.setValueAtTime(0.1, audioContextRef.current.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + 0.1);
    oscillator.start(audioContextRef.current.currentTime);
    oscillator.stop(audioContextRef.current.currentTime + 0.1);
  };

  const startMetronome = () => {
    if (isPlaying) return;
    setIsPlaying(true);
    const interval = 60000 / metronomeBPM;
    intervalRef.current = setInterval(playTick, interval);
  };

  const stopMetronome = () => {
    setIsPlaying(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const markCompleted = (rudimentName) => {
    const newProgress = { ...progress, [rudimentName]: true };
    setProgress(newProgress);
    localStorage.setItem('rudimentProgress', JSON.stringify(newProgress));
  };

  const filteredRudiments = rudiments.filter(r => r.level === level);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Rudiment Practice App</h1>
        <p>Para estudiantes de percusión marching en Panamá</p>
        <select value={level} onChange={(e) => setLevel(e.target.value)}>
          <option value="basic">Básico</option>
          <option value="intermediate">Intermedio</option>
          <option value="advanced">Avanzado</option>
        </select>
      </header>
      <main>
        <div className="metronome">
          <h2>Metrónomo Personalizado</h2>
          <label>
            BPM: <input type="number" value={metronomeBPM} onChange={(e) => setMetronomeBPM(Number(e.target.value))} min="40" max="200" />
          </label>
          <button onClick={isPlaying ? stopMetronome : startMetronome}>
            {isPlaying ? 'Detener' : 'Iniciar'} Metrónomo
          </button>
        </div>
        <div className="rudiments">
          <h2>Rudimentos ({level})</h2>
          {filteredRudiments.map(r => (
            <div key={r.name} className={`rudiment ${progress[r.name] ? 'completed' : ''}`} onClick={() => setCurrentRudiment(r)}>
              <h3>{r.name}</h3>
              <p>{r.description}</p>
              <p>Sticking: {r.sticking}</p>
              {progress[r.name] && <span>✓ Completado</span>}
            </div>
          ))}
        </div>
        {currentRudiment && (
          <div className="practice">
            <h2>Practicando: {currentRudiment.name}</h2>
            <p>{currentRudiment.description}</p>
            <p>Sticking: {currentRudiment.sticking}</p>
            <button onClick={() => markCompleted(currentRudiment.name)}>Marcar como Completado</button>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;