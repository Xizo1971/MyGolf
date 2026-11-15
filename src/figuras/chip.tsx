// Dibujos del hoyo 9: vuelo y rodado según el palo, y la postura del chip.
import { Bandera, Bola, C, Flecha, Lapiz, Lienzo, Rotulo, espejo, type PropsFigura } from './comun';

/**
 * Con menos loft, la bola vuela menos y rueda más. Proporciones orientativas de la
 * «regla del 12» (rodado = 12 − número del palo; el pitching wedge cuenta como 10).
 * Las fuentes no coinciden para los wedges más abiertos, así que solo se dibujan PW, 9 y 7.
 */
export function VueloRodado() {
  const W = 350, H = 280;
  const salida = 34, hoyo = 324, anchoGreen = 84;
  const palos = [
    { y: 74, nombre: 'Pitching wedge', vuela: 1, rueda: 2, alto: 30 },
    { y: 150, nombre: 'Hierro 9', vuela: 1, rueda: 3, alto: 21 },
    { y: 226, nombre: 'Hierro 7', vuela: 1, rueda: 5, alto: 13 },
  ];
  return (
    <Lienzo w={W} h={H} etiqueta="Chip de perfil con tres palos: con el pitching wedge la bola vuela un tercio del camino y rueda dos tercios; con el hierro 9 vuela un cuarto y rueda tres cuartos; con el hierro 7 vuela una sexta parte y rueda el resto">
      {palos.map((p) => {
        const cae = salida + ((hoyo - salida) * p.vuela) / (p.vuela + p.rueda);
        return (
          <g key={p.nombre}>
            <rect x={10} y={p.y} width={anchoGreen - 10} height={8} fill={C.calle} />
            <rect x={anchoGreen} y={p.y} width={330 - anchoGreen} height={8} fill={C.green} />
            <path d={`M10 ${p.y} H340`} stroke="#86AD66" />
            <Bola x={salida} y={p.y - 4} r={4} />
            <Bandera x={hoyo} y={p.y} alto={24} />
            <path d={`M${salida} ${p.y - 4} Q${(salida + cae) / 2} ${p.y - 4 - p.alto * 2} ${cae} ${p.y - 1}`} fill="none" stroke={C.bandera} strokeWidth={2} strokeDasharray="1 5" strokeLinecap="round" />
            <path d={`M${cae} ${p.y - 2} H${hoyo - 6}`} stroke={C.verde} strokeWidth={2.6} />
            <circle cx={cae} cy={p.y - 2} r={3} fill={C.bandera} />
            <Rotulo x={12} y={p.y + 24} t={p.nombre} color={C.tinta} peso={700} tam={13} />
            <Lapiz x={338} y={p.y + 26} t={`vuela ${p.vuela} · rueda ${p.rueda}`} ancla="end" tam={17} />
          </g>
        );
      })}
      <Lapiz x={12} y={22} t="Que caiga pronto en el green y ruede." tam={18} color={C.tinta} />
      <Lapiz x={12} y={272} t="Orientativo: depende de cada green." tam={16} color={C.gris} />
    </Lienzo>
  );
}

/** De frente: pies juntos, bola atrás, más peso en el pie adelantado y manos por delante. */
export function ChipPostura({ zurdo }: PropsFigura) {
  const W = 350, H = 300;
  const e = espejo(W, zurdo);
  const suelo = 270;
  return (
    <Lienzo w={W} h={H} etiqueta="Postura del chip vista de frente: pies juntos, bola algo retrasada, más peso en el pie más cercano al objetivo y manos por delante de la bola">
      <path d={`M10 ${suelo} H340`} stroke={C.topo} strokeWidth={2} />
      <g transform={e.t}>
        {/* piernas: pies juntos, el cuerpo algo cargado hacia el pie adelantado */}
        <ellipse cx={156} cy={suelo - 3} rx={13} ry={5} fill={C.tinta} />
        <ellipse cx={198} cy={suelo - 3} rx={13} ry={5} fill={C.tinta} />
        <path d={`M158 ${suelo - 8} L166 226 L170 176 M196 ${suelo - 8} L192 226 L188 176`} fill="none" stroke={C.cuerpo} strokeWidth={15} strokeLinecap="round" strokeLinejoin="round" />
        {/* tronco */}
        <path d="M150 104 Q182 94 214 104 Q220 108 218 118 L202 180 Q180 186 160 180 L148 118 Q146 108 150 104 Z" fill="#7C9A84" stroke={C.tinta} strokeWidth={1.2} />
        <circle cx={184} cy={78} r={17} fill={C.piel} stroke={C.tinta} strokeWidth={1.2} />
        {/* brazos hasta las manos, por delante de la bola */}
        <path d="M156 112 L184 200 M208 112 L192 200" stroke="#D9BFA6" strokeWidth={10} strokeLinecap="round" />
        <circle cx={188} cy={204} r={9} fill={C.manoA} stroke={C.tinta} />
        <path d={`M188 208 L168 ${suelo - 8}`} stroke="#8C9488" strokeWidth={3} />
        <path d={`M158 ${suelo - 10} h20 l2 7 h-24 z`} fill="#B9BFBA" stroke={C.tinta} />
        <Bola x={171} y={suelo - 5} r={5} />
        <path d={`M177 ${suelo} V${suelo - 150}`} stroke={C.gris} strokeDasharray="3 4" />
        <Flecha x1={198} y1={232} x2={198} y2={256} color={C.bandera} ancho={2.4} />
        <Flecha x1={250} y1={290} x2={330} y2={290} color={C.tinta} />
      </g>
      <Rotulo x={e.x(336)} y={282} t="hacia el hoyo" ancla={e.a('end')} />
      <Lapiz x={e.x(222)} y={176} t={['manos por', 'delante de', 'la bola']} ancla={e.a('start')} tam={17} color={C.tinta} />
      <Lapiz x={e.x(216)} y={238} t={['más peso', 'en este pie']} ancla={e.a('start')} tam={17} />
      <Lapiz x={e.x(14)} y={226} t={['bola algo', 'retrasada']} ancla={e.a('start')} tam={17} color={C.tinta} />
      <Lapiz x={e.x(14)} y={130} t={['pies', 'juntos']} ancla={e.a('start')} tam={17} color={C.tinta} />
      <Rotulo x={e.x(14)} y={20} t="Visto de frente" ancla={e.a('start')} />
    </Lienzo>
  );
}
