// Preferencias y progreso guardados en el navegador. Cuando haya cuentas (Supabase),
// se sincronizarán con el perfil del usuario; hasta entonces viven solo aquí.
import { useEffect, useState } from 'react';

const CLAVE_MANO = 'mygolf.mano';
const CLAVE_CURSO = 'mygolf.curso.v2';
const CLAVE_NIVEL = 'mygolf.nivel';
const EVENTO = 'mygolf-preferencias';

function leer<T>(clave: string, porDefecto: T): T {
  try {
    const v = localStorage.getItem(clave);
    return v === null ? porDefecto : (JSON.parse(v) as T);
  } catch {
    return porDefecto;
  }
}

function escribir(clave: string, valor: unknown) {
  try {
    localStorage.setItem(clave, JSON.stringify(valor));
  } catch {
    // Sin almacenamiento (modo privado estricto): la preferencia dura lo que la pestaña.
  }
  window.dispatchEvent(new Event(EVENTO));
}

function usePreferencia<T>(clave: string, porDefecto: T): [T, (v: T) => void] {
  const [valor, setValor] = useState<T>(() => leer(clave, porDefecto));
  useEffect(() => {
    const al = () => setValor(leer(clave, porDefecto));
    window.addEventListener(EVENTO, al);
    window.addEventListener('storage', al);
    return () => {
      window.removeEventListener(EVENTO, al);
      window.removeEventListener('storage', al);
    };
  }, [clave]);
  return [valor, (v: T) => escribir(clave, v)];
}

export type Mano = 'diestro' | 'zurdo';

export function useMano() {
  return usePreferencia<Mano>(CLAVE_MANO, 'diestro');
}

/** Hoyos terminados, por identificador («principiante-3»). */
export function useHoyosHechos() {
  const [hechos, poner] = usePreferencia<string[]>(CLAVE_CURSO, []);
  const marcar = (id: string) => {
    if (!hechos.includes(id)) poner([...hechos, id]);
  };
  return { hechos, marcar };
}

/** Nivel que se ve en el recorrido. */
export function useNivelVisto() {
  return usePreferencia<string>(CLAVE_NIVEL, 'principiante');
}
