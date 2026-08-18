import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { C, T } from '../lib/theme';
import { fmt, fmtK, fmtKCompact } from '../lib/format';
import { HDR } from '../config/constants';
import { getFinColumns, getRentColumns } from '../lib/tableColumns';
import { useIsMobile } from '../hooks/useIsMobile';
import NavSidebar from '../components/NavSidebar';
import ScenarioCard from '../components/ScenarioCard';
import RentCard from '../components/RentCard';
import BestOptionBanner from '../components/BestOptionBanner';
import ChartTooltip from '../components/ChartTooltip';
import ComparativeTable from '../components/ComparativeTable';
import ExportMenu from '../components/ExportMenu';
import Footer from '../components/Footer';

export default function ResultsPage({
  p, c, tab, setTab, showAll, setShowAll, activeNav, scrollTo, onExport,
  anos, priceWins, sacWins, rentWins, bestLabel, bestVal,
}) {
  const isMobile = useIsMobile();
  const tRows = tab === 'price' ? c.priceTableRows : tab === 'sac' ? c.sacTableRows : c.rentTableRows;
  const displayRows = showAll ? tRows : tRows.filter(r => r.mes % 12 === 0);
  const columns = tab === 'aluguel' ? getRentColumns(showAll) : getFinColumns(showAll);

  return (
    <div className="flex gap-5">
      <NavSidebar activeNav={activeNav} onNavigate={scrollTo} />

      <div className="flex-1 min-w-0 space-y-5">

        <div id="sec-patrimonio" style={{ scrollMarginTop: `${HDR + 12}px` }}>
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: T.low }}>
            Patrimônio Total ao Final de {anos} {anos === 1 ? 'Ano' : 'Anos'}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <ScenarioCard
              label="Financiamento PRICE" accent={C.blue} val={c.finalPRICE} wins={priceWins}
              subtitle="Imóvel valorizado + investimentos"
              rows={[
                { l: 'Imóvel', v: fmt(c.fpVal) },
                { l: 'Investimentos', v: fmt(c.PI.finalInv), vc: C.wood },
                { l: 'Invest. mensal fixo', v: fmt(c.budget - c.P.pmt) },
                { l: 'Total financiamento', v: fmt(c.totPricePago) },
                { l: 'Total juros', v: fmt(c.P.totalJ), vc: T.low },
              ]}
            />
            <ScenarioCard
              label="Financiamento SAC" accent={C.blueLight} val={c.finalSAC} wins={sacWins}
              subtitle="Imóvel valorizado + investimentos"
              rows={[
                { l: 'Imóvel', v: fmt(c.fpVal) },
                { l: 'Investimentos', v: fmt(c.SI.finalInv), vc: C.wood },
                { l: 'Econ. juros vs PRICE', v: fmt(c.P.totalJ - c.S.totalJ), vc: C.wood },
                { l: 'Total financiamento', v: fmt(c.totSACPago) },
                { l: 'Total juros', v: fmt(c.S.totalJ), vc: T.low },
              ]}
            />
          </div>

          <RentCard
            wins={rentWins} val={c.R.finalPat}
            subRows={[
              { l: 'Entrada (mês 0)', v: fmt(p.ent) },
              { l: 'Invest. inicial (mês 1)', v: fmt(c.budget - p.alg) },
              { l: 'Total pago em aluguel', v: fmt(c.R.totalAlg) },
            ]}
          />

          <BestOptionBanner
            priceWins={priceWins} sacWins={sacWins} bestLabel={bestLabel} bestVal={bestVal}
            anos={anos} budget={c.budget} priceInv={c.budget - c.P.pmt} rentBudgetStart={c.budget - p.alg}
          />
        </div>

        <div id="sec-grafico" style={{ scrollMarginTop: `${HDR + 12}px`, backgroundColor: C.white, borderRadius: 16, padding: 20, boxShadow: '0 1px 4px rgba(2,32,88,0.08)' }}>
          <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: T.low }}>
            Gráfico: Evolução do Patrimônio Total
          </p>
          <p className="text-xs font-light mb-4" style={{ color: T.low }}>
            Compra: imóvel valorizado + investimentos &nbsp;|&nbsp; Aluguel: investimentos (entrada aplicada desde o mês 0)
          </p>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={c.chart} margin={{ top: 5, right: isMobile ? 5 : 10, bottom: 22, left: isMobile ? -20 : 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(2,32,88,0.07)" />
              <XAxis dataKey="ano" label={{ value: 'Anos', position: 'insideBottom', offset: -12, fontSize: 11, fill: T.low }} tick={{ fontSize: isMobile ? 9 : 11, fill: T.low }} />
              <YAxis tickFormatter={isMobile ? fmtKCompact : fmtK} width={isMobile ? 40 : 88} tick={{ fontSize: isMobile ? 9 : 10, fill: T.low }} />
              <Tooltip content={<ChartTooltip />} />
              <Legend
                wrapperStyle={{
                  fontSize: 11, paddingTop: 14, width: '100%',
                  display: 'flex', justifyContent: 'center', flexWrap: 'wrap',
                  rowGap: 4, columnGap: 12,
                }}
              />
              <Line type="monotone" dataKey="PRICE" stroke={C.blue} strokeWidth={2.5} dot={false} name="Financiamento PRICE" />
              <Line type="monotone" dataKey="SAC" stroke={C.blueLight} strokeWidth={2.5} dot={false} name="Financiamento SAC" strokeDasharray="7 3" />
              <Line type="monotone" dataKey="Aluguel" stroke={C.wood} strokeWidth={2.5} dot={false} name="Aluguel + Investimento" strokeDasharray="3 3" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div id="sec-tabelas" style={{ scrollMarginTop: `${HDR + 12}px`, backgroundColor: C.white, borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 4px rgba(2,32,88,0.08)' }}>
          <div className="px-5 pt-4 pb-3 relative flex items-center justify-between sm:justify-end gap-2" style={{ borderBottom: `1px solid ${C.border}` }}>
            <p className="flex-1 min-w-0 truncate sm:flex-none sm:absolute sm:left-1/2 sm:-translate-x-1/2 sm:w-auto text-xs font-semibold uppercase tracking-widest" style={{ color: T.med }}>
              Tabelas Comparativas
            </p>
            <ExportMenu onExport={onExport} />
          </div>

          <div className="flex" style={{ borderBottom: `1px solid ${C.border}` }}>
            {[['price', 'Tabela PRICE'], ['sac', 'Tabela SAC'], ['aluguel', 'Cenário Aluguel']].map(([k, l]) => (
              <button
                key={k}
                onClick={() => setTab(k)}
                className="flex-1 py-3 text-xs sm:text-sm font-semibold transition-all"
                style={{ backgroundColor: tab === k ? C.blue : 'transparent', color: tab === k ? C.white : T.med }}
              >
                {l}
              </button>
            ))}
          </div>

          <ComparativeTable columns={columns} rows={displayRows} showAll={showAll} />

          <div className="px-5 py-3 flex items-center justify-between gap-3" style={{ backgroundColor: C.cream, borderTop: `1px solid ${C.border}` }}>
            <span className="text-xs font-light" style={{ color: T.low }}>
              {showAll ? `${tRows.length} linhas (detalhe mensal)` : `${displayRows.length} linhas (resumo anual)`}
            </span>
            <button
              onClick={() => setShowAll(a => !a)}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap"
              style={{ color: T.high, backgroundColor: C.blueXl }}
            >
              {showAll ? '▲ Resumo Anual' : `▼ Todos os ${p.pz} Meses`}
            </button>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}