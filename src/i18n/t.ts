// Textos de la interfaz, estilo gettext como en Naipera: el español es la clave.
// Hoy solo hay español; cuando haya catálogos, se cargarán en window.__MYGOLF_I18N__.
type Catalogo = Record<string, string>;

function catalogo(): Catalogo | undefined {
  const g = globalThis as { __MYGOLF_I18N__?: Catalogo };
  return g.__MYGOLF_I18N__;
}

/** Traduce `texto` y rellena {0}, {1}… con `vars`. Sin traducción, devuelve el español. */
export function tx(texto: string, vars: (string | number)[] = []): string {
  const base = catalogo()?.[texto] ?? texto;
  return base.replace(/\{(\d+)\}/g, (_, i: string) => String(vars[Number(i)] ?? ''));
}
