# MyGolf · Documentación técnica

*Borrador inicial · 15 de noviembre de 2026 · repositorio `Xizo1971/MyGolf` · dominio `aprende-golf.com`*

Etiquetas: **[Certeza]** comprobado · **[Probable]** inferencia sólida · **No puedo confirmar** cuando no se ha podido verificar.

Toma como referencia el stack de Naipera (`Xizo1971/Juegos_cartas`), quitando lo que aquí no se necesita y evitando su deuda técnica.

## 1. Stack

| Pieza | Tecnología | Igual que Naipera |
|---|---|---|
| Lenguaje | TypeScript **con comprobación de tipos también en la interfaz** (`@types/react` instalado) | No: Naipera no comprueba la interfaz |
| Interfaz | React 19, CSS propio, SVG propio | Sí |
| Empaquetado, pruebas y servidor local | Bun | Sí |
| Producción | Cloudflare Workers + Static Assets | Sí, pero **sin Durable Objects** (no hay multijugador) |
| Base de datos y autenticación | Supabase, proyecto **nuevo**, API REST sin librerías cliente, RLS en todas las tablas | Sí |
| Vídeo (fase 2) | Cloudflare R2, almacenamiento temporal | Nuevo |
| IA | API de Claude con la clave de cada usuario; MediaPipe en el dispositivo (fase 2) | Nuevo |
| Apps (futuro) | Capacitor | Previsto en ambos |
| Pruebas de navegador | Playwright **dentro del repositorio** | No: en Naipera no están en el repo |
| Compilación | La hace Cloudflare; `public/` compilado **no** se sube al repo | No: Naipera sube `public/` |

## 2. Datos verificados para decidir

- [Certeza] La organización de Supabase está en el plan **Pro** (consultado el 15/11/2026). Proyectos activos: «Juegos de cartas» y «TOC TT»; «CCPM Project Manager» está inactivo.
- [Certeza] En Pro, el límite por fichero de Supabase Storage se puede subir hasta 500 GB (docs de Supabase, «Storage file limits»).
- [Certeza] Cloudflare limita el cuerpo de las peticiones a 100 MB en los planes Free y Pro (docs de Cloudflare Workers, «Limits»): los vídeos no deben pasar por el Worker.
- [Certeza] La API de Claude admite imágenes, no vídeo: el análisis se hace con fotogramas.
- **No puedo confirmar** cuánto cuesta al mes un proyecto adicional en Supabase Pro: hay que mirarlo en el panel de facturación antes de crearlo.

## 3. Decisiones (15/11/2026)

- **Clave de Claude:** cada usuario la guarda en sus ajustes. Se envía una vez al Worker, que la cifra (AES-GCM con una clave maestra que es un secreto del Worker) y guarda solo el texto cifrado en Supabase. El navegador nunca vuelve a recibirla completa (solo los 4 últimos caracteres). Las llamadas a Claude las hace el Worker.
- **Suscripción de Claude en lugar de API:** no. [Certeza] La documentación de Claude Code («Legal and compliance») dice que Anthropic no permite a desarrolladores de terceros ofrecer el inicio de sesión de Claude.ai en sus aplicaciones ni enviar peticiones con credenciales de los planes Free, Pro, Max o Ultra en nombre de sus usuarios, y que quien construya productos debe usar una clave de API de Claude Console. Se usa una clave de API por usuario.
- **Dominio:** `aprende-golf.com` está en Cloudflare; se conecta al Worker como dominio propio.
- **Supabase:** proyecto nuevo; Miguel revisa el coste antes de crearlo.
- **Diseño:** «Libreta del caddie». Tipografías Barlow Condensed (títulos y números), Barlow (texto) y Caveat (notas a mano); papel `#F1ECDD`, tinta `#1E2B23`, calle `#2E6B3C`, bandera `#D9541E` (texto en `#B8441A`), arena `#E4D3A2`, agua `#3C7FA6`. En la libreta de clases se usan los símbolos de la tarjeta de juego: círculo = salió bien, cuadrado = me costó.

## 4. Estructura del repositorio (0.1.0)

