import { useState } from 'react';
import { useSimulation } from './hooks/useSimulation';
import { useActiveSection } from './hooks/useActiveSection';
import { downloadXLSX, buildExportRows } from './lib/exportXlsx';
import { C } from './lib/theme';
import { SECTION_IDS, SECTION_THRESHOLDS, DEFAULT_PARAMS } from './config/constants';
import Header from './components/Header';
import ParamsPage from './pages/ParamsPage';
import ResultsPage from './pages/ResultsPage';

export default function App() {
  const [p, sp] = useState(DEFAULT_PARAMS);
  const [touched, setTouched] = useState({});
  const [view, setView] = useState('params');
  const [tab, setTab] = useState('price');
  const [showAll, setShowAll] = useState(false);

  const upd = k => v => {
    sp(prev => ({ ...prev, [k]: v }));
    setTouched(prev => (prev[k] ? prev : { ...prev, [k]: true }));
  };

  // Troca de guia sempre volta a página para o topo — tanto pelo botão do
  // header quanto pelo "Ver Resultados →" na guia de Parâmetros.
  const changeView = v => {
    setView(v);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const c = useSimulation(p);
  const activeNav = useActiveSection(view === 'results', SECTION_IDS, SECTION_THRESHOLDS);
  const scrollTo = id => { const el = document.getElementById(id); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); };
  const handleExport = which => downloadXLSX(buildExportRows(which, c));

  const anos = Math.round(p.pz / 12);
  const maxPat = Math.max(c.finalPRICE, c.finalSAC, c.R.finalPat);
  const priceWins = c.finalPRICE >= maxPat;
  const sacWins = !priceWins && c.finalSAC >= maxPat;
  const rentWins = !priceWins && !sacWins;
  const bestLabel = priceWins ? 'Financiamento PRICE' : sacWins ? 'Financiamento SAC' : 'Alugar + Investir';
  const bestVal = priceWins ? c.finalPRICE : sacWins ? c.finalSAC : c.R.finalPat;

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Poppins', sans-serif", backgroundColor: C.cream }}>
      <Header view={view} setView={changeView} />
      <div className="max-w-5xl mx-auto px-4 py-5">
        {view === 'params' && (
          <ParamsPage
            p={p} upd={upd} c={c} anos={anos} touched={touched}
            priceWins={priceWins} sacWins={sacWins} rentWins={rentWins}
            onGoResults={() => changeView('results')}
          />
        )}
        {view === 'results' && (
          <ResultsPage
            p={p} c={c} tab={tab} setTab={setTab} showAll={showAll} setShowAll={setShowAll}
            activeNav={activeNav} scrollTo={scrollTo} onExport={handleExport}
            anos={anos} priceWins={priceWins} sacWins={sacWins} rentWins={rentWins}
            bestLabel={bestLabel} bestVal={bestVal}
          />
        )}
      </div>
    </div>
  );
}