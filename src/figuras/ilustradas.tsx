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

// Lienzo de 560 × 520; la imagen (400 × 520) va desplazada 150 a la derecha
// para dejar sitio a las notas de la izquierda.
const W = 560;
const H = 520;
const IX = 150;

function PosturaLateralDibujo({ zurdo }: PropsFigura) {
  const e = espejo(W, zurdo);
  const lado = zurdo ? 'izquierdo' : 'derecho';
  return (
    <Lienzo
      w={W} h={H}
      etiqueta={`Maniquí de madera visto desde detrás de la línea, en la postura de partida con un hierro 7: inclinado desde la cadera con la espalda recta, la cadera hacia atrás, rodillas un poco flexionadas y brazos colgando. Una línea vertical baja desde el hombro ${lado} hasta la punta de los pies.`}
    >
      <g transform={e.t}>
        <image href="/figuras/postura-lateral.webp" x={IX} y={0} width={400} height={520} style={{ mixBlendMode: 'multiply' }} />
        {/* Hombro → punta del pie */}
        <path d="M306 104 V500" stroke={C.bandera} strokeWidth={1.8} strokeDasharray="6 5" />
        {/* Espalda recta */}
        <path d="M172 232 L300 56" stroke={C.gris} strokeWidth={1.6} strokeDasharray="6 5" />
        {/* Cadera hacia atrás */}
        <Flecha x1={212} y1={236} x2={168} y2={236} color={C.banderaTexto} />
      </g>
      <Rotulo x={e.x(14)} y={508} t="Detrás de la línea" ancla={e.a('start')} />
      <Lapiz x={e.x(232)} y={38} t={['espalda recta,', 'inclinada desde la cadera']} ancla={e.a('end')} />
      <Lapiz x={e.x(160)} y={268} t={['la cadera', 'hacia atrás']} ancla={e.a('end')} />
      <Lapiz x={e.x(238)} y={372} t={['rodillas un poco', 'flexionadas']} ancla={e.a('end')} />
      <Lapiz x={e.x(362)} y={186} t={['brazos', 'colgando']} ancla={e.a('start')} />
      <Lapiz x={e.x(316)} y={408} t={['hombro sobre', 'la punta', 'del pie']} ancla={e.a('start')} tam={17} />
    </Lienzo>
  );
}

export function PosturaLateral({ zurdo }: PropsFigura) {
  return <ConGiro zurdo={zurdo} ilustracion={PosturaLateralDibujo} tres={Postura3D} />;
}
