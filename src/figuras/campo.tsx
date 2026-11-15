// Dibujos de los hoyos 1 y 2: el hoyo visto desde arriba, la tarjeta,
// las estacas y la zona de salida.
import { Bandera, Bola, C, F, Flecha, Lapiz, Lienzo, Marca, Rotulo } from './comun';

/** Puntitos de hierba alta en posiciones fijas (sin aleatoriedad: el dibujo no cambia). */
function Hierba(p: { w: number; h: number; paso: number }) {
  const puntos: [number, number][] = [];
  for (let y = 8; y < p.h; y += p.paso) {
    for (let x = 6 + ((y / p.paso) % 2) * (p.paso / 2); x < p.w; x += p.paso) puntos.push([x, y]);
  }
  return (
    <g fill="#A9C48A">
      {puntos.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={0.9} />)}
    </g>
  );
}

function Arbol(p: { x: number; y: number; r: number }) {
  return (
    <g>
      <circle cx={p.x + 2} cy={p.y + 3} r={p.r} fill="#6E8F58" opacity={0.35} />
      <circle cx={p.x} cy={p.y} r={p.r} fill={C.arbol} stroke="#5E7F4A" strokeWidth={1} />
    </g>
  );
}

function Estaca(p: { x: number; y: number; color: string }) {
  return <rect x={p.x - 2} y={p.y - 6} width={4} height={12} fill={p.color} stroke={C.tinta} strokeWidth={0.8} />;
}

/** Un par 4 visto desde arriba, de la salida al green, con todas sus zonas. */
export function PlanoHoyo() {
  const W = 350, H = 440;
  const calle = 'M150 396 C140 340 118 300 128 250 C138 200 168 172 172 132 L214 130 C216 176 190 210 186 255 C182 300 202 345 202 396 Z';
  return (
    <Lienzo w={W} h={H} etiqueta="Un hoyo de golf visto desde arriba: salida, calle, rough, búnkeres, agua, green y bandera">
      <rect width={W} height={H} fill={C.rough} />
      <Hierba w={W} h={H} paso={14} />
      {/* curvas de nivel alrededor del green */}
      <g fill="none" stroke={C.topo} strokeWidth={1}>
        <ellipse cx={192} cy={84} rx={76} ry={52} />
        <ellipse cx={192} cy={84} rx={98} ry={66} />
        <ellipse cx={192} cy={84} rx={122} ry={82} />
      </g>
      <path d={calle} fill={C.calle} stroke="#B3CB92" strokeWidth={1} />
      {/* rayas de corte en la calle */}
      <g stroke={C.calleRaya} strokeWidth={6}>
        <path d="M150 380 L200 372" /><path d="M140 330 L192 320" /><path d="M128 280 L186 268" /><path d="M133 228 L190 215" /><path d="M160 180 L206 168" />
      </g>
      <path d={calle} fill="none" stroke="#B3CB92" strokeWidth={1} />
      {/* salida */}
      <rect x={150} y={400} width={52} height={24} rx={3} fill={C.green} stroke="#86AD66" />
      <circle cx={162} cy={406} r={3} fill="#FFFFFF" stroke={C.tinta} />
      <circle cx={190} cy={406} r={3} fill="#FFFFFF" stroke={C.tinta} />
      {/* green */}
      <ellipse cx={192} cy={84} rx={56} ry={40} fill="#BBD69B" />
      <ellipse cx={192} cy={84} rx={48} ry={33} fill={C.green} stroke="#86AD66" />
      <Bandera x={204} y={90} alto={30} />
      {/* búnkeres */}
      <ellipse cx={254} cy={100} rx={18} ry={10} fill={C.arena} stroke={C.arenaBorde} transform="rotate(-25 254 100)" />
      <ellipse cx={138} cy={120} rx={17} ry={9} fill={C.arena} stroke={C.arenaBorde} transform="rotate(20 138 120)" />
      <ellipse cx={212} cy={244} rx={14} ry={8} fill={C.arena} stroke={C.arenaBorde} />
      {/* agua */}
      <path d="M48 262 C60 236 104 238 108 262 C112 286 92 308 66 302 C44 296 40 278 48 262 Z" fill={C.agua} stroke={C.aguaBorde} />
      <g stroke={C.aguaBorde} strokeWidth={0.8} fill="none" opacity={0.6}><path d="M62 268 q6 -3 12 0 t12 0" /><path d="M60 284 q6 -3 12 0 t12 0" /></g>
      {[61, 75, 89, 103].map((x) => <Estaca key={x} x={x} y={x === 61 ? 252 : 246} color="#C8402A" />)}
      {/* árboles */}
      <Arbol x={44} y={86} r={13} /><Arbol x={66} y={106} r={11} /><Arbol x={36} y={124} r={10} />
      <Arbol x={286} y={356} r={13} /><Arbol x={262} y={382} r={10} /><Arbol x={300} y={392} r={11} />
      {/* fuera de límites */}
      {[60, 120, 180, 240, 300, 360].map((y) => <Estaca key={y} x={330} y={y} color="#FFFFFF" />)}
      <path d="M330 40 V420" stroke="#FFFFFF" strokeWidth={1} strokeDasharray="3 5" opacity={0.8} />

      <Lapiz x={212} y={438} t="salida (tee)" tam={18} />
      <Flecha x1={209} y1={432} x2={200} y2={421} color={C.banderaTexto} ancho={1.2} />
      <Lapiz x={236} y={325} t="calle" />
      <Flecha x1={232} y1={320} x2={196} y2={322} color={C.banderaTexto} ancho={1.2} />
      <Lapiz x={18} y={180} t={['rough', '(hierba alta)']} />
      <Lapiz x={18} y={340} t={['agua: área de', 'penalización']} tam={18} />
      <Flecha x1={56} y1={322} x2={66} y2={306} color={C.banderaTexto} ancho={1.2} />
      <Lapiz x={234} y={272} t="búnker" />
      <Flecha x1={240} y1={262} x2={222} y2={250} color={C.banderaTexto} ancho={1.2} />
      <Lapiz x={60} y={40} t="green" />
      <Flecha x1={100} y1={36} x2={146} y2={70} color={C.banderaTexto} ancho={1.2} />
      <Lapiz x={240} y={28} t="bandera y hoyo" tam={18} />
      <Flecha x1={238} y1={30} x2={216} y2={56} color={C.banderaTexto} ancho={1.2} />
      <Lapiz x={322} y={210} t={['fuera de', 'límites']} ancla="end" tam={17} />
      <Rotulo x={10} y={16} t="Par 4 · desde arriba" />
    </Lienzo>
  );
}

