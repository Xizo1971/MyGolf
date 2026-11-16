// Línea discreta al pie de cada pantalla con la versión que estás viendo.
// Además pregunta al servidor qué versión hay publicada: si no coincide (el navegador
// o la app instalada tienen una versión guardada), avisa para recargar.
import { useEffect, useState } from 'react';
import { tx } from '../i18n/t';
import { COMMIT, COMPILADO, VERSION, esOtraCompilacion, textoSello, type Sello as TSello } from '../version';

const APP: TSello = { version: VERSION, commit: COMMIT, compilado: COMPILADO };

let publicadaCache: Promise<TSello | null> | null = null;
function publicada(): Promise<TSello | null> {
  publicadaCache ??= fetch('/version.json', { cache: 'no-store' })
    .then((r) => (r.ok ? (r.json() as Promise<TSello>) : null))
    .catch(() => null);
  return publicadaCache;
}

export function Sello() {
  const [nueva, setNueva] = useState<TSello | null>(null);
  useEffect(() => {
    let vivo = true;
    void publicada().then((p) => {
      if (vivo && p && esOtraCompilacion(APP, p)) setNueva(p);
    });
    return () => { vivo = false; };
  }, []);
  return (
    <div className="sello">
      {nueva && (
        <button type="button" className="sello-aviso" onClick={() => location.reload()}>
          {tx('Hay una versión más nueva ({0}). Toca para recargar.', [textoSello(nueva)])}
        </button>
      )}
      <span title={tx('Versión · commit · compilada')}>MyGolf {textoSello(APP)}</span>
    </div>
  );
}
