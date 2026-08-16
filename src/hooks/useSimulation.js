import { useMemo } from 'react';
import { calcPRICE, calcSAC, calcBuyInv, calcRent, addInvestAno, addInvAnoRent } from '../lib/finance';

// Isola toda a orquestração da simulação financeira da camada de UI.
// Recalcula somente quando os parâmetros `p` mudam.
export function useSimulation(p) {
  return useMemo(() => {
    const { vi, ent, tj, pz, val, alg, rej, ti } = p;
    const vf = Math.max(0, vi - ent);
    const P = calcPRICE(vf, tj, pz);
    const S = calcSAC(vf, tj, pz);
    const budget = S.pmt1;
    const PI = calcBuyInv(P.rows, budget, ti);
    const SI = calcBuyInv(S.rows, budget, ti);
    const R = calcRent(ent, alg, rej, pz, ti, budget);
    const fpVal = vi * Math.pow(1 + val / 100, pz / 12);
    const propAt = m => vi * Math.pow(1 + val / 100, m / 12);
    const step = Math.max(1, Math.ceil(pz / 100));
    const chart = [];
    for (let m = 0; m <= pz; m += step) {
      const pv = propAt(m);
      chart.push({
        ano: +(m / 12).toFixed(1),
        PRICE: Math.round(pv - (m === 0 ? vf : (P.rows[m - 1]?.saldo ?? 0)) + (m === 0 ? 0 : (PI.rows[m - 1]?.invAcum ?? 0))),
        SAC: Math.round(pv - (m === 0 ? vf : (S.rows[m - 1]?.saldo ?? 0)) + (m === 0 ? 0 : (SI.rows[m - 1]?.invAcum ?? 0))),
        Aluguel: Math.round(m === 0 ? ent : (R.rows[m - 1]?.pat ?? ent)),
      });
    }
    return {
      vf, P, S, PI, SI, R, fpVal,
      finalPRICE: fpVal + PI.finalInv,
      finalSAC: fpVal + SI.finalInv,
      chart, budget,
      priceTableRows: addInvestAno(P.rows, PI.rows),
      sacTableRows: addInvestAno(S.rows, SI.rows),
      rentTableRows: addInvAnoRent(R.rows),
      totPricePago: ent + P.rows.reduce((s, r) => s + r.prest, 0),
      totSACPago: ent + S.rows.reduce((s, r) => s + r.prest, 0),
    };
  }, [p]);
}
