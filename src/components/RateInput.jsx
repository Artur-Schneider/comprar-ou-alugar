import { useState, useEffect } from 'react';
import { C, T } from '../lib/theme';
import InfoTooltip from './InfoTooltip';

const monthlyToAnnual = m => (Math.pow(1 + m / 100, 12) - 1) * 100;
const annualToMonthly = a => (Math.pow(1 + a / 100, 1 / 12) - 1) * 100;

export default function RateInput({ label, valMonthly, setMonthly, isDefault = false, info }) {
  const [period, setPeriod] = useState('mes'); // 'mes' | 'ano'
  const [foc, setFoc] = useState(false);
  const showExampleMark = isDefault;

  const displayValue = period === 'mes' ? valMonthly : monthlyToAnnual(valMonthly);
  const [raw, setRaw] = useState(String(+displayValue.toFixed(2)));

  useEffect(() => {
    const dv = period === 'mes' ? valMonthly : monthlyToAnnual(valMonthly);
    setRaw(String(+dv.toFixed(2)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [period]);

  const handleChange = e => {
    const next = e.target.value;
    setRaw(next);
    const parsed = parseFloat(next);
    const typedVal = Number.isNaN(parsed) ? 0 : parsed;
    setMonthly(period === 'mes' ? typedVal : annualToMonthly(typedVal));
  };

  const handleClear = () => {
    setRaw('');
    setMonthly(0);
  };

  const togglePeriod = () => setPeriod(prev => (prev === 'mes' ? 'ano' : 'mes'));

  return (
    <div className="min-w-0">
      <div className="flex items-center gap-1 mb-1 relative">
        <label className="text-[10px] font-medium uppercase leading-tight" style={{ color: T.low }}>
          {label}{showExampleMark && <span className="font-bold" style={{ color: C.wood }}>*</span>}
        </label>
        {info && <InfoTooltip text={info} />}
      </div>

      <div
        className="flex items-stretch rounded-lg overflow-hidden"
        style={{ border: `1.5px solid ${foc ? C.wood : C.border}`, backgroundColor: C.white, transition: 'border-color .15s' }}
      >
        <input
          type="number"
          value={raw}
          step="0.01"
          min="0"
          onChange={handleChange}
          onFocus={() => setFoc(true)}
          onBlur={() => setFoc(false)}
          className="flex-1 px-2 py-1.5 text-sm outline-none bg-transparent min-w-0 w-0"
          style={{
            color: showExampleMark ? T.hint : T.high,
            fontStyle: showExampleMark ? 'italic' : 'normal',
            fontWeight: showExampleMark ? 400 : 500,
          }}
        />
        {raw !== '' && (
          <button
            type="button" onClick={handleClear} tabIndex={-1}
            className="flex items-center justify-center px-1.5 text-xs flex-shrink-0"
            style={{ color: T.hint }} aria-label={`Limpar ${label}`}
          >
            ✕
          </button>
        )}
        <button
          type="button"
          onClick={togglePeriod}
          className="flex items-center gap-1 px-2 text-xs select-none flex-shrink-0 whitespace-nowrap font-semibold"
          style={{ color: C.wood, backgroundColor: C.woodXl, borderLeft: `1px solid ${C.woodBorder}` }}
          aria-label="Alternar entre taxa ao mês e ao ano"
          title="Clique para alternar entre ao mês e ao ano"
        >
          % a.{period === 'mes' ? 'm' : 'a'}.
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 7h11M18 7l-3-3M18 7l-3 3" />
            <path d="M17 17H6M6 17l3 3M6 17l3-3" />
          </svg>
        </button>
      </div>

      <p className="text-[9px] font-light mt-0.5 leading-snug" style={{ color: T.hint }}>
        {period === 'mes'
          ? '👆 Clique no sufixo para informar ao ano.'
          : '💡 Convertida automaticamente para a taxa mensal equivalente nos cálculos.'}
      </p>
    </div>
  );
}