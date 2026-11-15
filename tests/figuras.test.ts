import { describe, expect, test } from 'bun:test';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { FIGURAS, type FiguraId } from '../src/figuras';

describe('dibujos', () => {
  for (const id of Object.keys(FIGURAS) as FiguraId[]) {
    const ficha = FIGURAS[id];
    for (const zurdo of ficha.porMano ? [false, true] : [false]) {
      test(`${id}${zurdo ? ' (zurdo)' : ''} se pinta sin números rotos y con texto alternativo`, () => {
        const svg = renderToStaticMarkup(createElement(ficha.componente, { zurdo }));
        expect(svg.startsWith('<svg')).toBe(true);
        expect(svg).not.toContain('NaN');
        expect(svg).not.toContain('undefined');
        const etiqueta = /aria-label="([^"]+)"/.exec(svg)?.[1] ?? '';
        expect(etiqueta.length).toBeGreaterThan(30);
      });
    }
  }

  test('la versión para zurdos es distinta de la de diestros cuando importa la mano', () => {
    for (const [id, ficha] of Object.entries(FIGURAS)) {
      if (!ficha.porMano) continue;
      const d = renderToStaticMarkup(createElement(ficha.componente, { zurdo: false }));
      const z = renderToStaticMarkup(createElement(ficha.componente, { zurdo: true }));
      expect(z, id).not.toBe(d);
    }
  });
});
