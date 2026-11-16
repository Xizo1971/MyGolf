// Nivel principiante («Campo de prácticas»): lo necesario antes de salir al campo.
// Contenido técnico de enseñanza: cada hoyo está pendiente de revisión del profesor.
import type { Hoyo } from '../../tipos';

const P = 'principiante' as const;

export const P1: Hoyo = {
  nivel: P, numero: 1,
  titulo: 'Tu primer día',
  objetivo: 'Practicar sin peligro y saber cómo funciona el campo de prácticas.',
  minutos: 8,
  revisadoPorProfe: false,
  golpes: [
    {
      titulo: 'El palo y la bola hacen daño',
      texto: [
        'En el campo de prácticas hay mucha gente golpeando a la vez, a pocos metros. Un palo en movimiento y una bola de golf hacen daño de verdad, así que la seguridad va antes que nada.',
        'Ponte siempre **fuera del alcance del swing** de quien tienes al lado y nunca te pongas **delante** de la línea de golpeo. Si alguien va a golpear, colócate **de frente a él**, para que te vea, y algo por detrás de su bola.',
        'Antes de hacer un swing de práctica, mira alrededor: que no haya nadie cerca, tampoco detrás de ti.',
      ],
      figura: { id: 'seguridad' },
      caddie: 'Mientras otro prepara su golpe: quieto y callado. Es la norma de oro.',
    },
    {
      titulo: 'Cómo funciona el campo de prácticas',
      texto: [
        'Cada jugador golpea desde su **puesto**: una alfombrilla o una zona de hierba marcada. Las bolas de prácticas suelen sacarse de una máquina con ficha o tarjeta, y se golpean desde el puesto hacia la zona de caída.',
        '**Nunca salgas a recoger bolas** a la zona de caída, aunque estén cerca: alguien puede golpear en ese momento. Las bolas de prácticas tampoco se llevan al campo.',
        'Muchos campos de prácticas tienen **banderas o carteles con distancias**. Te servirán más adelante para saber cuánto haces con cada palo.',
      ],
      ejercicio: 'El primer día, antes de golpear, fíjate en dónde están las distancias marcadas y cuál es tu puesto.',
    },
    {
      titulo: 'Calentar antes de golpear',
      texto: [
        'Empezar a dar golpes fuertes en frío es la manera más fácil de hacerse daño en la espalda o en las muñecas.',
        'Dedica unos minutos a mover hombros, cadera y muñecas, y empieza con **golpes cortos y suaves** con un palo corto (un wedge). Ve alargando el movimiento poco a poco.',
      ],
      caddie: 'Las primeras diez bolas no cuentan: son para que el cuerpo se despierte.',
    },
  ],
  preguntas: [
    {
      enunciado: 'Ves una bola tuya a pocos metros, en la zona de caída. ¿Qué haces?',
      opciones: ['Salgo rápido a por ella', 'La dejo allí: nunca se sale a la zona de caída', 'Pido al de al lado que espere y voy'],
      correcta: 1,
      explicacion: 'En la zona de caída pueden llegar bolas en cualquier momento. Las bolas se quedan allí.',
    },
    {
      enunciado: 'Alguien va a golpear a tu lado. ¿Dónde te pones?',
      opciones: ['Detrás de él, en su línea', 'De frente a él, fuera de su alcance', 'Un poco por delante, para ver la bola'],
      correcta: 1,
      explicacion: 'De frente para que te vea y fuera del alcance del palo. Delante es peligroso y detrás de su línea le molesta.',
    },
  ],
  fuentes: [],
};

export const P2: Hoyo = {
  nivel: P, numero: 2,
  titulo: 'El grip I: la mano de arriba',
  objetivo: 'Colocar bien la mano de arriba en el palo.',
  minutos: 10,
  revisadoPorProfe: false,
  golpes: [
    {
      titulo: 'Por qué importa tanto',
      texto: [
        'El **grip** (la forma de coger el palo) es tu único contacto con él. Si el grip está mal, la cara del palo llega torcida a la bola aunque el resto del swing esté bien.',
        'Se empieza por la mano que va **arriba** en el palo: la **izquierda** si eres diestro, la derecha si eres zurdo.',
      ],
      caddie: 'Al principio el grip correcto se siente raro. Es normal: dale unas semanas.',
    },
    {
      titulo: 'En los dedos, en diagonal',
      texto: [
        'El palo **no** se coge con la palma, como un martillo. Va **en los dedos**, cruzando la mano **en diagonal**: desde la base del índice hasta justo debajo del meñique.',
        'Deja un poco de palo por encima de la mano, más o menos un dedo. No lo cojas por el mismo extremo.',
      ],
      ejercicio: 'Coge el palo solo con la mano de arriba, con los dedos, y levántalo delante de ti. Si lo sostienes sin apretar la palma, está bien colocado.',
    },
    {
      titulo: 'El pulgar, los nudillos y la V',
      texto: [
        'Al cerrar la mano, el pulgar queda **encima del palo**, un poco hacia el lado contrario al objetivo. El talón de la mano se apoya encima del puño.',
        'Mirando hacia abajo deberías ver **dos o tres nudillos** de esa mano. Si no ves ninguno, la mano está demasiado girada hacia el objetivo; si ves cuatro, demasiado girada hacia atrás.',
        'El pulgar y el índice forman una **V**. En un grip neutro, esa V apunta **entre la barbilla y el hombro derecho** (el izquierdo si eres zurdo).',
      ],
      figura: { id: 'mano-arriba-3d', pie: 'Gíralo con el dedo para verlo desde todos los lados.' },
    },
  ],
  preguntas: [
    {
      enunciado: '¿Por dónde cruza el palo la mano de arriba?',
      opciones: ['Por el centro de la palma', 'En diagonal por los dedos', 'Solo por las puntas de los dedos'],
      correcta: 1,
      explicacion: 'En diagonal por los dedos: desde la base del índice hasta debajo del meñique.',
    },
    {
      enunciado: 'Miras tu mano de arriba y no ves ningún nudillo. ¿Qué pasa?',
      opciones: ['Está perfecta', 'Está demasiado girada hacia el objetivo', 'Estás apretando poco'],
      correcta: 1,
      explicacion: 'Lo normal es ver dos o tres. Si no ves ninguno, la mano está girada de más hacia el objetivo.',
    },
  ],
  fuentes: [],
};

