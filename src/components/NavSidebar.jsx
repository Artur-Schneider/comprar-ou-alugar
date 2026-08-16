import { C, T } from '../lib/theme';
import { NAV, HDR } from '../config/constants';

export default function NavSidebar({ activeNav, onNavigate }) {
  return (
    <div className="hidden md:block w-52 flex-shrink-0">
      <div className="sticky rounded-2xl p-3 space-y-1" style={{ top: `${HDR + 8}px`, backgroundColor: C.white, boxShadow: '0 1px 4px rgba(2,32,88,0.08)' }}>
        <p className="text-xs font-semibold uppercase tracking-widest px-2 pb-2 mb-1 text-center" style={{ color: T.low, borderBottom: `1px solid ${C.border}` }}>
          Navegação
        </p>
        {NAV.map(({ id, icon, label }) => (
          <button
            key={id}
            onClick={() => onNavigate(id)}
            className="nav-btn w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold flex items-start gap-2.5 transition-all"
            style={{ backgroundColor: activeNav === id ? C.blue : 'transparent', color: activeNav === id ? C.white : T.med }}
          >
            <span className="flex-shrink-0 text-sm leading-tight">{icon}</span>
            <span className="leading-snug">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
