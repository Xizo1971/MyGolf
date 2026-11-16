// Escenas 3D del juego corto: el putt y el chip, con su giro de hombros para animarlos.
import { v, type Escena, type Linea3D, type V3 } from './motor';
import { cuerpo, suelo } from './maniqui';
import { POSE_CHIP, POSE_PUTT, centroPecho, construirPose, girarTriangulo, rotar } from './poses';

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
