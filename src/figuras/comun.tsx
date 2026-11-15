// Piezas comunes de los dibujos del curso: colores de la «libreta del caddie»,
// textos a lápiz y rótulos, y el espejo para jugadores zurdos.
import type { ReactNode } from 'react';

export const C = {
  papel: '#F1ECDD',
  papelClaro: '#FBF8EF',
  borde: '#C9C2AE',
  tinta: '#1E2B23',
  gris: '#5B6458',
  topo: '#9FB98A',
  rough: '#BCD29C',
  calle: '#D3E4BA',
  calleRaya: '#C7DCA9',
  green: '#A9CB86',
  greenOscuro: '#8DB86B',
  verde: '#2E6B3C',
  arena: '#E4D3A2',
  arenaBorde: '#C9B47A',
  agua: '#BFD6E2',
  aguaBorde: '#3C7FA6',
  arbol: '#7FA266',
  bandera: '#D9541E',
  banderaTexto: '#B8441A',
  manoA: '#CFE0B9',
  manoB: '#F2D3C2',
  piel: '#E9CDB4',
  cuerpo: '#3B4A40',
  bien: '#2E6B3C',
  mal: '#B8441A',
} as const;

export const F = {
  rotulo: "'Barlow Condensed', 'Arial Narrow', sans-serif",
  lapiz: "'Caveat', 'Comic Sans MS', cursive",
  texto: "'Barlow', system-ui, sans-serif",
} as const;

export interface PropsFigura {
  /** Dibuja la versión para zurdos (en los dibujos donde importa la mano). */
  zurdo?: boolean;
}

export function Lienzo(p: { w: number; h: number; etiqueta: string; children: ReactNode }) {
  return (
    <svg
      viewBox={`0 0 ${p.w} ${p.h}`}
      width="100%"
      role="img"
      aria-label={p.etiqueta}
      style={{ display: 'block', maxWidth: p.w * 1.6, background: C.papelClaro, border: `1px solid ${C.borde}` }}
    >
      {p.children}
    </svg>
  );
}

type Ancla = 'start' | 'middle' | 'end';

/** Texto «escrito a lápiz». Admite varias líneas. */
export function Lapiz(p: { x: number; y: number; t: string | string[]; ancla?: Ancla; tam?: number; color?: string }) {
  const lineas = Array.isArray(p.t) ? p.t : [p.t];
  const tam = p.tam ?? 19;
  return (
    <text x={p.x} y={p.y} fontFamily={F.lapiz} fontSize={tam} fill={p.color ?? C.banderaTexto} textAnchor={p.ancla ?? 'start'}>
      {lineas.map((l, i) => (
        <tspan key={i} x={p.x} dy={i === 0 ? 0 : tam * 0.95}>{l}</tspan>
      ))}
    </text>
  );
}

/** Rótulo técnico en mayúsculas, como los de un yardage book. */
export function Rotulo(p: { x: number; y: number; t: string; ancla?: Ancla; tam?: number; color?: string; peso?: number }) {
  return (
    <text
      x={p.x} y={p.y}
      fontFamily={F.rotulo} fontSize={p.tam ?? 12} fontWeight={p.peso ?? 600}
      letterSpacing={1} fill={p.color ?? C.gris} textAnchor={p.ancla ?? 'start'}
    >
      {p.t.toUpperCase()}
    </text>
  );
}

/** Flecha fina de anotación (de a hasta b) con punta en b. */
export function Flecha(p: { x1: number; y1: number; x2: number; y2: number; color?: string; discontinua?: boolean; ancho?: number }) {
  const color = p.color ?? C.tinta;
  const ang = Math.atan2(p.y2 - p.y1, p.x2 - p.x1);
  const l = 7;
  const a1 = ang + Math.PI - 0.45;
  const a2 = ang + Math.PI + 0.45;
  const punta = `M${p.x2 + l * Math.cos(a1)} ${p.y2 + l * Math.sin(a1)} L${p.x2} ${p.y2} L${p.x2 + l * Math.cos(a2)} ${p.y2 + l * Math.sin(a2)}`;
  return (
    <g stroke={color} strokeWidth={p.ancho ?? 1.5} fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d={`M${p.x1} ${p.y1} L${p.x2} ${p.y2}`} strokeDasharray={p.discontinua ? '5 4' : undefined} />
      <path d={punta} />
    </g>
  );
}

/** Bandera clavada en el hoyo. */
export function Bandera(p: { x: number; y: number; alto?: number }) {
  const h = p.alto ?? 34;
  return (
    <g>
      <ellipse cx={p.x} cy={p.y} rx={4} ry={2} fill={C.tinta} />
      <path d={`M${p.x} ${p.y} V${p.y - h}`} stroke={C.tinta} strokeWidth={1.8} />
      <path d={`M${p.x + 1} ${p.y - h} l${h * 0.42} ${h * 0.16} l${-h * 0.42} ${h * 0.16} z`} fill={C.bandera} />
    </g>
  );
}

export function Bola(p: { x: number; y: number; r?: number }) {
  return <circle cx={p.x} cy={p.y} r={p.r ?? 5} fill="#FFFFFF" stroke={C.tinta} strokeWidth={1.2} />;
}

/** Marca de «bien» (círculo verde con ✓) o «mal» (cuadrado con ✗), como en la tarjeta. */
export function Marca(p: { x: number; y: number; ok: boolean }) {
  return p.ok ? (
    <g>
      <circle cx={p.x} cy={p.y} r={9} fill="none" stroke={C.bien} strokeWidth={2} />
      <path d={`M${p.x - 4} ${p.y} l3 3 l5 -6`} stroke={C.bien} strokeWidth={2} fill="none" />
    </g>
  ) : (
    <g>
      <rect x={p.x - 8} y={p.y - 8} width={16} height={16} fill="none" stroke={C.mal} strokeWidth={2} />
      <path d={`M${p.x - 4} ${p.y - 4} l8 8 M${p.x + 4} ${p.y - 4} l-8 8`} stroke={C.mal} strokeWidth={2} />
    </g>
  );
}

/**
 * Espejo para zurdos: `t` es la transformación del grupo del dibujo; `x` y `a`
 * recolocan los textos (que no se pueden reflejar porque se leerían al revés).
 */
export function espejo(ancho: number, zurdo?: boolean) {
  return {
    t: zurdo ? `translate(${ancho} 0) scale(-1 1)` : undefined,
    x: (x: number) => (zurdo ? ancho - x : x),
    a: (a: Ancla): Ancla => (!zurdo || a === 'middle' ? a : a === 'start' ? 'end' : 'start'),
  };
}
