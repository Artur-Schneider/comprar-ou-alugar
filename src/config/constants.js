export const HDR = 64;

// Valores de exemplo com que a aplicação abre — calibrados com dados de
// mercado de 2026: taxa média de financiamento SBPE (Abecip/Vitale),
// valorização imobiliária (Índice FipeZAP), reajuste de aluguel (IPCA
// 12 meses) e rendimento de investimentos (Selic/CDI pós-cortes do COPOM).
export const DEFAULT_PARAMS = {
  vi: 400000, ent: 80000, tj: 0.95, pz: 360, val: 6, alg: 2000, rej: 4.5, ti: 0.9,
};

export const NAV = [
  { id: 'sec-patrimonio', icon: '🏦', label: 'Patrimônio Total' },
  { id: 'sec-grafico',    icon: '📈', label: 'Gráfico: Evolução do Patrimônio' },
  { id: 'sec-tabelas',    icon: '📋', label: 'Tabelas Comparativas' },
];

export const SECTION_IDS = NAV.map(n => n.id);

export const SECTION_THRESHOLDS = {
  'sec-grafico': HDR + 280,
  'sec-tabelas': HDR + 380,
};

export const EXPORT_OPTS = [
  { key: 'price',   label: 'Tabela PRICE' },
  { key: 'sac',     label: 'Tabela SAC' },
  { key: 'aluguel', label: 'Cenário Aluguel' },
];