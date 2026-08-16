import { useState, useEffect } from 'react';
import { HDR } from '../config/constants';

// Detecta qual seção está visível na tela para destacar o item correto
// no menu de navegação lateral.
export function useActiveSection(enabled, ids, thresholdMap) {
  const [activeId, setActiveId] = useState(ids[0]);

  useEffect(() => {
    if (!enabled) return;

    const check = () => {
      const atBottom = (window.scrollY + window.innerHeight) >= (document.documentElement.scrollHeight - 80);
      if (atBottom) {
        setActiveId(ids[ids.length - 1]);
        return;
      }
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        const th = thresholdMap[ids[i]] ?? HDR + 200;
        if (el && el.getBoundingClientRect().top <= th) {
          setActiveId(ids[i]);
          return;
        }
      }
      setActiveId(ids[0]);
    };

    window.addEventListener('scroll', check, { passive: true });
    const t = setTimeout(check, 80);
    return () => {
      clearTimeout(t);
      window.removeEventListener('scroll', check);
    };
  }, [enabled]);

  return activeId;
}
