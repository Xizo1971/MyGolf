// Ilustraciones hechas con Gemini (maniquí de madera, tinta y acuarela) con las
// notas pintadas por la app encima. La imagen se pinta con `multiply`: su papel
// (blanco tras arte/procesar.py) toma el color del papel de la app.
// Cada ilustración puede cambiarse por la figura 3D equivalente para girarla.
import { useState, type ComponentType } from 'react';
import { tx } from '../i18n/t';
import { C, Flecha, Lapiz, Lienzo, Rotulo, espejo, type PropsFigura } from './comun';
import { Postura3D } from './tres';

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
