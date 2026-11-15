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

## 4. Pendiente

- Revisión del diseño por Miguel.
- Contenido de los 18 hoyos del curso (borrador: 1–9 fundamentos, 10–18 swing y juego).
