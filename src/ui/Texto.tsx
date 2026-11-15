// Párrafo con **negritas** y *cursivas* sencillas (sin HTML: nada se inyecta).
import type { ReactNode } from 'react';

export function Texto({ t }: { t: string }) {
  const partes: ReactNode[] = [];
  const re = /\*\*(.+?)\*\*|\*(.+?)\*/g;
  let ultimo = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  while ((m = re.exec(t))) {
    if (m.index > ultimo) partes.push(t.slice(ultimo, m.index));
    partes.push(m[1] !== undefined ? <strong key={k++}>{m[1]}</strong> : <em key={k++}>{m[2]}</em>);
    ultimo = m.index + m[0].length;
  }
  if (ultimo < t.length) partes.push(t.slice(ultimo));
  return <>{partes}</>;
}
