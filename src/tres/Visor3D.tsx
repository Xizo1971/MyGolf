// Visor de escenas 3D: dibuja en SVG, se gira arrastrando con el dedo (horizontal) o
// el ratón (horizontal y vertical) y tiene botones de vistas predefinidas.
import { useId, useMemo, useRef, useState, type PointerEvent as PE, type ReactNode } from 'react';
import { C, F } from '../figuras/comun';
import { envolvente, espejar, mezclar, proyector, siluetas, trocear, type Camara, type Escena, type Etiqueta3D, type Linea3D, type Proyector, type V3 } from './motor';

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
  /** Encuadre fijo (para escenas animadas: si no, la cámara bailaría con cada fotograma). */
  encuadre?: { c: V3; r: number };
  /** Botones propios (por ejemplo, «▶ Ver el golpe»), junto a los de las vistas. */
  botones?: ReactNode;
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

/**
 * Coloca las notas: las recoloca para que no se salgan del dibujo (ancho aproximado de la
 * letra a mano) y, si una pisa a otra ya colocada, la sube (o, si no cabe, la baja).
 */
export function colocarNotas(etiquetas: Etiqueta3D[], pr: Proyector, alto: number) {
  const puestas: { x: number; y: number; t: Etiqueta3D; caja: [number, number, number, number] }[] = [];
  const pisa = (c: [number, number, number, number]) =>
    puestas.some(({ caja: o }) => c[0] < o[2] && c[2] > o[0] && c[1] < o[3] && c[3] > o[1]);
  for (const t of etiquetas) {
    const s = pr.p(t.p);
    const anchoTexto = Math.max(...t.texto.map((l) => l.length)) * 7.6;
    const altoTexto = t.texto.length * 17;
    const ancla = t.ancla ?? 'start';
    const izq = ancla === 'start' ? 0 : ancla === 'end' ? anchoTexto : anchoTexto / 2;
    let x = s.x + (t.dx ?? 0);
    x = Math.min(Math.max(x, 6 + izq), ANCHO - 6 - (anchoTexto - izq));
    const yMin = 18, yMax = alto - 22 - (t.texto.length - 1) * 17;
    const y0 = Math.min(Math.max(s.y + (t.dy ?? 0), yMin), yMax);
    const caja = (y: number): [number, number, number, number] => [x - izq, y - 14, x - izq + anchoTexto, y - 14 + altoTexto];
    let y = y0;
    for (let i = 1; i <= 12 && pisa(caja(y)); i++) {
      const arriba = y0 - i * 9, abajo = y0 + i * 9;
      if (arriba >= yMin && !pisa(caja(arriba))) { y = arriba; break; }
      if (abajo <= yMax && !pisa(caja(abajo))) { y = abajo; break; }
    }
    puestas.push({ x, y, t, caja: caja(y) });
  }
  return puestas;
}

export function Visor3D(p: PropsVisor) {
  const alto = p.alto ?? 380;
  const escena = useMemo(() => {
    const e = p.zurdo ? espejar(p.escena) : p.escena;
    return { ...e, prims: trocear(e.prims, 0.3) };
  }, [p.escena, p.zurdo]);
  const cajaEscena = useMemo(() => envolvente(escena.prims), [escena]);
  const caja = p.encuadre ? { c: (p.zurdo ? [-p.encuadre.c[0], p.encuadre.c[1], p.encuadre.c[2]] : p.encuadre.c) as V3, r: p.encuadre.r } : cajaEscena;
  // Para zurdos, las vistas laterales se miran desde el otro lado.
  const vistas = useMemo(() => p.vistas.map((v) => (p.zurdo ? { ...v, yaw: -v.yaw } : v)), [p.vistas, p.zurdo]);
  const [cam, setCam] = useState<Camara>(() => ({ yaw: vistas[0]!.yaw, pitch: vistas[0]!.pitch }));
  const [vistaActiva, setVistaActiva] = useState(0);
  const [guias, setGuias] = useState(p.guiasIniciales ?? true);
  const arrastre = useRef<{ x: number; y: number; cam: Camara } | null>(null);

  const pr = proyector(cam, caja.c, caja.r, ANCHO, alto);
  const formas = siluetas(escena.prims, pr, C.papelClaro);
  const tinta = escena.contorno?.color ?? C.tinta;
  const anchoTinta = escena.contorno?.ancho ?? 2.2;
  // Acuarela: un degradado por color (claro arriba a la izquierda, sombra abajo a la derecha);
  // con objectBoundingBox cada pieza recibe su propio degradado.
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const colores = escena.acuarela ? [...new Set(formas.map((f) => f.base))] : [];
  const idColor = (c: string) => `acu${uid}${c.slice(1)}`;

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
        {colores.length > 0 && (
          <defs>
            {colores.map((c) => (
              <linearGradient key={c} id={idColor(c)} x1="0.1" y1="0" x2="0.9" y2="1">
                <stop offset="0" stopColor={mezclar(c, '#FFFFFF', 0.45)} />
                <stop offset="0.5" stopColor={c} />
                <stop offset="1" stopColor={mezclar(c, '#7A5530', 0.18)} />
              </linearGradient>
            ))}
          </defs>
        )}
        {escena.fondo?.map((l, k) => trazo(l, pr, k))}
        {formas.map((f, i) => (
          <g key={i}>
            <path d={f.d} fill={tinta} stroke={tinta} strokeWidth={anchoTinta} strokeLinejoin="round" />
            {escena.acuarela ? (
              <>
                <path d={f.d} fill={`url(#${idColor(f.base)})`} />
                {f.niebla > 0.01 && <path d={f.d} fill={C.papelClaro} fillOpacity={f.niebla} />}
              </>
            ) : <path d={f.d} fill={f.color} />}
          </g>
        ))}
        {guias && escena.guias?.map((l, k) => trazo(l, pr, k))}
        {guias && cam.pitch <= (escena.etiquetasHastaPitch ?? 90) && colocarNotas(escena.etiquetas ?? [], pr, alto).map((n, k) => (
          <text
            key={k} x={n.x} y={n.y} fontFamily={F.lapiz} fontSize={18} fill={n.t.color ?? C.banderaTexto}
            textAnchor={n.t.ancla ?? 'start'} stroke={C.papelClaro} strokeWidth={4} paintOrder="stroke" strokeLinejoin="round"
          >
            {n.t.texto.map((l, i) => <tspan key={i} x={n.x} dy={i === 0 ? 0 : 17}>{l}</tspan>)}
          </text>
        ))}
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
        {p.botones}
        {(escena.guias?.length || escena.etiquetas?.length) ? (
          <button type="button" className="guias" aria-pressed={guias} onClick={() => setGuias(!guias)}>{guias ? 'Ocultar notas' : 'Ver notas'}</button>
        ) : null}
      </div>
    </div>
  );
}
