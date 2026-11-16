// Escenas 3D: el putt, el chip y el swing (completo, medio swing e impacto), con su animación.
import { envolvente, v, type Escena, type Etiqueta3D, type Linea3D, type V3 } from './motor';
import { cuerpo, posturaHierro, suelo } from './maniqui';
import { POSE_BUNKER, POSE_CHIP, POSE_DRIVER, POSE_PUTT, QUIETO, centroPecho, construirPose, faseEn, girarTriangulo, poseSwing, rotar, type FaseSwing } from './poses';

const BANDERA = '#D9541E';
const GRIS = '#5B6458';
const VERDE = '#2E6B3C';
const TINTA = '#1E2B23';
const CONTORNO = { color: '#3D3631', ancho: 1.7 };

/** Polilínea 3D como segmentos. */
function linea(puntos: V3[], color: string, discontinua = true, ancho = 1.4): Linea3D[] {
  return puntos.slice(1).map((b, i) => ({ a: puntos[i]!, b, color, discontinua, ancho }));
}

/** Arco que recorre un punto del palo al girar el triángulo entre −max y +max grados. */
function arco(base: ReturnType<typeof construirPose>, punto: V3, max: number): V3[] {
  const eje = v.norm(v.res(base.cuello, base.pelvis));
  const c = centroPecho(base);
  const pasos = 12;
  return Array.from({ length: pasos + 1 }, (_, i) => rotar(punto, c, eje, -max + (2 * max * i) / pasos));
}

/** Amplitud del péndulo del putt (grados de giro de hombros). */
export const GIRO_PUTT = 12;
/** Amplitud del chip. */
export const GIRO_CHIP = 22;

/** El putt. `giro` mueve el triángulo (para la animación); las guías se quedan en su sitio. */
export function escenaPutt(giro = 0): Escena {
  const base = construirPose(POSE_PUTT);
  const j = girarTriangulo(base, giro);
  const centroManos = v.entre(j.manoI, j.manoD, 0.5);
  const cabezaPalo = v.entre(base.talonPalo, base.puntaPalo, 0.5);
  return {
    prims: cuerpo(j),
    fondo: suelo(base),
    acuarela: true,
    contorno: CONTORNO,
    guias: [
      // ojos encima de la bola
      { a: base.cabeza, b: [base.cabeza[0], 0, base.cabeza[2]], color: BANDERA, discontinua: true },
      // el triángulo: hombros, brazos y palo (se mueve con el golpe)
      ...linea([j.hombroD, j.hombroI, centroManos, j.hombroD], VERDE, false, 2),
      // recorrido de la cabeza del putter: tanto atrás como adelante
      ...linea(arco(base, cabezaPalo, GIRO_PUTT), GRIS),
    ],
    etiquetasHastaPitch: 60,
    etiquetas: [
      { p: base.cabeza, texto: ['ojos encima', 'de la bola'], dx: 18, dy: -6 },
      { p: v.entre(base.hombroI, base.hombroD, 0.5), texto: ['el triángulo', 'gira entero'], dx: -40, dy: -26, ancla: 'end', color: VERDE },
      { p: v.entre(base.manoI, base.manoD, 0.5), texto: ['muñecas', 'quietas'], dx: -20, dy: 6, ancla: 'end', color: TINTA },
      { p: cabezaPalo, texto: ['tanto atrás', 'como adelante'], dx: 16, dy: 26, color: TINTA },
      { p: [0.95, 0, base.bola[2]], texto: ['objetivo'], dx: 4, dy: -10, color: GRIS },
    ],
  };
}

/** El chip. */
export function escenaChip(giro = 0): Escena {
  const base = construirPose(POSE_CHIP);
  const j = girarTriangulo(base, giro);
  return {
    prims: cuerpo(j),
    fondo: suelo(base),
    acuarela: true,
    contorno: CONTORNO,
    guias: [
      // dónde está la bola respecto al centro del cuerpo
      { a: [0, 0, base.bola[2]], b: [0, 1.25, base.bola[2]], color: GRIS, discontinua: true, ancho: 1.1 },
      // el peso, hacia el pie adelantado
      { a: v.sum(base.tobilloI, [0.09, 0.34, 0]), b: v.sum(base.tobilloI, [0.09, 0.06, 0]), color: BANDERA, ancho: 2.6, flecha: true },
      // el palo, inclinado hacia el objetivo (manos por delante)
      { a: base.puno, b: base.talonPalo, color: VERDE, discontinua: true, ancho: 1.2 },
    ],
    etiquetasHastaPitch: 60,
    etiquetas: [
      { p: v.entre(base.manoI, base.manoD, 0.5), texto: ['manos por delante', 'de la bola'], dx: 18, dy: -4, color: TINTA },
      { p: v.sum(base.tobilloI, [0.09, 0.22, 0]), texto: ['más peso', 'en este pie'], dx: 12, dy: 0 },
      { p: base.bola, texto: ['bola algo', 'retrasada'], dx: -16, dy: 26, ancla: 'end', color: TINTA },
      { p: base.tobilloD, texto: ['pies juntos'], dx: -18, dy: 0, ancla: 'end', color: TINTA },
      { p: [0.95, 0, base.bola[2]], texto: ['objetivo'], dx: 4, dy: -10, color: GRIS },
    ],
  };
}

