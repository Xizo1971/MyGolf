// Preferencias y progreso guardados en el navegador. Cuando haya cuentas (Supabase),
// se sincronizarán con el perfil del usuario; hasta entonces viven solo aquí.
import { useEffect, useState } from 'react';

const CLAVE_MANO = 'mygolf.mano';
const CLAVE_CURSO = 'mygolf.curso';
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

/** Hoyos terminados (números). */
export function useHoyosHechos() {
  const [hechos, poner] = usePreferencia<number[]>(CLAVE_CURSO, []);
  const marcar = (n: number) => {
    if (!hechos.includes(n)) poner([...hechos, n].sort((a, b) => a - b));
  };
  return { hechos, marcar };
}
