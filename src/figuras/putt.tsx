// Dibujo del putt: la caída del green (el péndulo está en 3D: tres.tsx).
import { Bandera, Bola, C, Flecha, Lapiz, Lienzo, Rotulo } from './comun';

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
