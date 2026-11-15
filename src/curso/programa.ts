// Programa del curso desde cero: 18 hoyos.
// Orden pensado «del hoyo hacia fuera»: primero entender el juego, luego lo común a
// todos los golpes (grip, postura, alineación), después los golpes cortos (putt, chip)
// y, en la vuelta, el swing completo y el juego en el campo.
import type { EntradaPrograma } from './tipos';

export const PROGRAMA: EntradaPrograma[] = [
  // ── IDA: conocer el juego y el juego corto ──
  {
    numero: 1, tramo: 'ida', titulo: 'Qué es el golf',
    objetivo: 'Entender de qué va el juego y cómo se cuenta.',
    puntos: ['Meter la bola en el hoyo con los menos golpes posibles', 'Qué es el par', 'Birdie, par, bogey y la tarjeta'],
  },
  {
    numero: 2, tramo: 'ida', titulo: 'El campo',
    objetivo: 'Reconocer cada zona del campo y lo que significan las estacas.',
    puntos: ['Las cinco áreas del campo', 'La zona de salida', 'Estacas blancas, amarillas y rojas'],
  },
  {
    numero: 3, tramo: 'ida', titulo: 'La bolsa de palos',
    objetivo: 'Saber para qué sirve cada palo y por qué unos levantan más la bola que otros.',
    puntos: ['Maderas, híbridos, hierros, wedges y putter', 'El loft', 'Como mucho 14 palos'],
  },
  {
    numero: 4, tramo: 'ida', titulo: 'Seguridad y etiqueta',
    objetivo: 'Jugar sin peligro y cuidar el campo y a los demás.',
    puntos: ['Dónde ponerse cuando otro golpea', 'Avisar con «¡bola!»', 'Cuidar el green y el búnker', 'Ritmo de juego'],
  },
  {
    numero: 5, tramo: 'ida', titulo: 'El grip',
    objetivo: 'Coger el palo con un grip neutro y la presión justa.',
    puntos: ['Las dos V', 'Solapado, entrelazado y diez dedos', 'Cuánto apretar'],
  },
  {
    numero: 6, tramo: 'ida', titulo: 'La postura',
    objetivo: 'Colocarte ante la bola igual cada vez.',
    puntos: ['Inclinarse desde la cadera', 'Rodillas, peso y brazos', 'Dónde va la bola según el palo'],
  },
  {
    numero: 7, tramo: 'ida', titulo: 'La alineación',
    objetivo: 'Apuntar donde quieres que vaya la bola.',
    puntos: ['Primero la cara del palo, luego el cuerpo', 'Las vías del tren', 'Un objetivo intermedio'],
  },
  {
    numero: 8, tramo: 'ida', titulo: 'El putt',
    objetivo: 'Embocar desde cerca y dejarla dada desde lejos.',
    puntos: ['El movimiento de péndulo', 'Controlar la distancia', 'Leer la caída'],
  },
  {
    numero: 9, tramo: 'ida', titulo: 'El chip',
    objetivo: 'Acercar la bola rodando desde fuera del green.',
    puntos: ['Peso y manos adelante', 'Volar poco, rodar mucho', 'Elegir el palo según el rodado'],
  },
  // ── VUELTA: el swing completo y el juego ──
  {
    numero: 10, tramo: 'vuelta', titulo: 'El pitch',
    objetivo: 'Levantar la bola para pasar por encima de un obstáculo cerca del green.',
    puntos: ['La bisagra de las muñecas', 'Medio swing', 'Cuándo pitch y cuándo chip'],
  },
  {
    numero: 11, tramo: 'vuelta', titulo: 'El swing, por partes',
    objetivo: 'Conocer las fases del swing completo.',
    puntos: ['Subida, arriba, bajada, impacto y final', 'El reloj: de 9 a 3', 'Girar, no empujar'],
  },
  {
    numero: 12, tramo: 'vuelta', titulo: 'El impacto',
    objetivo: 'Golpear primero la bola y después el suelo.',
    puntos: ['El punto más bajo del swing', 'La chuleta (divot)', 'Manos por delante en el impacto'],
  },
  {
    numero: 13, tramo: 'vuelta', titulo: 'Los hierros',
    objetivo: 'Saber qué distancia haces con cada hierro.',
    puntos: ['Mismo swing, distinto palo', 'Tu tabla de distancias', 'Dónde va la bola'],
  },
  {
    numero: 14, tramo: 'vuelta', titulo: 'El driver y las maderas',
    objetivo: 'Salir del tee con el driver sin miedo.',
    puntos: ['La bola en el tee y adelantada', 'Barrer, no golpear hacia abajo', 'Cuándo dejar el driver en la bolsa'],
  },
  {
    numero: 15, tramo: 'vuelta', titulo: 'Salir del búnker',
    objetivo: 'Sacar la bola del búnker de green al primer intento.',
    puntos: ['Golpear la arena, no la bola', 'Cara abierta', 'Lo que no se puede tocar en el búnker'],
  },
  {
    numero: 16, tramo: 'vuelta', titulo: 'Reglas que salvan tu vuelta',
    objetivo: 'Saber qué hacer cuando la bola se pierde, sale fuera o cae al agua.',
    puntos: ['Bola perdida y fuera de límites', 'La bola provisional', 'Áreas de penalización', 'Bola injugable'],
  },
  {
    numero: 17, tramo: 'vuelta', titulo: 'Pensar el hoyo',
    objetivo: 'Decidir antes de golpear: objetivo, palo y rutina.',
    puntos: ['Jugar a tu golpe, no al del profesional', 'La rutina antes de cada golpe', 'Evitar el error grande'],
  },
  {
    numero: 18, tramo: 'vuelta', titulo: 'Tu primera vuelta',
    objetivo: 'Salir al campo, apuntar tu tarjeta y entender el hándicap.',
    puntos: ['Cómo se apunta la tarjeta', 'El hándicap: hasta 54', 'Qué esperar de tu primera vuelta'],
  },
];
