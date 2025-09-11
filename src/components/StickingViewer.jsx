import React from 'react';

function Token({ t }) {
  const c = t.trim();
  const isAccent = c === c.toUpperCase() && /[RL]/i.test(c);
  const isGrace = c === c.toLowerCase() && /[rl]/i.test(c);
  if (!c) return null;
  const cls = ['stick'];
  if (c.toUpperCase() === 'R') cls.push('right');
  if (c.toUpperCase() === 'L') cls.push('left');
  if (isAccent) cls.push('accent');
  if (isGrace) cls.push('grace');
  return <span className={cls.join(' ')}>{c.toUpperCase()}</span>;
}

export default function StickingViewer({ sticking }) {
  const tokens = sticking.split(/[\s]+/);
  return (
    <div className="sticking-viewer">
      {tokens.map((t, i) => (
        <Token key={i} t={t} />
      ))}
    </div>
  );
}