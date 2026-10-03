import { useState, useRef, useEffect } from 'react';
import { C, T } from '../lib/theme';

// O balão usa left:0/right:0 em relação ao campo INTEIRO (o pai com
// position:relative é o wrapper do NInput/RateInput, não este ícone),
// então sua largura é sempre exatamente a largura do campo — nunca pode
// ultrapassar a tela, porque o campo em si já nunca ultrapassa.
export default function InfoTooltip({ text }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const handler = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  return (
    <span className="inline-flex flex-shrink-0" ref={ref}>
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
          className="absolute left-0 right-0 top-full mt-1.5 z-40 rounded-lg px-2.5 py-1.5 text-[10px] font-normal normal-case leading-snug"
          style={{ backgroundColor: C.blueDk, color: C.white, boxShadow: '0 4px 12px rgba(2,32,88,0.25)' }}
        >
          {text}
        </span>
      )}
    </span>
  );
}