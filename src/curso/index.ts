// Punto de entrada del curso: niveles, programa completo y hoyos ya escritos.
import { NIVELES, PROGRAMA, programaDe } from './programa';
import { idHoyo, type EntradaPrograma, type FichaNivel, type Hoyo, type Nivel } from './tipos';
import { PRINCIPIANTE } from './contenido/es/principiante';

export { NIVELES, PROGRAMA, programaDe, idHoyo };
export type { EntradaPrograma, FichaNivel, Hoyo, Nivel };

export const HOYOS: Hoyo[] = [...PRINCIPIANTE];

export function hoyo(nivel: Nivel, numero: number): Hoyo | undefined {
  return HOYOS.find((h) => h.nivel === nivel && h.numero === numero);
}

export function hoyosDe(nivel: Nivel): Hoyo[] {
  return HOYOS.filter((h) => h.nivel === nivel);
}

export function esNivel(x: string): x is Nivel {
  return NIVELES.some((n) => n.id === x);
}

/** Par de un hoyo escrito: su número de golpes. */
export function par(h: Hoyo): number {
  return h.golpes.length;
}
