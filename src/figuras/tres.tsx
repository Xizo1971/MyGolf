// Figuras 3D del curso: el maniquí en postura y las manos en el grip, que se pueden girar.
import { useEffect, useMemo, useState } from 'react';
import { Visor3D, type Vista } from '../tres/Visor3D';
import { escenaPostura } from '../tres/maniqui';
import { GIRO_CHIP, GIRO_PUTT, encuadreSwing, escenaChip, escenaPutt, escenaSwing, momentos, type TipoSwing } from '../tres/golpes';
import { envolvente, type Escena } from '../tres/motor';
import { escenaGrip, type TipoUnion } from '../tres/manos';
import type { PropsFigura } from './comun';

const VISTAS_CUERPO: Vista[] = [
  { nombre: 'Detrás de la línea', yaw: 90, pitch: 6 },
  { nombre: 'De frente', yaw: 0, pitch: 6 },
  { nombre: 'En diagonal', yaw: 45, pitch: 18 },
  { nombre: 'Desde arriba', yaw: 0, pitch: 80 },
];

const VISTAS_MANOS: Vista[] = [
  { nombre: 'De frente', yaw: 0, pitch: 12 },
  { nombre: 'Como lo ves tú', yaw: 180, pitch: 22 },
  { nombre: 'Desde el objetivo', yaw: -90, pitch: 10 },
  { nombre: 'Desde atrás', yaw: 90, pitch: 10 },
];

export function Postura3D({ zurdo }: PropsFigura) {
  const escena = useMemo(() => escenaPostura(), []);
  return (
    <Visor3D
      escena={escena} vistas={VISTAS_CUERPO} zurdo={zurdo} alto={400}
      etiqueta="Maniquí en la postura de partida con un hierro: inclinado desde la cadera con la espalda recta, rodillas un poco flexionadas, brazos colgando y hombros encima de la punta de los pies. Se puede girar."
    />
  );
}

export function ManoArriba3D({ zurdo }: PropsFigura) {
  const escena = useMemo(() => escenaGrip({ union: 'solapado', manos: 'una', zurdo }), [zurdo]);
  return (
    <Visor3D
      escena={escena} vistas={VISTAS_MANOS} zurdo={zurdo} alto={340}
      etiqueta={`La mano de arriba (la ${zurdo ? 'derecha' : 'izquierda'}) en el palo: el puño cruza los dedos en diagonal, el pulgar va encima y algo hacia atrás, se ven dos o tres nudillos y la V entre pulgar e índice apunta al hombro ${zurdo ? 'izquierdo' : 'derecho'}. Se puede girar.`}
    />
  );
}

export function Grip3D({ zurdo }: PropsFigura) {
  const escena = useMemo(() => escenaGrip({ union: 'solapado', manos: 'dos', zurdo }), [zurdo]);
  return (
    <Visor3D
      escena={escena} vistas={VISTAS_MANOS} zurdo={zurdo} alto={360}
      etiqueta={`Grip completo: la mano de abajo coge el palo con los dedos, justo debajo de la otra, y su palma tapa el pulgar de la mano de arriba. Las dos V apuntan al hombro ${zurdo ? 'izquierdo' : 'derecho'}. Se puede girar.`}
    />
  );
}

const UNIONES: { id: TipoUnion; nombre: string; nota: string }[] = [
  { id: 'solapado', nombre: 'Solapado', nota: 'El meñique de abajo se apoya entre el índice y el corazón de la otra mano.' },
  { id: 'entrelazado', nombre: 'Entrelazado', nota: 'El meñique de abajo y el índice de arriba se cruzan.' },
  { id: 'diez', nombre: 'Diez dedos', nota: 'Todos los dedos en el palo, como un bate.' },
];

