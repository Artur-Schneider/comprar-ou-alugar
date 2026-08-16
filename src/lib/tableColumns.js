import { C, T } from './theme';

export function getFinColumns(showAll) {
  return [
    { label: 'Amortização', get: r => r.amort, color: T.high },
    { label: 'Juros', get: r => r.juros, color: T.med },
    { label: 'Prestação', get: r => r.prest, color: T.high, bold: true },
    { label: 'Saldo Dev.', get: r => r.saldo, color: T.low },
    {
      label: showAll ? 'Invest. Mês' : 'Invest. Anual',
      get: r => (showAll ? r.investMes : r.investAno),
      color: T.high,
      bold: true,
    },
    { label: 'Invest. Acum.', get: r => r.invAcum, color: C.wood, bold: true, headerAccent: true },
  ];
}

export function getRentColumns(showAll) {
  return [
    { label: 'Aluguel', get: r => r.aluguel, color: T.low },
    {
      label: showAll ? 'Invest./Retirada' : 'Invest. Anual',
      get: r => (showAll ? r.inv : r.invAno),
      color: r => ((showAll ? r.inv : r.invAno) >= 0 ? C.wood : T.hint),
      bold: true,
      headerAccent: true,
    },
    { label: 'Investimentos Acum.', get: r => r.pat, color: T.high, bold: true },
  ];
}
