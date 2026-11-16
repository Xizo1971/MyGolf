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

// --- El swing: la postura se mueve con unos pocos «mandos» --------------------------

/**
 * Mandos del swing, en grados (salvo los que se indican). Positivo = hacia atrás
 * (lejos del objetivo); negativo = hacia el objetivo.
 */
export interface FaseSwing {
  /** Giro de hombros alrededor de la columna. */
  giro: number;
  /** Los brazos suben respecto al pecho (giran sobre la línea de los hombros). */
  levantar: number;
  /** Bisagra de las muñecas: el palo se acerca al antebrazo. */
  bisagra: number;
  /** Los antebrazos ruedan: el palo gira alrededor del brazo adelantado (opcional). */
  rodar?: number;
  /** Giro de las caderas alrededor de la vertical. */
  caderas: number;
  /** Desplazamiento de la pelvis y del tronco hacia el objetivo (m). */
  desplazar: number;
  /** La espalda se endereza (al final del swing). */
  erguir: number;
  /** 0 = piernas de la postura; 1 = piernas del final (pie de atrás de puntillas). */
  piernas: number;
}

export const QUIETO: FaseSwing = { giro: 0, levantar: 0, bisagra: 0, caderas: 0, desplazar: 0, erguir: 0, piernas: 0 };

const ARRIBA_Y: V3 = [0, 1, 0];

function cruz(a: V3, b: V3): V3 {
  return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
}

export function poseSwing(base: Articulaciones, f: FaseSwing): Articulaciones {
  let j = { ...base };
  // 1. Bisagra: el palo (y la mano de abajo, que va en él) gira alrededor de la mano de arriba,
  //    en el plano del brazo adelantado y el palo.
  if (f.bisagra) {
    const brazo = v.norm(v.res(j.manoI, j.hombroI));
    const palo = v.norm(v.res(j.talonPalo, j.puno));
    const eje = v.norm(cruz(brazo, palo));
    const r = (q: V3) => rotar(q, j.manoI, eje, f.bisagra);
    j = { ...j, manoD: r(j.manoD), puno: r(j.puno), talonPalo: r(j.talonPalo), puntaPalo: r(j.puntaPalo) };
  }
  // 1b. Rodar los antebrazos: el palo gira alrededor del brazo adelantado.
  if (f.rodar) {
    const eje = v.norm(v.res(j.manoI, j.hombroI));
    const r = (q: V3) => rotar(q, j.manoI, eje, f.rodar!);
    j = { ...j, manoD: r(j.manoD), puno: r(j.puno), talonPalo: r(j.talonPalo), puntaPalo: r(j.puntaPalo) };
  }
  // 2. Los brazos suben por delante del pecho: giro sobre la línea de los hombros.
  if (f.levantar) {
    const eje = v.norm(v.res(j.hombroI, j.hombroD));
    const c = v.entre(j.hombroI, j.hombroD, 0.5);
    const r = (q: V3) => rotar(q, c, eje, -f.levantar);
    j = { ...j, codoI: r(j.codoI), codoD: r(j.codoD), manoI: r(j.manoI), manoD: r(j.manoD), puno: r(j.puno), talonPalo: r(j.talonPalo), puntaPalo: r(j.puntaPalo) };
  }
  // 3. Giro de hombros alrededor de la columna (con brazos y palo).
  j = girarTriangulo(j, f.giro);
  // 4. Caderas: giran alrededor de la vertical que pasa por la pelvis.
  if (f.caderas) {
    const r = (q: V3) => rotar(q, j.pelvis, ARRIBA_Y, -f.caderas);
    j = { ...j, caderaI: r(j.caderaI), caderaD: r(j.caderaD) };
  }
  // 5. Enderezar la espalda: todo lo que va por encima de la pelvis gira sobre el eje x.
  const arriba: (keyof Articulaciones)[] = ['medio', 'cuello', 'cabeza', 'hombroI', 'hombroD', 'codoI', 'codoD', 'manoI', 'manoD', 'puno', 'talonPalo', 'puntaPalo'];
  if (f.erguir) {
    const r = (q: V3) => rotar(q, j.pelvis, [1, 0, 0], -f.erguir);
    const k = { ...j };
    for (const n of arriba) k[n] = r(j[n]);
    j = k;
  }
  // 6. Desplazamiento hacia el objetivo (pelvis, caderas y tronco).
  if (f.desplazar) {
    const d: V3 = [f.desplazar, 0, 0];
    const k = { ...j, pelvis: v.sum(j.pelvis, d), caderaI: v.sum(j.caderaI, d), caderaD: v.sum(j.caderaD, d) };
    for (const n of arriba) k[n] = v.sum(j[n], d);
    j = k;
  }
  // 7. Piernas del final: la de delante se estira y la de atrás gira sobre la punta del pie.
  if (f.piernas) {
    const w = f.piernas;
    const mover = (q: V3, d: V3): V3 => v.sum(q, v.mul(d, w));
    j = {
      ...j,
      rodillaI: mover(j.rodillaI, [0.02, 0.02, -0.07]),
      rodillaD: mover(j.rodillaD, [0.2, 0.0, 0.02]),
      tobilloD: mover(j.tobilloD, [0.06, 0.07, 0.1]),
      talonD: mover(j.talonD, [0.08, 0.14, 0.17]),
    };
  }
  return j;
}

/** Interpola entre fases (suavizado coseno). `marcas`: [tiempo, fase] ordenadas por tiempo. */
export function faseEn(marcas: [number, FaseSwing][], t: number): FaseSwing {
  if (t <= marcas[0]![0]) return marcas[0]![1];
  for (let i = 1; i < marcas.length; i++) {
    const [t1, f1] = marcas[i]!;
    if (t <= t1) {
      const [t0, f0] = marcas[i - 1]!;
      const u = (1 - Math.cos(((t - t0) / (t1 - t0)) * Math.PI)) / 2;
      const m = (a: number, b: number) => a + (b - a) * u;
      return {
        giro: m(f0.giro, f1.giro), levantar: m(f0.levantar, f1.levantar), bisagra: m(f0.bisagra, f1.bisagra),
        caderas: m(f0.caderas, f1.caderas), desplazar: m(f0.desplazar, f1.desplazar), erguir: m(f0.erguir, f1.erguir),
        piernas: m(f0.piernas, f1.piernas), rodar: m(f0.rodar ?? 0, f1.rodar ?? 0),
      };
    }
  }
  return marcas[marcas.length - 1]![1];
}
