// Posturas del maniquí a partir de unos pocos parámetros (putt, chip…), y el giro de
// hombros, brazos y palo alrededor de la columna para animar el golpe.
// Ejes y medidas: ver motor.ts y maniqui.ts (jugador diestro; el objetivo está en +x).
import { v, type V3 } from './motor';
import type { Articulaciones } from './maniqui';

export type TipoPalo = 'hierro' | 'putter';

export interface ParamsPose {
  /** Media separación de los tobillos (m). */
  pies: number;
  /** Retrasa el pie adelantado (m): pies abiertos hacia el objetivo. */
  abrir?: number;
  pelvis: V3;
  /** Inclinación de la espalda desde la vertical, hacia la bola (grados). */
  inclinacion: number;
  /** Inclinación de la espalda hacia el objetivo (+) o hacia atrás (−), en grados. */
  ladeo?: number;
  /** La cabeza se inclina esto más que la espalda (grados). */
  cabezaExtra?: number;
  rodilla: { y: number; z: number };
  /** Cuánto más bajo está el hombro de atrás (m). En el putt, 0: hombros nivelados. */
  hombroBajo?: number;
  /** Codos hacia fuera (m). */
  codosFuera?: number;
  /** Punto medio entre las dos manos. */
  manos: V3;
  bola: V3;
  palo: TipoPalo;
}

/** Gira el punto p alrededor del eje (unitario) que pasa por `centro` (fórmula de Rodrigues). */
export function rotar(p: V3, centro: V3, eje: V3, grados: number): V3 {
  const a = (grados * Math.PI) / 180, c = Math.cos(a), s = Math.sin(a);
  const r = v.res(p, centro);
  const k = eje;
  const kxr: V3 = [k[1] * r[2] - k[2] * r[1], k[2] * r[0] - k[0] * r[2], k[0] * r[1] - k[1] * r[0]];
  const kr = k[0] * r[0] + k[1] * r[1] + k[2] * r[2];
  return v.sum(centro, v.sum(v.sum(v.mul(r, c), v.mul(kxr, s)), v.mul(k, kr * (1 - c))));
}

export function construirPose(p: ParamsPose): Articulaciones {
  const rad = (g: number) => (g * Math.PI) / 180;
  const inc = rad(p.inclinacion), lad = rad(p.ladeo ?? 0);
  const eje = v.norm([Math.sin(lad), Math.cos(inc), Math.sin(inc)]);
  const cuello = v.sum(p.pelvis, v.mul(eje, 0.5));
  const medio = v.sum(p.pelvis, v.mul(eje, 0.25));
  const aCab = inc + rad(p.cabezaExtra ?? 8);
  const cabeza = v.sum(cuello, v.mul(v.norm([Math.sin(lad), Math.cos(aCab), Math.sin(aCab)]), 0.16));
  const baja = p.hombroBajo ?? 0.04;
  const hombroI = v.sum(cuello, [0.18, -0.02, -0.02]);
  const hombroD = v.sum(cuello, [-0.18, -0.02 - baja, -0.02]);

  // La cabeza del palo: la bola queda delante de la cara, en el centro.
  const putter = p.palo === 'putter';
  const talonPalo: V3 = [p.bola[0] - (putter ? 0.035 : 0.045), putter ? 0.022 : 0.03, p.bola[2] - 0.05];
  const puntaPalo = v.sum(talonPalo, putter ? [0, 0, 0.1] : [0, -0.005, 0.09]);
  const dir = v.norm(v.res(talonPalo, p.manos));
  const manoI = v.sum(p.manos, v.mul(dir, -0.025));
  const manoD = v.sum(p.manos, v.mul(dir, 0.025));
  const puno = v.sum(manoI, v.mul(dir, putter ? -0.1 : -0.07));
  const fuera = p.codosFuera ?? 0.01;

  const zI = -(p.abrir ?? 0);
  const x = p.pies;
  return {
    tobilloI: [x, 0.08, zI], tobilloD: [-x, 0.08, 0],
    // el pie adelantado, algo abierto (la punta mira un poco hacia el objetivo)
    puntaI: [x + 0.03 + (p.abrir ? 0.04 : 0), 0.035, zI + 0.17], puntaD: [-x - 0.02, 0.035, 0.17],
    talonI: [x, 0.035, zI - 0.06], talonD: [-x, 0.035, -0.06],
    rodillaI: [x - 0.01 + p.pelvis[0] * 0.5, p.rodilla.y, p.rodilla.z + zI], rodillaD: [-x + 0.01 + p.pelvis[0] * 0.5, p.rodilla.y, p.rodilla.z],
    caderaI: [p.pelvis[0] + 0.1, p.pelvis[1] - 0.02, p.pelvis[2]], caderaD: [p.pelvis[0] - 0.1, p.pelvis[1] - 0.02, p.pelvis[2]],
    pelvis: p.pelvis, medio, cuello, cabeza, hombroI, hombroD,
    codoI: v.sum(v.entre(hombroI, manoI, 0.52), [fuera, 0, 0.02]),
    codoD: v.sum(v.entre(hombroD, manoD, 0.5), [-fuera, 0, 0.02]),
    manoI, manoD, puno, talonPalo, puntaPalo, bola: p.bola,
  };
}

/** Centro del pecho: el punto sobre la columna alrededor del que giran los hombros. */
export function centroPecho(j: Articulaciones): V3 {
  return v.entre(j.pelvis, j.cuello, 0.82);
}

/**
 * Gira hombros, brazos, manos y palo alrededor de la columna (el «triángulo» se mueve
 * entero, sin doblar las muñecas). Grados positivos = hacia atrás (lejos del objetivo).
 */
export function girarTriangulo(j: Articulaciones, grados: number): Articulaciones {
  if (grados === 0) return j;
  const eje = v.norm(v.res(j.cuello, j.pelvis));
  const c = centroPecho(j);
  // Visto desde arriba, el giro positivo alrededor del eje lleva el palo hacia el objetivo.
  const r = (q: V3) => rotar(q, c, eje, -grados);
  return {
    ...j,
    hombroI: r(j.hombroI), hombroD: r(j.hombroD), codoI: r(j.codoI), codoD: r(j.codoD),
    manoI: r(j.manoI), manoD: r(j.manoD), puno: r(j.puno), talonPalo: r(j.talonPalo), puntaPalo: r(j.puntaPalo),
  };
}

/** Postura del putt: pies a la anchura de los hombros, hombros nivelados, ojos encima de la bola. */
export const POSE_PUTT: ParamsPose = {
  pies: 0.16,
  pelvis: [0, 0.86, -0.13],
  inclinacion: 42,
  cabezaExtra: 8,
  rodilla: { y: 0.47, z: 0.05 },
  hombroBajo: 0,
  codosFuera: 0.06,
  manos: [0.02, 0.66, 0.17],
  bola: [0.04, 0.0213, 0.33],
  palo: 'putter',
};

/** Postura del chip: pies juntos y algo abiertos, bola retrasada, peso y manos hacia el objetivo. */
export const POSE_CHIP: ParamsPose = {
  pies: 0.08,
  abrir: 0.05,
  pelvis: [0.04, 0.88, -0.1],
  inclinacion: 34,
  ladeo: 4,
  cabezaExtra: 12,
  rodilla: { y: 0.47, z: 0.07 },
  hombroBajo: 0.02,
  codosFuera: 0.02,
  manos: [0.07, 0.68, 0.27],
  bola: [-0.03, 0.0213, 0.47],
  palo: 'hierro',
};
