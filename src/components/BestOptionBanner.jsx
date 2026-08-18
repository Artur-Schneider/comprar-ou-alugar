import { C } from '../lib/theme';
import { fmt } from '../lib/format';

export default function BestOptionBanner({ priceWins, sacWins, bestLabel, bestVal, anos, budget, priceInv, rentBudgetStart }) {
  return (
    <div className="rounded-xl p-4 flex items-start gap-3" style={{ backgroundColor: C.blue }}>
      <span className="text-xl mt-0.5 flex-shrink-0" style={{ color: C.woodOnDark }}>
        {priceWins || sacWins ? '🏠' : '📈'}
      </span>
      <div>
        <p className="font-semibold text-sm" style={{ color: C.white }}>
          Melhor opção: <span className="underline decoration-dotted" style={{ color: C.woodOnDark }}>{bestLabel}</span> — {fmt(bestVal)} ao final de {anos} anos.
        </p>
        <p className="text-xs font-light mt-1" style={{ color: C.white }}>
          Orçamento mensal: <strong style={{ color: C.woodOnDark }}>{fmt(budget)}</strong> (1ª prestação SAC) ·
          PRICE investe <strong style={{ color: C.white }}>{fmt(priceInv)}</strong>/mês fixo ·
          SAC começa em R$&nbsp;0 e aumenta gradualmente ·
          Aluguel começa em <strong style={{ color: C.white }}>{fmt(rentBudgetStart)}</strong>/mês, decrescente com reajustes.
        </p>
      </div>
    </div>
  );
}