```
build.ts                 Compila static/ + src/main.tsx → public/ (no se sube al repo)
wrangler.jsonc           Worker «mygolf», Static Assets, dominio aprende-golf.com
worker/index.ts          Worker: /api/salud; el resto lo sirve Static Assets
server/dev.ts            Servidor local (http://localhost:8788)
static/                  index.html, estilo.css, icono.svg, manifest.webmanifest
src/main.tsx             Arranque y rutas por almohadilla (#/, #/hoyo/N, #/ajustes…)
src/i18n/t.ts            tx(): textos de la interfaz (español = clave)
src/curso/               Curso: tipos, programa de 18 hoyos y contenido/es/ (hoyos 1–9)
src/figuras/             Dibujos SVG del curso (17), con versión para zurdos donde importa
src/ui/                  Pantallas: Recorrido, HoyoPantalla, Ajustes, Nav
tests/                   bun test: integridad del curso y de los dibujos
scripts/capturas.ts      Captura cada dibujo en capturas/ para revisarlo
```

## 5. El curso

- **Hoyo = lección; golpe = paso; par = número de golpes.** Cada hoyo tiene objetivo, golpes (texto, dibujo, nota del caddie, ejercicio), preguntas de green con explicación y fuentes.
- Orden «del hoyo hacia fuera»: ida (1–9) = el juego, lo común a todos los golpes y el juego corto; vuelta (10–18) = swing completo y juego en el campo. Programa en `src/curso/programa.ts`; escritos los hoyos 1–9.
- **Todo hoyo nace con `revisadoPorProfe: false`** y la lección lo avisa. Lo técnico (grip, postura, chip…) es enseñanza estándar, pero debe validarlo el profesor de Miguel antes de darlo por bueno.
- Datos de reglas comprobados (15/11/2026) contra The R&A, la USGA y prensa especializada; las fuentes van en cada hoyo.
- La regla del 12 del chip: las fuentes coinciden en PW 1:2, 9 1:3, 7 1:5, pero **no** en los wedges más abiertos; por eso el dibujo solo usa esos tres palos.
- Dibujos: `FIGURAS` en `src/figuras/index.ts`; `porMano: true` si cambian para zurdos (se reflejan y los textos se recolocan, no se invierten). Cada dibujo lleva `aria-label` descriptivo.
- El progreso (hoyos terminados) y la mano se guardan en `localStorage` (`mygolf.curso`, `mygolf.mano`) hasta que haya cuentas.

## 6. Desarrollo, pruebas y despliegue

```
bun install
bun run dev        # compila y sirve http://localhost:8788
bun test           # 74 pruebas
bun run typecheck  # tsc (necesita bun install: incluye @types/react)
bun run capturas   # PNG de cada dibujo en capturas/
```

- **Despliegue automático (funcionando desde el 16/11/2026):** cada push a `main` compila y publica en aprende-golf.com.
  - Worker `mygolf` → Settings → Builds: repo `Xizo1971/MyGolf`, rama `main`, compilación `bun install && bun run build`, despliegue `npx wrangler deploy`, carpeta `/`.
  - Variables de compilación: `BUN_VERSION=1.4.4` y `SKIP_DEPENDENCY_INSTALL=true`.
  - La app de Cloudflare en GitHub necesita acceso al repo MyGolf (github.com/settings/installations); sin él, el panel avisa de «This project is disconnected from your Git account».
  - Token de compilación: se reutiliza el de Naipera (`juegos-cartas build token`).
  - Para publicar a mano en caso de emergencia: `bun run build && npx wrangler deploy`.
- **Limitaciones de la 0.1.0:**
  - `bun.lock` y `typecheck` se comprobaron el 15/11/2026 en el Mac de Miguel (sin errores).
  - Las fuentes salen de Google Fonts; para la PWA sin conexión habrá que alojarlas en el propio sitio (licencia OFL).

## 7. Sello de versión

- Cada compilación lleva un **sello**: versión de `package.json`, commit (7 caracteres) y fecha. En Cloudflare el commit sale de `WORKERS_CI_COMMIT_SHA`; en local, de git (con `+local` si hay cambios sin subir).
- Se ve en **tres sitios**: al pie de todas las pantallas («MyGolf v0.1.1 · a1b2c3d · 16/11/2026 10:20», hora de Madrid), en `/version.json` y en `/api/salud`.
- Si el sello de la app abierta no coincide con `/version.json` (navegador o app instalada con una copia vieja), la app muestra «Hay una versión más nueva… Toca para recargar».
- **Norma:** subir la versión de `package.json` en cada entrega (0.1.1 = sello de versión; 0.2.0 = cuentas, libreta y caddie).

## 8. Pendiente

- Revisión del diseño por Miguel.
- Contenido de los 18 hoyos del curso (borrador: 1–9 fundamentos, 10–18 swing y juego).
