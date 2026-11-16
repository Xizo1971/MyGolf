"""Prepara una ilustración de Gemini para la app.

Uso: python3 arte/procesar.py original.png salida.webp x0 y0 x1 y1 [ancho]

1. Recorta la caja (x0, y0)–(x1, y1) del original.
2. Equilibra el blanco: divide cada canal por el color del papel (mediana del
   borde del recorte), así el papel queda blanco y el dibujo conserva su color.
3. Lo que queda casi blanco (grano del papel) pasa a blanco puro.
La app pinta la imagen con `mix-blend-mode: multiply`: el blanco toma el color
del papel de la app y la sombra de contacto se conserva suave.
"""
import sys
import numpy as np
from PIL import Image

orig, salida, x0, y0, x1, y1 = sys.argv[1], sys.argv[2], *map(int, sys.argv[3:7])
ancho = int(sys.argv[7]) if len(sys.argv) > 7 else None
im = np.asarray(Image.open(orig).convert('RGB').crop((x0, y0, x1, y1)), dtype=np.float32)
borde = np.concatenate([im[0], im[-1], im[:, 0], im[:, -1]])
papel = np.median(borde, axis=0)
eq = np.clip(im / papel, 0, 1)
casi = eq.min(axis=2) > 0.955
eq[casi] = 1.0
res = Image.fromarray((eq * 255).round().astype(np.uint8))
if ancho:
    res = res.resize((ancho, round(res.height * ancho / res.width)), Image.LANCZOS)
res.save(salida, 'WEBP', quality=86, method=6)
print(f'papel {papel.round()} → {salida} {res.size}')
