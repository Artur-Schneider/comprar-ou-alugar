import { useState, useEffect } from 'react';
import { C, T } from '../lib/theme';

export default function NInput({ label, val, set, pre, suf, step = "0.1", min = "0", ro = false, isDefault = false }) {
  const [foc, setFoc] = useState(false);
  const [raw, setRaw] = useState(String(val));
  const showExampleMark = isDefault && !ro;

  // Campos somente leitura (ex.: "Valor Financiado") são recalculados por
  // fora — o texto exibido precisa acompanhar esse valor sempre.
  useEffect(() => {
    if (ro) setRaw(String(val));
  }, [val, ro]);

  const handleChange = e => {
    const next = e.target.value;
    setRaw(next); // mostra exatamente o que foi digitado, incluindo vazio
    const parsed = parseFloat(next);
    set(Number.isNaN(parsed) ? 0 : parsed); // internamente, vazio = 0
  };

  return (
    <div className="min-w-0">
      <label className="block text-[10px] font-medium uppercase mb-1 leading-tight" style={{ color: T.low }}>
        {label}{showExampleMark && <span className="font-bold" style={{ color: C.wood }}>*</span>}
      </label>
      <div
        className="flex items-stretch rounded-lg overflow-hidden"
        style={{ border: `1.5px solid ${foc ? C.wood : C.border}`, backgroundColor: ro ? C.cream : C.white, transition: 'border-color .15s' }}
      >
        {pre && (
          <span className="flex items-center px-2 text-xs select-none flex-shrink-0" style={{ color: T.hint, backgroundColor: C.cream, borderRight: `1px solid ${C.border}` }}>
            {pre}
          </span>
        )}
        <input
          type="number"
          value={ro ? val : raw}
          step={step}
          min={min}
          readOnly={ro}
          onChange={e => !ro && handleChange(e)}
          onFocus={() => !ro && setFoc(true)}
          onBlur={() => setFoc(false)}
          className="flex-1 px-2 py-1.5 text-sm outline-none bg-transparent min-w-0 w-0"
          style={{
            color: showExampleMark ? T.hint : T.high,
            fontStyle: showExampleMark ? 'italic' : 'normal',
            fontWeight: showExampleMark ? 400 : 500,
          }}
        />
        {suf && (
          <span className="flex items-center px-2 text-xs select-none flex-shrink-0 whitespace-nowrap" style={{ color: T.hint, backgroundColor: C.cream, borderLeft: `1px solid ${C.border}` }}>
            {suf}
          </span>
        )}
      </div>
    </div>
  );
}