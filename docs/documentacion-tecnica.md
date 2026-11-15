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

## 3. Pendiente de decidir

- Dirección de diseño.
- Qué hace la IA en la fase 1.
- Dónde se guarda la clave de Claude de cada usuario.
- Dónde está registrado `aprende-golf.com` (para conectarlo al Worker).