export function TiposGrip3D({ zurdo }: PropsFigura) {
  const [union, setUnion] = useState<TipoUnion>('solapado');
  const escena = useMemo(() => escenaGrip({ union, manos: 'dos', zurdo }), [union, zurdo]);
  const actual = UNIONES.find((u) => u.id === union)!;
  return (
    <div>
      <div className="selector-union" role="radiogroup" aria-label="Forma de unir las manos">
        {UNIONES.map((u) => (
          <button key={u.id} type="button" role="radio" aria-checked={u.id === union} className={u.id === union ? 'on' : undefined} onClick={() => setUnion(u.id)}>{u.nombre}</button>
        ))}
      </div>
      <Visor3D
        key={union}
        escena={escena} vistas={VISTAS_MANOS} zurdo={zurdo} alto={340} guiasIniciales={false}
        etiqueta={`Grip ${actual.nombre.toLowerCase()}: ${actual.nota} Se puede girar.`}
      />
      <p className="nota-union">{actual.nota}</p>
    </div>
  );
}

// --- Juego corto: putt y chip, con el golpe animado -------------------------------

const VISTAS_FRENTE: Vista[] = [
  { nombre: 'De frente', yaw: 0, pitch: 6 },
  { nombre: 'Detrás de la línea', yaw: 90, pitch: 6 },
  { nombre: 'En diagonal', yaw: 45, pitch: 18 },
];
const VISTAS_DETRAS: Vista[] = [VISTAS_FRENTE[1]!, VISTAS_FRENTE[0]!, VISTAS_FRENTE[2]!];

/**
 * Golpe animado: «▶ Ver el golpe» mueve el triángulo de hombros, brazos y palo como un
 * péndulo (giro = amplitud · seno). El encuadre es el de la postura quieta.
 */
function useGolpe(escenaDe: (giro: number) => Escena, amplitud: number, periodoMs: number) {
  const quieta = useMemo(() => escenaDe(0), [escenaDe]);
  const encuadre = useMemo(() => {
    const e = envolvente(quieta.prims);
    return { c: e.c, r: e.r * 1.04 };
  }, [quieta]);
  const [giro, setGiro] = useState(0);
  const [jugando, setJugando] = useState(false);
  useEffect(() => {
    if (!jugando) { setGiro(0); return; }
    let id = 0;
    const t0 = performance.now();
    const paso = (t: number) => {
      setGiro(amplitud * Math.sin(((t - t0) / periodoMs) * 2 * Math.PI));
      id = requestAnimationFrame(paso);
    };
    id = requestAnimationFrame(paso);
    return () => cancelAnimationFrame(id);
  }, [jugando, amplitud, periodoMs]);
  const escena = useMemo(() => (giro === 0 ? quieta : escenaDe(giro)), [giro, quieta, escenaDe]);
  const boton = (
    <button type="button" className={jugando ? 'on' : undefined} aria-pressed={jugando} onClick={() => setJugando(!jugando)}>
      {jugando ? '■ Parar' : '▶ Ver el golpe'}
    </button>
  );
  return { escena, encuadre, boton };
}

export function Putt3D({ zurdo }: PropsFigura) {
  const g = useGolpe(escenaPutt, GIRO_PUTT, 1800);
  return (
    <Visor3D
      escena={g.escena} encuadre={g.encuadre} botones={g.boton} vistas={VISTAS_FRENTE} zurdo={zurdo} alto={400}
      etiqueta="Maniquí haciendo un putt, visto de frente: hombros, brazos y putter forman un triángulo que gira entero desde el centro del pecho, con las muñecas quietas; el putter va tanto hacia atrás como hacia delante. Los ojos quedan encima de la bola. Se puede girar y animar."
    />
  );
}

export function PuttPostura3D({ zurdo }: PropsFigura) {
  const g = useGolpe(escenaPutt, GIRO_PUTT, 1800);
  return (
    <Visor3D
      escena={g.escena} encuadre={g.encuadre} botones={g.boton} vistas={VISTAS_DETRAS} zurdo={zurdo} alto={400}
      etiqueta="Maniquí en la postura del putt visto desde detrás de la línea: inclinado desde la cadera, brazos colgando y los ojos encima de la bola. Se puede girar y animar."
    />
  );
}

