// Hoyos 5 a 9: lo común a todos los golpes (grip, postura, alineación) y el juego corto.
// Contenido técnico de enseñanza: está marcado como pendiente de revisión del profesor.
import type { Hoyo } from '../../tipos';

export const HOYO_5: Hoyo = {
  numero: 5,
  titulo: 'El grip',
  objetivo: 'Coger el palo con un grip neutro y la presión justa.',
  minutos: 12,
  revisadoPorProfe: false,
  golpes: [
    {
      titulo: 'Las dos V',
      texto: [
        'El **grip** (la forma de coger el palo) es tu único contacto con él: si el grip está mal, el golpe se tuerce aunque el resto esté bien.',
        'En un grip **neutro**, el pulgar y el índice de cada mano forman una **V**. Si eres diestro, las dos V apuntan **entre la barbilla y el hombro derecho**. Si eres zurdo, al izquierdo.',
      ],
      figura: { id: 'grip-v', pie: 'Las dos V señalan al mismo hombro.' },
      caddie: 'Míralo en un espejo: debes ver las dos V apuntando al mismo sitio.',
    },
    {
      titulo: 'La mano de arriba',
      texto: [
        'Empieza por la mano que va arriba en el palo (la **izquierda** si eres diestro). El palo cruza la mano **en diagonal por los dedos**: desde la base del índice hasta justo debajo del meñique.',
        'Al cerrar la mano, el pulgar queda sobre el palo, algo hacia el lado de atrás, y mirando hacia abajo deberías ver **dos o tres nudillos**.',
        'Deja un poco de palo por encima de la mano (más o menos un dedo). No lo cojas por el extremo.',
      ],
      ejercicio: 'Coge el palo solo con la mano de arriba, con los dedos, y levántalo delante de ti. Si lo sostienes sin apretar la palma, está bien colocado.',
    },
    {
      titulo: 'La mano de abajo y cómo se unen',
      texto: [
        'La otra mano también coge el palo **con los dedos**, justo debajo. Su palma **tapa el pulgar** de la mano de arriba.',
        'Para unir las manos hay tres maneras: **solapado** (el meñique de la mano de abajo se apoya entre el índice y el corazón de la otra), **entrelazado** (ese meñique se cruza con el índice) y **diez dedos** (todos en el palo, como un bate).',
        'Ninguna es mejor que otra. Prueba las tres con tu profe y quédate con la que te deje las manos más juntas y cómodas.',
      ],
      figura: { id: 'tipos-grip' },
    },
    {
      titulo: 'Cuánto apretar',
      texto: [
        'Casi todos los principiantes aprietan demasiado. Si la mano está tensa, el brazo también, y el swing pierde soltura.',
        'Imagina una escala del 1 al 10: lo justo es **un 4 o un 5**. Firme para que el palo no se mueva en tus manos, pero sin que se te pongan blancos los nudillos.',
      ],
      caddie: 'Aprieta como si sujetaras un pájaro: que no se escape, pero sin hacerle daño.',
    },
  ],
  preguntas: [
    {
      enunciado: 'Eres diestro. ¿Hacia dónde apuntan las V de un grip neutro?',
      opciones: ['Hacia el hombro izquierdo', 'Entre la barbilla y el hombro derecho', 'Hacia la bola'],
      correcta: 1,
      explicacion: 'En un diestro, las dos V apuntan entre la barbilla y el hombro derecho.',
    },
    {
      enunciado: '¿Cuál es la mejor forma de unir las manos?',
      opciones: ['El solapado, siempre', 'El entrelazado, siempre', 'La que te resulte más cómoda: las tres valen'],
      correcta: 2,
      explicacion: 'Solapado, entrelazado y diez dedos son correctos. Lo importante es que las manos trabajen juntas.',
    },
  ],
  fuentes: [],
};

