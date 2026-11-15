// Dibujos del hoyo 6: la postura de perfil y la posición de la bola según el palo.
import { Bola, C, Lapiz, Lienzo, Rotulo, Flecha, espejo, type PropsFigura } from './comun';

/** Jugador de perfil (visto desde detrás de la línea de juego) en la postura de partida. */
export function PosturaPerfil({ zurdo }: PropsFigura) {
  const W = 350, H = 320;
  const e = espejo(W, zurdo);
  const suelo = 292;
  const cadera = { x: 122, y: 182 }, hombro = { x: 178, y: 110 }, rodilla = { x: 160, y: 236 }, tobillo = { x: 148, y: 282 };
  const manos = { x: 180, y: 198 };
  return (
    <Lienzo w={W} h={H} etiqueta="Postura de perfil: inclinado desde la cadera con la espalda recta, rodillas algo flexionadas, brazos colgando relajados y hombros sobre la punta de los pies">
      <path d={`M10 ${suelo} H340`} stroke={C.topo} strokeWidth={2} />
      <g transform={e.t}>
        {/* guías */}
        <path d={`M${hombro.x} ${hombro.y} V${suelo}`} stroke={C.bandera} strokeWidth={1.3} strokeDasharray="5 4" />
        <path d={`M${cadera.x} ${cadera.y} V${cadera.y - 92}`} stroke={C.gris} strokeWidth={1} strokeDasharray="3 4" />
        <path d={`M${cadera.x} ${cadera.y - 60} A60 60 0 0 1 ${cadera.x + 60 * Math.sin(0.66)} ${cadera.y - 60 * Math.cos(0.66)}`} fill="none" stroke={C.gris} strokeWidth={1.2} />
        {/* cuerpo */}
        <path d={`M128 ${suelo - 4} q2 -8 18 -10 l30 4 q6 2 4 8 z`} fill={C.tinta} />
        <path d={`M${tobillo.x} ${tobillo.y} L${rodilla.x} ${rodilla.y} L${cadera.x} ${cadera.y}`} fill="none" stroke={C.cuerpo} strokeWidth={17} strokeLinecap="round" strokeLinejoin="round" />
        <path d={`M${cadera.x} ${cadera.y} L${hombro.x} ${hombro.y}`} stroke="#7C9A84" strokeWidth={30} strokeLinecap="round" />
        <circle cx={194} cy={86} r={16} fill={C.piel} stroke={C.tinta} strokeWidth={1.2} />
        <path d="M180 74 q14 -12 30 2" fill="none" stroke={C.cuerpo} strokeWidth={5} strokeLinecap="round" />
        <path d={`M${hombro.x - 2} ${hombro.y + 4} L${manos.x} ${manos.y}`} stroke="#D9BFA6" strokeWidth={10} strokeLinecap="round" />
        <path d={`M${manos.x} ${manos.y} L250 ${suelo - 6}`} stroke="#8C9488" strokeWidth={3} />
        <path d={`M244 ${suelo - 10} l14 2 l2 8 l-16 0 z`} fill="#B9BFBA" stroke={C.tinta} />
        <circle cx={manos.x} cy={manos.y} r={7} fill={C.manoA} stroke={C.tinta} />
        <Bola x={268} y={suelo - 5} r={5} />
      </g>
      <Lapiz x={e.x(214)} y={124} t={['espalda recta,', 'inclinada desde', 'la cadera']} ancla={e.a('start')} tam={17} />
      <Lapiz x={e.x(14)} y={150} t={['la cadera', 'hacia atrás']} ancla={e.a('start')} tam={17} color={C.tinta} />
      <Lapiz x={e.x(196)} y={210} t={['brazos', 'colgando']} ancla={e.a('start')} tam={17} color={C.tinta} />
      <Lapiz x={e.x(14)} y={246} t={['rodillas un poco', 'flexionadas']} ancla={e.a('start')} tam={17} color={C.tinta} />
      <Lapiz x={e.x(186)} y={314} t="hombros sobre la punta de los pies" ancla={e.a('middle')} tam={17} />
      <Rotulo x={e.x(14)} y={20} t={zurdo ? 'De perfil · zurdo' : 'De perfil · diestro'} ancla={e.a('start')} />
    </Lienzo>
  );
}

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
