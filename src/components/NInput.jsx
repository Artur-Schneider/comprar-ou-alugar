import { useState, useEffect } from 'react';
import { C, T } from '../lib/theme';
import InfoTooltip from './InfoTooltip';

export default function NInput({ label, val, set, pre, suf, step = "0.1", min = "0", max, ro = false, isDefault = false, info }) {
  const [foc, setFoc] = useState(false);
  const [raw, setRaw] = useState(String(val));
  const showExampleMark = isDefault && !ro;

  useEffect(() => {
    if (ro) setRaw(String(val));
  }, [val, ro]);

  const handleChange = e => {
    const next = e.target.value;
    setRaw(next);
    const parsed = parseFloat(next);
    set(Number.isNaN(parsed) ? 0 : parsed);
  };

  const handleClear = () => {
    setRaw('');
    set(0);
  };

  return (
    <div className="min-w-0">
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
          onBlur={() => setFoc(false)}
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