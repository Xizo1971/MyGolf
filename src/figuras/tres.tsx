// Figuras 3D del curso: el maniquí en postura y las manos en el grip, que se pueden girar.
import { useMemo, useState } from 'react';
import { Visor3D, type Vista } from '../tres/Visor3D';
import { escenaPostura } from '../tres/maniqui';
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
