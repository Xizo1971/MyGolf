// Dibujo de la posición de la bola según el palo (la postura del cuerpo está en 3D: tres.tsx).
import { Bola, C, Lapiz, Lienzo, Rotulo, Flecha, espejo, type PropsFigura } from './comun';

function Pies(p: { y: number; izq: number; der: number }) {
  return (
    <g fill={C.tinta}>
      <ellipse cx={p.izq} cy={p.y} rx={8} ry={18} />
      <ellipse cx={p.der} cy={p.y} rx={8} ry={18} />
    </g>
  );
}

/** Desde arriba: la bola va más adelantada cuanto más largo es el palo. */
export function PosicionBola({ zurdo }: PropsFigura) {
  const W = 350, H = 300;
  const e = espejo(W, zurdo);
  const filas = [
    { y: 70, nombre: 'Wedge', izq: 222, der: 270, bola: 246, nota: ['pies juntos,', 'bola en el centro'] },
    { y: 160, nombre: 'Hierro 7', izq: 212, der: 280, bola: 257, nota: ['bola un poco', 'adelantada'] },
    { y: 250, nombre: 'Driver', izq: 196, der: 296, bola: 294, nota: ['bola frente', zurdo ? 'al talón derecho' : 'al talón izquierdo'] },
  ];
  return (
    <Lienzo w={W} h={H} etiqueta="Posición de la bola vista desde arriba: con el wedge, pies juntos y bola en el centro; con el hierro 7, un poco por delante del centro; con el driver, pies más separados y bola frente al talón del pie más cercano al objetivo">
      <g transform={e.t}>
        <Flecha x1={250} y1={28} x2={330} y2={28} color={C.tinta} />
        {filas.map((f) => (
          <g key={f.nombre}>
            <path d={`M246 ${f.y - 26} V${f.y + 44}`} stroke={C.gris} strokeDasharray="3 4" />
            <Pies y={f.y} izq={f.izq} der={f.der} />
            <Bola x={f.bola} y={f.y + 34} r={5} />
          </g>
        ))}
      </g>
      <Rotulo x={e.x(336)} y={18} t="hacia el objetivo" ancla={e.a('end')} />
      {filas.map((f) => (
        <g key={f.nombre}>
          <Rotulo x={e.x(14)} y={f.y - 6} t={f.nombre} ancla={e.a('start')} tam={14} color={C.tinta} peso={700} />
          <Lapiz x={e.x(14)} y={f.y + 18} t={f.nota} ancla={e.a('start')} tam={17} />
        </g>
      ))}
    </Lienzo>
  );
}
