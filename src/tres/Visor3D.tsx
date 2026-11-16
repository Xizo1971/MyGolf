// Visor de escenas 3D: dibuja en SVG, se gira arrastrando con el dedo (horizontal) o
// el ratón (horizontal y vertical) y tiene botones de vistas predefinidas.
import { useMemo, useRef, useState, type PointerEvent as PE } from 'react';
import { C, F } from '../figuras/comun';
import { envolvente, espejar, proyector, siluetas, trocear, type Camara, type Escena, type Linea3D, type Proyector } from './motor';

export interface Vista extends Camara {
  nombre: string;
}

export interface PropsVisor {
  escena: Escena;
  vistas: Vista[];
  /** Texto alternativo (el dibujo es una imagen para los lectores de pantalla). */
  etiqueta: string;
  zurdo?: boolean;
  alto?: number;
  /** Mostrar las guías y etiquetas (se pueden ocultar para ver el cuerpo limpio). */
  guiasIniciales?: boolean;
}

const ANCHO = 350;

function trazo(l: Linea3D, pr: Proyector, k: number) {
  const a = pr.p(l.a), b = pr.p(l.b);
  const ang = Math.atan2(b.y - a.y, b.x - a.x);
  const L = 8;
  return (
    <g key={k} stroke={l.color} strokeWidth={l.ancho ?? 1.4} fill="none" strokeLinecap="round">
      <path d={`M${a.x.toFixed(1)} ${a.y.toFixed(1)} L${b.x.toFixed(1)} ${b.y.toFixed(1)}`} strokeDasharray={l.discontinua ? '5 4' : undefined} />
      {l.flecha && (
        <path d={`M${(b.x - L * Math.cos(ang - 0.45)).toFixed(1)} ${(b.y - L * Math.sin(ang - 0.45)).toFixed(1)} L${b.x.toFixed(1)} ${b.y.toFixed(1)} L${(b.x - L * Math.cos(ang + 0.45)).toFixed(1)} ${(b.y - L * Math.sin(ang + 0.45)).toFixed(1)}`} />
      )}
    </g>
  );
}

export function Visor3D(p: PropsVisor) {
  const alto = p.alto ?? 380;
  const escena = useMemo(() => {
    const e = p.zurdo ? espejar(p.escena) : p.escena;
    return { ...e, prims: trocear(e.prims, 0.3) };
  }, [p.escena, p.zurdo]);
  const caja = useMemo(() => envolvente(escena.prims), [escena]);
  // Para zurdos, las vistas laterales se miran desde el otro lado.
  const vistas = useMemo(() => p.vistas.map((v) => (p.zurdo ? { ...v, yaw: -v.yaw } : v)), [p.vistas, p.zurdo]);
  const [cam, setCam] = useState<Camara>(() => ({ yaw: vistas[0]!.yaw, pitch: vistas[0]!.pitch }));
  const [vistaActiva, setVistaActiva] = useState(0);
  const [guias, setGuias] = useState(p.guiasIniciales ?? true);
  const arrastre = useRef<{ x: number; y: number; cam: Camara } | null>(null);

  const pr = proyector(cam, caja.c, caja.r, ANCHO, alto);
  const formas = siluetas(escena.prims, pr, C.papelClaro);
  const tinta = C.tinta;

  const empezar = (e: PE<SVGSVGElement>) => {
    arrastre.current = { x: e.clientX, y: e.clientY, cam };
    (e.target as Element).setPointerCapture?.(e.pointerId);
  };
  const mover = (e: PE<SVGSVGElement>) => {
    const a = arrastre.current;
    if (!a) return;
    const dx = e.clientX - a.x, dy = e.clientY - a.y;
    const pitch = e.pointerType === 'mouse' ? Math.max(-5, Math.min(89, a.cam.pitch + dy * 0.4)) : a.cam.pitch;
    setCam({ yaw: a.cam.yaw - dx * 0.6, pitch });
    setVistaActiva(-1);
  };
  const soltar = () => { arrastre.current = null; };

  return (
    <div className="visor3d">
      <svg
        viewBox={`0 0 ${ANCHO} ${alto}`} width="100%" role="img" aria-label={p.etiqueta}
        style={{ display: 'block', background: C.papelClaro, border: `1px solid ${C.borde}`, touchAction: 'pan-y', cursor: 'grab', userSelect: 'none' }}
        onPointerDown={empezar} onPointerMove={mover} onPointerUp={soltar} onPointerCancel={soltar}
      >
        {escena.fondo?.map((l, k) => trazo(l, pr, k))}
        {formas.map((f, i) => (
          <g key={i}>
            <path d={f.d} fill={tinta} stroke={tinta} strokeWidth={2.2} strokeLinejoin="round" />
            <path d={f.d} fill={f.color} />
          </g>
        ))}
        {guias && escena.guias?.map((l, k) => trazo(l, pr, k))}
        {guias && cam.pitch <= (escena.etiquetasHastaPitch ?? 90) && escena.etiquetas?.map((t, k) => {
          const s = pr.p(t.p);
          // Recoloca el texto para que no se salga del dibujo (ancho aproximado de la letra a mano).
          const anchoTexto = Math.max(...t.texto.map((l) => l.length)) * 7.6;
          const ancla = t.ancla ?? 'start';
          const izq = ancla === 'start' ? 0 : ancla === 'end' ? anchoTexto : anchoTexto / 2;
          let x = s.x + (t.dx ?? 0);
          x = Math.min(Math.max(x, 6 + izq), ANCHO - 6 - (anchoTexto - izq));
          const y = Math.min(Math.max(s.y + (t.dy ?? 0), 18), alto - 22 - (t.texto.length - 1) * 17);
          return (
            <text
              key={k} x={x} y={y} fontFamily={F.lapiz} fontSize={18} fill={t.color ?? C.banderaTexto}
              textAnchor={t.ancla ?? 'start'} stroke={C.papelClaro} strokeWidth={4} paintOrder="stroke" strokeLinejoin="round"
            >
              {t.texto.map((l, i) => <tspan key={i} x={x} dy={i === 0 ? 0 : 17}>{l}</tspan>)}
            </text>
          );
        })}
        <text x={ANCHO - 8} y={alto - 8} textAnchor="end" fontFamily={F.rotulo} fontSize={11} letterSpacing={1} fill={C.gris}>
          ↔ ARRASTRA PARA GIRAR
        </text>
      </svg>
      <div className="visor3d-botones" role="group" aria-label="Vistas">
        {vistas.map((vv, i) => (
          <button
            key={vv.nombre} type="button" className={i === vistaActiva ? 'on' : undefined} aria-pressed={i === vistaActiva}
            onClick={() => { setCam({ yaw: vv.yaw, pitch: vv.pitch }); setVistaActiva(i); }}
          >{vv.nombre}</button>
        ))}
        {(escena.guias?.length || escena.etiquetas?.length) ? (
          <button type="button" className="guias" aria-pressed={guias} onClick={() => setGuias(!guias)}>{guias ? 'Ocultar notas' : 'Ver notas'}</button>
        ) : null}
      </div>
    </div>
  );
}
