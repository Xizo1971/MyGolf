// Hace una captura de cada dibujo del curso (y su versión para zurdos) en capturas/.
// Uso: bun scripts/capturas.ts [id...]   (CHROME=/ruta/al/navegador si Playwright no trae uno)
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { mkdirSync } from 'node:fs';
import { chromium } from 'playwright';
import { FIGURAS, type FiguraId } from '../src/figuras';

const pedidas = process.argv.slice(2) as FiguraId[];
const ids = (pedidas.length ? pedidas : (Object.keys(FIGURAS) as FiguraId[]));
mkdirSync('capturas', { recursive: true });

const navegador = await chromium.launch(process.env.CHROME ? { executablePath: process.env.CHROME } : {});
const pagina = await navegador.newPage({ viewport: { width: 420, height: 600 }, deviceScaleFactor: 2 });
const fuentes =
  '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700&family=Barlow:wght@400;500;600&family=Caveat:wght@500;600&display=swap">';

for (const id of ids) {
  const ficha = FIGURAS[id];
  for (const zurdo of ficha.porMano ? [false, true] : [false]) {
    const svg = renderToStaticMarkup(createElement(ficha.componente, { zurdo }));
    await pagina.setContent(`<!doctype html><html><head>${fuentes}</head><body style="margin:0;padding:10px;background:#F1ECDD;width:370px">${svg}</body></html>`, { waitUntil: 'load' });
    await pagina.waitForTimeout(150);
    const nombre = `capturas/${id}${zurdo ? '-zurdo' : ''}.png`;
    await pagina.locator('svg').first().screenshot({ path: nombre });
    console.log(nombre);
  }
}
await navegador.close();
