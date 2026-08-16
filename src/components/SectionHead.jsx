import { C, T } from '../lib/theme';

export default function SectionHead({ icon, label }) {
  return (
    <div className="flex items-center gap-2.5 mb-3">
      <span className="block w-0.5 h-4 rounded-full flex-shrink-0" style={{ backgroundColor: C.wood }} />
      <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: T.high }}>{icon} {label}</p>
    </div>
  );
}
