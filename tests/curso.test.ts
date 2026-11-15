import { describe, expect, test } from 'bun:test';
import { HOYOS, PROGRAMA, par } from '../src/curso';
import { FIGURAS } from '../src/figuras';

describe('programa', () => {
  test('tiene los 18 hoyos, numerados del 1 al 18, 9 de ida y 9 de vuelta', () => {
    expect(PROGRAMA.map((e) => e.numero)).toEqual(Array.from({ length: 18 }, (_, i) => i + 1));
    expect(PROGRAMA.filter((e) => e.tramo === 'ida').length).toBe(9);
    expect(PROGRAMA.filter((e) => e.tramo === 'vuelta').length).toBe(9);
  });
});

describe('hoyos escritos', () => {
  for (const h of HOYOS) {
    describe(`hoyo ${h.numero}`, () => {
      const entrada = PROGRAMA.find((e) => e.numero === h.numero)!;

      test('coincide con el programa', () => {
        expect(entrada).toBeDefined();
        expect(h.titulo).toBe(entrada.titulo);
        expect(h.objetivo).toBe(entrada.objetivo);
      });

      test('par entre 3 y 5 y duración razonable', () => {
        expect(par(h)).toBeGreaterThanOrEqual(3);
        expect(par(h)).toBeLessThanOrEqual(5);
        expect(h.minutos).toBeGreaterThan(0);
        expect(h.minutos).toBeLessThanOrEqual(20);
      });

      test('cada golpe tiene título y texto, y sus dibujos existen', () => {
        for (const g of h.golpes) {
          expect(g.titulo.trim().length).toBeGreaterThan(0);
          expect(g.texto.length).toBeGreaterThan(0);
          for (const p of g.texto) {
            expect(p.trim().length).toBeGreaterThan(20);
            // Las negritas tienen que ir por parejas.
            expect((p.match(/\*\*/g) ?? []).length % 2).toBe(0);
          }
          if (g.figura) expect(FIGURAS[g.figura.id]).toBeDefined();
        }
      });

      test('las preguntas tienen al menos 3 opciones distintas y una respuesta válida', () => {
        expect(h.preguntas.length).toBeGreaterThanOrEqual(2);
        for (const q of h.preguntas) {
          expect(q.opciones.length).toBeGreaterThanOrEqual(3);
          expect(new Set(q.opciones).size).toBe(q.opciones.length);
          expect(q.correcta).toBeGreaterThanOrEqual(0);
          expect(q.correcta).toBeLessThan(q.opciones.length);
          expect(q.explicacion.trim().length).toBeGreaterThan(10);
        }
      });

      test('las fuentes son direcciones https', () => {
        for (const f of h.fuentes) expect(f.url).toMatch(/^https:\/\//);
      });
    });
  }

  test('no hay dos hoyos con el mismo número', () => {
    expect(new Set(HOYOS.map((h) => h.numero)).size).toBe(HOYOS.length);
  });

  test('todos los dibujos del catálogo se usan en algún hoyo', () => {
    const usados = new Set(HOYOS.flatMap((h) => h.golpes.flatMap((g) => (g.figura ? [g.figura.id] : []))));
    expect([...Object.keys(FIGURAS)].filter((id) => !usados.has(id as never))).toEqual([]);
  });
});
