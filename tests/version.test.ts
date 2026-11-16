import { describe, expect, test } from 'bun:test';
import { COMMIT, VERSION, esOtraCompilacion, textoSello } from '../src/version';
import pkg from '../package.json';

describe('sello de versión', () => {
  test('la versión sale de package.json y, sin compilar, el commit es «local»', () => {
    expect(VERSION).toBe(pkg.version);
    expect(COMMIT).toBe('local');
  });

  test('el texto lleva versión, commit y fecha en hora de Madrid', () => {
    const t = textoSello({ version: '0.1.1', commit: 'a1ac6fa', compilado: '2026-11-16T09:20:00.000Z' });
    expect(t).toBe('v0.1.1 · a1ac6fa · 16/11/2026 10:20');
  });

  test('sin fecha, solo versión y commit', () => {
    expect(textoSello({ version: '0.1.1', commit: 'local', compilado: '' })).toBe('v0.1.1 · local');
  });

  test('detecta cuándo lo publicado es otra compilación', () => {
    const a = { version: '0.1.1', commit: 'a1ac6fa', compilado: '2026-11-16T09:20:00.000Z' };
    expect(esOtraCompilacion(a, { ...a })).toBe(false);
    expect(esOtraCompilacion(a, { ...a, commit: 'b2bd7fb' })).toBe(true);
    expect(esOtraCompilacion(a, { ...a, compilado: '2026-11-16T10:00:00.000Z' })).toBe(true);
  });
});
