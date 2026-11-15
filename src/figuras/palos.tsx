// Dibujos del hoyo 3: la bolsa de palos y el loft.
import { C, F, Flecha, Lapiz, Lienzo, Rotulo } from './comun';

function Varilla(p: { x: number; hasta: number }) {
  return (
    <g>
      <path d={`M${p.x} 18 V${p.hasta}`} stroke="#8C9488" strokeWidth={2.4} />
      <rect x={p.x - 3.5} y={14} width={7} height={40} rx={2} fill={C.tinta} />
    </g>
  );
}

/** Los seis tipos de palo, del que más lejos manda la bola al que menos. */
export function Bolsa() {
  const W = 350, H = 256;
  const xs = [36, 92, 148, 204, 260, 316];
  return (
    <Lienzo w={W} h={H} etiqueta="Tipos de palo de izquierda a derecha: driver, madera de calle, híbrido, hierro, wedge y putter">
      {/* driver */}
      <Varilla x={xs[0]!} hasta={160} />
      <path d="M33 158 C30 172 40 182 58 180 C70 178 70 162 60 156 C52 152 40 152 33 158 Z" fill="#3E4A44" stroke={C.tinta} />
      {/* madera de calle */}
      <Varilla x={xs[1]!} hasta={164} />
      <path d="M89 162 C87 172 95 179 108 177 C116 175 116 165 109 161 C103 158 94 158 89 162 Z" fill="#4C5A52" stroke={C.tinta} />
      {/* híbrido */}
      <Varilla x={xs[2]!} hasta={166} />
      <path d="M145 164 C143 173 150 178 160 177 C167 176 168 168 162 164 C157 161 149 161 145 164 Z" fill="#5A6A60" stroke={C.tinta} />
      {/* hierro */}
      <Varilla x={xs[3]!} hasta={160} />
      <path d="M201 158 L203 178 L226 176 C229 170 228 164 224 160 Z" fill="#B9BFBA" stroke={C.tinta} />
      {/* wedge */}
      <Varilla x={xs[4]!} hasta={158} />
      <path d="M257 156 L259 178 L282 177 C286 168 284 160 278 156 Z" fill="#C9CEC9" stroke={C.tinta} />
      <g stroke={C.tinta} strokeWidth={0.6} opacity={0.5}><path d="M262 164 H278 M262 169 H280 M262 174 H280" /></g>
      {/* putter */}
      <Varilla x={xs[5]!} hasta={168} />
      <rect x={300} y={166} width={34} height={11} rx={2} fill="#9BA39E" stroke={C.tinta} />

      {['Driver', 'Madera', 'Híbrido', 'Hierro', 'Wedge', 'Putter'].map((n, i) => (
        <g key={n}>
          {i % 2 === 1 && <path d={`M${xs[i]! + 8} 186 V200`} stroke={C.borde} />}
          <Rotulo x={xs[i]! + (i === 5 ? 1 : 8)} y={i % 2 === 0 ? 200 : 216} t={n} ancla="middle" tam={13} color={C.tinta} peso={700} />
        </g>
      ))}
      <Flecha x1={24} y1={228} x2={250} y2={228} color={C.gris} />
      <Lapiz x={24} y={246} t="de más lejos a más cerca" tam={17} color={C.gris} />
      <Lapiz x={340} y={246} t="en el green" tam={17} ancla="end" />
    </Lienzo>
  );
}

/** Más loft = la bola sube más y llega menos lejos. */
export function Loft() {
  const W = 350, H = 260;
  const palos = [
    { x: 70, ang: 10, color: C.tinta, nombre: 'Driver', fin: 336, alto: 34 },
    { x: 175, ang: 32, color: C.verde, nombre: 'Hierro 7', fin: 240, alto: 62 },
    { x: 280, ang: 56, color: C.bandera, nombre: 'Wedge', fin: 140, alto: 92 },
  ];
  const suelo = 122;
  return (
    <Lienzo w={W} h={H} etiqueta="El loft es la inclinación de la cara del palo: el driver tiene unos 10 grados y manda la bola baja y lejos; el hierro 7 unos 32; el wedge unos 56 y la bola sube mucho y cae cerca">
      <path d={`M10 ${suelo} H340`} stroke={C.topo} strokeWidth={2} />
      {palos.map((p) => (
        <path
          key={p.nombre}
          d={`M18 ${suelo} Q${(18 + p.fin) / 2} ${suelo - p.alto * 2} ${p.fin} ${suelo}`}
          fill="none" stroke={p.color} strokeWidth={2} strokeDasharray="1 5" strokeLinecap="round"
        />
      ))}
      <circle cx={18} cy={suelo - 4} r={4} fill="#FFFFFF" stroke={C.tinta} />
      <Rotulo x={336} y={suelo + 14} t="driver" ancla="end" color={C.tinta} />
      <Rotulo x={240} y={suelo + 14} t="hierro 7" ancla="middle" color={C.verde} />
      <Rotulo x={140} y={suelo + 14} t="wedge" ancla="middle" color={C.banderaTexto} />

      {palos.map((p) => {
        const r = (p.ang * Math.PI) / 180;
        const base = 222, largo = 44;
        const tx = p.x - Math.sin(r) * largo;
        const ty = base - Math.cos(r) * largo;
        return (
          <g key={p.nombre}>
            <path d={`M${p.x - 50} ${base} H${p.x + 30}`} stroke={C.topo} strokeWidth={1.5} />
            <path d={`M${p.x} ${base} V${base - largo - 6}`} stroke={C.gris} strokeDasharray="3 3" />
            {/* cuerpo de la cabeza, por detrás de la cara */}
            <path d={`M${p.x} ${base} L${tx} ${ty} L${tx - 18} ${ty + 6} Q${p.x - 30} ${base} ${p.x - 18} ${base} Z`} fill="#C9CEC9" stroke={C.tinta} />
            <path d={`M${p.x} ${base} L${tx} ${ty}`} stroke={p.color} strokeWidth={3.5} strokeLinecap="round" />
            <path d={`M${tx - 6} ${ty + 2} L${tx - 30} ${ty - 40}`} stroke="#8C9488" strokeWidth={2.4} />
            <path d={`M${p.x} ${base - 30} A30 30 0 0 0 ${p.x - Math.sin(r) * 30} ${base - Math.cos(r) * 30}`} fill="none" stroke={p.color} strokeWidth={1.2} />
            <text x={p.x + 6} y={base - 30} fontFamily={F.rotulo} fontWeight={700} fontSize={15} fill={p.color === C.bandera ? C.banderaTexto : p.color}>≈{p.ang}°</text>
            <Rotulo x={p.x - 10} y={base + 18} t={p.nombre} ancla="middle" color={C.tinta} />
          </g>
        );
      })}
      <Lapiz x={12} y={20} t="Más loft: más alto y más corto." tam={19} />
    </Lienzo>
  );
}
