import { C, T } from '../lib/theme';
import { fmt } from '../lib/format';
import Badge from './Badge';

export default function RentCard({ wins, val, subRows }) {
  return (
    <div className="rounded-2xl p-4 mb-3" style={{
      borderLeft: `4px solid ${C.wood}`,
      backgroundColor: C.white,
      boxShadow: wins ? `0 0 0 2px ${C.wood},0 4px 16px rgba(2,32,88,0.12)` : '0 1px 4px rgba(2,32,88,0.08)',
    }}>
      <Badge show={wins} />
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="sm:w-56 flex-shrink-0">
          <p className="text-xs font-medium" style={{ color: T.med }}>Aluguel + Investimento</p>
          <p className="text-lg sm:text-xl font-semibold mt-0.5" style={{ color: T.high }}>{fmt(val)}</p>
          <p className="text-xs font-light mt-0.5" style={{ color: T.low }}>Investimentos acumulados</p>
        </div>
        <div className="hidden sm:block self-stretch w-px" style={{ backgroundColor: C.border }} />
        <div className="flex-1 grid grid-cols-3 gap-3">
          {subRows.map(({ l, v }, i) => (
            <div key={i}>
              <p className="text-xs font-light mb-0.5" style={{ color: T.low }}>{l}</p>
              <p className="text-xs font-semibold" style={{ color: T.high }}>{v}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}