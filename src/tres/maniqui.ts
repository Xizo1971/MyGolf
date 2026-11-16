// Maniquí de madera en postura de partida (setup) con un hierro 7, jugador diestro.
// Medidas en metros, para una persona de 1,75 m aprox. Ejes: ver motor.ts.
import { v, type Escena, type Linea3D, type Primitiva, type V3 } from './motor';

const MADERA = '#D8B98F';
const ARTIC = '#C49D6B';
const CABEZA = '#DEC49E';
const MANO_A = '#CFE0B9';
const MANO_B = '#F2D3C2';
const PUNO = '#3E4A44';
const VARILLA = '#9BA39E';
const HIERRO = '#B9BFBA';
const BANDERA = '#D9541E';
const GRIS = '#5B6458';
const CUADRICULA = '#D9D1BB';

export interface Articulaciones {
  tobilloI: V3; tobilloD: V3; puntaI: V3; puntaD: V3; talonI: V3; talonD: V3;
  rodillaI: V3; rodillaD: V3; caderaI: V3; caderaD: V3; pelvis: V3; medio: V3; cuello: V3; cabeza: V3;
  hombroI: V3; hombroD: V3; codoI: V3; codoD: V3; manoI: V3; manoD: V3;
  /** Extremo superior del palo, talón y punta de la cabeza del palo. */
  puno: V3; talonPalo: V3; puntaPalo: V3; bola: V3;
}

/** Postura de partida con un hierro 7: inclinación de la espalda ≈ 37° desde la vertical. */
export function posturaHierro(): Articulaciones {
  const pelvis: V3 = [0, 0.88, -0.1];
  const inclinacion = (37 * Math.PI) / 180;
  const eje: V3 = [0, Math.cos(inclinacion), Math.sin(inclinacion)];
  const cuello = v.sum(pelvis, v.mul(eje, 0.5));
  const medio = v.sum(pelvis, v.mul(eje, 0.25));
  const miraBola: V3 = [0, Math.cos(1.0), Math.sin(1.0)];
  const cabeza = v.sum(cuello, v.mul(miraBola, 0.16));
  const hombroI: V3 = [0.18, cuello[1] - 0.02, cuello[2] - 0.02];
  const hombroD: V3 = [-0.17, cuello[1] - 0.06, cuello[2] - 0.01];
  const manoI: V3 = [0.05, 0.74, 0.32];
  const manoD: V3 = [0.045, 0.69, 0.345];
  // El palo pasa por las dos manos y llega al suelo (ángulo de lie ≈ 63°).
  const dir = v.norm(v.res(manoD, manoI));
  const t = (manoI[1] - 0.03) / -dir[1];
  const talonPalo = v.sum(manoI, v.mul(dir, t));
  const puno = v.sum(manoI, v.mul(dir, -0.07));
  const puntaPalo: V3 = [talonPalo[0], 0.025, talonPalo[2] + 0.09];
  return {
    tobilloI: [0.18, 0.08, 0], tobilloD: [-0.18, 0.08, 0],
    puntaI: [0.21, 0.035, 0.17], puntaD: [-0.2, 0.035, 0.17],
    talonI: [0.18, 0.035, -0.06], talonD: [-0.18, 0.035, -0.06],
    rodillaI: [0.17, 0.47, 0.09], rodillaD: [-0.17, 0.47, 0.09],
    caderaI: [0.1, 0.86, -0.1], caderaD: [-0.1, 0.86, -0.1],
    pelvis, medio, cuello, cabeza, hombroI, hombroD,
    codoI: v.sum(v.entre(hombroI, manoI, 0.52), [0.01, 0, 0.02]),
    codoD: v.sum(v.entre(hombroD, manoD, 0.5), [0.03, 0, -0.01]),
    manoI, manoD, puno, talonPalo, puntaPalo,
    bola: [talonPalo[0] + 0.045, 0.0213, talonPalo[2] + 0.05],
  };
}

const cap = (a: V3, b: V3, r: number, color: string): Primitiva => ({ tipo: 'capsula', a, b, r, color });
const esf = (c: V3, r: number, color: string): Primitiva => ({ tipo: 'esfera', c, r, color });

