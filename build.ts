// Compila la web: static/ → public/ y src/main.tsx → public/app.js.
// public/ no se sube al repositorio: lo genera Cloudflare (o `bun run build` en local).
//
// Cada compilación lleva su «sello»: versión de package.json, commit y fecha. Va dentro
// de app.js (lo que muestra la app) y en public/version.json (lo que hay publicado),
// para poder comparar ambos y saber si el navegador tiene una versión vieja.
import { cpSync, mkdirSync, rmSync, readFileSync, writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';

const pkg = JSON.parse(readFileSync('package.json', 'utf8')) as { version: string };

function commitActual(): string {
  // En Cloudflare (Workers Builds) viene en WORKERS_CI_COMMIT_SHA; en local, de git.
  const ci = process.env.WORKERS_CI_COMMIT_SHA;
  if (ci) return ci.slice(0, 7);
  try {
    const sha = execSync('git rev-parse --short=7 HEAD', { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim();
    const sucio = execSync('git status --porcelain', { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim() !== '';
    return sucio ? `${sha}+local` : sha;
  } catch {
    return 'local';
  }
}

const sello = { version: pkg.version, commit: commitActual(), compilado: new Date().toISOString() };

rmSync('public', { recursive: true, force: true });
mkdirSync('public', { recursive: true });
cpSync('static', 'public', { recursive: true });
writeFileSync('public/version.json', JSON.stringify(sello) + '\n');

const r = await Bun.build({
  entrypoints: ['src/main.tsx'],
  outdir: 'public',
  naming: 'app.js',
  minify: process.env.SIN_MINIFICAR !== '1',
  target: 'browser',
  define: {
    'process.env.NODE_ENV': '"production"',
    __COMMIT__: JSON.stringify(sello.commit),
    __COMPILADO__: JSON.stringify(sello.compilado),
  },
});
if (!r.success) {
  for (const m of r.logs) console.error(m);
  process.exit(1);
}
console.log(`MyGolf ${sello.version} · ${sello.commit} · ${sello.compilado}`);
