// Motor 3D mínimo, sin dependencias, que dibuja en SVG con estilo «libreta».
// Primitivas: esferas y cápsulas (cilindros con extremos redondos). Cada una se proyecta
// con perspectiva; se dibujan de la más lejana a la más cercana (orden del pintor) con un
// contorno de tinta. Suficiente para un maniquí de madera, un palo y unas manos.
//
// Ejes del mundo (jugador diestro): +x hacia el objetivo, +y hacia arriba,
// +z desde el jugador hacia la bola. El origen está en el suelo, entre los tobillos.

export type V3 = readonly [number, number, number];

export const v = {
  sum: (a: V3, b: V3): V3 => [a[0] + b[0], a[1] + b[1], a[2] + b[2]],
  res: (a: V3, b: V3): V3 => [a[0] - b[0], a[1] - b[1], a[2] - b[2]],
  mul: (a: V3, k: number): V3 => [a[0] * k, a[1] * k, a[2] * k],
  dot: (a: V3, b: V3): number => a[0] * b[0] + a[1] * b[1] + a[2] * b[2],
  cruz: (a: V3, b: V3): V3 => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]],
  largo: (a: V3): number => Math.hypot(a[0], a[1], a[2]),
  norm: (a: V3): V3 => {
    const l = Math.hypot(a[0], a[1], a[2]) || 1;
    return [a[0] / l, a[1] / l, a[2] / l];
  },
  /** Punto entre a y b (t = 0 → a, t = 1 → b). */
  entre: (a: V3, b: V3, t: number): V3 => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t],
};

/** `grupo`: las primitivas con el mismo grupo se pintan como una sola silueta (sin contornos internos). */
/** `sesgo` (m): se pinta como si estuviera así de más cerca (para detalles que deben verse encima). */
export interface Esfera { tipo: 'esfera'; c: V3; r: number; color: string; grupo?: string; sesgo?: number }
export interface Capsula { tipo: 'capsula'; a: V3; b: V3; r: number; color: string; grupo?: string; sesgo?: number }
export type Primitiva = Esfera | Capsula;

/** Línea de anotación en 3D (guías, flechas en el suelo…). */
export interface Linea3D { a: V3; b: V3; color: string; ancho?: number; discontinua?: boolean; flecha?: boolean }

/** Texto anclado a un punto 3D (no gira: siempre se lee de frente). */
export interface Etiqueta3D { p: V3; texto: string[]; color?: string; dx?: number; dy?: number; ancla?: 'start' | 'middle' | 'end' }

export interface Escena {
  prims: Primitiva[];
  /** Líneas que van por debajo de todo (suelo, cuadrícula). */
  fondo?: Linea3D[];
  /** Líneas y textos que van por encima de todo. */
  guias?: Linea3D[];
  etiquetas?: Etiqueta3D[];
  /** Por encima de esta inclinación de cámara no se muestran las notas (se amontonan). */
  etiquetasHastaPitch?: number;
}

export interface Camara {
  /** Giro alrededor del eje vertical, en grados. 0 = de frente al jugador (cámara en +z). */
  yaw: number;
  /** Inclinación, en grados. 0 = a la altura del suelo; 90 = desde arriba. */
  pitch: number;
}

/** Espejo para zurdos: refleja el mundo en x (el objetivo pasa a -x). */
export function espejar(e: Escena): Escena {
  const m = (p: V3): V3 => [-p[0], p[1], p[2]];
  return {
    prims: e.prims.map((p) => (p.tipo === 'esfera' ? { ...p, c: m(p.c) } : { ...p, a: m(p.a), b: m(p.b) })),
    fondo: e.fondo?.map((l) => ({ ...l, a: m(l.a), b: m(l.b) })),
    guias: e.guias?.map((l) => ({ ...l, a: m(l.a), b: m(l.b) })),
    etiquetas: e.etiquetas?.map((t) => ({ ...t, p: m(t.p), dx: t.dx === undefined ? undefined : -t.dx, ancla: t.ancla === 'start' ? 'end' : t.ancla === 'end' ? 'start' : t.ancla })),
  };
}

