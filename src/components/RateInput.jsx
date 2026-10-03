import { useState, useEffect } from 'react';
import { C, T } from '../lib/theme';
import InfoTooltip from './InfoTooltip';

// Conversão por juros compostos — nunca multiplicação/divisão simples por
// 12, que distorceria a taxa equivalente.
const monthlyToAnnual = m => (Math.pow(1 + m / 100, 12) - 1) * 100;
const annualToMonthly = a => (Math.pow(1 + a / 100, 1 / 12) - 1) * 100;

// Campo de taxa com alternância "ao mês / ao ano". O próprio sufixo da
// unidade ("% a.m.") é o botão que alterna — assim a estrutura do campo
// fica idêntica à de um NInput comum, sem nenhuma linha extra que
// desalinhe a altura com os campos vizinhos no mesmo grid.
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
      <div className="flex items-center gap-1 mb-1">
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
          className="flex items-center gap-0.5 px-2 text-xs select-none flex-shrink-0 whitespace-nowrap"
          style={{ color: T.hint, backgroundColor: C.cream, borderLeft: `1px solid ${C.border}` }}
          aria-label="Alternar entre taxa ao mês e ao ano"
          title="Clique para alternar entre ao mês e ao ano"
        >
          % a.{period === 'mes' ? 'm' : 'a'}.
          <span style={{ fontSize: 8 }}>⇄</span>
        </button>
      </div>

      {period === 'ano' && (
        <p className="text-[9px] font-light mt-0.5 leading-snug" style={{ color: T.hint }}>
          💡 Convertida automaticamente para a taxa mensal equivalente nos cálculos.
        </p>
      )}
    </div>
  );
}