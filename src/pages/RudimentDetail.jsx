import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getRudimentBySlug } from '../data/rudiments';
import StickingViewer from '../components/StickingViewer';

function useLocalProgress() {
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
  const mark = (slug) => setProgress((p) => ({ ...p, [slug]: true }));
  return { progress, mark };
}

function useMetronome() {
  const [bpm, setBpm] = useState(70);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef(null);
  const nextTickRef = useRef(0);
  const schedulerRef = useRef(null);
  const lookahead = 25; // ms
  const scheduleAheadTime = 0.1; // s
  const [accentEvery, setAccentEvery] = useState(4);
  const [tickCount, setTickCount] = useState(0);
  const timeoutsRef = useRef([]);
  const tapsRef = useRef([]);
  const [subdiv, setSubdiv] = useState(1); // 1,2,3,4,6
  const [countIn, setCountIn] = useState(0); // beats
  const [autoRamp, setAutoRamp] = useState({ enabled: false, step: 5, everyBars: 4, target: 120 });
  const beatCounterRef = useRef(0);
  const barCounterRef = useRef(0);

  useEffect(() => {
    audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    return () => {
      if (schedulerRef.current) clearInterval(schedulerRef.current);
      audioCtxRef.current?.close();
    };
  }, []);

  const scheduleTick = (time, accent = false) => {
    const ctx = audioCtxRef.current;
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = accent ? 1400 : 1000;
    gain.gain.setValueAtTime(accent ? 0.2 : 0.12, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.1);
    osc.start(time);
    osc.stop(time + 0.1);

    const delay = Math.max(0, (time - ctx.currentTime) * 1000);
    const to = setTimeout(() => setTickCount((c) => c + 1), delay);
    timeoutsRef.current.push(to);
  };

  const start = () => {
    if (isPlaying) return;
    setIsPlaying(true);
    const ctx = audioCtxRef.current;
    const secondsPerBeat = 60.0 / bpm / subdiv;
    let beatCount = 0;
    let countInLeft = countIn * subdiv;
    beatCounterRef.current = 0;
    barCounterRef.current = 0;
    nextTickRef.current = ctx.currentTime + 0.05;
    schedulerRef.current = setInterval(() => {
      while (nextTickRef.current < ctx.currentTime + scheduleAheadTime) {
        const isAccent = accentEvery > 0 && (beatCount % (accentEvery * subdiv) === 0);
        if (countInLeft > 0) {
          scheduleTick(nextTickRef.current, isAccent);
          countInLeft -= 1;
        } else {
          scheduleTick(nextTickRef.current, isAccent);
          beatCounterRef.current += 1;
          const beatsPerBar = accentEvery || 4;
          if (beatCounterRef.current % (beatsPerBar * subdiv) === 0) {
            barCounterRef.current += 1;
            if (autoRamp.enabled && barCounterRef.current % autoRamp.everyBars === 0) {
              setBpm((prev) => Math.min(prev + autoRamp.step, autoRamp.target));
            }
          }
        }
        nextTickRef.current += secondsPerBeat;
        beatCount += 1;
      }
    }, lookahead);
  };

  const stop = () => {
    setIsPlaying(false);
    if (schedulerRef.current) clearInterval(schedulerRef.current);
    schedulerRef.current = null;
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  };

  useEffect(() => {
    if (!isPlaying) return;
    stop();
    start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bpm, accentEvery, subdiv]);

  const tap = () => {
    const now = Date.now();
    const arr = tapsRef.current.filter((t) => now - t < 4000);
    arr.push(now);
    tapsRef.current = arr;
    if (arr.length >= 2) {
      const intervals = arr.slice(1).map((t, i) => t - arr[i]);
      const avg = intervals.reduce((a, b) => a + b, 0) / intervals.length;
      const newBpm = Math.max(40, Math.min(240, Math.round(60000 / avg)));
      setBpm(newBpm);
    }
  };

  return { bpm, setBpm, isPlaying, start, stop, accentEvery, setAccentEvery, tickCount, tap, subdiv, setSubdiv, countIn, setCountIn, autoRamp, setAutoRamp };
}