// --- El swing (hoyos 9, 10 y 11) ------------------------------------------------


export type TipoSwing = 'completo' | 'pitch' | 'impacto';

export interface MomentoSwing {
  nombre: string;
  t: number;
  fase: FaseSwing;
  notas: Etiqueta3D[];
}

const ARRIBA: FaseSwing = { giro: 100, levantar: 70, bisagra: 120, rodar: 75, caderas: 42, desplazar: -0.02, erguir: 0, piernas: 0 };
const IMPACTO: FaseSwing = { giro: -4, levantar: 0, bisagra: -4, caderas: -35, desplazar: 0.02, erguir: 0, piernas: 0.25 };
const FINAL: FaseSwing = { giro: -110, levantar: 115, bisagra: 115, caderas: -85, desplazar: 0.07, erguir: 28, piernas: 1 };
// El medio swing: brazo de arriba horizontal (las 9) y, después del golpe, el otro brazo horizontal (las 3).
const LAS9: FaseSwing = { giro: 75, levantar: 40, bisagra: 80, rodar: 75, caderas: 22, desplazar: 0, erguir: 0, piernas: 0 };
const LAS3: FaseSwing = { giro: -65, levantar: 30, bisagra: 100, caderas: -40, desplazar: 0.04, erguir: 6, piernas: 0.35 };

/** Los momentos de cada swing (t en segundos) y sus notas. */
export function momentos(tipo: TipoSwing): MomentoSwing[] {
  const j0 = posturaHierro();
  const sueloDelante = (dx: number): V3 => [j0.bola[0] + dx, 0, j0.bola[2]];
  if (tipo === 'pitch') {
    return [
      { nombre: 'Postura', t: 0, fase: QUIETO, notas: [] },
      { nombre: 'Las 9', t: 0.8, fase: LAS9, notas: [{ p: poseSwing(j0, LAS9).manoI, texto: ['brazo horizontal:', 'las 9'], dx: -10, dy: 40, ancla: 'end' }] },
      { nombre: 'Impacto', t: 1.15, fase: IMPACTO, notas: [] },
      { nombre: 'Las 3', t: 1.55, fase: LAS3, notas: [{ p: poseSwing(j0, LAS3).manoD, texto: ['el otro brazo', 'horizontal: las 3'], dx: 16, dy: -20 }] },
    ];
  }
  const impacto: Etiqueta3D[] = tipo === 'impacto'
    ? [
        { p: v.entre(poseSwing(j0, IMPACTO).manoI, poseSwing(j0, IMPACTO).manoD, 0.5), texto: ['manos por delante', 'de la cabeza', 'del palo'], dx: -40, dy: -6, ancla: 'end', color: TINTA },
        { p: sueloDelante(0.07), texto: ['el punto más bajo,', 'después de la bola'], dx: 10, dy: 30 },
        { p: v.sum(poseSwing(j0, IMPACTO).caderaI, [0.08, -0.3, 0]), texto: ['peso en el', 'pie adelantado'], dx: 22, dy: 0, color: TINTA },
      ]
    : [{ p: v.entre(poseSwing(j0, IMPACTO).manoI, poseSwing(j0, IMPACTO).manoD, 0.5), texto: ['bola primero,', 'después el suelo'], dx: 18, dy: -10, color: TINTA }];
  return [
    { nombre: 'Postura', t: 0, fase: QUIETO, notas: [] },
    { nombre: 'Arriba', t: 1.1, fase: ARRIBA, notas: [{ p: poseSwing(j0, ARRIBA).cuello, texto: ['la espalda', 'mira al objetivo'], dx: -40, dy: 40, ancla: 'end' }] },
    { nombre: 'Impacto', t: 1.45, fase: IMPACTO, notas: impacto },
    { nombre: 'Final', t: 1.85, fase: FINAL, notas: [
      { p: poseSwing(j0, FINAL).cuello, texto: ['de cara', 'al objetivo'], dx: 30, dy: 10 },
      { p: poseSwing(j0, FINAL).talonD, texto: ['de puntillas', 'con el pie de atrás'], dx: -20, dy: 14, ancla: 'end', color: TINTA },
    ] },
  ];
}