export const P3: Hoyo = {
  nivel: P, numero: 3,
  titulo: 'El grip II: las dos manos',
  objetivo: 'Completar el grip con la otra mano y apretar lo justo.',
  minutos: 10,
  revisadoPorProfe: false,
  golpes: [
    {
      titulo: 'La mano de abajo',
      texto: [
        'La otra mano también coge el palo **con los dedos**, justo debajo de la primera. Su palma **tapa el pulgar** de la mano de arriba.',
        'Su V también apunta **al mismo hombro** que la de la mano de arriba. Si las dos V apuntan a sitios distintos, las manos trabajan una contra la otra.',
      ],
      figura: { id: 'grip-3d', pie: 'Mano de arriba en verde, mano de abajo en rosa.' },
    },
    {
      titulo: 'Tres maneras de unir las manos',
      texto: [
        '**Solapado**: el meñique de la mano de abajo se apoya encima, entre el índice y el corazón de la otra mano. Es el más habitual.',
        '**Entrelazado**: ese meñique y el índice de la mano de arriba se cruzan. Lo usan mucho las personas con manos pequeñas.',
        '**Diez dedos**: todos los dedos en el palo, como un bate. Es el más sencillo para empezar.',
        'Ninguna es mejor que otra. Pruébalas con tu profe y quédate con la que te deje las manos **más juntas y cómodas**.',
      ],
      figura: { id: 'tipos-grip-3d', pie: 'Cambia de tipo con los botones y gíralo para ver cómo se cruzan los dedos.' },
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
      enunciado: '¿Qué tapa la palma de la mano de abajo?',
      opciones: ['El pulgar de la mano de arriba', 'El extremo del palo', 'Nada: las manos van separadas'],
      correcta: 0,
      explicacion: 'La palma de la mano de abajo cubre el pulgar de la mano de arriba; así las dos manos quedan unidas.',
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

export const P4: Hoyo = {
  nivel: P, numero: 4,
  titulo: 'La postura',
  objetivo: 'Colocarte ante la bola igual cada vez.',
  minutos: 10,
  revisadoPorProfe: false,
  golpes: [
    {
      titulo: 'Inclinarse desde la cadera',
      texto: [
        'Ponte de pie con los pies separados más o menos **a la anchura de los hombros**. Ahora **lleva la cadera hacia atrás** e inclina el tronco hacia delante con la **espalda recta**, sin encorvarte.',
        'Flexiona un poco las **rodillas**, lo justo para sentirte ágil. Los **brazos cuelgan** relajados desde los hombros, casi en vertical.',
        'Una referencia: visto desde detrás, tus **hombros quedan sobre la punta de los pies**.',
      ],
      figura: { id: 'postura-lateral', pie: 'Desde detrás de la línea se ve la inclinación. Con «Girar en 3D» puedes verlo de frente y desde otros ángulos.' },
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
      titulo: 'Tu rutina para colocarte',
      texto: [
        'Colocarse siempre en el mismo orden hace que la postura salga igual cada vez:',
        '**1.** Apoya el palo detrás de la bola, con la cara mirando al objetivo. **2.** Con el palo ahí, junta los pies. **3.** Separa los pies hasta la anchura de los hombros. **4.** Inclínate desde la cadera y deja colgar los brazos.',
      ],
      caddie: 'Hazlo despacio frente a un espejo hasta que salga sin pensar.',
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
      enunciado: 'Visto desde detrás, ¿dónde quedan los hombros?',
      opciones: ['Sobre los talones', 'Sobre la punta de los pies', 'Por delante de la bola'],
      correcta: 1,
      explicacion: 'Los hombros quedan sobre la punta de los pies y los brazos cuelgan desde ahí.',
    },
  ],
  fuentes: [],
};

export const P5: Hoyo = {
  nivel: P, numero: 5,
  titulo: 'Alineación y posición de la bola',
  objetivo: 'Apuntar bien y poner la bola en su sitio según el palo.',
  minutos: 11,
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
        'Como las vías son paralelas, tu cuerpo apunta un poco **a la izquierda** del objetivo si eres diestro (a la derecha si eres zurdo). Es correcto.',
      ],
      figura: { id: 'vias-tren' },
      ejercicio: 'En el campo de prácticas, pon dos palos en el suelo, paralelos: uno hacia el objetivo, junto a la bola, y otro junto a tus pies.',
    },
    {
      titulo: 'Un objetivo intermedio',
      texto: [
        'Apuntar a algo que está a 100 metros es difícil. Es mucho más fácil apuntar a **algo cercano** en la misma línea: una hoja, una mancha en la hierba, a **un metro delante de la bola**.',
        'Pon la cara del palo mirando a esa marca, coloca el cuerpo en paralelo y ya estás alineado.',
      ],
      caddie: 'Elige la marca desde detrás de la bola. Una vez colocado, ya no la cambies.',
    },
    {
      titulo: 'Dónde va la bola',
      texto: [
        'La bola no va siempre en el mismo sitio: **cuanto más largo es el palo, más adelantada**.',
        'Con un **wedge**, los pies algo más juntos y la bola en el **centro**. Con un **hierro 7**, la bola **un poco por delante del centro**. Con el **driver**, los pies más abiertos y la bola **frente al talón del pie más cercano al objetivo**.',
      ],
      figura: { id: 'posicion-bola', pie: 'Vista desde arriba; la flecha marca hacia dónde quieres mandar la bola.' },
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
      enunciado: '¿Con qué palo va la bola más adelantada?',
      opciones: ['Wedge', 'Hierro 7', 'Driver'],
      correcta: 2,
      explicacion: 'Con el driver, la bola va frente al talón del pie más cercano al objetivo.',
    },
  ],
  fuentes: [],
};

