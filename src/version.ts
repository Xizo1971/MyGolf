// Sello de la compilación: versión (de package.json), commit y fecha.
// build.ts sustituye __COMMIT__ y __COMPILADO__; fuera de la compilación (pruebas,
// servidor local sin compilar) valen 'local' y ''.
import pkg from '../package.json';

declare const __COMMIT__: string | undefined;
declare const __COMPILADO__: string | undefined;

export const VERSION: string = pkg.version;
export const COMMIT: string = typeof __COMMIT__ === 'string' ? __COMMIT__ : 'local';
export const COMPILADO: string = typeof __COMPILADO__ === 'string' ? __COMPILADO__ : '';

export interface Sello {
  version: string;
  commit: string;
  compilado: string;
}

/** «v0.1.1 · a1ac6fa · 16/11/2026 10:20» (hora de Madrid). */
export function textoSello(s: Sello): string {
  const partes = [`v${s.version}`, s.commit];
  if (s.compilado) {
    const f = new Date(s.compilado);
    if (!Number.isNaN(f.getTime())) {
      partes.push(
        f.toLocaleString('es-ES', {
          timeZone: 'Europe/Madrid', day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit',
        }).replace(',', ''),
      );
    }
  }
  return partes.join(' · ');
}

/** ¿Es otra compilación distinta de la que estás viendo? */
export function esOtraCompilacion(app: Sello, publicada: Sello): boolean {
  return app.commit !== publicada.commit || app.version !== publicada.version || app.compilado !== publicada.compilado;
}