/** El cuerpo, el palo y la bola como primitivas. */
export function cuerpo(j: Articulaciones): Primitiva[] {
  return [
    // pies y piernas
    cap(j.talonI, j.puntaI, 0.042, MADERA), cap(j.talonD, j.puntaD, 0.042, MADERA),
    cap(j.tobilloI, j.rodillaI, 0.052, MADERA), cap(j.tobilloD, j.rodillaD, 0.052, MADERA),
    esf(j.rodillaI, 0.058, ARTIC), esf(j.rodillaD, 0.058, ARTIC),
    cap(j.rodillaI, j.caderaI, 0.072, MADERA), cap(j.rodillaD, j.caderaD, 0.072, MADERA),
    // tronco
    cap(j.caderaI, j.caderaD, 0.1, MADERA),
    cap(j.pelvis, j.medio, 0.112, MADERA),
    cap(j.medio, v.entre(j.medio, j.cuello, 0.75), 0.13, MADERA),
    cap(j.hombroI, j.hombroD, 0.062, MADERA),
    cap(j.cuello, v.entre(j.cuello, j.cabeza, 0.5), 0.045, ARTIC),
    esf(j.cabeza, 0.102, CABEZA),
    // brazos (izquierdo = mano de arriba en verde, derecho = mano de abajo en rosa, como en el curso)
    esf(j.hombroI, 0.055, ARTIC), esf(j.hombroD, 0.055, ARTIC),
    cap(j.hombroI, j.codoI, 0.044, MADERA), cap(j.hombroD, j.codoD, 0.044, MADERA),
    esf(j.codoI, 0.042, ARTIC), esf(j.codoD, 0.042, ARTIC),
    cap(j.codoI, j.manoI, 0.038, MADERA), cap(j.codoD, j.manoD, 0.038, MADERA),
    esf(j.manoI, 0.047, MANO_A), esf(j.manoD, 0.047, MANO_B),
    // palo y bola
    cap(j.puno, v.entre(j.puno, j.talonPalo, 0.28), 0.014, PUNO),
    cap(v.entre(j.puno, j.talonPalo, 0.28), j.talonPalo, 0.0065, VARILLA),
    cap(j.talonPalo, j.puntaPalo, 0.024, HIERRO),
    esf(j.bola, 0.0213, '#FFFFFF'),
  ];
}

/** Cuadrícula del suelo y línea hacia el objetivo. */
export function suelo(j: Articulaciones): Linea3D[] {
  const l: Linea3D[] = [];
  for (let x = -0.6; x <= 0.81; x += 0.2) l.push({ a: [x, 0, -0.45], b: [x, 0, 1.05], color: CUADRICULA, ancho: 1 });
  for (let z = -0.45; z <= 1.06; z += 0.25) l.push({ a: [-0.6, 0, z], b: [0.8, 0, z], color: CUADRICULA, ancho: 1 });
  l.push({ a: [-0.55, 0, j.bola[2]], b: [0.95, 0, j.bola[2]], color: BANDERA, ancho: 2, flecha: true });
  return l;
}

/** Escena «postura» con sus guías y notas. */
export function escenaPostura(): Escena {
  const j = posturaHierro();
  const ejeEspalda = v.norm(v.res(j.cuello, j.pelvis));
  return {
    prims: cuerpo(j),
    fondo: suelo(j),
    guias: [
      // hombros sobre la punta de los pies
      { a: j.hombroI, b: [j.hombroI[0], 0, j.hombroI[2]], color: BANDERA, discontinua: true },
      // la espalda: una línea recta de la cadera al cuello
      { a: v.sum(j.pelvis, v.mul(ejeEspalda, -0.12)), b: v.sum(j.cuello, v.mul(ejeEspalda, 0.1)), color: GRIS, discontinua: true, ancho: 1.2 },
    ],
    etiquetasHastaPitch: 60,
    etiquetas: [
      { p: [0.95, 0, j.bola[2]], texto: ['objetivo'], dx: 4, dy: 14, color: GRIS },
      { p: v.sum(j.cuello, v.mul(ejeEspalda, 0.1)), texto: ['espalda recta,', 'inclinada desde la cadera'], dx: -10, dy: -14, ancla: 'end' },
      { p: j.caderaD, texto: ['la cadera', 'hacia atrás'], dx: -18, dy: 0, ancla: 'end', color: '#1E2B23' },
      { p: j.rodillaD, texto: ['rodillas un poco', 'flexionadas'], dx: -18, dy: 4, ancla: 'end', color: '#1E2B23' },
      { p: j.codoI, texto: ['brazos', 'colgando'], dx: 16, dy: 0, color: '#1E2B23' },
      { p: [j.hombroI[0], 0.02, j.hombroI[2]], texto: ['hombros sobre la', 'punta de los pies'], dx: 10, dy: 22 },
    ],
  };
}