export default function RudimentDetail() {
  const { slug } = useParams();
  const rudiment = useMemo(() => getRudimentBySlug(slug), [slug]);
  const { progress, mark } = useLocalProgress();
  const { bpm, setBpm, isPlaying, start, stop, accentEvery, setAccentEvery, tickCount, tap, subdiv, setSubdiv, countIn, setCountIn, autoRamp, setAutoRamp } = useMetronome();

  if (!rudiment) {
    return (
      <div>
        <p>Rudimento no encontrado.</p>
        <Link to="/">Volver a explorar</Link>
      </div>
    );
  }

  const completed = !!progress[rudiment.slug];

  return (
    <div className="detail">
      <Link to="/" className="back">← Volver</Link>
      <h1 className="title">{rudiment.name}</h1>
      <div className="tag">Nivel: {rudiment.level}</div>
      <p className="desc">{rudiment.description}</p>

      <div className="sticking">
        <div className="sticking-title">Sticking</div>
        <div className="sticking-body"><StickingViewer sticking={rudiment.sticking} /></div>
      </div>

      <div className="panel">
        <div className="panel-title">Metrónomo</div>
        <div className="panel-body metronome">
          <div className={`beat ${accentEvery && (tickCount % ((accentEvery || 1) * subdiv) === 0) ? 'accent' : ''}`}></div>
          <label>
            BPM
            <input
              type="range"
              min="40"
              max="220"
              value={bpm}
              onChange={(e) => setBpm(Number(e.target.value))}
            />
            <span className="bpm">{bpm}</span>
          </label>
          <label>
            Acentuar cada
            <select value={accentEvery} onChange={(e) => setAccentEvery(Number(e.target.value))}>
              {[0, 2, 3, 4, 6].map((n) => (
                <option key={n} value={n}>{n === 0 ? 'Ninguno' : n}</option>
              ))}
            </select>
          </label>
          <label>
            Subdivisión
            <select value={subdiv} onChange={(e) => setSubdiv(Number(e.target.value))}>
              {[1,2,3,4,6].map((n) => (
                <option key={n} value={n}>{n === 1 ? 'Negra' : n === 2 ? 'Corcheas' : n === 3 ? 'Tresillos' : n === 4 ? 'Semicorcheas' : 'Sextillos'}</option>
              ))}
            </select>
          </label>
          <label>
            Count-in
            <select value={countIn} onChange={(e) => setCountIn(Number(e.target.value))}>
              {[0,1,2,4].map((n) => (<option key={n} value={n}>{n}</option>))}
            </select>
          </label>
          <button className="btn" onClick={tap}>Tap Tempo</button>
          <button className="btn" onClick={isPlaying ? stop : start}>
            {isPlaying ? 'Detener' : 'Iniciar'}
          </button>
        </div>
      </div>

      <div className="panel">
        <div className="panel-title">Auto-Ramp</div>
        <div className="panel-body">
          <label>
            Activar
            <input type="checkbox" checked={autoRamp.enabled} onChange={(e) => setAutoRamp({ ...autoRamp, enabled: e.target.checked })} />
          </label>
          <label>
            Paso (BPM)
            <input type="number" min={1} max={20} value={autoRamp.step} onChange={(e) => setAutoRamp({ ...autoRamp, step: Number(e.target.value) })} />
          </label>
          <label>
            Cada (compases)
            <input type="number" min={1} max={16} value={autoRamp.everyBars} onChange={(e) => setAutoRamp({ ...autoRamp, everyBars: Number(e.target.value) })} />
          </label>
          <label>
            Objetivo
            <input type="number" min={40} max={220} value={autoRamp.target} onChange={(e) => setAutoRamp({ ...autoRamp, target: Number(e.target.value) })} />
          </label>
        </div>
      </div>

      <div className="actions">
        <button className={`btn ${completed ? 'btn-disabled' : ''}`} disabled={completed} onClick={() => mark(rudiment.slug)}>
          {completed ? 'Completado ✓' : 'Marcar como completado'}
        </button>
      </div>
    </div>
  );
}