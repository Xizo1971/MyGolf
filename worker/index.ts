// Worker de MyGolf. Los ficheros estáticos los sirve Cloudflare (Static Assets);
// aquí solo llegan las rutas /api/* (ver run_worker_first en wrangler.jsonc).
import { VERSION } from '../src/version';

interface Env {
  ASSETS: Fetcher;
}

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    const url = new URL(req.url);
    if (url.pathname === '/api/salud') {
      return Response.json({ ok: true, version: VERSION });
    }
    if (url.pathname.startsWith('/api/')) {
      return Response.json({ error: 'No existe' }, { status: 404 });
    }
    return env.ASSETS.fetch(req);
  },
} satisfies ExportedHandler<Env>;
