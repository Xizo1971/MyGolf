// Servidor local: sirve public/ y responde /api/salud como el Worker.
import { VERSION } from '../src/version';

const PUERTO = Number(process.env.PORT ?? 8788);

Bun.serve({
  port: PUERTO,
  async fetch(req) {
    const url = new URL(req.url);
    if (url.pathname === '/api/salud') {
      const f = Bun.file('public/version.json');
      const sello = (await f.exists()) ? await f.json() : { version: VERSION };
      return Response.json({ ok: true, ...sello, local: true });
    }
    const ruta = url.pathname === '/' ? '/index.html' : url.pathname;
    const f = Bun.file(`public${ruta}`);
    if (await f.exists()) return new Response(f);
    return new Response(Bun.file('public/index.html'));
  },
});
console.log(`MyGolf en http://localhost:${PUERTO}`);