export const P6: Hoyo = {
  nivel: P, numero: 6,
  titulo: 'El putt: el péndulo',
  objetivo: 'Hacer rodar la bola recta con un movimiento de péndulo.',
  minutos: 10,
  revisadoPorProfe: false,
  golpes: [
    {
      titulo: 'Grip y postura del putt',
      texto: [
        'En el green la bola **rueda**, no vuela. El golpe se llama **putt** y se da con el **putter**.',
        'El grip del putt es más tranquilo que el del swing: las **palmas se miran** una a otra a los lados del puño. Inclínate desde la cadera hasta que los **ojos queden encima de la bola** o muy cerca.',
      ],
      figura: { id: 'putt-postura-3d', pie: 'Desde detrás de la línea se ve que los ojos quedan encima de la bola.' },
    },
    {
      titulo: 'El péndulo',
      texto: [
        'Hombros, brazos y putter forman un **triángulo** que se mueve entero, como un **péndulo**, girando desde el centro del pecho. Las **muñecas no se doblan**.',
        'El movimiento hacia delante es **igual de largo** que hacia atrás. La cabeza se queda quieta hasta que la bola ya ha salido.',
      ],
      figura: { id: 'putt-frente', pie: 'Con «Girar en 3D» y «▶ Ver el golpe» lo ves moverse como un péndulo.' },
    },
    {
      titulo: 'La puerta',
      texto: [
        'Para comprobar que la cara del putter llega recta, practica con una **puerta**: dos tees clavados a cada lado de la bola, separados un poco más que la cabeza del putter.',
        'Si el putter pasa entre los tees sin tocarlos y la bola sale recta, el péndulo funciona.',
      ],
      ejercicio: 'Haz 20 putts cortos (un metro) por la puerta. Cuenta cuántos salen limpios.',
    },
  ],
  preguntas: [
    {
      enunciado: '¿Qué se mueve en el putt?',
      opciones: ['Sobre todo las muñecas', 'Hombros, brazos y putter juntos, como un péndulo', 'Las caderas'],
      correcta: 1,
      explicacion: 'El triángulo de hombros, brazos y putter se mueve entero; las muñecas se quedan quietas.',
    },
    {
      enunciado: '¿Cómo es el movimiento hacia delante comparado con el de atrás?',
      opciones: ['Más corto', 'Igual de largo', 'Mucho más largo'],
      correcta: 1,
      explicacion: 'Igual de largo y al mismo ritmo, como un péndulo.',
    },
  ],
  fuentes: [],
};

export const P7: Hoyo = {
  nivel: P, numero: 7,
  titulo: 'El putt: distancia y caída',
  objetivo: 'Dejar la bola cerca desde lejos y leer la caída.',
  minutos: 11,
  revisadoPorProfe: false,
  golpes: [
    {
      titulo: 'Controlar la distancia',
      texto: [
        'La distancia se controla con **lo largo que es el movimiento**, no con la fuerza: para un putt largo, más atrás; para uno corto, menos. El ritmo es el mismo siempre.',
        'Desde lejos, la meta no es meterla, es **dejarla cerca** del hoyo para que el siguiente putt sea fácil.',
      ],
      ejercicio: 'La escalera: pon una moneda a 3, 6 y 9 pasos. Haz rodar tres bolas a cada moneda, solo cambiando lo largo del movimiento.',
    },
    {
      titulo: 'Leer la caída',
      texto: [
        'Pocos greens son planos. Si el green está inclinado, la bola **va cayendo hacia el lado bajo** mientras rueda.',
        'Por eso no se apunta al hoyo, sino **por el lado alto**: eliges un punto por encima del hoyo y dejas que la pendiente haga el resto.',
        'Para ver la pendiente, agáchate **detrás de la bola** mirando al hoyo. Piensa hacia dónde correría el agua.',
      ],
      figura: { id: 'caida' },
      caddie: 'Al principio quédate corto de caída: casi todo el mundo calcula de menos.',
    },
    {
      titulo: 'Velocidad y caída van juntas',
      texto: [
        'Cuanto más despacio rueda la bola, **más le afecta la pendiente**. Un putt flojo cae mucho; uno fuerte, menos.',
        'Por eso primero se decide la velocidad y después cuánto apuntar por el lado alto.',
      ],
    },
  ],
  preguntas: [
    {
      enunciado: '¿Cómo controlas la distancia del putt?',
      opciones: ['Apretando más el putter', 'Con lo largo del movimiento, con el mismo ritmo', 'Golpeando más rápido'],
      correcta: 1,
      explicacion: 'Más movimiento para más distancia, siempre con el mismo ritmo.',
    },
    {
      enunciado: 'El green baja de izquierda a derecha. ¿Dónde apuntas?',
      opciones: ['Al hoyo', 'A la izquierda del hoyo, por el lado alto', 'A la derecha del hoyo'],
      correcta: 1,
      explicacion: 'La bola caerá hacia la derecha mientras rueda, así que se apunta por el lado alto, a la izquierda.',
    },
  ],
  fuentes: [],
};

