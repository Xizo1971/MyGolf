// Modelo del curso. Tres niveles; cada nivel es un recorrido de hoyos.
// Un «hoyo» es una lección; cada «golpe» es un paso de la lección; el par es el número
// de golpes. El texto de las lecciones está en español (contenido/es); cuando haya otros
// idiomas, cada idioma tendrá su carpeta.

import type { FiguraId } from '../figuras';

export type Nivel = 'principiante' | 'intermedio' | 'avanzado';

/** Párrafo con negritas marcadas como **así** y cursivas como *así*. */
export type Parrafo = string;

export interface Golpe {
  titulo: string;
  texto: Parrafo[];
  /** Dibujo que acompaña al golpe. */
  figura?: { id: FiguraId; pie?: string };
  /** Consejo práctico, en tono de caddie, escrito «a mano». */
  caddie?: string;
  /** Ejercicio para hacer en casa o en el campo de prácticas. */
  ejercicio?: string;
}

export interface Pregunta {
  enunciado: string;
  opciones: string[];
  /** Índice de la opción correcta. */
  correcta: number;
  explicacion: string;
}

export interface Fuente {
  titulo: string;
  url: string;
}

export interface Hoyo {
  nivel: Nivel;
  numero: number;
  titulo: string;
  /** Una frase: qué sabrás hacer al terminar. */
  objetivo: string;
  minutos: number;
  golpes: Golpe[];
  preguntas: Pregunta[];
  /** Fuentes de los datos de reglas o de hechos comprobables. */
  fuentes: Fuente[];
  /** Pendiente de que lo revise el profesor (se avisa en la lección). */
  revisadoPorProfe: boolean;
}

/** Entrada del programa: lo que se sabe de cada hoyo aunque aún no esté escrito. */
export interface EntradaPrograma {
  nivel: Nivel;
  numero: number;
  titulo: string;
  objetivo: string;
  puntos: string[];
}

export interface FichaNivel {
  id: Nivel;
  /** Nombre del recorrido, en el lenguaje de la libreta. */
  nombre: string;
  /** Nivel en palabras llanas. */
  etiqueta: string;
  descripcion: string;
}

/** Identificador estable de un hoyo: «principiante-3». */
export function idHoyo(nivel: Nivel, numero: number): string {
  return `${nivel}-${numero}`;
}
