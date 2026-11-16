import { describe, expect, test } from 'bun:test';
import { HOYOS, NIVELES, PROGRAMA, idHoyo, par, programaDe } from '../src/curso';
import { FIGURAS } from '../src/figuras';
import { puntosRecorrido } from '../src/ui/Recorrido';

describe('programa', () => {
  test('tres niveles: principiante 15, intermedio 9 y avanzado 9 hoyos', () => {
    expect(NIVELES.map((n) => n.id)).toEqual(['principiante', 'intermedio', 'avanzado']);
    expect(programaDe('principiante').length).toBe(15);
    expect(programaDe('intermedio').length).toBe(9);
    expect(programaDe('avanzado').length).toBe(9);
  });

  test('en cada nivel los hoyos van del 1 al último, sin huecos ni repetidos', () => {
    for (const n of NIVELES) {
      const nums = programaDe(n.id).map((e) => e.numero);
      expect(nums).toEqual(Array.from({ length: nums.length }, (_, i) => i + 1));
    }
  });

  test('el principiante empieza por la seguridad y deja el campo para el final', () => {
    const p = programaDe('principiante');
    expect(p[0]!.titulo).toBe('Tu primer día');
    expect(p[p.length - 1]!.titulo).toBe('Antes de salir al campo');
  });

  test('los identificadores son únicos', () => {
    expect(new Set(PROGRAMA.map((e) => idHoyo(e.nivel, e.numero))).size).toBe(PROGRAMA.length);
  });

  test('el mapa reparte los hoyos por el camino sin repetir posición', () => {
    for (const n of [9, 15, 18]) {
      const pts = puntosRecorrido(n);
      expect(pts.length).toBe(n);
      expect(new Set(pts.map((p) => p.join(','))).size).toBe(n);
    }
  });
});

describe('hoyos escritos', () => {
  for (const h of HOYOS) {
    describe(`${h.nivel} ${h.numero}`, () => {
      const entrada = PROGRAMA.find((e) => e.nivel === h.nivel && e.numero === h.numero)!;

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

  test('no hay dos hoyos con el mismo identificador', () => {
    expect(new Set(HOYOS.map((h) => idHoyo(h.nivel, h.numero))).size).toBe(HOYOS.length);
  });

  test('todos los dibujos del catálogo se usan en algún hoyo', () => {
    const usados = new Set(HOYOS.flatMap((h) => h.golpes.flatMap((g) => (g.figura ? [g.figura.id] : []))));
    expect([...Object.keys(FIGURAS)].filter((id) => !usados.has(id as never))).toEqual([]);
  });
});