export const P8: Hoyo = {
  nivel: P, numero: 8,
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
      figura: { id: 'chip-3d', pie: 'Toca «▶ Ver el golpe»: lo mueven los hombros y las muñecas no se doblan.' },
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

export const P12: Hoyo = {
  nivel: P, numero: 12,
  titulo: 'Los palos',
  objetivo: 'Saber para qué sirve cada palo y por qué unos levantan más la bola.',
  minutos: 10,
  revisadoPorProfe: false,
  golpes: [
    {
      titulo: 'Cinco familias de palos',
      texto: [
        'El **driver** es el palo más largo y el que más lejos manda la bola. Se usa casi siempre en la salida, con la bola sobre un tee. Las **maderas de calle** son parecidas pero más cortas, para golpes largos desde el suelo.',
        'Los **híbridos** mezclan madera y hierro: fáciles de usar para distancias largas. Los **hierros** van numerados (del 4 o 5 al 9): cuanto más alto el número, más corto el golpe.',
        'Los **wedges** son hierros especiales para golpes cortos y altos cerca del green, y para la arena. Y el **putter** sirve para hacer rodar la bola en el green.',
      ],
      figura: { id: 'bolsa' },
      caddie: 'Para empezar no necesitas 14 palos. Con un hierro 7, un wedge y un putter aprendes casi todo.',
    },
    {
      titulo: 'El loft',
      texto: [
        'Si miras los palos de lado, la cara de cada uno está **inclinada hacia atrás** un ángulo distinto. Ese ángulo se llama **loft**.',
        'Con **poco loft** (el driver), la bola sale **baja y llega lejos**. Con **mucho loft** (un wedge), la bola **sube mucho y cae cerca**. Por eso no hace falta cambiar el swing para cada distancia: cambias de palo.',
      ],
      figura: { id: 'loft', pie: 'Los grados son típicos; cada marca los ajusta un poco.' },
      ejercicio: 'Coge dos palos y míralos de lado, juntos. Fíjate en cuál tiene la cara más tumbada.',
    },
    {
      titulo: 'Como mucho, 14',
      texto: [
        'Las reglas dicen que no puedes **empezar una vuelta con más de 14 palos** ni tener más durante la vuelta. Puedes llevar menos.',
        'Si te das cuenta de que llevas uno de más, tienes que dejarlo fuera de juego enseguida; en competición hay penalización.',
      ],
    },
  ],
  preguntas: [
    {
      enunciado: '¿Con qué palo sube más la bola?',
      opciones: ['Driver', 'Hierro 7', 'Wedge'],
      correcta: 2,
      explicacion: 'El wedge es el que más loft tiene: la bola sube mucho y cae cerca.',
    },
    {
      enunciado: '¿Cuántos palos puedes llevar como máximo en una vuelta?',
      opciones: ['12', '14', 'Los que quieras'],
      correcta: 1,
      explicacion: 'La regla 4.1b limita la bolsa a 14 palos. Llevar menos está permitido.',
    },
  ],
  fuentes: [
    { titulo: 'Regla 4: el equipo del jugador (The R&A)', url: 'https://www.randa.org/rog/the-rules-of-golf/rule-4' },
  ],
};

export const P15: Hoyo = {
  nivel: P, numero: 15,
  titulo: 'Antes de salir al campo',
  objetivo: 'Entender el campo, el par, la tarjeta y la etiqueta antes de tu primera vuelta.',
  minutos: 15,
  revisadoPorProfe: false,
  golpes: [
    {
      titulo: 'Del tee al hoyo, y el par',
      texto: [
        'En el campo hay que llevar la bola desde la **salida** (el *tee*) hasta un **hoyo** que está en el **green**, con los menos golpes posibles. Cada intento de darle a la bola cuenta como golpe, aunque falles.',
        'Cada hoyo tiene un **par**: los golpes que necesitaría un buen jugador, contando **dos putts** en el green. Hay hoyos de **par 3**, **par 4** y **par 5**: cuanto más largo el hoyo, más alto el par.',
      ],
      figura: { id: 'plano-hoyo', pie: 'Un par 4 visto desde arriba, como en las libretas de los caddies.' },
    },
    {
      titulo: 'La tarjeta',
      texto: [
        'Si haces **uno menos** que el par es un **birdie**; justo el par, **par**; **uno más**, **bogey**; **dos más**, **doble bogey**.',
        'En la tarjeta muchos jugadores lo marcan con un **círculo** (por debajo del par) o un **cuadrado** (por encima). Es la misma idea que usamos en tu libreta de clases.',
      ],
      figura: { id: 'tarjeta' },
      caddie: 'Tu primer objetivo no es el par. Es terminar los hoyos y disfrutar.',
    },
    {
      titulo: 'Las áreas del campo y la salida',
      texto: [
        'Las reglas dividen el campo en **cinco áreas**: la **zona de salida**, los **búnkeres**, las **áreas de penalización** (agua, barrancos…), el **green** y el **área general**, que es todo lo demás (la **calle** y el **rough**).',
        'En la salida, la bola tiene que estar entre las dos **marcas** y, como mucho, **dos palos por detrás** (se mide con tu palo más largo, sin contar el putter). Delante de las marcas no vale: en competición por golpes son **dos golpes de penalización** y hay que repetir.',
      ],
      figura: { id: 'zona-salida', pie: 'Las bolas con ✓ están bien colocadas; las de ✗, no.' },
    },
    {
      titulo: 'Las estacas',
      texto: [
        'Las **blancas** marcan el **fuera de límites**: si tu bola sale, vuelves a jugar desde donde golpeaste con **un golpe de penalización**.',
        'Las **amarillas** y las **rojas** marcan **áreas de penalización** (casi siempre agua). Puedes jugar la bola como esté si se puede, o sacarla con **un golpe de penalización**; las rojas te dan una opción más. Lo verás a fondo en el nivel intermedio.',
      ],
      figura: { id: 'estacas' },
    },
    {
      titulo: 'Cuidar el campo y a los demás',
      texto: [
        'Si tu bola va hacia alguien, grita **«¡bola!»**. Si lo oyes, **cúbrete la cabeza** y no mires hacia arriba.',
        'En el green: no pises la línea de otro, **marca tu bola** con una moneda antes de levantarla y **arregla tu pique**. En el búnker, **rastrilla** al salir. Y no te eternices: las reglas dan **tres minutos** para buscar una bola.',
      ],
      figura: { id: 'green-cuidados' },
    },
  ],
  preguntas: [
    {
      enunciado: 'En un par 4 has hecho 5 golpes. ¿Cómo se llama?',
      opciones: ['Birdie', 'Par', 'Bogey'],
      correcta: 2,
      explicacion: 'Un golpe más que el par es un bogey.',
    },
    {
      enunciado: 'Tu bola cruza una línea de estacas blancas. ¿Qué haces?',
      opciones: ['La juego donde esté', 'Vuelvo a jugar desde donde golpeé, con un golpe de penalización', 'La dejo caer en la calle sin penalización'],
      correcta: 1,
      explicacion: 'Blanco es fuera de límites: se vuelve a golpear desde el sitio anterior y se suma un golpe.',
    },
    {
      enunciado: 'Oyes «¡bola!». ¿Qué haces?',
      opciones: ['Miro hacia arriba para ver la bola', 'Me cubro la cabeza y me agacho', 'Grito «¡bola!» yo también'],
      correcta: 1,
      explicacion: 'Buscar la bola con la mirada es justo lo que no hay que hacer: protege la cabeza.',
    },
  ],
  fuentes: [
    { titulo: 'Reglas de Golf (The R&A)', url: 'https://www.randa.org/rog/the-rules-of-golf' },
    { titulo: 'Qué cuenta como golpe (National Club Golfer)', url: 'https://www.nationalclubgolfer.com/rules/rules-of-golf-touching-sand-in-a-bunker/' },
    { titulo: 'Cómo se decide el par de un hoyo (Golf News Net)', url: 'https://thegolfnewsnet.com/golfnewsnetteam/2020/01/31/minimum-maximum-yardage-distance-how-long-to-be-a-par-3-par-4-par-5-golf-hole-109927/' },
    { titulo: 'La zona de salida (The Golf Business, con The R&A)', url: 'https://www.thegolfbusiness.co.uk/?p=914599' },
    { titulo: 'Salir desde fuera de la zona de salida (Golf Digest Australia)', url: 'https://www.australiangolfdigest.com.au/?p=112039' },
    { titulo: 'Estacas rojas, amarillas y blancas (Golf Monthly)', url: 'https://golfmonthly.com/golf-rules/red-v-yellow-v-white-stakes' },
    { titulo: 'Bola perdida: tres minutos de búsqueda (USGA)', url: 'https://www.usga.org/content/usga/home-page/custom-search-pages/rules/2019-golf-rules-and-interpretations/rule-18-interpretations.html' },
  ],
};

export const P9: Hoyo = {
  nivel: P, numero: 9,
  titulo: 'El pitch y el medio swing',
  objetivo: 'Levantar la bola con un swing de 9 a 3.',
  minutos: 12,
  revisadoPorProfe: false,
  golpes: [
    {
      titulo: 'Cuándo pitch y cuándo chip',
      texto: [
        'El **chip** vuela poco y rueda mucho. El **pitch** es al revés: la bola **vuela más de lo que rueda** y se para antes.',
        'Úsalo cuando haya algo entre la bola y el green que no se pueda pasar rodando (un trozo de rough alto, un montículo) o cuando el hoyo esté cerca del borde y no haya sitio para que la bola ruede.',
        'Si puedes elegir, elige el chip: es más fácil. El pitch es para cuando el chip no sirve.',
      ],
      caddie: 'Para el pitch se usan los palos más abiertos: el pitching wedge, el wedge de arena o el lob wedge.',
    },
    {
      titulo: 'El reloj: de 9 a 3',
      texto: [
        'Imagina que estás delante de un reloj grande y que tus brazos son las agujas. En la postura, apuntan a las **6**.',
        'En el medio swing, el tronco gira y lleva los brazos hasta las **9** (el brazo de arriba, más o menos horizontal) y, después del golpe, hasta las **3**. Lo mismo de largo hacia atrás que hacia delante.',
        'La distancia se controla con **el largo del swing**, no con la fuerza: de 8 a 4 sale más corta; de 10 a 2, más larga. El ritmo es siempre el mismo.',
      ],
    },
    {
      titulo: 'La bisagra de las muñecas',
      texto: [
        'A diferencia del chip, en el pitch las muñecas **se doblan un poco** al subir: el palo sube por encima de las manos. Esa bisagra da algo de velocidad sin tener que golpear más fuerte.',
        'Los profesores no coinciden en cuánta bisagra conviene: con mucha, el golpe se vuelve más difícil de controlar y es fácil pegar al suelo antes que a la bola. Empieza con **poca** y pregunta a tu profe cuánta te conviene.',
        'Como en el chip, deja algo más de **peso en el pie adelantado** y **sigue girando** después del golpe. No frenes el palo al llegar a la bola.',
      ],
      ejercicio: 'Pon tres toallas a 10, 20 y 30 metros. Con el mismo palo, prueba swings de 8 a 4, de 9 a 3 y de 10 a 2 y apunta a qué toalla llega cada uno.',
    },
  ],
  preguntas: [
    {
      enunciado: 'Entre la bola y el green hay un trozo de rough alto. ¿Qué golpe eliges?',
      opciones: ['Un pitch, que pasa volando', 'Un chip, que rueda', 'Un putt desde fuera del green'],
      correcta: 0,
      explicacion: 'Si no se puede pasar rodando, hace falta que la bola vuele: un pitch.',
    },
    {
      enunciado: 'En el medio swing, ¿cómo mandas la bola más lejos?',
      opciones: ['Con un swing más largo y el mismo ritmo', 'Golpeando más fuerte', 'Doblando más las muñecas al final'],
      correcta: 0,
      explicacion: 'La distancia se controla con el largo del swing (de 8 a 4, de 9 a 3, de 10 a 2), no con la fuerza.',
    },
    {
      enunciado: '¿Qué hace la bola en un pitch?',
      opciones: ['Vuela más de lo que rueda', 'Rueda más de lo que vuela', 'Vuela y rueda lo mismo siempre'],
      correcta: 0,
      explicacion: 'Esa es la diferencia con el chip, que rueda más de lo que vuela.',
    },
  ],
  fuentes: [
    { titulo: 'Pitching: el swing de 9 a 3 (Golf Today)', url: 'https://golftoday.co.uk/proshop-features-2014-pitching-lesson-html/' },
    { titulo: 'Pitch con menos bisagra de muñecas (Golf Digest, Butch Harmon)', url: 'https://www.golfdigest.com/story/pitch-it-better-with-less-wrist-action' },
    { titulo: 'Diez consejos para el pitch: vuela más de lo que rueda (Golf.com)', url: 'https://golf.com/instruction/short-game/10-basic-tips-to-help-you-pitch-the-ball-better-than-ever/' },
  ],
};

export const P10: Hoyo = {
  nivel: P, numero: 10,
  titulo: 'El swing completo',
  objetivo: 'Hacer la subida y el final completos sin perder el equilibrio.',
  minutos: 14,
  revisadoPorProfe: false,
  golpes: [
    {
      titulo: 'La subida',
      texto: [
        'El swing completo es el medio swing del hoyo anterior, más largo. Sale de la misma postura (hoyo 4) y con el mismo grip.',
        'Al subir, **los brazos, los hombros y el palo se van juntos**. Las muñecas se doblan poco a poco, como en el pitch, hasta que el palo queda por encima de la cabeza.',
        'La subida termina cuando has girado tanto que **la espalda mira al objetivo**. No hace falta llegar más lejos: hasta donde gires con comodidad.',
      ],
    },
    {
      titulo: 'Girar, no empujar',
      texto: [
        'El swing es un **giro** alrededor de tu columna, no un movimiento de lado a lado. Al subir, el peso va hacia el pie de atrás pero el cuerpo **no se desplaza**: gira.',
        'Al bajar, el peso pasa al **pie adelantado** y el cuerpo gira hacia el objetivo. Los brazos bajan sin prisa: no intentes pegar fuerte desde arriba.',
        'Mantén la **inclinación de la espalda** de la postura durante todo el swing. Si te levantas a mitad del golpe, el palo pasa por encima de la bola.',
      ],
      caddie: 'Un buen giro hacia atrás prepara un buen giro hacia delante.',
    },
    {
      titulo: 'Terminar de cara al objetivo',
      texto: [
        'El final dice mucho del swing. Uno bueno es así: **el pecho y la hebilla del cinturón miran al objetivo**, casi todo el peso está en el pie adelantado y el de atrás se apoya solo en **la punta**.',
        'El palo queda por encima del hombro adelantado y tú, **en equilibrio**. Si te caes hacia atrás o tienes que dar un paso, algo ha ido mal antes.',
        'Comprobación sencilla: **aguanta el final tres segundos** sin moverte.',
      ],
      ejercicio: 'Sin palo, con los brazos cruzados sobre el pecho y en postura: gira hasta que la espalda mire al objetivo, pasa el peso al pie adelantado y gira hasta que el pecho mire al objetivo. Repite despacio diez veces.',
    },
  ],
  preguntas: [
    {
      enunciado: '¿Cuándo termina la subida?',
      opciones: ['Cuando la espalda mira al objetivo', 'Cuando el palo toca la espalda', 'Cuando los brazos están rectos hacia arriba'],
      correcta: 0,
      explicacion: 'El final de la subida es un giro: la espalda queda mirando al objetivo.',
    },
    {
      enunciado: '¿Cómo es un buen final?',
      opciones: ['De cara al objetivo, con el peso en el pie adelantado y en equilibrio', 'Con el peso en el pie de atrás', 'Mirando todavía al sitio donde estaba la bola'],
      correcta: 0,
      explicacion: 'Pecho y cinturón miran al objetivo, el pie de atrás se apoya en la punta y aguantas sin caerte.',
    },
    {
      enunciado: 'En el swing, el cuerpo...',
      opciones: ['gira alrededor de la columna', 'se desplaza de lado a lado', 'se queda quieto y solo se mueven los brazos'],
      correcta: 0,
      explicacion: 'Es un giro. Desplazarse de lado hace que el palo no vuelva al mismo sitio.',
    },
  ],
  fuentes: [
    { titulo: 'One good turn deserves another (PGA of America)', url: 'https://www.pga.com/one-good-turn-deserves-another' },
    { titulo: 'El swing completo: subida y final (GolfLink)', url: 'https://www.golflink.com/instruction/break-100-lesson-6' },
    { titulo: 'El primer swing completo para principiantes (MyGolfSpy)', url: 'https://mygolfspy.com/news-opinion/instruction/the-beginners-swing-easy-steps-to-your-first-full-swing/' },
  ],
};

export const P11: Hoyo = {
  nivel: P, numero: 11,
  titulo: 'El impacto',
  objetivo: 'Golpear primero la bola y después el suelo.',
  minutos: 12,
  revisadoPorProfe: false,
  golpes: [
    {
      titulo: 'El punto más bajo del swing',
      texto: [
        'El palo describe un círculo alrededor de ti y tiene un **punto más bajo**. Con los hierros, ese punto tiene que quedar **unos centímetros por delante de la bola**, hacia el objetivo.',
        'Así el palo todavía **está bajando** cuando toca la bola: la golpea primero a ella y después roza el suelo.',
        'Si el punto más bajo queda detrás de la bola, el palo pega primero al suelo (el golpe sale corto y «gordo») o sube y le da a la bola por arriba (sale rasa).',
      ],
    },
    {
      titulo: 'La chuleta',
      texto: [
        'Cuando el palo roza el suelo después de la bola, levanta un trozo de césped: la **chuleta** (en inglés, *divot*).',
        'La chuleta es la mejor pista de cómo has golpeado: si **empieza después del sitio donde estaba la bola**, el punto más bajo estaba bien. Si empieza antes, has pegado al suelo primero.',
        'No intentes levantar la bola con las manos. **Ya la levanta el loft del palo**: tu trabajo es bajar el palo hacia ella.',
      ],
      caddie: 'Si arrancas una chuleta en el campo, vuelve a ponerla en su sitio o rellena el hueco con la arena que te den.',
    },
    {
      titulo: 'Manos por delante',
      texto: [
        'En el impacto con un hierro, las **manos van un poco por delante de la cabeza del palo**: el palo se inclina hacia el objetivo, como en la postura del chip pero con el swing completo.',
        'Para que eso pase, **el peso tiene que estar en el pie adelantado** al llegar a la bola. Si se queda atrás, el palo adelanta a las manos y el punto más bajo se va detrás de la bola.',
        'Con el driver es distinto: va sobre un tee y se golpea un poco hacia arriba. Lo verás en el hoyo 13.',
      ],
      ejercicio: 'En el campo de prácticas, pinta una línea en el suelo (o pon una toalla fina) y coloca la bola encima. Haz medios swings: la chuleta tiene que empezar en la línea o después, nunca antes.',
    },
  ],
  preguntas: [
    {
      enunciado: 'Con un hierro, ¿dónde debe quedar el punto más bajo del swing?',
      opciones: ['Unos centímetros por delante de la bola', 'Justo debajo de la bola', 'Unos centímetros por detrás de la bola'],
      correcta: 0,
      explicacion: 'Así el palo golpea la bola mientras todavía baja, y después el suelo.',
    },
    {
      enunciado: 'Tu chuleta empieza antes del sitio donde estaba la bola. ¿Qué ha pasado?',
      opciones: ['Has pegado al suelo antes que a la bola', 'Has golpeado perfecto', 'Has golpeado la bola por arriba'],
      correcta: 0,
      explicacion: 'La chuleta tiene que empezar después de la bola. Si empieza antes, el punto más bajo estaba detrás.',
    },
    {
      enunciado: 'En el impacto con un hierro, ¿dónde está el peso?',
      opciones: ['En el pie adelantado', 'En el pie de atrás', 'Justo a la mitad'],
      correcta: 0,
      explicacion: 'El peso adelante lleva las manos por delante y el punto más bajo después de la bola.',
    },
  ],
  fuentes: [
    { titulo: 'Qué es el punto más bajo del swing (GolfWRX)', url: 'https://www.golfwrx.com/443420/this-thing-called-low-point-and-how-it-can-help-your-golf-game/' },
    { titulo: 'Golpear primero la bola y después el suelo (Golfshake)', url: 'https://www.golfshake.com/improve/view/22929/Improve_your_iron_strike_Simple_concepts_for_better_ball_striking.html' },
    { titulo: 'Manos un poco por delante en la postura (MyGolfSpy)', url: 'https://mygolfspy.com/the-setup-adjustment-that-fixes-thin-and-fat-iron-shots/' },
  ],
};

export const P13: Hoyo = {
  nivel: P, numero: 13,
  titulo: 'El driver y el tee',
  objetivo: 'Salir del tee con el driver sin miedo.',
  minutos: 12,
  revisadoPorProfe: false,
  golpes: [
    {
      titulo: 'La bola en el tee',
      texto: [
        'El **driver** es el palo más largo y el que menos loft tiene. Se usa sobre todo para salir de los hoyos largos, con la bola sobre un **tee** (el soporte de madera o plástico).',
        'La altura del tee importa. Una referencia muy repetida: con el driver apoyado detrás de la bola, **la mitad de la bola debe asomar por encima** de la parte de arriba del palo.',
        'Con un tee muy bajo es fácil pegar con la parte baja de la cara; con uno muy alto, por debajo de la bola, y sale hacia arriba sin avanzar.',
      ],
    },
    {
      titulo: 'Pies y bola',
      texto: [
        'Con el driver, los pies se separan algo **más que la anchura de los hombros**: el swing es más largo y necesitas una base firme.',
        'La bola va **adelantada**: a la altura de la **parte de dentro del talón adelantado**. Es la posición más adelantada de todos los palos.',
        'Los hombros quedan un poco inclinados: el de atrás algo más bajo que el adelantado.',
      ],
      figura: { id: 'posicion-bola', pie: 'La bola se adelanta cuanto más largo es el palo; con el driver, hasta el talón adelantado.' },
    },
    {
      titulo: 'Barrer, no golpear hacia abajo',
      texto: [
        'Con los hierros el palo golpea **bajando** (hoyo 11). Con el driver, como la bola está alta y adelantada, el palo la golpea cuando **ya ha pasado por su punto más bajo y empieza a subir**.',
        'La sensación es la de **barrer** la bola del tee, no la de clavar el palo en el suelo. Si el tee sale disparado y dejas una chuleta, has bajado demasiado.',
        'Y sobre todo: **el mismo ritmo** de siempre. Intentar pegar más fuerte con el driver es la forma más rápida de fallar.',
      ],
      caddie: 'Al empezar, sal con un palo que te dé confianza. El driver se gana en el campo de prácticas.',
      ejercicio: 'En el campo de prácticas, alterna una bola con un hierro 7 (sin tee) y otra con el driver (con tee). Fíjate en que con el hierro sale chuleta y con el driver el tee casi no se mueve.',
    },
  ],
  preguntas: [
    {
      enunciado: '¿A qué altura pones la bola en el tee para el driver?',
      opciones: ['Que asome la mitad de la bola por encima del palo', 'Que la bola quede por debajo del borde del palo', 'Lo más alta que se pueda'],
      correcta: 0,
      explicacion: 'Es la referencia de partida más habitual. Después cada jugador la ajusta un poco.',
    },
    {
      enunciado: '¿Dónde va la bola con el driver?',
      opciones: ['A la altura de la parte de dentro del talón adelantado', 'En el centro de los pies', 'A la altura del pie de atrás'],
      correcta: 0,
      explicacion: 'Es la posición más adelantada: así el palo la golpea cuando empieza a subir.',
    },
    {
      enunciado: 'Con el driver, el palo golpea la bola...',
      opciones: ['un poco hacia arriba, barriéndola', 'hacia abajo, como con los hierros', 'en horizontal y clavándose en el suelo'],
      correcta: 0,
      explicacion: 'Con la bola alta y adelantada, el palo ya ha pasado por su punto más bajo cuando la golpea.',
    },
  ],
  fuentes: [
    { titulo: 'Altura del tee y posición de la bola con el driver (Golf Digest)', url: 'https://www.golfdigest.com/story/golf-myths-debunked-tee-it-high-and-let-it-fly-not-really' },
    { titulo: 'Consejos de salida para principiantes (MyGolfSpy)', url: 'https://mygolfspy.com/news-opinion/instruction/teeing-off-beginner-tips-for-driving-success/' },
    { titulo: 'Cinco claves con el driver (Golf.com)', url: 'https://golf.com/instruction/5-driving-keys-longer-straighter-shots/' },
  ],
};

export const P14: Hoyo = {
  nivel: P, numero: 14,
  titulo: 'Salir del búnker',
  objetivo: 'Sacar la bola del búnker de prácticas al primer intento.',
  minutos: 12,
  revisadoPorProfe: false,
  golpes: [
    {
      titulo: 'Golpear la arena, no la bola',
      texto: [
        'El golpe desde el búnker junto al green es el único en el que **no se golpea la bola**: se golpea la **arena**, y es la arena la que saca la bola.',
        'El palo entra en la arena **unos 5 centímetros detrás de la bola**, pasa por debajo y sale por delante. La bola sale encima de un puñado de arena.',
        'Si entras mucho más atrás, la arena frena el palo y la bola no sale. Si le das a la bola directamente, sale disparada por encima del green.',
      ],
    },
    {
      titulo: 'Cara abierta',
      texto: [
        'Se usa el **wedge de arena** (*sand wedge*). Antes de coger el grip, **gira un poco la cara del palo hacia fuera** (abierta) y después agárralo: así tiene más loft y resbala por la arena en vez de clavarse.',
        'Clava un poco **los pies en la arena** para tener una base firme, deja algo **más de peso en el pie adelantado** y la bola un poco adelantada respecto al centro.',
        'Haz un swing **más largo de lo que parece** (de 9 a 3 como mínimo) y **termina el golpe**: no te pares al tocar la arena.',
      ],
      caddie: 'Elige un punto de la arena detrás de la bola y mira ese punto, no la bola.',
      ejercicio: 'En el búnker de prácticas, sin bola, dibuja una línea en la arena. Haz swings que entren en la línea y saquen arena hacia delante. Cuando lo consigas, pon la bola unos 5 cm por delante de la línea.',
    },
    {
      titulo: 'Lo que no se puede tocar',
      texto: [
        'Las Reglas (Regla 12.2b) prohíben, con tu bola dentro del búnker y antes de golpearla, **tocar la arena con el palo** justo delante o detrás de la bola, en un swing de práctica o al subir el palo. Tampoco puedes tocar la arena para **comprobar cómo está**.',
        'La penalización es la general: **dos golpes** en el juego por golpes o **perder el hoyo** en el match play.',
        'Sí puedes quitar hojas, piedras sueltas y otros impedimentos (desde 2019). Y al salir, **rastrilla la arena** para dejarla lisa.',
      ],
    },
  ],
  preguntas: [
    {
      enunciado: 'En el búnker junto al green, ¿qué golpeas?',
      opciones: ['La arena, unos centímetros detrás de la bola', 'La bola, limpia', 'La arena justo delante de la bola'],
      correcta: 0,
      explicacion: 'La arena saca la bola. El palo entra detrás y pasa por debajo.',
    },
    {
      enunciado: 'Con tu bola en el búnker, apoyas el palo en la arena detrás de ella antes de golpear. ¿Qué pasa?',
      opciones: ['Es penalización: dos golpes en el juego por golpes', 'Nada, está permitido', 'Tienes que volver a dejar caer la bola'],
      correcta: 0,
      explicacion: 'La Regla 12.2b lo prohíbe. La penalización es la general.',
    },
    {
      enunciado: '¿Por qué se abre la cara del palo en el búnker?',
      opciones: ['Para que tenga más loft y resbale por la arena', 'Para que la bola vaya más lejos', 'Para apuntar a la izquierda'],
      correcta: 0,
      explicacion: 'Con la cara abierta el palo no se clava y la bola sale alta.',
    },
  ],
  fuentes: [
    { titulo: 'Regla 12: búnkeres (The R&A)', url: 'https://www.randa.org/rog/the-rules-of-golf/rule-12' },
    { titulo: 'Tocar la arena del búnker: el cambio de 2019 (USGA)', url: 'https://www.usga.org/content/usga/home-page/rules-hub/rules-modernization/major-changes/moving-or-touching-loose-impediments-or-sand-in-a-bunker.html' },
    { titulo: 'Salir del búnker al primer intento (MyGolfSpy)', url: 'https://mygolfspy.com/news-opinion/instruction/golf-bunker-shot-tips-for-beginners-how-to-get-out-the-first-time/' },
    { titulo: 'Entrar en la arena unos centímetros detrás de la bola (Golf.com)', url: 'https://golf.com/instruction/bunker-shots/4-tips-help-fix-bunker-blues/' },
  ],
};

export const PRINCIPIANTE: Hoyo[] = [P1, P2, P3, P4, P5, P6, P7, P8, P9, P10, P11, P12, P13, P14, P15];
