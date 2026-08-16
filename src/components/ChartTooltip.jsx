import { C, T } from '../lib/theme';
import { fmt } from '../lib/format';

export default function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ backgroundColor: C.white, border: `1px solid ${C.border}`, borderRadius: 12, padding: 12, fontSize: 12, minWidth: 192 }}>
      <p style={{ color: T.high, fontWeight: 600, marginBottom: 8, paddingBottom: 6, borderBottom: `1px solid ${C.border}` }}>
        Ano {label}
      </p>
      {payload.map(e => (
        <p key={e.name} style={{ color: e.color, padding: '2px 0' }}>
          <b>{e.name}:</b> {fmt(e.value)}
        </p>
      ))}
    </div>
  );
}
