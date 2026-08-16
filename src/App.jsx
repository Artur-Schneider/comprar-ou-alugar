import { useState } from 'react';
import { useSimulation } from './hooks/useSimulation';
import { useActiveSection } from './hooks/useActiveSection';
import { downloadXLSX, buildExportRows } from './lib/exportXlsx';
import { C } from './lib/theme';
import { SECTION_IDS, SECTION_THRESHOLDS } from './config/constants';
import Header from './components/Header';
import ParamsPage from './pages/ParamsPage';
import ResultsPage from './pages/ResultsPage';

export default function App() {
  const [p, sp] = useState({ vi: 400000, ent: 80000, tj: .87, pz: 360, val: 4, alg: 2000, rej: 6, ti: .9 });
  const [view, setView] = useState('params');
  const [tab, setTab] = useState('price');
  const [showAll, setShowAll] = useState(false);
  const upd = k => v => sp(prev => ({ ...prev, [k]: v }));

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
      <Header view={view} setView={setView} />
      <div className="max-w-5xl mx-auto px-4 py-5">
        {view === 'params' && (
          <ParamsPage
            p={p} upd={upd} c={c} anos={anos}
            priceWins={priceWins} sacWins={sacWins} rentWins={rentWins}
            onGoResults={() => setView('results')}
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