/** Una tarjeta con cuatro hoyos para aprender birdie, par, bogey y doble bogey. */
export function Tarjeta() {
  const W = 350, H = 230;
  const col0 = 12, ancho0 = 74, anchoC = 64;
  const hoyos = [
    { n: 1, par: 4, golpes: 3, nombre: 'birdie', marca: 'circulo' },
    { n: 2, par: 3, golpes: 3, nombre: 'par', marca: '' },
    { n: 3, par: 5, golpes: 6, nombre: 'bogey', marca: 'cuadrado' },
    { n: 4, par: 4, golpes: 6, nombre: 'doble bogey', marca: 'doble' },
  ];
  const filas = [22, 56, 92, 140, 170];
  const xCol = (i: number) => col0 + ancho0 + i * anchoC;
  return (
    <Lienzo w={W} h={H} etiqueta="Tarjeta de juego: 3 golpes en un par 4 es birdie, 3 en un par 3 es par, 6 en un par 5 es bogey y 6 en un par 4 es doble bogey">
      <rect x={col0} y={8} width={ancho0 + anchoC * 4} height={162} fill="#FFFFFF" stroke={C.tinta} strokeWidth={1.5} />
      {filas.slice(1, 4).map((y) => <path key={y} d={`M${col0} ${y - 12} H${col0 + ancho0 + anchoC * 4}`} stroke={C.borde} />)}
      {hoyos.map((_, i) => <path key={i} d={`M${xCol(i)} 8 V170`} stroke={C.borde} />)}
      <Rotulo x={col0 + 8} y={28} t="Hoyo" />
      <Rotulo x={col0 + 8} y={62} t="Par" />
      <Rotulo x={col0 + 8} y={100} t="Golpes" />
      <Rotulo x={col0 + 8} y={150} t="Se llama" />
      {hoyos.map((h, i) => {
        const cx = xCol(i) + anchoC / 2;
        return (
          <g key={h.n}>
            <text x={cx} y={30} textAnchor="middle" fontFamily={F.rotulo} fontWeight={700} fontSize={16} fill={C.tinta}>{h.n}</text>
            <text x={cx} y={64} textAnchor="middle" fontFamily={F.rotulo} fontWeight={600} fontSize={16} fill={C.gris}>{h.par}</text>
            <text x={cx} y={110} textAnchor="middle" fontFamily={F.lapiz} fontSize={30} fill={C.tinta}>{h.golpes}</text>
            {h.marca === 'circulo' && <circle cx={cx} cy={100} r={17} fill="none" stroke={C.verde} strokeWidth={2} />}
            {h.marca === 'cuadrado' && <rect x={cx - 16} y={84} width={32} height={32} fill="none" stroke={C.mal} strokeWidth={2} />}
            {h.marca === 'doble' && (
              <g fill="none" stroke={C.mal} strokeWidth={1.8}>
                <rect x={cx - 15} y={85} width={30} height={30} /><rect x={cx - 20} y={80} width={40} height={40} />
              </g>
            )}
            {h.nombre.split(' ').map((palabra, k, todas) => (
              <text key={k} x={cx} y={todas.length > 1 ? 145 + k * 14 : 152} textAnchor="middle" fontFamily={F.rotulo} fontWeight={600} fontSize={13} fill={C.tinta}>{palabra.toUpperCase()}</text>
            ))}
          </g>
        );
      })}
      <circle cx={col0 + 8} cy={192} r={7} fill="none" stroke={C.verde} strokeWidth={1.8} />
      <Lapiz x={col0 + 22} y={198} t="uno menos" tam={17} color={C.gris} />
      <rect x={col0 + 102} y={185} width={14} height={14} fill="none" stroke={C.mal} strokeWidth={1.8} />
      <Lapiz x={col0 + 124} y={198} t="uno más" tam={17} color={C.gris} />
      <g fill="none" stroke={C.mal} strokeWidth={1.5}><rect x={col0 + 196} y={186} width={12} height={12} /><rect x={col0 + 193} y={183} width={18} height={18} /></g>
      <Lapiz x={col0 + 218} y={198} t="dos más" tam={17} color={C.gris} />
      <Lapiz x={col0} y={222} t="Gana quien hace menos golpes en total." tam={18} />
    </Lienzo>
  );
}