/** Escena del swing en el instante `t` (s). Las notas solo se ven en los momentos clave. */
export function escenaSwing(tipo: TipoSwing, t: number, notas: Etiqueta3D[] = []): Escena {
  const j0 = posturaHierro();
  const marcas = momentos(tipo).map((m) => [m.t, m.fase] as [number, FaseSwing]);
  const j = poseSwing(j0, faseEn(marcas, t));
  const guias: Linea3D[] = [];
  if (tipo === 'impacto') {
    // la chuleta: empieza justo después de la bola
    guias.push({ a: [j0.bola[0] + 0.03, 0.002, j0.bola[2]], b: [j0.bola[0] + 0.15, 0.002, j0.bola[2]], color: '#8A6A3E', ancho: 6 });
  }
  return {
    prims: cuerpo(j),
    fondo: suelo(j0),
    acuarela: true,
    contorno: CONTORNO,
    guias,
    etiquetas: notas,
    etiquetasHastaPitch: 60,
  };
}

/** Encuadre que abarca todo el swing (para que la cámara no baile ni se corte el palo). */
export function encuadreSwing(tipo: TipoSwing) {
  const prims = momentos(tipo).flatMap((m) => escenaSwing(tipo, m.t).prims);
  const e = envolvente(prims);
  return { c: e.c, r: e.r * 1.02 };
}

/** Postura con el driver y la bola en el tee (hoyo 13). */
export function escenaDriver(): Escena {
  const j = construirPose(POSE_DRIVER);
  const talonPie: V3 = [j.tobilloI[0] - 0.03, 0.002, j.talonI[2]];
  return {
    prims: cuerpo(j),
    fondo: suelo(j),
    acuarela: true,
    contorno: CONTORNO,
    guias: [
      // la bola, frente a la parte de dentro del talón adelantado
      { a: talonPie, b: [talonPie[0], 0.002, j.bola[2]], color: BANDERA, discontinua: true },
      // separación de los pies
      { a: [j.tobilloD[0], 0.002, -0.12], b: [j.tobilloI[0], 0.002, -0.12], color: GRIS, ancho: 1.2 },
    ],
    etiquetasHastaPitch: 60,
    etiquetas: [
      { p: j.bola, texto: ['la mitad de la bola', 'asoma por encima'], dx: 14, dy: -26 },
      { p: [talonPie[0], 0, (talonPie[2] + j.bola[2]) / 2], texto: ['frente al talón', 'adelantado'], dx: 14, dy: 24 },
      { p: [0, 0, -0.12], texto: ['pies más separados', 'que los hombros'], dx: -10, dy: 30, ancla: 'end', color: TINTA },
      { p: j.hombroD, texto: ['hombro de atrás', 'algo más bajo'], dx: -16, dy: -10, ancla: 'end', color: TINTA },
    ],
  };
}

/** Postura en el búnker, con la arena y el punto donde entra el palo (hoyo 14). */
export function escenaBunker(): Escena {
  const j = construirPose(POSE_BUNKER);
  const arena: Linea3D[] = [];
  // La arena: rayas muy juntas dentro de una elipse alrededor de los pies y la bola.
  const cx = 0.05, cz = 0.18, rx = 0.62, rz = 0.55;
  for (let z = cz - rz; z <= cz + rz; z += 0.035) {
    const k = 1 - ((z - cz) / rz) ** 2;
    if (k <= 0) continue;
    const ancho = rx * Math.sqrt(k);
    arena.push({ a: [cx - ancho, 0, z], b: [cx + ancho, 0, z], color: '#E7D6A6', ancho: 7 });
  }
  const entra = j.bola[0] - 0.05;
  return {
    prims: cuerpo(j),
    fondo: [...arena, ...suelo(j).filter((l) => l.flecha)],
    acuarela: true,
    contorno: CONTORNO,
    guias: [
      // por donde entra el palo: unos 5 cm detrás de la bola
      { a: [entra, 0.003, j.bola[2] - 0.07], b: [entra, 0.003, j.bola[2] + 0.07], color: BANDERA, ancho: 3 },
      // y sale por delante: el palo pasa por debajo de la bola
      { a: [entra, 0.004, j.bola[2]], b: [j.bola[0] + 0.07, 0.004, j.bola[2]], color: BANDERA, ancho: 1.4, discontinua: true, flecha: true },
    ],
    etiquetasHastaPitch: 60,
    etiquetas: [
      { p: [entra, 0, j.bola[2]], texto: ['el palo entra aquí,', 'unos 5 cm detrás'], dx: -14, dy: 30, ancla: 'end' },
      { p: v.entre(j.talonPalo, j.puntaPalo, 0.5), texto: ['cara abierta'], dx: 16, dy: -16, color: TINTA },
      { p: v.sum(j.tobilloI, [0.06, 0.2, 0]), texto: ['más peso en', 'el pie adelantado'], dx: 14, dy: 0, color: TINTA },
      { p: j.tobilloD, texto: ['pies clavados', 'en la arena'], dx: -16, dy: 4, ancla: 'end', color: TINTA },
    ],
  };
}
