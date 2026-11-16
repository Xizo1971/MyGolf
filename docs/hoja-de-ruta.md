# MyGolf · Hoja de ruta

*aprende-golf.com · actualizado el 16 de noviembre de 2026*

Etiquetas: **[Decidido]** lo ha decidido Miguel · **[Propuesta]** pendiente de confirmar · **[Futuro]** apuntado para más adelante, no se construye ahora.

## Alcance actual

- [Decidido] Uso privado: solo Miguel y Ana, cada uno con su cuenta. No se abre al público.
- [Decidido] Cada usuario usa **su propia clave de la API de Claude**.
- [Decidido] Todo en español, pero preparado para varios idiomas desde el principio (textos con `tx()`, como en Naipera).
- [Decidido] Web primero (PWA). Apps de Google Play y App Store más adelante, con Capacitor sobre la misma web.
- [Decidido] Diseño memorable y ligado al golf; nada que parezca una plantilla genérica.

## Fase 1 · Base de la aplicación

- [Decidido] Cuentas (Supabase Auth), una por persona.
- [Decidido] Registro de clases: notas propias de cada clase con el profesor (fecha, qué se trabajó, sensaciones, deberes).
- [Decidido] Curso teórico desde cero, en **tres niveles**: principiante (todo lo previo a salir al campo; las nociones del campo y los palos, al final), intermedio (el juego en el campo) y avanzado (perfeccionamiento). Se mantiene la idea de hoyos. Hecho en la 0.2.0 (principiante a medio escribir).
- [Decidido] Figuras 3D giratorias para cuerpo y manos (opción B). Primera versión en la 0.2.0, pendiente de que Miguel la valore.
- [Decidido] IA en esta fase («Caddie»): responder preguntas de teoría del curso y preparar un plan de práctica semanal a partir de las notas de clase.
- [Decidido] Ajustes de usuario: correo, contraseña, clave de Claude y opciones que se irán añadiendo (por ejemplo, diestro o zurdo).
- [Decidido] Diseño: dirección «Libreta del caddie» (yardage book). Pantallas de muestra en el lienzo de diseño «MyGolf · Libreta del caddie».
- [Decidido] Sin vídeo en esta fase.

## Fase 2 · Vídeo y análisis del swing

- [Decidido] Subida desde la galería del móvil (para usar la cámara lenta) y grabación sencilla dentro de la app.
- [Decidido] Los vídeos **se borran después de analizarlos**. Solo se guardan los resultados (ángulos, fases, consejos).
- [Propuesta] Postura en el dispositivo con MediaPipe Pose Landmarker y explicación con Claude a partir de fotogramas clave (la API de Claude no admite vídeo).
- [Propuesta] Almacenamiento temporal en Cloudflare R2 con subida directa desde el navegador; la validación del análisis la tiene que hacer un profesor de golf con swings reales.

## Futuro (apuntado)

- [Futuro] **Acceso del profesor:** ver vídeos y notas del alumno y dejarle comentarios. Implica un rol nuevo y permisos por alumno.
- [Futuro] **Medidor de lanzamiento** (Garmin R10, Trackman u otro): importar sus datos y mostrarlos en gráficas.
- [Futuro] Apps nativas en las tiendas.
- [Futuro] Otros idiomas.