export const HOYO_6: Hoyo = {
  numero: 6,
  titulo: 'La postura',
  objetivo: 'Colocarte ante la bola igual cada vez.',
  minutos: 10,
  revisadoPorProfe: false,
  golpes: [
    {
      titulo: 'Inclinarse desde la cadera',
      texto: [
        'Ponte de pie con los pies separados más o menos **a la anchura de los hombros**. Ahora **lleva la cadera hacia atrás** e inclina el tronco hacia delante con la **espalda recta**, sin encorvarte.',
        'Flexiona un poco las **rodillas**, lo justo para sentirte ágil, como si fueras a saltar. Los **brazos cuelgan** relajados desde los hombros, casi en vertical.',
        'Una referencia: visto de perfil, tus **hombros quedan sobre la punta de los pies**.',
      ],
      figura: { id: 'postura-perfil' },
    },
    {
      titulo: 'El peso, en el centro',
      texto: [
        'El peso va repartido **entre los dos pies** y en la parte central de cada uno: ni en los talones ni en las puntas.',
        'Si estás bien equilibrado, podrías aguantar un empujón suave desde cualquier lado sin dar un paso.',
      ],
      ejercicio: 'Colócate en postura y pide a alguien que te empuje suavemente por delante, por detrás y por los lados. Si te tambaleas, revisa dónde tienes el peso.',
    },
    {
      titulo: 'Dónde va la bola',
      texto: [
        'La bola no va siempre en el mismo sitio: **cuanto más largo es el palo, más adelantada**.',
        'Con un **wedge**, los pies algo más juntos y la bola en el **centro**. Con un **hierro 7**, la bola **un poco por delante del centro**. Con el **driver**, los pies más abiertos y la bola **frente al talón del pie más cercano al objetivo**.',
      ],
      figura: { id: 'posicion-bola', pie: 'Vista desde arriba; la flecha marca hacia dónde quieres mandar la bola.' },
      caddie: 'Antes de cada golpe, comprueba la bola. Es el error que más se repite.',
    },
  ],
  preguntas: [
    {
      enunciado: '¿Desde dónde te inclinas hacia la bola?',
      opciones: ['Desde la cintura, encorvando la espalda', 'Desde la cadera, con la espalda recta', 'Doblando mucho las rodillas'],
      correcta: 1,
      explicacion: 'La cadera va hacia atrás y el tronco se inclina con la espalda recta. Las rodillas solo se flexionan un poco.',
    },
    {
      enunciado: '¿Con qué palo va la bola más adelantada?',
      opciones: ['Wedge', 'Hierro 7', 'Driver'],
      correcta: 2,
      explicacion: 'Con el driver, la bola va frente al talón del pie más cercano al objetivo.',
    },
  ],
  fuentes: [],
};

export const HOYO_7: Hoyo = {
  numero: 7,
  titulo: 'La alineación',
  objetivo: 'Apuntar donde quieres que vaya la bola.',
  minutos: 9,
  revisadoPorProfe: false,
  golpes: [
    {
      titulo: 'Primero la cara del palo',
      texto: [
        'Mucha gente apunta con el cuerpo y luego coloca el palo. Es al revés: primero pones la **cara del palo mirando al objetivo** y después colocas los pies y el cuerpo a partir de ella.',
        'Para ver bien la línea, mírala **desde detrás de la bola**, de pie, antes de colocarte.',
      ],
    },
    {
      titulo: 'Las vías del tren',
      texto: [
        'Imagina unas **vías de tren**. Por la vía de fuera va la bola, **directa al objetivo**. Por la de dentro van tus **pies, caderas y hombros**, en **paralelo**.',
        'Como las vías son paralelas, tu cuerpo apunta un poco **a la izquierda** del objetivo si eres diestro (a la derecha si eres zurdo). Es correcto; si apuntas los pies a la bandera, la bola se irá hacia el otro lado.',
      ],
      figura: { id: 'vias-tren' },
      ejercicio: 'En el campo de prácticas, pon dos palos en el suelo, paralelos: uno hacia el objetivo, junto a la bola, y otro junto a tus pies.',
    },
    {
      titulo: 'Un objetivo intermedio',
      texto: [
        'Apuntar a algo que está a 100 metros es difícil. Es mucho más fácil apuntar a **algo cercano** que esté en la misma línea: una hoja, una mancha en la hierba, a **un metro delante de la bola**.',
        'Pon la cara del palo mirando a esa marca, coloca el cuerpo en paralelo y ya estás alineado.',
      ],
      caddie: 'Elige la marca desde detrás de la bola. Una vez colocado, ya no la cambies.',
    },
  ],
  preguntas: [
    {
      enunciado: '¿Qué colocas primero?',
      opciones: ['Los pies', 'La cara del palo', 'Los hombros'],
      correcta: 1,
      explicacion: 'Primero la cara del palo mirando al objetivo; luego el cuerpo en paralelo.',
    },
    {
      enunciado: 'Eres diestro y estás bien alineado. ¿Hacia dónde apuntan tus pies?',
      opciones: ['Justo a la bandera', 'Un poco a la izquierda de la bandera, en paralelo a la línea de la bola', 'Un poco a la derecha de la bandera'],
      correcta: 1,
      explicacion: 'La línea de los pies es paralela a la de la bola, así que pasa a la izquierda del objetivo.',
    },
  ],
  fuentes: [],
};

