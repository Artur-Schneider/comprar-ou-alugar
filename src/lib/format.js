export const fmt = v => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v ?? 0);

export const fmtK = v => {
  const a = Math.abs(v ?? 0);
  if (a >= 1e6) return `R$ ${((v ?? 0) / 1e6).toFixed(2).replace('.', ',')} M`;
  if (a >= 1e3) return `R$ ${((v ?? 0) / 1e3).toFixed(1).replace('.', ',')} k`;
  return fmt(v);
};

export const n2 = v => +((v ?? 0).toFixed(2));
