// Dibujos del hoyo 4: dónde ponerse cuando otro golpea y cómo cuidar el green.
import { Bandera, Bola, C, Flecha, Lapiz, Lienzo, Marca, Rotulo, espejo, type PropsFigura } from './comun';

/** Vista desde arriba de un jugador a punto de golpear: zonas de peligro y sitio seguro. */
export function Seguridad({ zurdo }: PropsFigura) {
  const W = 350, H = 290;
  const e = espejo(W, zurdo);
  const gx = 130, gy = 170, bx = 166;
  return (
    <Lienzo w={W} h={H} etiqueta="Dónde ponerse cuando otro golpea: fuera del alcance de su swing, de frente a él y algo por detrás de la bola; nunca delante en la dirección del golpe">
      <rect width={W} height={H} fill={C.calle} />
      <g transform={e.t}>
        {/* línea de juego */}
        <path d={`M${bx} ${gy} V20`} stroke={C.mal} strokeWidth={10} opacity={0.18} />
        <path d={`M${bx} ${gy} V40`} stroke={C.tinta} strokeDasharray="5 5" />
        {/* alcance del swing */}
        <circle cx={gx} cy={gy} r={86} fill={C.mal} opacity={0.12} stroke={C.mal} strokeDasharray="4 4" />
        {/* jugador visto desde arriba, mirando a la bola */}
        <ellipse cx={gx} cy={gy} rx={11} ry={24} fill={C.cuerpo} />
        <circle cx={gx + 4} cy={gy} r={9} fill={C.piel} stroke={C.tinta} />
        <path d={`M${gx + 12} ${gy + 2} L${bx - 4} ${gy + 2}`} stroke="#8C9488" strokeWidth={2.4} />
        <Bola x={bx} y={gy} r={4.5} />
        {/* sitio seguro: de frente al jugador, fuera de su alcance, algo por detrás de la bola */}
        <circle cx={266} cy={208} r={22} fill={C.bien} opacity={0.22} stroke={C.bien} strokeWidth={1.6} />
        <circle cx={266} cy={208} r={7} fill={C.bien} />
      </g>
      <Flecha x1={e.x(bx)} y1={52} x2={e.x(bx)} y2={22} color={C.tinta} />
      <Rotulo x={e.x(bx + 10)} y={30} t="hacia donde golpea" ancla={e.a('start')} />
      <Lapiz x={e.x(bx + 12)} y={78} t={['delante:', '¡nunca!']} ancla={e.a('start')} />
      <Marca x={e.x(bx - 16)} y={72} ok={false} />
      <Lapiz x={e.x(20)} y={282} t="dentro del círculo: le alcanza el palo" ancla={e.a('start')} tam={17} />
      <Lapiz x={e.x(228)} y={156} t={['aquí: de frente,', 'quieto y callado']} ancla={e.a('start')} tam={18} color={C.verde} />
      <Marca x={e.x(298)} y={208} ok />
    </Lienzo>
  );
}

function Pisadas(p: { puntos: [number, number][]; color?: string }) {
  return (
    <g fill={p.color ?? C.gris} opacity={0.75}>
      {p.puntos.map(([x, y], i) => (
        <ellipse key={i} cx={x} cy={y} rx={3} ry={5} transform={`rotate(${i % 2 ? 20 : -20} ${x} ${y})`} />
      ))}
    </g>
  );
}

/** Cuidar el green: no pisar la línea de otro, marcar la bola y arreglar el pique. */
export function GreenCuidados() {
  const W = 350, H = 270;
  return (
    <Lienzo w={W} h={H} etiqueta="En el green: no pises la línea de putt de otro jugador, marca tu bola con una moneda antes de cogerla y arregla el pique que deja tu bola al caer">
      <rect width={W} height={H} fill="#BBD69B" />
      <ellipse cx={175} cy={140} rx={168} ry={124} fill={C.green} stroke="#86AD66" />
      <Bandera x={252} y={84} alto={40} />
      {/* bola de otro jugador y su línea */}
      <Bola x={106} y={196} />
      <path d="M110 192 L248 86" stroke={C.tinta} strokeDasharray="4 5" />
      <Lapiz x={26} y={222} t={['su línea:', 'no la pises']} tam={18} />
      {/* camino bueno: rodeando la línea */}
      <Pisadas puntos={[[300, 236], [286, 222], [270, 210], [254, 196], [238, 184], [222, 172]]} color={C.verde} />
      <Marca x={318} y={216} ok />
      {/* camino malo: cruzando la línea */}
      <Pisadas puntos={[[200, 244], [195, 222], [190, 200], [185, 178], [180, 156], [175, 134]]} color={C.mal} />
      <Marca x={222} y={246} ok={false} />
      {/* moneda que marca tu bola */}
      <circle cx={206} cy={160} r={5} fill="#D8B54A" stroke="#9C7F2A" />
      <Bola x={215} y={160} r={4} />
      <Lapiz x={228} y={122} t={['marca tu bola', 'con una moneda']} tam={16} />
      {/* pique arreglado */}
      <ellipse cx={92} cy={96} rx={7} ry={5} fill="#7E9A5F" />
      <path d="M100 74 L94 92 M104 76 L97 93" stroke={C.tinta} strokeWidth={1.6} />
      <rect x={98} y={62} width={12} height={14} rx={2} fill="#9BA39E" stroke={C.tinta} transform="rotate(18 104 69)" />
      <Lapiz x={118} y={90} t={['arregla', 'tu pique']} tam={18} />
      <Rotulo x={12} y={16} t="El green, desde arriba" />
    </Lienzo>
  );
}
