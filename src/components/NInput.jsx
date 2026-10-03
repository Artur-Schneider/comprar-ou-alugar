import { useState, useEffect, useRef } from 'react';
import { C, T } from '../lib/theme';
import InfoTooltip from './InfoTooltip';

export default function NInput({ label, val, set, pre, suf, step = "0.1", min = "0", max, ro = false, isDefault = false, info, onBlurValue }) {
  const [foc, setFoc] = useState(false);
  const [raw, setRaw] = useState(String(val));
  const lastOwnValue = useRef(val);
  const showExampleMark = isDefault && !ro;

  useEffect(() => {
    if (ro) { setRaw(String(val)); return; }
    if (val !== lastOwnValue.current) {
      // Mudança vinda de fora (ex.: ajuste automático feito por outro
      // campo) — sincroniza o texto exibido para não ficar desatualizado.
      setRaw(String(val));
      lastOwnValue.current = val;
    }
  }, [val, ro]);

  const handleChange = e => {
    const next = e.target.value;
    setRaw(next);
    const parsed = parseFloat(next);
    const numeric = Number.isNaN(parsed) ? 0 : parsed;
    lastOwnValue.current = numeric;
    set(numeric);
  };

  const handleClear = () => {
    setRaw('');
    lastOwnValue.current = 0;
    set(0);
  };

  return (
    <div className="min-w-0 relative">
      <div className="flex items-center gap-1 mb-1">
        <label className="text-[10px] font-medium uppercase leading-tight" style={{ color: T.low }}>
          {label}{showExampleMark && <span className="font-bold" style={{ color: C.wood }}>*</span>}
        </label>
        {info && <InfoTooltip text={info} />}
      </div>
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
          max={max}
          readOnly={ro}
          onChange={e => !ro && handleChange(e)}
          onFocus={() => !ro && setFoc(true)}
          onBlur={() => {
            setFoc(false);
            if (!ro && onBlurValue) {
              const parsed = parseFloat(raw);
              onBlurValue(Number.isNaN(parsed) ? 0 : parsed);
            }
          }}
          className="flex-1 px-2 py-1.5 text-sm outline-none bg-transparent min-w-0 w-0"
          style={{
            color: showExampleMark ? T.hint : T.high,
            fontStyle: showExampleMark ? 'italic' : 'normal',
            fontWeight: showExampleMark ? 400 : 500,
          }}
        />
        {!ro && raw !== '' && (
          <button
            type="button" onClick={handleClear} tabIndex={-1}
            className="flex items-center justify-center px-1.5 text-xs flex-shrink-0"
            style={{ color: T.hint }} aria-label={`Limpar ${label}`}
          >
            ✕
          </button>
        )}
        {suf && (
          <span className="flex items-center px-2 text-xs select-none flex-shrink-0 whitespace-nowrap" style={{ color: T.hint, backgroundColor: C.cream, borderLeft: `1px solid ${C.border}` }}>
            {suf}
          </span>
        )}
      </div>
    </div>
  );
}