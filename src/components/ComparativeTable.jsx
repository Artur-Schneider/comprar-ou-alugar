import { C, T } from '../lib/theme';
import { fmt } from '../lib/format';

function TH({ children, accent }) {
  return (
    <th className="px-3 py-3 text-right font-semibold uppercase tracking-wide whitespace-nowrap" style={{ color: accent ? C.wood : T.med }}>
      {children}
    </th>
  );
}

export default function ComparativeTable({ columns, rows }) {
  return (
    <div className="overflow-x-auto overflow-y-auto" style={{ maxHeight: 420 }}>
      <table className="w-full text-xs">
        <thead className="sticky top-0 z-10" style={{ backgroundColor: C.cream }}>
          <tr>
            <th className="px-3 py-3 text-left font-semibold uppercase tracking-wide whitespace-nowrap" style={{ color: T.med }}>
              Período
            </th>
            {columns.map((col, i) => <TH key={i} accent={col.headerAccent}>{col.label}</TH>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={row.mes} className="table-row" style={{ backgroundColor: ri % 2 === 0 ? C.white : C.cream, borderBottom: `1px solid ${C.cream}` }}>
              <td className="px-3 py-2.5">
                <div className="font-mono" style={{ color: T.low }}>Mês {row.mes}</div>
                {row.mes % 12 === 0 && <div className="font-semibold" style={{ color: T.high }}>Ano {row.mes / 12}</div>}
              </td>
              {columns.map((col, i) => {
                const color = typeof col.color === 'function' ? col.color(row) : col.color;
                return (
                  <td key={i} className={`px-3 py-2.5 text-right font-mono${col.bold ? ' font-semibold' : ''}`} style={{ color }}>
                    {fmt(col.get(row))}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
