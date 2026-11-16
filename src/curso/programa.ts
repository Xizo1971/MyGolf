// Programa del curso en tres niveles.
// · Principiante («Campo de prácticas»): todo lo necesario antes de salir al campo, en el
//   orden en que se aprende en las clases: seguridad, grip, postura, golpes cortos, swing…
//   Los conceptos del juego (campo, par, tarjeta) llegan al final, para que vayan sonando.
// · Intermedio («En el campo»): jugar de verdad: reglas, estrategia, situaciones.
// · Avanzado («Afinar»): perfeccionamiento.
import type { EntradaPrograma, FichaNivel, Nivel } from './tipos';

export const NIVELES: FichaNivel[] = [
  { id: 'principiante', nombre: 'Campo de prácticas', etiqueta: 'Principiante', descripcion: 'Todo lo que necesitas antes de salir al campo.' },
  { id: 'intermedio', nombre: 'En el campo', etiqueta: 'Intermedio', descripcion: 'Jugar de verdad: reglas, estrategia y situaciones del campo.' },
  { id: 'avanzado', nombre: 'Afinar', etiqueta: 'Avanzado', descripcion: 'Perfeccionar cada golpe y tu manera de jugar.' },
];

const p = (nivel: Nivel, numero: number, titulo: string, objetivo: string, puntos: string[]): EntradaPrograma => ({ nivel, numero, titulo, objetivo, puntos });

