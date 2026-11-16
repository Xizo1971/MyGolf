// Catálogo de dibujos del curso. Una lección se refiere a un dibujo por su id.
import type { ComponentType } from 'react';
import type { PropsFigura } from './comun';
import { Estacas, PlanoHoyo, Tarjeta, ZonaSalida } from './campo';
import { Bolsa, Loft } from './palos';
import { GreenCuidados, Seguridad } from './etiqueta';
import { PosicionBola } from './postura';
import { Chip3D, Grip3D, Impacto3D, ManoArriba3D, MedioSwing3D, PuttPostura3D, SwingCompleto3D, TiposGrip3D } from './tres';
import { PosturaLateral, PuttFrente } from './ilustradas';
import { ViasTren } from './alineacion';
import { Caida } from './putt';
import { VueloRodado } from './chip';

export interface FichaFigura {
  componente: ComponentType<PropsFigura>;
  /** true si el dibujo cambia para zurdos. */
  porMano: boolean;
}

export const FIGURAS = {
  'plano-hoyo': { componente: PlanoHoyo, porMano: false },
  tarjeta: { componente: Tarjeta, porMano: false },
  estacas: { componente: Estacas, porMano: false },
  'zona-salida': { componente: ZonaSalida, porMano: false },
  bolsa: { componente: Bolsa, porMano: false },
  loft: { componente: Loft, porMano: false },
  seguridad: { componente: Seguridad, porMano: true },
  'green-cuidados': { componente: GreenCuidados, porMano: false },
  'mano-arriba-3d': { componente: ManoArriba3D, porMano: true },
  'grip-3d': { componente: Grip3D, porMano: true },
  'tipos-grip-3d': { componente: TiposGrip3D, porMano: true },
  'postura-lateral': { componente: PosturaLateral, porMano: true },
  'posicion-bola': { componente: PosicionBola, porMano: true },
  'vias-tren': { componente: ViasTren, porMano: true },
  'putt-postura-3d': { componente: PuttPostura3D, porMano: true },
  'putt-frente': { componente: PuttFrente, porMano: true },
  caida: { componente: Caida, porMano: false },
  'vuelo-rodado': { componente: VueloRodado, porMano: false },
  'chip-3d': { componente: Chip3D, porMano: true },
  'medio-swing-3d': { componente: MedioSwing3D, porMano: true },
  'swing-3d': { componente: SwingCompleto3D, porMano: true },
  'impacto-3d': { componente: Impacto3D, porMano: true },
} satisfies Record<string, FichaFigura>;

export type FiguraId = keyof typeof FIGURAS;
