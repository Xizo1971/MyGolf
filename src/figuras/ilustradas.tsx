// Ilustraciones hechas con Gemini (maniquí de madera, tinta y acuarela) con las
// notas pintadas por la app encima. La imagen se pinta con `multiply`: su papel
// (blanco tras arte/procesar.py) toma el color del papel de la app.
// Cada ilustración puede cambiarse por la figura 3D equivalente para girarla.
import { useState, type ComponentType } from 'react';
import { tx } from '../i18n/t';
import { C, Flecha, Lapiz, Lienzo, Rotulo, espejo, type PropsFigura } from './comun';
import { Postura3D, Putt3D } from './tres';

/** Botón para alternar entre la ilustración y la figura 3D. */
function ConGiro(p: { zurdo?: boolean; ilustracion: ComponentType<PropsFigura>; tres: ComponentType<PropsFigura> }) {
  const [en3d, setEn3d] = useState(false);
  const Fig = en3d ? p.tres : p.ilustracion;
  return (
    <div className="ilustrada">
      <Fig zurdo={p.zurdo} />
      <div className="visor3d-botones">
        <button type="button" className={en3d ? 'on' : ''} onClick={() => setEn3d(!en3d)}>
          {en3d ? tx('Ver el dibujo') : tx('↻ Girar en 3D')}
        </button>
      </div>
    </div>
  );
}

// Lienzo en las unidades del recorte (590 × 805); la imagen lo ocupa entero y
// las notas van en los huecos de papel de los lados.
const W = 590;
const H = 805;

function PosturaLateralDibujo({ zurdo }: PropsFigura) {
  const e = espejo(W, zurdo);
  const lado = zurdo ? 'izquierdo' : 'derecho';
  return (
    <Lienzo
      w={W} h={H}
      etiqueta={`Maniquí de madera visto desde detrás de la línea, en la postura de partida con un hierro 7: inclinado desde la cadera con la espalda recta, la cadera hacia atrás, rodillas un poco flexionadas y brazos colgando. Una línea vertical baja desde el hombro ${lado} hasta la punta de los pies.`}
    >
      <g transform={e.t}>
        <image href="/figuras/postura-lateral.webp" x={0} y={0} width={W} height={H} style={{ mixBlendMode: 'multiply' }} />
        {/* La bola (Gemini no la dibujó): apoyada en el suelo, delante de la cara del palo. */}
        <circle cx={518} cy={762} r={16} fill="#FFFFFF" stroke={C.tinta} strokeWidth={1.6} />
        <path d="M509 756 a3 3 0 0 0 0 1 M517 752 a3 3 0 0 0 0 1 M524 760 a3 3 0 0 0 0 1" stroke={C.gris} strokeWidth={2.2} strokeLinecap="round" />
        {/* Hombro → punta del pie */}
        <path d="M278 160 V786" stroke={C.bandera} strokeWidth={2} strokeDasharray="7 6" />
        {/* Espalda recta */}
        <path d="M92 353 L279 97" stroke={C.gris} strokeWidth={1.8} strokeDasharray="7 6" />
        {/* Cadera hacia atrás */}
        <Flecha x1={128} y1={372} x2={80} y2={372} color={C.banderaTexto} ancho={1.8} />
      </g>
      <Rotulo x={e.x(14)} y={795} t="Detrás de la línea" tam={14} ancla={e.a('start')} />
      <Lapiz x={e.x(238)} y={44} t={['espalda recta,', 'inclinada desde', 'la cadera']} ancla={e.a('end')} tam={24} />
      <Lapiz x={e.x(112)} y={412} t={['la cadera', 'hacia atrás']} ancla={e.a('end')} tam={22} />
      <Lapiz x={e.x(176)} y={572} t={['rodillas', 'un poco', 'flexionadas']} ancla={e.a('end')} tam={24} />
      <Lapiz x={e.x(345)} y={300} t={['brazos', 'colgando']} ancla={e.a('start')} tam={24} />
      <Lapiz x={e.x(290)} y={588} t={['hombro sobre', 'la punta', 'del pie']} ancla={e.a('start')} tam={21} />
    </Lienzo>
  );
}

export function PosturaLateral({ zurdo }: PropsFigura) {
  return <ConGiro zurdo={zurdo} ilustracion={PosturaLateralDibujo} tres={Postura3D} />;
}

// Putt de frente: imagen de 270 × 835 (unidades del recorte) desplazada 145 a la derecha.
const PW = 560;
const PH = 835;

function PuttFrenteDibujo({ zurdo }: PropsFigura) {
  const e = espejo(PW, zurdo);
  // El péndulo: arco con centro en el pecho, ±9°.
  const cx = 283, cy = 250, r = 545, a = (9 * Math.PI) / 180;
  const x1 = cx - r * Math.sin(a), x2 = cx + r * Math.sin(a), ya = cy + r * Math.cos(a);
  return (
    <Lienzo
      w={PW} h={PH}
      etiqueta="Maniquí de madera visto de frente haciendo un putt: los hombros y los brazos forman un triángulo con las manos juntas en el puño; el triángulo gira entero desde el centro del pecho, con las muñecas quietas, y el putter va tanto hacia atrás como hacia delante."
    >
      <g transform={e.t}>
        <image href="/figuras/putt-frente.webp" x={145} y={0} width={270} height={835} style={{ mixBlendMode: 'multiply' }} />
        {/* El triángulo: hombros y manos */}
        <path d="M190 170 L377 170 L287 432 Z" fill="none" stroke={C.verde} strokeWidth={2.4} strokeLinejoin="round" />
        {/* Centro del pecho y recorrido del putter */}
        <circle cx={cx} cy={cy} r={6} fill={C.bandera} stroke="#FFFFFF" strokeWidth={1.5} />
        <path d={`M${x1} ${ya - 8} A${r} ${r} 0 0 0 ${x2} ${ya - 8}`} fill="none" stroke={C.gris} strokeWidth={1.8} strokeDasharray="6 5" />
        <Flecha x1={x1 + 18} y1={ya - 7} x2={x1} y2={ya - 9} color={C.gris} />
        <Flecha x1={x2 - 18} y1={ya - 7} x2={x2} y2={ya - 9} color={C.gris} />
        {/* Hacia el hoyo */}
        <Flecha x1={420} y1={826} x2={546} y2={826} color={C.tinta} />
        <Flecha x1={408} y1={248} x2={296} y2={250} color={C.banderaTexto} />
        <Flecha x1={150} y1={455} x2={262} y2={448} color={C.tinta} />
      </g>
      <Rotulo x={e.x(14)} y={24} t="De frente" tam={14} ancla={e.a('start')} />
      <Rotulo x={e.x(546)} y={814} t="hacia el hoyo" tam={13} ancla={e.a('end')} />
      <Lapiz x={e.x(172)} y={300} t={['el triángulo', 'gira entero']} ancla={e.a('end')} tam={23} color={C.verde} />
      <Lapiz x={e.x(414)} y={242} t={['gira desde', 'el centro', 'del pecho']} ancla={e.a('start')} tam={23} />
      <Lapiz x={e.x(144)} y={452} t={['muñecas', 'quietas']} ancla={e.a('end')} tam={23} color={C.tinta} />
      <Lapiz x={e.x(160)} y={782} t={['tanto atrás', 'como adelante']} ancla={e.a('end')} tam={22} color={C.tinta} />
    </Lienzo>
  );
}

export function PuttFrente({ zurdo }: PropsFigura) {
  return <ConGiro zurdo={zurdo} ilustracion={PuttFrenteDibujo} tres={Putt3D} />;
}