export const PROGRAMA: EntradaPrograma[] = [
  // ── PRINCIPIANTE · Campo de prácticas ──
  p('principiante', 1, 'Tu primer día', 'Practicar sin peligro y saber cómo funciona el campo de prácticas.', ['Seguridad en la zona de golpeo', 'Bolas, puestos y distancias', 'Calentar antes de golpear']),
  p('principiante', 2, 'El grip I: la mano de arriba', 'Colocar bien la mano de arriba en el palo.', ['El palo va en los dedos, en diagonal', 'El pulgar y los nudillos', 'La V'] ),
  p('principiante', 3, 'El grip II: las dos manos', 'Completar el grip con la otra mano y apretar lo justo.', ['La mano de abajo', 'Solapado, entrelazado y diez dedos', 'Cuánto apretar']),
  p('principiante', 4, 'La postura', 'Colocarte ante la bola igual cada vez.', ['Inclinarse desde la cadera', 'Rodillas, peso y brazos', 'Tu rutina para colocarte']),
  p('principiante', 5, 'Alineación y posición de la bola', 'Apuntar bien y poner la bola en su sitio según el palo.', ['Primero la cara del palo', 'Las vías del tren', 'Dónde va la bola']),
  p('principiante', 6, 'El putt: el péndulo', 'Hacer rodar la bola recta con un movimiento de péndulo.', ['Grip y postura del putt', 'El péndulo de los hombros', 'La puerta']),
  p('principiante', 7, 'El putt: distancia y caída', 'Dejar la bola cerca desde lejos y leer la caída.', ['Controlar la distancia', 'Leer la caída', 'La escalera']),
  p('principiante', 8, 'El chip', 'Acercar la bola rodando desde fuera del green.', ['Volar poco, rodar mucho', 'Peso y manos adelante', 'Elegir el palo']),
  p('principiante', 9, 'El pitch y el medio swing', 'Levantar la bola con un swing de 9 a 3.', ['La bisagra de las muñecas', 'El reloj: de 9 a 3', 'Cuándo pitch y cuándo chip']),
  p('principiante', 10, 'El swing completo', 'Hacer la subida y el final completos sin perder el equilibrio.', ['La subida', 'Girar, no empujar', 'Terminar de cara al objetivo']),
  p('principiante', 11, 'El impacto', 'Golpear primero la bola y después el suelo.', ['El punto más bajo del swing', 'La chuleta (divot)', 'Manos por delante']),
  p('principiante', 12, 'Los palos', 'Saber para qué sirve cada palo y por qué unos levantan más la bola.', ['Cinco familias de palos', 'El loft', 'Como mucho, 14']),
  p('principiante', 13, 'El driver y el tee', 'Salir del tee con el driver sin miedo.', ['La bola en el tee', 'Barrer, no golpear hacia abajo', 'Pies y bola']),
  p('principiante', 14, 'Salir del búnker', 'Sacar la bola del búnker de prácticas al primer intento.', ['Golpear la arena, no la bola', 'Cara abierta', 'Lo que no se puede tocar']),
  p('principiante', 15, 'Antes de salir al campo', 'Entender el campo, el par, la tarjeta y la etiqueta antes de tu primera vuelta.', ['Del tee al hoyo y el par', 'La tarjeta', 'Áreas y estacas', 'Cuidar el campo']),

  // ── INTERMEDIO · En el campo ──
  p('intermedio', 1, 'Bola perdida y fuera de límites', 'Saber qué hacer cuando la bola se pierde o sale fuera.', ['Tres minutos para buscarla', 'Volver a jugar con un golpe de penalización', 'La bola provisional']),
  p('intermedio', 2, 'Agua y bola injugable', 'Salir del agua y de un mal sitio con la penalización justa.', ['Estacas amarillas y rojas', 'Dónde dejar caer la bola', 'Declarar la bola injugable']),
  p('intermedio', 3, 'Tu rutina antes de cada golpe', 'Repetir siempre los mismos pasos antes de golpear.', ['Mirar desde detrás', 'Un swing de práctica con intención', 'Colocarse y golpear sin esperar']),
  p('intermedio', 4, 'Pensar el hoyo', 'Elegir objetivo y palo para evitar el error grande.', ['Juega a tu golpe', 'El lado bueno del green', 'Cuándo dejar el driver en la bolsa']),
  p('intermedio', 5, 'Golpes en cuesta', 'Adaptar postura y apunte cuando el suelo no está plano.', ['Bola por encima de los pies', 'Bola por debajo de los pies', 'Cuesta arriba y cuesta abajo']),
  p('intermedio', 6, 'Desde el rough', 'Sacar la bola de la hierba alta sin complicarte.', ['Cómo está la bola', 'Más loft, más firme', 'Volver a la calle']),
  p('intermedio', 7, 'Viento y tiempo', 'Ajustar el palo y la altura con viento, frío o lluvia.', ['Viento de cara y de espalda', 'Viento lateral', 'Frío y lluvia']),
  p('intermedio', 8, 'Tu primera vuelta', 'Jugar una vuelta completa: tarjeta, ritmo y cortesía.', ['Antes de empezar', 'Apuntar la tarjeta', 'Ritmo de juego']),
  p('intermedio', 9, 'El hándicap', 'Entender qué es el hándicap y cómo conseguirlo.', ['Qué mide', 'Cómo se calcula, en sencillo', 'Cómo bajarlo']),

  // ── AVANZADO · Afinar ──
  p('avanzado', 1, 'Dar efecto: draw y fade', 'Curvar la bola a propósito.', ['Cara y trayectoria del palo', 'El draw', 'El fade']),
  p('avanzado', 2, 'Controlar la altura', 'Sacar la bola más alta o más baja según haga falta.', ['Posición de bola', 'El final del swing', 'Golpes bajo el viento']),
  p('avanzado', 3, 'Distancias exactas con los wedges', 'Tener una distancia fija para cada wedge y cada swing.', ['El reloj con cada wedge', 'Tu tabla', 'Practicar a bandera']),
  p('avanzado', 4, 'Búnker avanzado', 'Resolver bolas enterradas y búnkeres largos.', ['Bola enterrada', 'Búnker de calle', 'Búnker largo de green']),
  p('avanzado', 5, 'Leer greens complicados', 'Leer caídas dobles y greens rápidos.', ['Caídas dobles', 'Velocidad y caída', 'Leer con los pies']),
  p('avanzado', 6, 'Putts bajo presión', 'Meter los putts cortos cuando importan.', ['Una rutina fija', 'Los de un metro', 'Practicar con presión']),
  p('avanzado', 7, 'La parte mental', 'Jugar cada golpe sin arrastrar el anterior.', ['Un golpe cada vez', 'Objetivos realistas', 'Después de un mal golpe']),
  p('avanzado', 8, 'Practicar con objetivo', 'Convertir el campo de prácticas en entrenamiento de verdad.', ['Práctica en bloque y variada', 'Juegos de práctica', 'Medir tu progreso']),
  p('avanzado', 9, 'Tus estadísticas', 'Saber dónde pierdes golpes para entrenar lo que más rinde.', ['Calles, greens y putts', 'Dónde se pierden los golpes', 'Plan de mejora']),
];

export function programaDe(nivel: Nivel): EntradaPrograma[] {
  return PROGRAMA.filter((e) => e.nivel === nivel);
}
