'use client';
import { useEffect, useRef } from 'react';

const CHARS = ['♪', '♫', '✦', '★', '✧', '✶'];
const LIFETIME = 700;
const MIN_DIST = 18;

const WHITES = [
  { color: 'rgba(255,255,255,0.95)', glow: '255,255,255' },
  { color: 'rgba(220,230,255,0.90)', glow: '210,225,255' },
  { color: 'rgba(255,248,230,0.90)', glow: '255,240,200' },
];

export default function CursorTrail() {
  const last = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const dx = e.clientX - last.current.x;
      const dy = e.clientY - last.current.y;
      if (Math.sqrt(dx * dx + dy * dy) < MIN_DIST) return;
      last.current = { x: e.clientX, y: e.clientY };
      spawnParticle(e.clientX, e.clientY);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return null;
}

function spawnParticle(x: number, y: number) {
  const el = document.createElement('span');
  const w = WHITES[Math.floor(Math.random() * WHITES.length)];
  const size = 13 + Math.random() * 11;
  el.textContent = CHARS[Math.floor(Math.random() * CHARS.length)];
  el.style.cssText = `
    position: fixed;
    left: ${x}px;
    top: ${y}px;
    z-index: 999999;
    font-size: ${size}px;
    color: ${w.color};
    filter: drop-shadow(0 0 4px rgba(${w.glow}, 0.95))
            drop-shadow(0 0 10px rgba(${w.glow}, 0.65))
            drop-shadow(0 0 22px rgba(${w.glow}, 0.35));
    pointer-events: none;
    user-select: none;
    --dx: ${(Math.random() - 0.5) * 28}px;
    --dy: ${-(24 + Math.random() * 32)}px;
    --rot: ${(Math.random() - 0.5) * 55}deg;
    animation: cursorTrail ${LIFETIME}ms ease-out forwards;
  `;
  document.body.appendChild(el);
  el.addEventListener('animationend', () => el.remove(), { once: true });
}
