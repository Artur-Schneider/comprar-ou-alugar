import { useState, useRef, useEffect } from 'react';
import { C, T } from '../lib/theme';
import { EXPORT_OPTS } from '../config/constants';

export default function ExportMenu({ onExport }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const handler = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
        style={{ backgroundColor: open ? C.blue : C.blueXl, color: open ? C.white : T.high, border: `1.5px solid ${open ? C.blue : C.border}` }}
      >
        <span>⬇</span> Exportar .xlsx
      </button>
      {open && (
        <div className="absolute right-0 mt-1 rounded-xl overflow-hidden z-30" style={{ backgroundColor: C.white, boxShadow: '0 8px 24px rgba(2,32,88,0.16)', border: `1px solid ${C.border}`, minWidth: 180 }}>
          <p className="px-3 pt-2.5 pb-1.5 text-xs font-semibold uppercase tracking-widest" style={{ color: T.hint, borderBottom: `1px solid ${C.border}` }}>
            Selecionar tabela
          </p>
          {EXPORT_OPTS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => { onExport(key); setOpen(false); }}
              className="export-opt w-full text-left px-3 py-2.5 text-xs font-medium flex items-center gap-2"
              style={{ color: T.high }}
            >
              <span style={{ color: C.wood }}>↓</span> {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