export function Chip3D({ zurdo }: PropsFigura) {
  const g = useGolpe(escenaChip, GIRO_CHIP, 2200);
  return (
    <Visor3D
      escena={g.escena} encuadre={g.encuadre} botones={g.boton} vistas={VISTAS_FRENTE} zurdo={zurdo} alto={400}
      etiqueta={`Maniquí en la postura del chip visto de frente: pies juntos, la bola algo retrasada, más peso en el pie ${zurdo ? 'derecho' : 'izquierdo'} y las manos por delante de la bola, con el palo inclinado hacia el objetivo. Se puede girar y animar.`}
    />
  );
}

// --- El swing: momentos clave y animación --------------------------------------------

/**
 * Swing en 3D: botones para pararlo en cada momento (con sus notas) y «▶ Ver el golpe»
 * para verlo entero (sin notas, que se moverían). Empieza en `inicial`.
 */
function Swing3D({ zurdo, tipo, inicial, etiqueta }: PropsFigura & { tipo: TipoSwing; inicial: number; etiqueta: string }) {
  const ms = useMemo(() => momentos(tipo), [tipo]);
  const encuadre = useMemo(() => encuadreSwing(tipo), [tipo]);
  const total = ms[ms.length - 1]!.t + 0.9;
  const [momento, setMomento] = useState(inicial);
  const [t, setT] = useState<number | null>(null);
  useEffect(() => {
    if (t === null) return;
    let id = 0;
    const t0 = performance.now();
    const paso = (ahora: number) => {
      setT((((ahora - t0) / 1000) % total));
      id = requestAnimationFrame(paso);
    };
    id = requestAnimationFrame(paso);
    return () => cancelAnimationFrame(id);
    // Solo arranca o para; t cambia en cada fotograma.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t === null, total]);
  const jugando = t !== null;
  const escena = useMemo(
    () => (jugando ? escenaSwing(tipo, t!) : escenaSwing(tipo, ms[momento]!.t, ms[momento]!.notas)),
    [jugando, t, tipo, ms, momento],
  );
  const botones = (
    <>
      {ms.map((m, i) => (
        <button key={m.nombre} type="button" className={!jugando && i === momento ? 'on' : undefined} aria-pressed={!jugando && i === momento}
          onClick={() => { setT(null); setMomento(i); }}>{m.nombre}</button>
      ))}
      <button type="button" className={jugando ? 'on' : undefined} aria-pressed={jugando} onClick={() => setT(jugando ? null : 0)}>
        {jugando ? '■ Parar' : '▶ Ver el golpe'}
      </button>
    </>
  );
  return <Visor3D escena={escena} encuadre={encuadre} botones={botones} vistas={VISTAS_FRENTE} zurdo={zurdo} alto={420} etiqueta={etiqueta} />;
}

export function MedioSwing3D({ zurdo }: PropsFigura) {
  return <Swing3D zurdo={zurdo} tipo="pitch" inicial={1}
    etiqueta="Maniquí haciendo un medio swing visto de frente: sube hasta que el brazo de arriba queda horizontal (las 9 del reloj), golpea y termina con el otro brazo horizontal (las 3). Se puede girar, parar en cada momento y animar." />;
}

export function SwingCompleto3D({ zurdo }: PropsFigura) {
  return <Swing3D zurdo={zurdo} tipo="completo" inicial={1}
    etiqueta="Maniquí haciendo un swing completo: en la subida la espalda queda mirando al objetivo; en el impacto golpea la bola primero; en el final queda de cara al objetivo, con el peso en el pie adelantado y el de atrás de puntillas. Se puede girar, parar en cada momento y animar." />;
}

export function Impacto3D({ zurdo }: PropsFigura) {
  return <Swing3D zurdo={zurdo} tipo="impacto" inicial={2}
    etiqueta="Maniquí en el momento del impacto con un hierro: las manos van por delante de la cabeza del palo, el peso está en el pie adelantado y el punto más bajo del swing (la chuleta) queda después de la bola. Se puede girar, parar en cada momento y animar." />;
}