export const HOYO_8: Hoyo = {
  numero: 8,
  titulo: 'El putt',
  objetivo: 'Embocar desde cerca y dejarla dada desde lejos.',
  minutos: 14,
  revisadoPorProfe: false,
  golpes: [
    {
      titulo: 'El péndulo',
      texto: [
        'En el green la bola **rueda**, no vuela. El golpe se llama **putt** y se da con el **putter**.',
        'Hombros, brazos y putter forman un **triángulo** que se mueve entero, como un **péndulo**, girando desde el centro del pecho. Las **muñecas no se doblan**.',
        'Los ojos, encima de la bola o muy cerca. Y la cabeza quieta hasta que la bola ya ha salido.',
      ],
      figura: { id: 'pendulo' },
    },
    {
      titulo: 'La distancia',
      texto: [
        'La distancia se controla con **lo largo que es el movimiento**, no con la fuerza: para un putt largo, más atrás; para uno corto, menos. El ritmo es el mismo siempre.',
        'El movimiento hacia delante es **igual de largo** que hacia atrás. Si echas el putter muy atrás y frenas al golpear, la bola sale sin control.',
        'Desde lejos, la meta no es meterla, es **dejarla cerca** del hoyo para que el siguiente putt sea fácil.',
      ],
      ejercicio: 'La escalera: pon una moneda a 3, 6 y 9 pasos. Haz rodar tres bolas a cada moneda, solo cambiando lo largo del movimiento.',
    },
    {
      titulo: 'Leer la caída',
      texto: [
        'Pocos greens son planos. Si el green está inclinado, la bola **va cayendo hacia el lado bajo** mientras rueda.',
        'Por eso no se apunta al hoyo, sino **por el lado alto**: eliges un punto por encima del hoyo y dejas que la pendiente haga el resto.',
        'Para ver la pendiente, agáchate **detrás de la bola** mirando al hoyo. Piensa hacia dónde correría el agua si echaras un cubo.',
      ],
      figura: { id: 'caida' },
      caddie: 'Al principio quédate corto de caída: casi todo el mundo calcula de menos.',
    },
    {
      titulo: 'Tu bola en el green',
      texto: [
        'En el green puedes **marcar la bola** (con una moneda o un marcador detrás de ella), levantarla y **limpiarla**. Después la vuelves a poner en el mismo sitio y quitas la marca.',
        'También puedes arreglar los piques y otros daños del green antes de tu putt.',
      ],
    },
  ],
  preguntas: [
    {
      enunciado: '¿Cómo controlas la distancia del putt?',
      opciones: ['Apretando más el putter', 'Con lo largo del movimiento, con el mismo ritmo', 'Golpeando más rápido'],
      correcta: 1,
      explicacion: 'Más movimiento para más distancia, siempre con el mismo ritmo, como un péndulo.',
    },
    {
      enunciado: 'El green baja de izquierda a derecha. ¿Dónde apuntas?',
      opciones: ['Al hoyo', 'A la izquierda del hoyo, por el lado alto', 'A la derecha del hoyo'],
      correcta: 1,
      explicacion: 'La bola caerá hacia la derecha mientras rueda, así que se apunta por el lado alto, a la izquierda.',
    },
  ],
  fuentes: [
    { titulo: 'Regla 13: el green (The R&A)', url: 'https://www.randa.org/rog/the-rules-of-golf/rule-13' },
  ],
};

