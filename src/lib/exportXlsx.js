import * as XLSX from 'xlsx';
import { n2 } from './format';

// Modelagem pura dos dados de exportação — sem efeito colateral,
// pode ser testada isoladamente sem precisar disparar um download real.
export function buildExportRows(which, c) {
  if (which === 'price' || which === 'sac') {
    const rows = which === 'price' ? c.priceTableRows : c.sacTableRows;
    const sheetName = which === 'price' ? 'Tabela PRICE' : 'Tabela SAC';
    const fileName = which === 'price' ? 'Tabela_PRICE.xlsx' : 'Tabela_SAC.xlsx';
    const data = rows.map(r => ({
      'Mês': r.mes,
      'Ano': Math.ceil(r.mes / 12),
      'Amortização (R$)': n2(r.amort),
      'Juros (R$)': n2(r.juros),
      'Prestação (R$)': n2(r.prest),
      'Saldo Devedor (R$)': n2(r.saldo),
      'Investimento no Mês (R$)': n2(r.investMes),
      'Investimento Acumulado (R$)': n2(r.invAcum),
    }));
    return { data, sheetName, fileName };
  }
  const data = c.rentTableRows.map(r => ({
    'Mês': r.mes,
    'Ano': Math.ceil(r.mes / 12),
    'Aluguel (R$)': n2(r.aluguel),
    'Investimento / Retirada no Mês (R$)': n2(r.inv),
    'Investimentos Acumulados (R$)': n2(r.pat),
  }));
  return { data, sheetName: 'Cenário Aluguel', fileName: 'Cenario_Aluguel.xlsx' };
}

// Efeito colateral isolado: escreve o arquivo no disco do usuário.
export function downloadXLSX({ data, sheetName, fileName }) {
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, sheetName);
  XLSX.writeFile(wb, fileName);
}
