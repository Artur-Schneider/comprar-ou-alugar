import { C } from '../lib/theme';

export default function InsightBanner({ icon, children }) {
  return (
    <div className="rounded-xl p-3 flex items-start gap-2.5" style={{ backgroundColor: C.blue }}>
      <span className="flex-shrink-0 text-sm mt-0.5" style={{ color: C.woodOnDark }}>{icon}</span>
      <p className="text-xs font-light leading-relaxed" style={{ color: C.white }}>{children}</p>
    </div>
  );
}