/** Parte cápsulas largas en trozos para que el orden del pintor se equivoque menos. */
export function trocear(prims: Primitiva[], maxLargo: number): Primitiva[] {
  const out: Primitiva[] = [];
  for (const p of prims) {
    if (p.tipo !== 'capsula') { out.push(p); continue; }
    const n = Math.max(1, Math.ceil(v.largo(v.res(p.b, p.a)) / maxLargo));
    for (let i = 0; i < n; i++) out.push({ ...p, a: v.entre(p.a, p.b, i / n), b: v.entre(p.a, p.b, (i + 1) / n) });
  }
  return out;
}

/** Esfera que envuelve la escena: centro y radio (para encuadrar la cámara). */
export function envolvente(prims: Primitiva[]): { c: V3; r: number } {
  const pts: { p: V3; r: number }[] = [];
  for (const p of prims) {
    if (p.tipo === 'esfera') pts.push({ p: p.c, r: p.r });
    else { pts.push({ p: p.a, r: p.r }, { p: p.b, r: p.r }); }
  }
  const min = [Infinity, Infinity, Infinity], max = [-Infinity, -Infinity, -Infinity];
  for (const { p, r } of pts) for (let k = 0; k < 3; k++) { min[k] = Math.min(min[k]!, p[k]! - r); max[k] = Math.max(max[k]!, p[k]! + r); }
  const c: V3 = [(min[0]! + max[0]!) / 2, (min[1]! + max[1]!) / 2, (min[2]! + max[2]!) / 2];
  let r = 0;
  for (const { p, r: rp } of pts) r = Math.max(r, v.largo(v.res(p, c)) + rp);
  return { c, r: r || 1 };
}

export interface Proyector {
  /** Punto en pantalla y profundidad (mayor = más lejos). */
  p: (q: V3) => { x: number; y: number; d: number };
  /** Radio en pantalla de un radio r a profundidad d. */
  r: (r: number, d: number) => number;
}

export function proyector(cam: Camara, centro: V3, radio: number, ancho: number, alto: number): Proyector {
  const yaw = (cam.yaw * Math.PI) / 180, pitch = (cam.pitch * Math.PI) / 180;
  const cy = Math.cos(yaw), sy = Math.sin(yaw), cp = Math.cos(pitch), sp = Math.sin(pitch);
  const dist = radio * 4;
  const f = (Math.min(ancho, alto) * 0.47 * dist) / radio / 1.04;
  return {
    p: (q) => {
      const x0 = q[0] - centro[0], y0 = q[1] - centro[1], z0 = q[2] - centro[2];
      // giro horizontal (yaw) y luego inclinación (pitch)
      const x1 = x0 * cy + z0 * sy;
      const z1 = -x0 * sy + z0 * cy;
      const y2 = y0 * cp - z1 * sp;
      const z2 = y0 * sp + z1 * cp;
      const d = dist - z2;
      return { x: ancho / 2 + (f * x1) / d, y: alto / 2 - (f * y2) / d, d };
    },
    r: (r, d) => (f * r) / d,
  };
}

/** Mezcla dos colores hex (t = 0 → a; t = 1 → b). */
export function mezclar(a: string, b: string, t: number): string {
  const pa = [1, 3, 5].map((i) => parseInt(a.slice(i, i + 2), 16));
  const pb = [1, 3, 5].map((i) => parseInt(b.slice(i, i + 2), 16));
  return '#' + pa.map((x, i) => Math.round(x + (pb[i]! - x) * t).toString(16).padStart(2, '0')).join('');
}

export interface Forma {
  /** Trazado SVG de la silueta. */
  d: string;
  color: string;
  prof: number;
}

const f1 = (n: number) => Math.round(n * 10) / 10;

