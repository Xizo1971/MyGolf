import { describe, expect, test } from 'bun:test';
import { envolvente, espejar, proyector, siluetas, v } from '../src/tres/motor';
import { escenaPostura, posturaHierro } from '../src/tres/maniqui';
import { escenaGrip } from '../src/tres/manos';

describe('motor 3D', () => {
  test('de frente, el objetivo (+x) sale a la derecha; desde detrás de la línea, la bola (+z) a la derecha', () => {
    const pr0 = proyector({ yaw: 0, pitch: 0 }, [0, 0, 0], 1, 350, 350);
    expect(pr0.p([1, 0, 0]).x).toBeGreaterThan(pr0.p([0, 0, 0]).x);
    const pr90 = proyector({ yaw: 90, pitch: 0 }, [0, 0, 0], 1, 350, 350);
    expect(pr90.p([0, 0, 1]).x).toBeGreaterThan(pr90.p([0, 0, 0]).x);
    // y desde detrás de la línea, el objetivo queda más lejos
    expect(pr90.p([1, 0, 0]).d).toBeGreaterThan(pr90.p([0, 0, 0]).d);
  });

  test('desde arriba, lo alto queda más cerca de la cámara', () => {
    const pr = proyector({ yaw: 0, pitch: 80 }, [0, 0, 0], 1, 350, 350);
    expect(pr.p([0, 1, 0]).d).toBeLessThan(pr.p([0, 0, 0]).d);
  });

  test('las siluetas salen ordenadas de lejos a cerca y sin números rotos', () => {
    const e = escenaPostura();
    const caja = envolvente(e.prims);
    const formas = siluetas(e.prims, proyector({ yaw: 45, pitch: 20 }, caja.c, caja.r, 350, 400), '#FBF8EF');
    for (let i = 1; i < formas.length; i++) expect(formas[i]!.prof).toBeLessThanOrEqual(formas[i - 1]!.prof);
    expect(formas.some((f) => f.d.includes('NaN'))).toBe(false);
  });

  test('el espejo para zurdos lleva el objetivo a -x', () => {
    const e = espejar({ prims: [{ tipo: 'esfera', c: [0.5, 0, 0], r: 0.1, color: '#000000' }] });
    expect(e.prims[0]!.tipo === 'esfera' && e.prims[0]!.c[0]).toBe(-0.5);
  });
});

describe('maniquí y manos', () => {
  test('postura: hombros sobre la punta de los pies y espalda inclinada unos 37°', () => {
    const j = posturaHierro();
    expect(Math.abs(j.hombroI[2] - j.puntaI[2])).toBeLessThan(0.05);
    const eje = v.norm(v.res(j.cuello, j.pelvis));
    const grados = (Math.acos(eje[1]) * 180) / Math.PI;
    expect(grados).toBeGreaterThan(30);
    expect(grados).toBeLessThan(45);
  });

  test('el palo toca el suelo y la bola está delante de la cara', () => {
    const j = posturaHierro();
    expect(j.talonPalo[1]).toBeCloseTo(0.03, 2);
    expect(j.bola[0]).toBeGreaterThan(j.talonPalo[0]);
  });

  test('las tres uniones del grip son distintas', () => {
    const a = JSON.stringify(escenaGrip({ union: 'solapado', manos: 'dos' }).prims);
    const b = JSON.stringify(escenaGrip({ union: 'entrelazado', manos: 'dos' }).prims);
    const c = JSON.stringify(escenaGrip({ union: 'diez', manos: 'dos' }).prims);
    expect(new Set([a, b, c]).size).toBe(3);
  });

  test('para zurdos el texto habla del hombro izquierdo', () => {
    const e = escenaGrip({ union: 'solapado', manos: 'dos', zurdo: true });
    expect(e.etiquetas?.some((t) => t.texto.join(' ').includes('izquierdo'))).toBe(true);
  });
});

describe('espejo de las notas', () => {
  test('una nota sin ancla (empieza en el punto) pasa a terminar en él', () => {
    const e = espejar({ prims: [], etiquetas: [{ p: [0.2, 0, 0], texto: ['x'], dx: 10 }] });
    expect(e.etiquetas![0]!.ancla).toBe('end');
    expect(e.etiquetas![0]!.dx).toBe(-10);
  });
});
