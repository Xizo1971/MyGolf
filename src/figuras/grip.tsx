// Dibujos del hoyo 5: las dos V del grip neutro y los tres tipos de grip.
import type { ReactElement } from 'react';
import { C, Lapiz, Lienzo, Rotulo, espejo, type PropsFigura } from './comun';

/** Chevron «V» con el vértice apuntando de (cx,cy) hacia (hx,hy). */
function Uve(p: { cx: number; cy: number; hx: number; hy: number }) {
  const dx = p.hx - p.cx, dy = p.hy - p.cy;
  const l = Math.hypot(dx, dy);
  const ux = dx / l, uy = dy / l;
  const vx = p.cx + ux * 6, vy = p.cy + uy * 6;
  const bx = vx - ux * 11, by = vy - uy * 11;
  const px = -uy * 6, py = ux * 6;
  return (
    <g>
      <path d={`M${bx + px} ${by + py} L${vx} ${vy} L${bx - px} ${by - py}`} fill="none" stroke={C.bandera} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
      <path d={`M${vx} ${vy} L${p.hx} ${p.hy}`} stroke={C.bandera} strokeWidth={1.4} strokeDasharray="5 4" />
    </g>
  );
}

/** Jugador visto de frente: las V de las dos manos apuntan a su hombro derecho. */
export function GripV({ zurdo }: PropsFigura) {
  const W = 350, H = 270;
  const e = espejo(W, zurdo);
  const hombro = { x: 118, y: 76 };
  return (
    <Lienzo
      w={W} h={H}
      etiqueta={zurdo
        ? 'Grip neutro visto de frente para un zurdo: mano derecha arriba, izquierda debajo; la V entre pulgar e índice de cada mano apunta al hombro izquierdo'
        : 'Grip neutro visto de frente para un diestro: mano izquierda arriba, derecha debajo; la V entre pulgar e índice de cada mano apunta al hombro derecho'}
    >
      <g transform={e.t}>
        <circle cx={175} cy={38} r={17} fill={C.piel} stroke={C.tinta} strokeWidth={1.2} />
        <path d="M120 70 Q175 56 230 70 Q244 74 242 92 L228 196 Q175 206 122 196 L108 92 Q106 74 120 70 Z" fill="#7C9A84" stroke={C.tinta} strokeWidth={1.2} />
        <path d="M120 84 L164 158 M230 84 L186 158" stroke="#D9BFA6" strokeWidth={14} strokeLinecap="round" />
        <path d="M175 146 V246" stroke="#8C9488" strokeWidth={3} />
        <path d="M166 244 h24 l3 9 h-30 z" fill="#B9BFBA" stroke={C.tinta} />
        <rect x={155} y={132} width={40} height={28} rx={10} fill={C.manoA} stroke={C.tinta} strokeWidth={1.3} />
        <rect x={155} y={158} width={40} height={28} rx={10} fill={C.manoB} stroke={C.tinta} strokeWidth={1.3} />
        <Uve cx={166} cy={142} hx={hombro.x} hy={hombro.y} />
        <Uve cx={166} cy={168} hx={hombro.x} hy={hombro.y} />
        <circle cx={hombro.x} cy={hombro.y} r={5} fill={C.bandera} />
      </g>
      <Lapiz x={e.x(20)} y={30} t={zurdo ? ['su hombro', 'izquierdo'] : ['su hombro', 'derecho']} ancla={e.a('start')} />
      <Lapiz x={e.x(250)} y={150} t={zurdo ? ['mano', 'derecha'] : ['mano', 'izquierda']} ancla={e.a('start')} tam={17} color={C.verde} />
      <Lapiz x={e.x(250)} y={196} t={zurdo ? ['mano', 'izquierda'] : ['mano', 'derecha']} ancla={e.a('start')} tam={17} color={C.gris} />
      <Rotulo x={e.x(14)} y={262} t="Visto de frente" ancla={e.a('start')} />
    </Lienzo>
  );
}

function Dedo(p: { x: number; y?: number; mano: 'a' | 'b'; giro?: number }) {
  const y = p.y ?? 72;
  return (
    <rect
      x={p.x} y={y} width={10} height={36} rx={5}
      fill={p.mano === 'a' ? C.manoA : C.manoB} stroke={C.tinta} strokeWidth={1}
      transform={p.giro ? `rotate(${p.giro} ${p.x + 5} ${y + 18})` : undefined}
    />
  );
}

/** Solapado, entrelazado y diez dedos, en esquema: cómo se unen las dos manos. */
export function TiposGrip({ zurdo }: PropsFigura) {
  const W = 350, H = 230;
  const panel = (px: number, titulo: string, dedos: ReactElement[], nota: string) => (
    <g>
      <rect x={px + 4} y={82} width={104} height={16} rx={8} fill="#3E4A44" />
      {dedos}
      <Rotulo x={px + 56} y={140} t={titulo} ancla="middle" tam={14} color={C.tinta} peso={700} />
      <Lapiz x={px + 56} y={162} t={nota} ancla="middle" tam={16} color={C.gris} />
    </g>
  );
  const fila = (px: number, desde: number, n: number, mano: 'a' | 'b') =>
    Array.from({ length: n }, (_, i) => <Dedo key={`${mano}${px}${i}`} x={px + desde + i * 12} mano={mano} />);
  return (
    <Lienzo w={W} h={H} etiqueta="Tres formas de unir las manos: solapado, con el meñique de la mano de abajo encima de los dedos de la otra; entrelazado, con ese meñique cruzado con el índice; y diez dedos, todos en el palo">
      {panel(0, 'Solapado', [...fila(0, 8, 4, 'a'), ...fila(0, 62, 3, 'b'), <Dedo key="s" x={50} y={66} mano="b" giro={-8} />], 'el más común')}
      {panel(117, 'Entrelazado', [...fila(117, 8, 3, 'a'), ...fila(117, 64, 3, 'b'), <Dedo key="e1" x={117 + 46} mano="a" giro={24} />, <Dedo key="e2" x={117 + 50} mano="b" giro={-24} />], 'manos pequeñas')}
      {panel(234, 'Diez dedos', [...fila(234, 6, 4, 'a'), ...fila(234, 56, 4, 'b')], 'como un bate')}
      <rect x={14} y={192} width={14} height={14} rx={3} fill={C.manoA} stroke={C.tinta} />
      <Lapiz x={34} y={204} t={zurdo ? 'mano de arriba (la derecha)' : 'mano de arriba (la izquierda)'} tam={16} color={C.tinta} />
      <rect x={14} y={212} width={14} height={14} rx={3} fill={C.manoB} stroke={C.tinta} />
      <Lapiz x={34} y={224} t={zurdo ? 'mano de abajo (la izquierda)' : 'mano de abajo (la derecha)'} tam={16} color={C.tinta} />
      <Lapiz x={14} y={30} t="Tú eliges el que te resulte cómodo:" tam={19} />
      <Lapiz x={14} y={52} t="ninguno es «el correcto»." tam={19} />
    </Lienzo>
  );
}
