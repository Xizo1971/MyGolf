// Captura cada figura 3D desde todas sus vistas (para revisar el modelado).
// Uso: CHROME=/ruta bun scripts/vistas3d.tsx [carpeta]
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { mkdirSync } from 'node:fs';
import { chromium } from 'playwright';
import { Visor3D, type Vista } from '../src/tres/Visor3D';
import { escenaPostura } from '../src/tres/maniqui';
import { escenaGrip } from '../src/tres/manos';

const carpeta = process.argv[2] ?? 'capturas/3d';
mkdirSync(carpeta, { recursive: true });
const cuerpo: Vista[] = [
  { nombre: 'dtl', yaw: 90, pitch: 6 }, { nombre: 'frente', yaw: 0, pitch: 6 }, { nombre: 'diagonal', yaw: 45, pitch: 18 }, { nombre: 'arriba', yaw: 0, pitch: 80 },
];
const manos: Vista[] = [
  { nombre: 'tu', yaw: 180, pitch: 22 }, { nombre: 'frente', yaw: 0, pitch: 12 }, { nombre: 'objetivo', yaw: -90, pitch: 10 }, { nombre: 'atras', yaw: 90, pitch: 10 },
];
const casos = [
  { id: 'postura', escena: escenaPostura(), vistas: cuerpo, alto: 400 },
  { id: 'mano-arriba', escena: escenaGrip({ union: 'solapado', manos: 'una' }), vistas: manos, alto: 340 },
  { id: 'grip-solapado', escena: escenaGrip({ union: 'solapado', manos: 'dos' }), vistas: manos, alto: 360 },
  { id: 'grip-entrelazado', escena: escenaGrip({ union: 'entrelazado', manos: 'dos' }), vistas: manos, alto: 360 },
  { id: 'grip-diez', escena: escenaGrip({ union: 'diez', manos: 'dos' }), vistas: manos, alto: 360 },
];
const nav = await chromium.launch(process.env.CHROME ? { executablePath: process.env.CHROME } : {});
const pag = await nav.newPage({ viewport: { width: 400, height: 520 }, deviceScaleFactor: 2 });
for (const c of casos) {
  for (const zurdo of [false, true]) {
    for (const vista of c.vistas) {
      if (zurdo && vista !== c.vistas[0]) continue;
      const html = renderToStaticMarkup(createElement(Visor3D, { escena: c.escena, vistas: [vista], etiqueta: c.id, alto: c.alto, zurdo }));
      await pag.setContent(`<body style="margin:0;padding:8px;background:#F1ECDD;width:370px">${html}</body>`);
      const ruta = `${carpeta}/${c.id}-${vista.nombre}${zurdo ? '-zurdo' : ''}.png`;
      await pag.locator('svg').first().screenshot({ path: ruta });
      console.log(ruta);
    }
  }
}
await nav.close();
