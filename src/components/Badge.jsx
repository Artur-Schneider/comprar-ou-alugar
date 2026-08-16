import { C } from '../lib/theme';

export default function Badge({ show }) {
  return (
    <span
      className="inline-block text-xs font-bold uppercase px-2.5 py-0.5 rounded-full mb-2"
      style={{ backgroundColor: show ? C.woodOnDark : 'transparent', color: show ? C.blue : 'transparent', visibility: show ? 'visible' : 'hidden' }}
    >
      ✓ Melhor Opção
    </span>
  );
}