export const HOYO_9: Hoyo = {
  numero: 9,
  titulo: 'El chip',
  objetivo: 'Acercar la bola rodando desde fuera del green.',
  minutos: 12,
  revisadoPorProfe: false,
  golpes: [
    {
      titulo: 'Volar poco, rodar mucho',
      texto: [
        'Estás fuera del green pero cerca, y entre la bola y el green no hay ningún obstáculo. Es el momento del **chip**: un golpe corto en el que la bola **vuela poco y rueda mucho**.',
        'Una bola que rueda es más fácil de controlar que una que vuela. Por eso, siempre que puedas, **hazla rodar**.',
      ],
    },
    {
      titulo: 'La postura del chip',
      texto: [
        'Pies **juntos** y un poco abiertos hacia el objetivo. La bola, **algo retrasada**, hacia el pie de atrás.',
        'Pon **más peso en el pie adelantado** y deja las **manos por delante de la bola**: el palo se inclina hacia el objetivo.',
        'El movimiento se parece al del putt: lo hacen los **hombros**, con las muñecas firmes. Y el peso se queda delante todo el golpe.',
      ],
      figura: { id: 'chip-postura' },
      caddie: 'No intentes levantar la bola con las manos. Ya la levanta el palo.',
    },
    {
      titulo: 'Elegir el palo',
      texto: [
        'Con el mismo movimiento, cada palo da un reparto distinto entre **vuelo y rodado**: cuanto menos loft, más rueda.',
        'Una guía muy extendida es la **regla del 12**: resta a 12 el número del palo y te sale cuántas partes rueda por cada parte que vuela. El hierro 7 rueda unas 5; el hierro 9, unas 3; el pitching wedge (cuenta como «10»), unas 2. Es orientativa: cuesta abajo o en un green rápido rueda más.',
        'Elige el sitio donde quieres que **caiga** la bola (en el green, poco después del borde) y el palo que la haga rodar desde ahí hasta el hoyo.',
      ],
      figura: { id: 'vuelo-rodado' },
      ejercicio: 'Desde el mismo sitio, haz chips con tres palos distintos y fíjate en cuánto rueda cada uno.',
    },
  ],
  preguntas: [
    {
      enunciado: 'En la postura del chip, ¿dónde va más peso?',
      opciones: ['En el pie adelantado (el más cercano al objetivo)', 'En el pie de atrás', 'Repartido justo a la mitad'],
      correcta: 0,
      explicacion: 'El peso se carga en el pie adelantado y se queda ahí todo el golpe.',
    },
    {
      enunciado: 'Quieres que la bola ruede mucho. ¿Qué palo eliges?',
      opciones: ['Wedge de arena', 'Pitching wedge', 'Hierro 7'],
      correcta: 2,
      explicacion: 'El hierro 7 tiene menos loft: vuela poco y rueda mucho.',
    },
  ],
  fuentes: [
    { titulo: 'La regla del 12 para el chip (GolfWRX)', url: 'https://www.golfwrx.com/?p=564166' },
    { titulo: 'Vuelo y rodado del pitching wedge (Golf.com)', url: 'https://golf.com/instruction/short-game/how-master-chipping-save-strokes/' },
  ],
};
