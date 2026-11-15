// Dibujo del hoyo 7: las vías del tren y el objetivo intermedio.
import { Bandera, Bola, C, Lapiz, Lienzo, Rotulo, espejo, type PropsFigura } from './comun';

/** Desde arriba: la bola va por una vía hacia la bandera; los pies, por la otra, en paralelo. */
export function ViasTren({ zurdo }: PropsFigura) {
  const W = 350, H = 310;
  const e = espejo(W, zurdo);
  const exterior = 210, interior = 160;
  const traviesas = Array.from({ length: 13 }, (_, i) => 70 + i * 17);
  return (
    <Lienzo
      w={W} h={H}
      etiqueta={`Alineación desde arriba: la línea de la bola va a la bandera; la línea de pies, caderas y hombros es paralela y por eso apunta un poco a la ${zurdo ? 'derecha' : 'izquierda'} de la bandera. Un objetivo intermedio a un metro de la bola ayuda a apuntar`}
    >
      <rect width={W} height={H} fill={C.calle} />
      <g transform={e.t}>
        <ellipse cx={exterior} cy={40} rx={44} ry={20} fill={C.green} stroke="#86AD66" />
        <Bandera x={exterior} y={44} alto={30} />
        {traviesas.map((y) => <path key={y} d={`M${interior - 6} ${y} H${exterior + 6}`} stroke="#B49E7A" strokeWidth={4} />)}
        <path d={`M${exterior} 60 V290`} stroke={C.bandera} strokeWidth={3} />
        <path d={`M${interior} 30 V290`} stroke={C.tinta} strokeWidth={3} />
        {/* pies, apoyados en la vía interior y mirando a la bola */}
        <ellipse cx={interior - 6} cy={222} rx={16} ry={7} fill={C.cuerpo} />
        <ellipse cx={interior - 6} cy={276} rx={16} ry={7} fill={C.cuerpo} />
        {/* cara del palo y bola */}
        <rect x={exterior - 14} y={256} width={28} height={5} rx={2} fill="#9BA39E" stroke={C.tinta} />
        <Bola x={exterior} y={250} r={5} />
        {/* objetivo intermedio */}
        <path d={`M${exterior - 5} 196 q5 -9 10 0 q-5 6 -10 0 z`} fill="#8A6B3F" />
      </g>
      <Lapiz x={e.x(exterior + 18)} y={116} t={['línea de', 'la bola:', 'a la bandera']} ancla={e.a('start')} tam={17} />
      <Lapiz x={e.x(interior - 22)} y={86} t={['pies, caderas', 'y hombros:', 'en paralelo,', zurdo ? 'algo a la derecha' : 'algo a la izquierda', 'de la bandera']} ancla={e.a('end')} tam={17} color={C.tinta} />
      <Lapiz x={e.x(exterior + 18)} y={192} t={['objetivo', 'intermedio,', 'a un metro']} ancla={e.a('start')} tam={17} color={C.verde} />
      <Lapiz x={e.x(exterior + 22)} y={258} t={['1.º la cara', 'del palo;', '2.º los pies']} ancla={e.a('start')} tam={17} color={C.tinta} />
      <Rotulo x={e.x(14)} y={300} t="Desde arriba" ancla={e.a('start')} />
    </Lienzo>
  );
}
