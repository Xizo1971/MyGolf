// Barra de navegación inferior: las cuatro pestañas de la libreta.
import type { ReactElement } from 'react';
import { tx } from '../i18n/t';

export type Pestana = 'recorrido' | 'libreta' | 'caddie' | 'ajustes';

const ICONOS: Record<Pestana, ReactElement> = {
  recorrido: <path d="M5 21V3l12 4-12 4" />,
  libreta: <><rect x="5" y="3" width="14" height="18" /><path d="M9 3v18M12 8h4M12 12h4" /></>,
  caddie: <path d="M4 5h16v11H9l-5 4z" />,
  ajustes: <><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2" /></>,
};

const NOMBRES: Record<Pestana, string> = {
  recorrido: 'Recorrido',
  libreta: 'Libreta',
  caddie: 'Caddie',
  ajustes: 'Ajustes',
};

export function Nav({ actual }: { actual: Pestana }) {
  return (
    <nav className="nav" aria-label={tx('Secciones')}>
      {(Object.keys(NOMBRES) as Pestana[]).map((p) => (
        <a key={p} href={`#/${p === 'recorrido' ? '' : p}`} className={p === actual ? 'on' : undefined} aria-current={p === actual ? 'page' : undefined}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true">{ICONOS[p]}</svg>
          {tx(NOMBRES[p])}
        </a>
      ))}
    </nav>
  );
}
