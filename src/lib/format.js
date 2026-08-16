export const fmt = v => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v ?? 0);

export const fmtK = v => {
  const a = Math.abs(v ?? 0);
  if (a >= 1e6) return `R$ ${((v ?? 0) / 1e6).toFixed(2).replace('.', ',')} M`;
  if (a >= 1e3) return `R$ ${((v ?? 0) / 1e3).toFixed(1).replace('.', ',')} k`;
  return fmt(v);
};

// Versão compacta (sem "R$") para o eixo do gráfico em telas pequenas.
export const fmtKCompact = v => {
  const a = Math.abs(v ?? 0);
  if (a >= 1e6) return `${((v ?? 0) / 1e6).toFixed(1).replace('.', ',')}M`;
  if (a >= 1e3) return `${Math.round((v ?? 0) / 1e3)}k`;
  return `${Math.round(v ?? 0)}`;
};

export const n2 = v => +((v ?? 0).toFixed(2));