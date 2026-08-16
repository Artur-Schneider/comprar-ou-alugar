export const HDR = 64;

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
