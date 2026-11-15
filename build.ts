// Compila la web: static/ → public/ y src/main.tsx → public/app.js.
// public/ no se sube al repositorio: lo genera Cloudflare (o `bun run build` en local).
import { cpSync, mkdirSync, rmSync, readFileSync } from 'node:fs';

const pkg = JSON.parse(readFileSync('package.json', 'utf8')) as { version: string };
const hora = new Date().toISOString();

rmSync('public', { recursive: true, force: true });
mkdirSync('public', { recursive: true });
cpSync('static', 'public', { recursive: true });

const r = await Bun.build({
  entrypoints: ['src/main.tsx'],
  outdir: 'public',
  naming: 'app.js',
  minify: process.env.SIN_MINIFICAR !== '1',
  target: 'browser',
  define: { 'process.env.NODE_ENV': '"production"' },
});
if (!r.success) {
  for (const m of r.logs) console.error(m);
  process.exit(1);
}
console.log(`MyGolf ${pkg.version} compilado (${hora})`);
