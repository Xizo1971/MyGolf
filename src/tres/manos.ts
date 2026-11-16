// Las manos sobre el puño del palo, dedo a dedo (jugador diestro).
// Como en las fotos de los libros de golf, el palo se muestra casi vertical delante de
// la cámara; el jugador está en -z (detrás de las manos) y el objetivo en +x.
// Posición en el puño: s = distancia desde el extremo (m), ψ = ángulo alrededor del puño
// (0° = la cara que mira al jugador, la que ves al mirar hacia abajo; 90° = lado del
// objetivo; 180° = cara de abajo; 270° = lado contrario al objetivo), h = altura sobre el puño.
import { v, type Escena, type Linea3D, type Primitiva, type V3 } from './motor';

export type TipoUnion = 'solapado' | 'entrelazado' | 'diez';

const MANO_A = '#CFE0B9';
const MANO_A_OSC = '#B6CC9C';
const MANO_B = '#F2D3C2';
const MANO_B_OSC = '#E2B9A3';
const PUNO = '#3E4A44';
const VARILLA = '#9BA39E';
const BANDERA = '#D9541E';

const R_PUNO = 0.0125;
const EJE = v.norm([0, -1, 0.12]); // del extremo del palo hacia la cabeza
const LADO_OBJ: V3 = [1, 0, 0];
const ARRIBA = v.norm(v.mul(v.cruz(EJE, LADO_OBJ), -1)); // cara del puño que mira al jugador

function dir(psi: number): V3 {
  const a = (psi * Math.PI) / 180;
  return v.sum(v.mul(ARRIBA, Math.cos(a)), v.mul(LADO_OBJ, Math.sin(a)));
}
/** Punto en el puño: s a lo largo, ψ alrededor, h por encima de la superficie. */
export function enPuno(s: number, psi: number, h: number): V3 {
  return v.sum(v.mul(EJE, s), v.mul(dir(psi), R_PUNO + h));
}

type Punto = [s: number, psi: number, h: number];

function dedo(puntos: Punto[], r: number, color: string): Primitiva[] {
  const p = puntos.map(([s, psi, h]) => enPuno(s, psi, h));
  const out: Primitiva[] = [];
  for (let i = 0; i < p.length - 1; i++) out.push({ tipo: 'capsula', a: p[i]!, b: p[i + 1]!, r, color });
  out.push({ tipo: 'esfera', c: p[p.length - 1]!, r: r * 1.02, color });
  return out;
}

/** Dedo que rodea el puño: nudillo en ψ0 y punta en ψ1, todo a la altura s. */
function dedoRodeando(s: number, psi0: number, psi1: number, r: number, color: string, deriva = 0): Primitiva[] {
  const n = 4;
  const pts: Punto[] = [[s, psi0, 0.022]];
  for (let i = 1; i <= n; i++) {
    const t = i / n;
    pts.push([s + deriva * t, psi0 + (psi1 - psi0) * t, r + 0.0005]);
  }
  return dedo(pts, r, color);
}

/** Dorso macizo de la mano: de la muñeca a los nudillos, relleno con esferas. */
function dorso(muneca: V3, nudillos: V3[], color: string, grupo: string): Primitiva[] {
  const out: Primitiva[] = [];
  // Varillas de la muñeca a cada nudillo, unidas por travesaños: silueta lisa, sin bultos.
  for (const k of nudillos) out.push({ tipo: 'capsula', a: muneca, b: k, r: 0.016, color, grupo });
  for (const t of [0.45, 0.75, 1]) {
    for (let i = 0; i < nudillos.length - 1; i++) {
      out.push({ tipo: 'capsula', a: v.entre(muneca, nudillos[i]!, t), b: v.entre(muneca, nudillos[i + 1]!, t), r: 0.015, color, grupo });
    }
  }
  return out;
}

/** Nudillos marcados encima del dorso (para poder contarlos). */
function nudillos(ks: V3[], color: string): Primitiva[] {
  return ks.map((k) => ({ tipo: 'esfera' as const, c: k, r: 0.0118, color, sesgo: 0.02 }));
}

/** Trozo de antebrazo (corto, para que no tape las manos al mirar desde arriba). */
function antebrazo(muneca: V3, hacia: V3, color: string, grupo: string): Primitiva {
  return { tipo: 'capsula', a: muneca, b: v.sum(muneca, v.mul(v.norm(hacia), 0.035)), r: 0.024, color, grupo };
}

