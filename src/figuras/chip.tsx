// Dibujo del chip: vuelo y rodado según el palo (la postura está en 3D: tres.tsx).
import { Bandera, Bola, C, Lapiz, Lienzo, Rotulo } from './comun';

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