/** Proyecta y ordena las primitivas: devuelve siluetas listas para pintar (de lejos a cerca). */
export function siluetas(prims: Primitiva[], pr: Proyector, fondo: string): Forma[] {
  const formas: Forma[] = [];
  let dMin = Infinity, dMax = -Infinity;
  const tmp: { d: string; color: string; prof: number; grupo?: string }[] = [];
  for (const p of prims) {
    if (p.tipo === 'esfera') {
      const s = pr.p(p.c);
      const r = pr.r(p.r, s.d);
      tmp.push({ d: circulo(s.x, s.y, r, 1), color: p.color, prof: s.d - (p.sesgo ?? 0), grupo: p.grupo });
      dMin = Math.min(dMin, s.d); dMax = Math.max(dMax, s.d);
    } else {
      const s1 = pr.p(p.a), s2 = pr.p(p.b);
      const r1 = pr.r(p.r, s1.d), r2 = pr.r(p.r, s2.d);
      const dx = s2.x - s1.x, dy = s2.y - s1.y;
      const l = Math.hypot(dx, dy);
      let d: string;
      if (l < 0.5) {
        d = circulo(s1.x, s1.y, Math.max(r1, r2), 1);
      } else {
        // Silueta = cuadrilátero entre los dos extremos + un círculo en cada extremo.
        // Todos los trozos giran en el mismo sentido para que el relleno sea su unión.
        const nx = -dy / l, ny = dx / l;
        const q: [number, number][] = [
          [s1.x + nx * r1, s1.y + ny * r1], [s2.x + nx * r2, s2.y + ny * r2],
          [s2.x - nx * r2, s2.y - ny * r2], [s1.x - nx * r1, s1.y - ny * r1],
        ];
        // Todo se traza en sentido horario: así la unión de varias piezas (un grupo) se
        // rellena entera con la regla «nonzero», sin huecos donde se solapan.
        let area = 0;
        for (let i = 0; i < 4; i++) { const [ax, ay] = q[i]!; const [bx, by] = q[(i + 1) % 4]!; area += ax * by - bx * ay; }
        if (area < 0) q.reverse();
        d = `M${q.map(([x, y]) => `${f1(x)} ${f1(y)}`).join(' L')} Z ` + circulo(s1.x, s1.y, r1, 1) + ' ' + circulo(s2.x, s2.y, r2, 1);
      }
      const prof = (s1.d + s2.d) / 2 - (p.sesgo ?? 0);
      tmp.push({ d, color: p.color, prof, grupo: p.grupo });
      dMin = Math.min(dMin, prof); dMax = Math.max(dMax, prof);
    }
  }
  // Une las piezas de cada grupo en una sola forma, a la profundidad media del grupo.
  const grupos = new Map<string, { d: string[]; color: string; prof: number[] }>();
  const sueltas: typeof tmp = [];
  for (const t of tmp) {
    if (!t.grupo) { sueltas.push(t); continue; }
    const g = grupos.get(t.grupo) ?? { d: [], color: t.color, prof: [] };
    g.d.push(t.d); g.prof.push(t.prof);
    grupos.set(t.grupo, g);
  }
  for (const g of grupos.values()) sueltas.push({ d: g.d.join(' '), color: g.color, prof: g.prof.reduce((a, b) => a + b, 0) / g.prof.length });
  const rango = dMax - dMin || 1;
  for (const t of sueltas) {
    // Lo lejano se aclara un poco hacia el papel: ayuda a leer la profundidad.
    formas.push({ d: t.d, color: mezclar(t.color, fondo, ((t.prof - dMin) / rango) * 0.28), prof: t.prof });
  }
  return formas.sort((a, b) => b.prof - a.prof);
}

/** Círculo como trazado; `sentido` 1 = horario en pantalla, 0 = antihorario. */
function circulo(x: number, y: number, r: number, sentido: 0 | 1): string {
  return `M${f1(x - r)} ${f1(y)} a${f1(r)} ${f1(r)} 0 1 ${sentido} ${f1(2 * r)} 0 a${f1(r)} ${f1(r)} 0 1 ${sentido} ${f1(-2 * r)} 0 Z`;
}