export function escenaGrip(opc: { union: TipoUnion; manos: 'una' | 'dos'; zurdo?: boolean }): Escena {
  const prims: Primitiva[] = [];
  // Puño y un trozo de varilla
  prims.push({ tipo: 'capsula', a: v.mul(EJE, -0.008), b: v.mul(EJE, 0.2), r: R_PUNO, color: PUNO });
  prims.push({ tipo: 'capsula', a: v.mul(EJE, 0.2), b: v.mul(EJE, 0.25), r: 0.0055, color: VARILLA });

  // ── Mano de arriba (izquierda en un diestro) ──
  // El puño cruza la mano en diagonal: el nudillo del índice queda más abajo y más
  // hacia arriba del puño que el del meñique.
  const nA: [number, number, number][] = [[0.03, 74, 0.024], [0.05, 62, 0.026], [0.068, 50, 0.027], [0.087, 38, 0.026]];
  const munecaA = enPuno(-0.04, 40, 0.046);
  const nudA = nA.map(([s, psi, h]) => enPuno(s, psi, h));
  prims.push(antebrazo(munecaA, v.sum(v.mul(EJE, -0.8), v.sum(v.mul(LADO_OBJ, 0.25), v.mul(ARRIBA, 0.35))), MANO_A, 'manoA'));
  prims.push(...dorso(munecaA, nudA, MANO_A, 'manoA'));
  prims.push({ tipo: 'esfera', c: enPuno(0.028, 8, 0.018), r: 0.018, color: MANO_A, grupo: 'manoA' }); // talón de la mano, encima del puño
  prims.push(...nudillos(nudA, MANO_A_OSC));
  prims.push(...dedoRodeando(nA[0]![0], nA[0]![1], 196, 0.0075, MANO_A));
  prims.push(...dedoRodeando(nA[1]![0], nA[1]![1], 206, 0.0083, MANO_A));
  prims.push(...dedoRodeando(nA[2]![0], nA[2]![1], 212, 0.0086, MANO_A));
  if (opc.union === 'entrelazado') {
    // El índice de arriba sale del puño y se cruza por fuera con el meñique de la otra mano.
    prims.push(...dedo([[nA[3]![0], nA[3]![1], 0.026], [0.099, 92, 0.022], [0.106, 136, 0.023], [0.11, 170, 0.023]], 0.0085, MANO_A));
  } else {
    prims.push(...dedoRodeando(nA[3]![0], nA[3]![1], 200, 0.0085, MANO_A, 0.006));
  }
  // pulgar corto, encima del puño y algo hacia el lado contrario al objetivo
  prims.push(...dedo([[0.012, 14, 0.032], [0.05, -10, 0.015], [0.078, -16, 0.012]], 0.0098, MANO_A));

  const guias: Linea3D[] = [];
  const etiquetas: Escena['etiquetas'] = [];
  // Dirección del hombro de atrás (el derecho en un diestro) vista desde las manos.
  const haciaHombro = v.norm([-0.38, 0.85, -0.3]);
  const uveA = enPuno(0.03, 12, 0.03);
  guias.push({ a: uveA, b: v.sum(uveA, v.mul(haciaHombro, 0.09)), color: BANDERA, discontinua: true, ancho: 1.6, flecha: true });

  if (opc.manos === 'dos') {
    // ── Mano de abajo (derecha en un diestro) ──
    const sB =
      opc.union === 'solapado' ? [0.102, 0.114, 0.133, 0.152]
      : opc.union === 'entrelazado' ? [0.102, 0.118, 0.136, 0.155]
      : [0.102, 0.12, 0.138, 0.157];
    const nB: [number, number, number][] = [[sB[0]!, -97, 0.024], [sB[1]!, -86, 0.026], [sB[2]!, -75, 0.027], [sB[3]!, -63, 0.026]];
    const munecaB = enPuno(0.07, -62, 0.05);
    const nudB = nB.map(([s, psi, h]) => enPuno(s, psi, h));
    prims.push(antebrazo(munecaB, v.sum(v.mul(EJE, -0.7), v.sum(v.mul(LADO_OBJ, -0.38), v.mul(ARRIBA, 0.35))), MANO_B, 'manoB'));
    prims.push(...dorso(munecaB, nudB, MANO_B, 'manoB'));
    // la palma de abajo tapa el pulgar de la mano de arriba
    prims.push({ tipo: 'esfera', c: enPuno(0.068, -4, 0.026), r: 0.018, color: MANO_B, grupo: 'manoB' });
    prims.push({ tipo: 'esfera', c: enPuno(0.088, -24, 0.026), r: 0.017, color: MANO_B, grupo: 'manoB' });
    prims.push(...nudillos(nudB, MANO_B_OSC));
    if (opc.union === 'solapado') {
      // el meñique de abajo se apoya por fuera, entre el índice y el corazón de arriba
      prims.push(...dedo([[sB[0]!, -97, 0.024], [0.094, -138, 0.023], [0.084, -176, 0.025], [0.079, -204, 0.025]], 0.0075, MANO_B));
    } else if (opc.union === 'entrelazado') {
      prims.push(...dedo([[sB[0]!, -97, 0.024], [0.096, -130, 0.016], [0.088, -166, 0.014], [0.083, -196, 0.014]], 0.0075, MANO_B));
    } else {
      prims.push(...dedoRodeando(sB[0]!, -97, -214, 0.0075, MANO_B));
    }
    prims.push(...dedoRodeando(nB[1]![0], nB[1]![1], -226, 0.0083, MANO_B));
    prims.push(...dedoRodeando(nB[2]![0], nB[2]![1], -232, 0.0086, MANO_B));
    prims.push(...dedoRodeando(nB[3]![0], nB[3]![1], -222, 0.0085, MANO_B, 0.007));
    prims.push(...dedo([[0.095, -44, 0.032], [0.126, 4, 0.0145], [0.148, 16, 0.012]], 0.0098, MANO_B));
    const uveB = enPuno(0.104, -10, 0.032);
    guias.push({ a: uveB, b: v.sum(uveB, v.mul(haciaHombro, 0.09)), color: BANDERA, discontinua: true, ancho: 1.6, flecha: true });
  }

  const hombro = opc.zurdo ? 'izquierdo' : 'derecho';
  etiquetas.push({ p: v.sum(uveA, v.mul(haciaHombro, 0.09)), texto: [opc.manos === 'dos' ? 'las dos V apuntan' : 'la V apunta', `al hombro ${hombro}`], dx: -6, dy: -10, ancla: 'end' });
  etiquetas.push({ p: nudA[0]!, texto: ['nudillos:', 'ves 2 o 3'], dx: 22, dy: 0, color: '#1E2B23' });
  return { prims, guias, etiquetas };
}
