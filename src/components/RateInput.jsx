import { useState, useEffect } from 'react';
import { C, T } from '../lib/theme';
import InfoTooltip from './InfoTooltip';

// Conversão por juros compostos — nunca multiplicação/divisão simples por
// 12, que distorceria a taxa equivalente.
const monthlyToAnnual = m => (Math.pow(1 + m / 100, 12) - 1) * 100;
const annualToMonthly = a => (Math.pow(1 + a / 100, 1 / 12) - 1) * 100;

// Campo de taxa com alternância "ao mês / ao ano". O valor é sempre
// armazenado como taxa mensal (é o que o motor de cálculo usa) — a
// exibição é convertida na hora, nos dois sentidos, sem perder precisão.
export default function RateInput({ label, valMonthly, setMonthly, isDefault = false, info }) {
  const [period, setPeriod] = useState('mes'); // 'mes' | 'ano'
  const [foc, setFoc] = useState(false);
  const showExampleMark = isDefault;

  const displayValue = period === 'mes' ? valMonthly : monthlyToAnnual(valMonthly);
  const [raw, setRaw] = useState(String(+displayValue.toFixed(2)));

  // Recalcula o texto exibido ao alternar entre mês/ano — a taxa real
  // guardada no estado não muda, só a forma como é mostrada.
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

  return (
    <div className="min-w-0">
      <div className="flex items-center justify-between gap-1.5 mb-1 flex-wrap">
        <div className="flex items-center gap-1">
          <label className="text-[10px] font-medium uppercase leading-tight" style={{ color: T.low }}>
            {label}{showExampleMark && <span className="font-bold" style={{ color: C.wood }}>*</span>}
          </label>
          {info && <InfoTooltip text={info} />}
        </div>
        <div className="flex rounded-md overflow-hidden flex-shrink-0" style={{ border: `1px solid ${C.border}` }}>
          {[['mes', 'mês'], ['ano', 'ano']].map(([key, text]) => (
            <button
              key={key}
              type="button"
              onClick={() => setPeriod(key)}
              className="px-1.5 py-0.5 text-[9px] font-semibold uppercase transition-colors"
              style={{ backgroundColor: period === key ? C.wood : 'transparent', color: period === key ? C.white : T.hint }}
            >
              {text}
            </button>
          ))}
        </div>
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
        <span className="flex items-center px-2 text-xs select-none flex-shrink-0 whitespace-nowrap" style={{ color: T.hint, backgroundColor: C.cream, borderLeft: `1px solid ${C.border}` }}>
          % a.{period === 'mes' ? 'm' : 'a'}.
        </span>
      </div>

      {period === 'ano' && (
        <p className="text-[9px] font-light mt-0.5 leading-snug" style={{ color: T.hint }}>
          💡 Convertida automaticamente para a taxa mensal equivalente nos cálculos.
        </p>
      )}
    </div>
  );
}