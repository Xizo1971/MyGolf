// Punto de entrada del curso: programa completo + hoyos ya escritos.
import { PROGRAMA } from './programa';
import type { EntradaPrograma, Hoyo } from './tipos';
import { HOYO_1, HOYO_2, HOYO_3, HOYO_4 } from './contenido/es/ida-juego';
import { HOYO_5, HOYO_6, HOYO_7, HOYO_8, HOYO_9 } from './contenido/es/ida-tecnica';

export { PROGRAMA };
export type { EntradaPrograma, Hoyo };

export const HOYOS: Hoyo[] = [HOYO_1, HOYO_2, HOYO_3, HOYO_4, HOYO_5, HOYO_6, HOYO_7, HOYO_8, HOYO_9];

export function hoyo(numero: number): Hoyo | undefined {
  return HOYOS.find((h) => h.numero === numero);
}

/** Par de un hoyo escrito: su número de golpes. */
export function par(h: Hoyo): number {
  return h.golpes.length;
}
