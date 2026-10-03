import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { C, T } from '../lib/theme';

// Ícone de ajuda — SVG em vez de caractere de texto, para garantir
// centralização perfeita independente de fonte/navegador. A posição do
// balão é calculada em JS para nunca ultrapassar a borda da tela.
export default function InfoTooltip({ text }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  const boxRef = useRef(null);
  const [boxStyle, setBoxStyle] = useState({});

  useEffect(() => {
    if (!open) return;
    const handler = e => { if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  useLayoutEffect(() => {
    if (!open || !wrapRef.current || !boxRef.current) return;
    const margin = 8;
    const iconRect = wrapRef.current.getBoundingClientRect();
    const boxWidth = boxRef.current.offsetWidth;
    const idealLeft = iconRect.left + iconRect.width / 2 - boxWidth / 2;
    const clampedLeft = Math.max(margin, Math.min(idealLeft, window.innerWidth - boxWidth - margin));
    setBoxStyle({ left: `${clampedLeft - iconRect.left}px` });
  }, [open]);

  return (
    <span className="relative inline-flex flex-shrink-0" ref={wrapRef}>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="flex items-center justify-center rounded-full flex-shrink-0"
        style={{ width: 14, height: 14, padding: 0, color: T.hint }}
        aria-label="Mais informações"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="11" />
          <circle cx="12" cy="7.5" r="0.6" fill="currentColor" stroke="none" />
        </svg>
      </button>
      {open && (
        <span
          ref={boxRef}
          className="absolute z-40 top-full mt-1.5 rounded-lg px-2.5 py-1.5 text-[10px] font-normal normal-case leading-snug"
          style={{
            ...boxStyle,
            width: 'max-content',
            maxWidth: 'min(190px, calc(100vw - 16px))',
            backgroundColor: C.blueDk, color: C.white,
            boxShadow: '0 4px 12px rgba(2,32,88,0.25)',
          }}
        >
          {text}
        </span>
      )}
    </span>
  );
}