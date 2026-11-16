// Maniquí de madera en postura de partida (setup) con un hierro 7, jugador diestro.
// Medidas en metros, para una persona de 1,75 m aprox. Ejes: ver motor.ts.
import { v, type Escena, type Linea3D, type Primitiva, type V3 } from './motor';

// Colores del maniquí de las ilustraciones (madera clara, articulaciones algo más oscuras).
const MADERA = '#DDBE92';
const ARTIC = '#CDA877';
const PUNO = '#3A3A38';
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
  // La cabeza sigue la línea de la espalda (algo más inclinada, mirando a la bola).
  const miraBola: V3 = [0, Math.cos(0.74), Math.sin(0.74)];
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

const cap = (a: V3, b: V3, r: number, color: string, grupo?: string): Primitiva => ({ tipo: 'capsula', a, b, r, color, grupo });
const esf = (c: V3, r: number, color: string): Primitiva => ({ tipo: 'esfera', c, r, color });

/** El cuerpo, el palo y la bola como primitivas: maniquí de dibujo, como en las ilustraciones. */
export function cuerpo(j: Articulaciones): Primitiva[] {
  const eje = v.norm(v.res(j.cuello, j.pelvis));
  const enEje = (t: number) => v.sum(j.pelvis, v.mul(eje, t));
  const dirCabeza = v.norm(v.res(j.cabeza, j.cuello));
  const enCabeza = (t: number) => v.sum(j.cuello, v.mul(dirCabeza, t));
  const munecaI = v.entre(j.codoI, j.manoI, 0.82), munecaD = v.entre(j.codoD, j.manoD, 0.82);
  return [
    // pies (planos y en punta) y tobillos
    cap(j.talonI, j.puntaI, 0.034, MADERA), cap(j.talonD, j.puntaD, 0.034, MADERA),
    esf(j.tobilloI, 0.032, ARTIC), esf(j.tobilloD, 0.032, ARTIC),
    // piernas: espinilla, rodilla de bola, muslo
    // (cada pieza larga en su grupo: el visor la trocea y así se pinta como una sola)
    cap(j.tobilloI, j.rodillaI, 0.046, MADERA, 'espinillaI'), cap(j.tobilloD, j.rodillaD, 0.046, MADERA, 'espinillaD'),
    esf(j.rodillaI, 0.052, ARTIC), esf(j.rodillaD, 0.052, ARTIC),
    cap(j.rodillaI, j.caderaI, 0.064, MADERA, 'musloI'), cap(j.rodillaD, j.caderaD, 0.064, MADERA, 'musloD'),
    esf(j.caderaI, 0.068, ARTIC), esf(j.caderaD, 0.068, ARTIC),
    // tronco en tres bloques: pelvis ancha, cintura estrecha y pecho
    cap(v.sum(j.caderaI, v.mul(eje, 0.05)), v.sum(j.caderaD, v.mul(eje, 0.05)), 0.105, MADERA),
    cap(enEje(0.15), enEje(0.21), 0.082, ARTIC),
    cap(enEje(0.28), enEje(0.39), 0.125, MADERA),
    cap(j.hombroI, j.hombroD, 0.07, MADERA),
    // cuello y cabeza en forma de huevo, en la línea de la espalda
    cap(enCabeza(0.0), enCabeza(0.08), 0.034, ARTIC),
    cap(enCabeza(0.13), enCabeza(0.2), 0.078, MADERA),
    // brazos: hombro, codo y muñeca de bola; manos de madera
    esf(j.hombroI, 0.052, ARTIC), esf(j.hombroD, 0.052, ARTIC),
    cap(j.hombroI, j.codoI, 0.04, MADERA), cap(j.hombroD, j.codoD, 0.04, MADERA),
    esf(j.codoI, 0.037, ARTIC), esf(j.codoD, 0.037, ARTIC),
    cap(j.codoI, munecaI, 0.034, MADERA), cap(j.codoD, munecaD, 0.034, MADERA),
    esf(munecaI, 0.027, ARTIC), esf(munecaD, 0.027, ARTIC),
    cap(munecaI, j.manoI, 0.04, MADERA), cap(munecaD, j.manoD, 0.04, MADERA),
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
    acuarela: true,
    contorno: { color: '#3D3631', ancho: 1.7 },
    guias: [
      // hombros sobre la punta de los pies
      { a: j.hombroI, b: [j.hombroI[0], 0, j.hombroI[2]], color: BANDERA, discontinua: true },
      // la espalda: una línea recta de la cadera al cuello
      { a: v.sum(j.pelvis, v.mul(ejeEspalda, -0.12)), b: v.sum(j.cuello, v.mul(ejeEspalda, 0.1)), color: GRIS, discontinua: true, ancho: 1.2 },
    ],
    etiquetasHastaPitch: 60,
    etiquetas: [
      { p: [0.95, 0, j.bola[2]], texto: ['objetivo'], dx: 4, dy: 14, color: GRIS },
      { p: j.medio, texto: ['espalda recta,', 'inclinada', 'desde la cadera'], dx: -34, dy: -40, ancla: 'end' },
      { p: j.caderaD, texto: ['la cadera', 'hacia atrás'], dx: -18, dy: 0, ancla: 'end', color: '#1E2B23' },
      { p: j.rodillaD, texto: ['rodillas un poco', 'flexionadas'], dx: -18, dy: 4, ancla: 'end', color: '#1E2B23' },
      { p: j.codoI, texto: ['brazos', 'colgando'], dx: 16, dy: 0, color: '#1E2B23' },
      { p: [j.hombroI[0], 0.02, j.hombroI[2]], texto: ['hombros sobre la', 'punta de los pies'], dx: 10, dy: 22 },
    ],
  };
}
