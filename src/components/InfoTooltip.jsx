import { useState, useRef, useEffect } from 'react';
import { C, T } from '../lib/theme';

// Ícone de ajuda — funciona por clique/toque (não por hover), para se
// comportar de forma idêntica no desktop e no celular.
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
    <span className="relative inline-flex flex-shrink-0" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="flex items-center justify-center rounded-full flex-shrink-0"
        style={{ width: 13, height: 13, fontSize: 8, fontWeight: 700, color: T.hint, border: `1px solid ${T.hint}`, lineHeight: 1 }}
        aria-label="Mais informações"
      >
        i
      </button>
      {open && (
        <span
          className="absolute z-40 left-1/2 -translate-x-1/2 top-full mt-1.5 rounded-lg px-2.5 py-1.5 text-[10px] font-normal normal-case leading-snug"
          style={{ backgroundColor: C.blueDk, color: C.white, width: 168, boxShadow: '0 4px 12px rgba(2,32,88,0.25)' }}
        >
          {text}
        </span>
      )}
    </span>
  );
}