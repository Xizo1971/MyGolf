// Modelo del curso. Un «hoyo» es una lección; cada «golpe» es un paso de la lección.
// El par del hoyo es el número de golpes. El texto de las lecciones está en español
// (contenido/es); cuando haya otros idiomas, cada idioma tendrá su carpeta.

import type { FiguraId } from '../figuras';

/** Párrafo con negritas marcadas como **así**. */
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
  numero: number;
  titulo: string;
  /** Una frase: qué sabrás hacer al terminar. */
  objetivo: string;
  minutos: number;
  golpes: Golpe[];
  preguntas: Pregunta[];
  /** Fuentes de los datos de reglas o de hechos comprobables. */
  fuentes: Fuente[];
  /** Pendiente de que lo revise el profesor (se enseña en la lección). */
  revisadoPorProfe: boolean;
}

/** Entrada del programa: lo que se sabe de cada hoyo aunque aún no esté escrito. */
export interface EntradaPrograma {
  numero: number;
  titulo: string;
  tramo: 'ida' | 'vuelta';
  objetivo: string;
  puntos: string[];
}
