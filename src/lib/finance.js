// Motor de cálculo financeiro — funções puras, sem dependência de estado
// ou JSX. Cada função resolve exatamente um problema e pode ser testada
// isoladamente (ex.: com Vitest), sem precisar renderizar nenhum componente.

export function calcPRICE(pv, rPct, n) {
  const r = rPct / 100;
  const pmt = pv * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
  let bal = pv, totalJ = 0;
  const rows = [];
  for (let m = 1; m <= n; m++) {
    const j = bal * r, a = pmt - j;
    bal = Math.max(0, bal - a);
    totalJ += j;
    rows.push({ mes: m, amort: a, juros: j, prest: pmt, saldo: bal });
  }
  return { pmt, rows, totalJ };
}

export function calcSAC(pv, rPct, n) {
  const r = rPct / 100, a = pv / n;
  let bal = pv, totalJ = 0;
  const rows = [];
  for (let m = 1; m <= n; m++) {
    const j = bal * r, prest = a + j;
    bal = Math.max(0, bal - a);
    totalJ += j;
    rows.push({ mes: m, amort: a, juros: j, prest, saldo: bal });
  }
  return { rows, totalJ, pmt1: rows[0]?.prest ?? 0 };
}

export function calcBuyInv(financingRows, budget, txPct) {
  const r = txPct / 100;
  let inv = 0;
  const rows = [];
  for (let m = 1; m <= financingRows.length; m++) {
    const investMes = budget - financingRows[m - 1].prest;
    inv = inv * (1 + r) + investMes;
    rows.push({ mes: m, investMes, invAcum: inv });
  }
  return { rows, finalInv: rows[rows.length - 1]?.invAcum ?? 0 };
}

// pureGrowth: quando o orçamento (antes do piso) ficaria menor que o
// aluguel — seja porque a compra é 100% à vista, seja porque a entrada é
// alta demais — a pessoa paga o aluguel com dinheiro de fora. Não aporta
// nem retira dos investimentos por causa dele: só o valor investido
// inicialmente rende sozinho, servindo de comparação pura de rentabilidade.
export function calcRent(entrada, alg0, reajusteAnual, n, txPct, budget, pureGrowth = false) {
  const r = txPct / 100;
  let pat = entrada, alg = alg0, totalAlg = 0;
  const rows = [];
  for (let m = 1; m <= n; m++) {
    if (m > 1 && (m - 1) % 12 === 0) alg *= (1 + reajusteAnual / 100);
    const inv = pureGrowth ? 0 : (budget - alg);
    pat = pat * (1 + r) + inv;
    totalAlg += alg;
    rows.push({ mes: m, aluguel: alg, inv, pat });
  }
  return { rows, totalAlg, finalPat: rows[n - 1]?.pat ?? 0 };
}

export function addInvestAno(tableRows, invRows) {
  return tableRows.map((r, i) => {
    const investMes = invRows[i].investMes;
    const invAcum = invRows[i].invAcum;
    const investAno = r.mes % 12 === 0
      ? invRows.slice(i - 11, i + 1).reduce((s, x) => s + x.investMes, 0)
      : investMes;
    return { ...r, investMes, invAcum, investAno };
  });
}

export function addInvAnoRent(rows) {
  return rows.map((r, i) => ({
    ...r,
    invAno: r.mes % 12 === 0
      ? rows.slice(i - 11, i + 1).reduce((s, x) => s + x.inv, 0)
      : r.inv,
  }));
}