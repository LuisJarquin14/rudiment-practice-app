import React from 'react';

function normalizeTokens(sticking) {
  if (!sticking || typeof sticking !== 'string') return [];
  // Remove common separators we don't want to render
  const cleaned = String(sticking)
    .replace(/\//g, ' ')
    .replace(/\[/g, ' ')
    .replace(/\]/g, ' ')
    .replace(/\|/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  const parts = cleaned.split(/\s+/).filter(Boolean);

  const expanded = [];
  parts.forEach((p) => {
    // If token is like 'RRR' or 'rr', expand to single-letter tokens
    if (/^[RLrl]{2,}$/.test(p)) {
      p.split('').forEach((ch) => expanded.push(ch));
      return;
    }
    // If token contains mixed letters (e.g., 'R,', 'rL'), split into letters
    if (/^[^A-Za-z]*[A-Za-z]+[^A-Za-z]*$/.test(p) && /[RLrl]/.test(p)) {
      const letters = p.replace(/[^RLrl]/g, '').split('');
      letters.forEach((ch) => expanded.push(ch));
      return;
    }
    // Otherwise push raw token (it might be a symbol we want to ignore)
    if (/[RLrl]/.test(p)) expanded.push(p);
  });

  return expanded;
}

function Token({ t }) {
  const c = String(t).trim();
  if (!c) return null;
  const letter = c[0];
  const isAccent = letter === letter.toUpperCase() && /[RL]/i.test(letter);
  const isGrace = letter === letter.toLowerCase() && /[rl]/i.test(letter);
  const cls = ['stick'];
  if (letter.toUpperCase() === 'R') cls.push('right');
  if (letter.toUpperCase() === 'L') cls.push('left');
  if (isAccent) cls.push('accent');
  if (isGrace) cls.push('grace');
  return <span className={cls.join(' ')}>{letter.toUpperCase()}</span>;
}

export default function StickingViewer({ sticking }) {
  const tokens = normalizeTokens(sticking);
  return (
    <div className="sticking-viewer">
      {tokens.map((t, i) => (
        <Token key={i} t={t} />
      ))}
    </div>
  );
}