/** Las tres estacas: blanca (fuera de límites), amarilla y roja (áreas de penalización). */
export function Estacas() {
  const W = 350, H = 220;
  const estacas = [
    { x: 58, color: '#FFFFFF', nombre: 'Blanca', que: ['fuera de', 'límites'] },
    { x: 175, color: '#E6C33F', nombre: 'Amarilla', que: ['área de', 'penalización'] },
    { x: 292, color: '#C8402A', nombre: 'Roja', que: ['área de', 'penalización', '+ 1 opción'] },
  ];
  return (
    <Lienzo w={W} h={H} etiqueta="Estaca blanca: fuera de límites. Estaca amarilla: área de penalización. Estaca roja: área de penalización con una opción más de alivio">
      <path d="M0 122 H350" stroke={C.topo} strokeWidth={2} />
      <rect x={0} y={122} width={W} height={10} fill={C.rough} opacity={0.6} />
      {estacas.map((e) => (
        <g key={e.nombre}>
          <path d={`M${e.x - 7} 34 h14 v84 l-7 12 l-7 -12 z`} fill={e.color} stroke={C.tinta} strokeWidth={1.4} />
          <path d={`M${e.x - 7} 46 h14`} stroke={C.tinta} strokeWidth={0.6} opacity={0.4} />
          <Rotulo x={e.x} y={156} t={e.nombre} ancla="middle" tam={14} color={C.tinta} peso={700} />
          <Lapiz x={e.x} y={180} t={e.que} ancla="middle" tam={18} />
        </g>
      ))}
    </Lienzo>
  );
}

/** La zona de salida: rectángulo de dos palos de fondo detrás de las marcas. */
export function ZonaSalida() {
  const W = 350, H = 270;
  return (
    <Lienzo w={W} h={H} etiqueta="Zona de salida vista desde arriba: la bola debe estar entre las dos marcas y hasta dos palos por detrás de ellas; delante de las marcas o fuera de los lados no vale">
      <rect x={20} y={24} width={300} height={190} rx={6} fill={C.green} opacity={0.55} />
      <rect x={86} y={70} width={142} height={104} fill={C.calle} stroke={C.verde} strokeWidth={1.6} strokeDasharray="6 4" />
      <circle cx={86} cy={70} r={8} fill="#E8E2D0" stroke={C.tinta} strokeWidth={1.4} />
      <circle cx={228} cy={70} r={8} fill="#E8E2D0" stroke={C.tinta} strokeWidth={1.4} />
      {/* cota de dos palos */}
      <g stroke={C.tinta} strokeWidth={1.2}>
        <path d="M244 70 H258 M244 174 H258" />
        <path d="M252 74 V170" />
        <path d="M248 80 L252 72 L256 80 M248 164 L252 172 L256 164" fill="none" />
      </g>
      <Lapiz x={264} y={112} t={['2 palos', 'de fondo']} tam={18} color={C.tinta} />
      <Flecha x1={157} y1={44} x2={157} y2={14} color={C.gris} />
      <Rotulo x={168} y={22} t="hacia el hoyo" />
      <Bola x={132} y={118} /><Marca x={132} y={140} ok />
      <Bola x={196} y={160} /><Marca x={214} y={160} ok />
      <Bola x={140} y={52} /><Marca x={120} y={52} ok={false} />
      <Bola x={52} y={120} /><Marca x={52} y={142} ok={false} />
      <Lapiz x={20} y={232} t={['Tú puedes pisar fuera;', 'la bola tiene que estar dentro.']} tam={18} />
    </Lienzo>
  );
}
