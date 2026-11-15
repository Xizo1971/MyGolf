// Dibujos del hoyo 8: el péndulo del putt y la caída del green.
import { Bandera, Bola, C, Flecha, Lapiz, Lienzo, Rotulo, espejo, type PropsFigura } from './comun';

function Triangulo(p: { giro: number; fantasma?: boolean }) {
  return (
    <g transform={`rotate(${p.giro} 175 74)`} opacity={p.fantasma ? 0.28 : 1}>
      <path d="M128 76 L222 76" stroke="#7C9A84" strokeWidth={16} strokeLinecap="round" />
      <path d="M132 80 L172 168 M218 80 L178 168" stroke="#D9BFA6" strokeWidth={10} strokeLinecap="round" />
      <path d="M128 76 L175 172 L222 76" fill="none" stroke={C.bandera} strokeWidth={p.fantasma ? 0 : 1.5} strokeDasharray="4 3" />
      <rect x={165} y={160} width={20} height={20} rx={6} fill={C.manoA} stroke={C.tinta} />
      <path d="M175 178 V238" stroke="#8C9488" strokeWidth={3} />
      <rect x={160} y={236} width={30} height={9} rx={2} fill="#9BA39E" stroke={C.tinta} />
    </g>
  );
}

/** De frente: hombros, brazos y putter forman un triángulo que se balancea entero. */
export function Pendulo({ zurdo }: PropsFigura) {
  const W = 350, H = 300;
  const e = espejo(W, zurdo);
  const r = 168;
  const arco = (g: number) => {
    const a = (g * Math.PI) / 180;
    return { x: 175 - Math.sin(a) * r, y: 74 + Math.cos(a) * r };
  };
  const a1 = arco(16), a2 = arco(-16);
  return (
    <Lienzo w={W} h={H} etiqueta="Putt visto de frente: hombros, brazos y putter forman un triángulo que se mueve entero como un péndulo, con las muñecas quietas y la misma distancia atrás que adelante">
      <g transform={e.t}>
        <path d={`M${a1.x} ${a1.y} A${r} ${r} 0 0 0 ${a2.x} ${a2.y}`} fill="none" stroke={C.gris} strokeWidth={1.2} strokeDasharray="3 4" />
        <Triangulo giro={16} fantasma />
        <Triangulo giro={-16} fantasma />
        <Triangulo giro={0} />
        <circle cx={175} cy={48} r={17} fill={C.piel} stroke={C.tinta} strokeWidth={1.2} />
        <circle cx={175} cy={74} r={4} fill={C.bandera} />
        <Bola x={197} y={240} r={5} />
        <Flecha x1={250} y1={276} x2={330} y2={276} color={C.tinta} />
      </g>
      <Rotulo x={e.x(336)} y={292} t="hacia el hoyo" ancla={e.a('end')} />
      <Lapiz x={e.x(240)} y={46} t={['gira desde', 'el centro', 'del pecho']} ancla={e.a('start')} tam={17} />
      <Lapiz x={e.x(234)} y={150} t={['el triángulo', 'no se deforma:', 'muñecas quietas']} ancla={e.a('start')} tam={17} color={C.tinta} />
      <Lapiz x={e.x(14)} y={150} t={['tanto atrás', 'como adelante']} ancla={e.a('start')} tam={17} color={C.tinta} />
      <Rotulo x={e.x(14)} y={20} t="Visto de frente" ancla={e.a('start')} />
    </Lienzo>
  );
}

/** Desde arriba: en un green inclinado se apunta por el lado alto y la bola cae hacia el hoyo. */
export function Caida() {
  const W = 350, H = 270;
  return (
    <Lienzo w={W} h={H} etiqueta="Putt con caída visto desde arriba: el green baja de arriba abajo; se apunta por encima del hoyo, por el lado alto, y la bola va cayendo hasta entrar">
      <rect width={W} height={H} fill="#BBD69B" />
      <rect x={10} y={20} width={330} height={230} rx={110} fill={C.green} stroke="#86AD66" />
      <g fill="none" stroke="#86AD66" strokeWidth={1}>
        <path d="M30 72 C110 62 240 62 320 72" /><path d="M24 124 C110 114 240 114 326 124" /><path d="M30 180 C110 170 240 170 320 180" />
      </g>
      {[80, 175, 270].map((x) => <Flecha key={x} x1={x} y1={196} x2={x} y2={232} color="#5E8A48" />)}
      <Bola x={52} y={150} r={5} />
      <Bandera x={292} y={152} alto={38} />
      <path d="M58 147 L292 92" stroke={C.gris} strokeWidth={1.4} strokeDasharray="5 5" />
      <path d="M292 86 l-6 -6 M292 86 l6 6 M292 86 l-6 6 M292 86 l6 -6" stroke={C.bandera} strokeWidth={2.4} />
      <path d="M58 148 C150 100 245 96 290 150" fill="none" stroke={C.bandera} strokeWidth={2.4} />
      <Lapiz x={292} y={72} t="apunta aquí" ancla="middle" tam={18} />
      <Lapiz x={150} y={104} t="la bola va cayendo" ancla="middle" tam={17} color={C.tinta} />
      <Rotulo x={175} y={40} t="lado alto" ancla="middle" />
      <Rotulo x={175} y={262} t="lado bajo · el agua correría hacia aquí" ancla="middle" />
    </Lienzo>
  );
}
