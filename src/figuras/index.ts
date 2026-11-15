// Catálogo de dibujos del curso. Una lección se refiere a un dibujo por su id.
import type { ComponentType } from 'react';
import type { PropsFigura } from './comun';
import { Estacas, PlanoHoyo, Tarjeta, ZonaSalida } from './campo';
import { Bolsa, Loft } from './palos';
import { GreenCuidados, Seguridad } from './etiqueta';
import { GripV, TiposGrip } from './grip';
import { PosicionBola, PosturaPerfil } from './postura';
import { ViasTren } from './alineacion';
import { Caida, Pendulo } from './putt';
import { ChipPostura, VueloRodado } from './chip';

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
  'grip-v': { componente: GripV, porMano: true },
  'tipos-grip': { componente: TiposGrip, porMano: true },
  'postura-perfil': { componente: PosturaPerfil, porMano: true },
  'posicion-bola': { componente: PosicionBola, porMano: true },
  'vias-tren': { componente: ViasTren, porMano: true },
  pendulo: { componente: Pendulo, porMano: true },
  caida: { componente: Caida, porMano: false },
  'vuelo-rodado': { componente: VueloRodado, porMano: false },
  'chip-postura': { componente: ChipPostura, porMano: true },
} satisfies Record<string, FichaFigura>;

export type FiguraId = keyof typeof FIGURAS;
