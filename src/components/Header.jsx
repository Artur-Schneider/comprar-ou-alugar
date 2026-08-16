import { C } from '../lib/theme';

export default function Header({ view, setView }) {
  return (
    <div className="sticky top-0 z-50 shadow-lg" style={{ backgroundColor: C.blueDk }}>
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <h1 className="text-sm sm:text-base font-semibold leading-tight" style={{ color: C.white }}>
            Comprar ou Alugar um Imóvel?
          </h1>
          <p className="text-xs font-light hidden sm:block" style={{ color: C.woodOnDark }}>
            Modelo Determinístico · Análise Financeira Imobiliária
          </p>
        </div>
        <div className="flex items-center gap-1 rounded-xl p-1 flex-shrink-0" style={{ backgroundColor: 'rgba(255,255,255,0.14)' }}>
          {[['params', '⚙️ Parâmetros'], ['results', '📊 Resultados']].map(([v, l]) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className="px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap"
              style={{ backgroundColor: view === v ? C.white : 'transparent', color: view === v ? C.blue : 'rgba(255,255,255,0.92)' }}
            >
              {l}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
