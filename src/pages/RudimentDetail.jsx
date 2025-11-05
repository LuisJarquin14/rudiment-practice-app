import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getRudimentBySlug } from '../data/rudiments';
import { PlayIcon, PauseIcon } from '@heroicons/react/24/outline';

function useMetronome() {
  const [bpm, setBpm] = useState(70);
  const [lastAccent, setLastAccent] = useState(false);
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
    const to = setTimeout(() => {
      setTickCount((c) => c + 1);
      setLastAccent(accent);
    }, delay);
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
    // reset counters so UI goes back to the first beat when stopped
    beatCounterRef.current = 0;
    barCounterRef.current = 0;
    setTickCount(0);
    setLastAccent(false);
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
  const [loading, setLoading] = useState(() => !!(rudiment && rudiment.image));
  const { bpm, setBpm, isPlaying, start, stop, accentEvery, setAccentEvery, tap, subdiv, setSubdiv, countIn, setCountIn, autoRamp, setAutoRamp, tickCount } = useMetronome();

  const beatsPerBar = accentEvery && accentEvery > 0 ? accentEvery : 4;
  // Map tickCount to beat index so that the first emitted tick (tickCount === 1)
  // corresponds to the first beat (index 0). We subtract 1 before dividing.
  const mainBeatIndex = tickCount > 0 ? Math.floor((tickCount - 1) / (subdiv || 1)) % beatsPerBar : 0;

  function NoteIcon({ type = 1 }) {
    // More realistic music note icons drawn as inline SVGs.
    // type: 1=quarter (negra), 2=eighth (corchea), 3=triplet (tresillo - beamed), 4=sixteenth (semi), 6=sextillo (6th)
    if (type === 1) {
      // Quarter note
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <g fill="currentColor">
            <ellipse cx="7" cy="16" rx="3.2" ry="2.2" />
            <rect x="9.2" y="3" width="1.8" height="11.5" rx="0.6" />
          </g>
        </svg>
      );
    }
    if (type === 2) {
      // Eighth note (flag)
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <g fill="currentColor">
            <ellipse cx="7" cy="16" rx="3.2" ry="2.2" />
            <rect x="9.2" y="3" width="1.6" height="11.5" rx="0.5" />
            <path d="M10.8 4.6c1.2 0.3 3 0.6 3 1.6 0 1.4-2 1.7-3 2" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
          </g>
        </svg>
      );
    }
    if (type === 3) {
      // Triplet: three beamed eighth notes (visual only)
      return (
        <svg width="36" height="28" viewBox="0 0 36 24" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <g fill="currentColor">
            <ellipse cx="6" cy="16" rx="2.6" ry="1.9" />
            <ellipse cx="14" cy="16" rx="2.6" ry="1.9" />
            <ellipse cx="22" cy="16" rx="2.6" ry="1.9" />
            <rect x="8" y="3" width="1.6" height="11.5" rx="0.4" />
            <rect x="16" y="3" width="1.6" height="11.5" rx="0.4" />
            <rect x="24" y="3" width="1.6" height="11.5" rx="0.4" />
            <path d="M9 6.5h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </g>
        </svg>
      );
    }
    if (type === 4) {
      // Sixteenth: double-flag (represented as two short beams)
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <g fill="currentColor">
            <ellipse cx="7" cy="16" rx="3.2" ry="2.2" />
            <rect x="9.2" y="3" width="1.6" height="11.5" rx="0.5" />
            <path d="M10.8 5.2c1.2 0.3 3 0.6 3 1.6" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
            <path d="M10.8 7.2c1.2 0.3 3 0.6 3 1.6" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
          </g>
        </svg>
      );
    }
    // type 6 or fallback: show a compact beamed group for sextillo
    return (
      <svg width="36" height="28" viewBox="0 0 36 24" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <g fill="currentColor">
          <ellipse cx="5" cy="16" rx="2" ry="1.6" />
          <ellipse cx="11" cy="16" rx="2" ry="1.6" />
          <ellipse cx="17" cy="16" rx="2" ry="1.6" />
          <ellipse cx="23" cy="16" rx="2" ry="1.6" />
          <ellipse cx="29" cy="16" rx="2" ry="1.6" />
          <ellipse cx="35" cy="16" rx="2" ry="1.6" />
          <path d="M6 6h24" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </g>
      </svg>
    );
  }

  const tempoDescriptor = (bpm) => {
    if (bpm < 40) return 'LENTÍSIMO';
    if (bpm < 60) return 'LARGO - LENTO - ADAGIO';
    if (bpm < 76) return 'ADAGIO - LENTO';
    if (bpm < 108) return 'MODERATO - ANDANTE';
    if (bpm < 140) return 'ALLEGRO';
    return 'PRESTO - RAPIDÍSIMO';
  };

  if (!rudiment) {
    return (
      <div>
        <p>Rudimento no encontrado.</p>
        <Link to="/">Volver a explorar</Link>
      </div>
    );
  }



  return (
    <div className="detail">
      <Link to="/" className="back">← Volver</Link>
      <h1 className="title">{rudiment.name}</h1>
      <div className="tag">Nivel: {rudiment.level}</div>
      <p className="desc">{rudiment.description}</p>

      <div className="rudiment-img-detail-wrap" style={{position:'relative'}}>
        {loading && <div className="skeleton-img" style={{maxWidth:420, height:260}}></div>}
        <img
          src={rudiment.image ? `/40-rudiments/${rudiment.image}` : ''}
          alt={rudiment.name}
          className="rudiment-img-detail"
          loading="lazy"
          onLoad={() => setLoading(false)}
          onError={() => setLoading(false)}
          style={{display: loading ? 'none' : 'block'}}
        />
      </div>

      <div className="panel">
        <div className="panel-title">Metrónomo</div>
        <div className="panel-body metronome">
            <div className="metronome-left">
              {/* primary beat indicator now rendered as accent-dots below */}
              <div className="bpm-large">
                <div className="bpm-display" aria-hidden="true">{bpm}</div>
                <div className="bpm-unit">BPM</div>
              </div>
              <div className="tempo-desc">{tempoDescriptor(bpm)}</div>

              <div className="slider-row">
                <button className="round-btn" onClick={() => setBpm(Math.max(20, bpm - 1))} aria-label="Bajar BPM">-</button>
                <input className="bpm-slider" type="range" min="20" max="500" value={bpm} onChange={(e) => setBpm(Number(e.target.value))} />
                <button className="round-btn" onClick={() => setBpm(Math.min(500, bpm + 1))} aria-label="Subir BPM">+</button>
              </div>

              <div className="accent-dots" aria-hidden="true">
                {Array.from({ length: beatsPerBar }).map((_, i) => (
                  <span key={i} className={`accent-dot ${i === mainBeatIndex ? 'active' : ''}`}></span>
                ))}
              </div>

              <div className="controls-big">
                <button className="tap-btn" onClick={tap} aria-label="Tap Tempo">TAP</button>
                <button className="play-circle" onClick={isPlaying ? stop : start} aria-pressed={isPlaying} aria-label={isPlaying ? 'Detener' : 'Iniciar'}>
                  {isPlaying ? <PauseIcon className="play-icon" /> : <PlayIcon className="play-icon" />}
                </button>
              </div>
            </div>

            <div className="metronome-right">
              <div className="controls-row subdiv-row">
                <div className="subdiv-tiles">
                  {[1,2,3,4,6].map((n) => (
                    <button key={n} className={`tile ${subdiv===n? 'selected':''}`} onClick={() => setSubdiv(n)} aria-pressed={subdiv===n} title={`Subdivisión ${n}`}>
                      <div className="tile-icon"><NoteIcon type={n===1?1:n===2?2:n===3?3:4} /></div>
                      <div className="tile-label">{n === 1 ? '1' : n}</div>
                    </button>
                  ))}
                </div>
                <div className="bars-controls">
                  <button className="round-btn" onClick={() => setAccentEvery(Math.max(0, accentEvery - 1))}>-</button>
                  <div className="accent-count">{accentEvery || '—'}</div>
                  <button className="round-btn" onClick={() => setAccentEvery(Math.min(12, accentEvery + 1))}>+</button>
                </div>
              </div>

              <div className="controls-row">
                <label className="control-label">Count-in</label>
                <select value={countIn} onChange={(e) => setCountIn(Number(e.target.value))}>
                  {[0,1,2,4].map((n) => (<option key={n} value={n}>{n}</option>))}
                </select>
              </div>

              <div className="controls-row">
                <div style={{display:'flex',flexDirection:'column',gap:8}}>
                  <label style={{display:'flex',alignItems:'center',gap:8}}>
                    <input type="checkbox" checked={autoRamp.enabled} onChange={(e) => setAutoRamp({ ...autoRamp, enabled: e.target.checked })} /> <strong style={{marginLeft:6}}>Auto-Ramp</strong>
                  </label>
                  <div style={{display:'flex',gap:8,alignItems:'center',flexWrap:'wrap'}}>
                    <label style={{display:'flex',flexDirection:'column',fontSize:12}}>
                      Paso (BPM)
                      <input type="number" min={1} max={100} value={autoRamp.step} onChange={(e) => setAutoRamp({ ...autoRamp, step: Number(e.target.value) })} />
                    </label>
                    <label style={{display:'flex',flexDirection:'column',fontSize:12}}>
                      Cada (compases)
                      <input type="number" min={1} max={16} value={autoRamp.everyBars} onChange={(e) => setAutoRamp({ ...autoRamp, everyBars: Number(e.target.value) })} />
                    </label>
                    <label style={{display:'flex',flexDirection:'column',fontSize:12}}>
                      Objetivo (BPM)
                      <input type="number" min={20} max={500} value={autoRamp.target} onChange={(e) => setAutoRamp({ ...autoRamp, target: Number(e.target.value) })} />
                    </label>
                  </div>
                </div>
              </div>

            </div>
        </div>
      </div>

      {/* Auto-Ramp now integrated into the metronome panel above */}

      {/* Completion marking removed — study mode only */}
    </div>
  );
}