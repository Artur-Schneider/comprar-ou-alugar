import { C, T } from '../lib/theme';
import { fmt, fmtK } from '../lib/format';
import NInput from '../components/NInput';
import SectionHead from '../components/SectionHead';
import InsightBanner from '../components/InsightBanner';
import Footer from '../components/Footer';

export default function ParamsPage({ p, upd, c, anos, priceWins, sacWins, rentWins, onGoResults }) {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl p-5 space-y-5" style={{ backgroundColor: C.white, boxShadow: '0 1px 4px rgba(2,32,88,0.08)' }}>
        <div>
          <SectionHead icon="🏠" label="Imóvel" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <NInput label="Valor do Imóvel" val={p.vi} set={upd('vi')} pre="R$" step="5000" />
            <NInput label="Valor da Entrada" val={p.ent} set={upd('ent')} pre="R$" step="5000" />
            <NInput label="Valor Financiado" val={c.vf} set={() => {}} pre="R$" ro />
            <NInput label="Valorização Anual do Imóvel" val={p.val} set={upd('val')} suf="% a.a." />
          </div>
        </div>

        <div className="h-px" style={{ backgroundColor: C.cream }} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <SectionHead icon="💳" label="Financiamento" />
            <div className="grid grid-cols-2 gap-3 mb-3">
              <NInput label="Taxa de Juros" val={p.tj} set={upd('tj')} suf="% a.m." step="0.01" />
              <NInput label="Prazo" val={p.pz} set={upd('pz')} suf="meses" step="12" min="12" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg p-3" style={{ backgroundColor: C.cream }}>
                <div className="text-xs font-medium mb-0.5" style={{ color: T.low }}>Prestação PRICE</div>
                <div className="text-sm font-semibold" style={{ color: T.high }}>{fmt(c.P.pmt)}</div>
              </div>
              <div className="rounded-lg p-3" style={{ backgroundColor: C.woodXl, border: `1.5px solid ${C.woodBorder}` }}>
                <div className="text-xs font-semibold mb-0.5 leading-tight" style={{ color: T.med }}>Orçamento (1ª prestação SAC)</div>
                <div className="text-sm font-semibold" style={{ color: T.high }}>{fmt(c.budget)}</div>
              </div>
            </div>
          </div>
          <div>
            <SectionHead icon="🔑" label="Aluguel & Investimento" />
            <div className="grid grid-cols-3 gap-3 mb-3">
              <NInput label="Aluguel Inicial" val={p.alg} set={upd('alg')} pre="R$" step="100" />
              <NInput label="Reajuste Anual" val={p.rej} set={upd('rej')} suf="% a.a." />
              <NInput label="Taxa de Investimento" val={p.ti} set={upd('ti')} suf="% a.m." step="0.01" />
            </div>
            <InsightBanner icon="💡">
              Orçamento mensal = 1ª prestação SAC. O saldo não utilizado na prestação ou aluguel é investido mensalmente nos três cenários.
            </InsightBanner>
          </div>
        </div>
      </div>

      <div className="rounded-2xl px-5 py-4" style={{ backgroundColor: C.white, boxShadow: '0 1px 4px rgba(2,32,88,0.08)' }}>
        <p className="text-xs font-semibold uppercase tracking-widest mb-0.5" style={{ color: T.med }}>
          📊 Prévia — Patrimônio Total ao Final de {anos} {anos === 1 ? 'Ano' : 'Anos'}
        </p>
        <p className="text-xs font-light mb-4" style={{ color: T.low }}>
          Compra: imóvel valorizado + investimentos · Aluguel: investimentos acumulados
        </p>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="grid grid-cols-3 gap-3 flex-1">
            {[{ l: 'PRICE', v: c.finalPRICE, w: priceWins }, { l: 'SAC', v: c.finalSAC, w: sacWins }, { l: 'Aluguel', v: c.R.finalPat, w: rentWins }].map(({ l, v, w }) => (
              <div key={l} className="rounded-xl px-3 py-2.5" style={{ border: `1.5px solid ${w ? C.wood : C.border}`, backgroundColor: w ? C.woodXl : C.cream }}>
                <p className="text-xs mb-0.5" style={{ color: T.low }}>{l} {w && '✓'}</p>
                <p className="text-sm font-semibold" style={{ color: w ? T.high : T.med }}>{fmtK(v)}</p>
              </div>
            ))}
          </div>
          <button
            onClick={onGoResults}
            className="flex-shrink-0 px-5 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 whitespace-nowrap"
            style={{ backgroundColor: C.woodOnDark, color: C.blue }}
          >
            Ver Resultados →
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
