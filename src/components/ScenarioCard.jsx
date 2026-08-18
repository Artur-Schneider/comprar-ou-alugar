import { C, T } from '../lib/theme';
import { fmt } from '../lib/format';
import Badge from './Badge';

export default function ScenarioCard({ label, accent, val, wins, subtitle, rows }) {
  return (
    <div style={{
      borderLeft: `4px solid ${accent}`,
      backgroundColor: C.white,
      borderRadius: 16,
      padding: 16,
      boxShadow: wins ? `0 0 0 2px ${C.wood},0 4px 16px rgba(2,32,88,0.12)` : `0 1px 4px rgba(2,32,88,0.08)`,
    }}>
      <Badge show={wins} />
      <p className="text-xs font-medium" style={{ color: T.med }}>{label}</p>
      <p className="text-lg sm:text-xl font-semibold mt-0.5" style={{ color: T.high }}>{fmt(val)}</p>
      <p className="text-xs font-light mt-0.5 mb-3" style={{ color: T.low }}>{subtitle}</p>
      <div className="space-y-1.5">
        {rows.map(({ l, v, vc }, i) => (
          <div key={i} className="flex justify-between">
            <span className="text-xs" style={{ color: T.low }}>{l}</span>
            <span className="text-xs font-semibold" style={{ color: vc || T.high }}>{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}