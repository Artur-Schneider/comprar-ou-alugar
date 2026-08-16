export const HDR = 64;

// Valores de exemplo com que a aplicação abre — próximos da realidade de
// mercado (taxa de juros, valorização do imóvel, rendimento de investimentos).
export const DEFAULT_PARAMS = {
  vi: 400000, ent: 80000, tj: 0.87, pz: 360, val: 4, alg: 2000, rej: 6, ti: 0.9,
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