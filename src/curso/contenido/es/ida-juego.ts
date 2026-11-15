// Hoyos 1 a 4: entender el juego antes de coger un palo.
import type { Hoyo } from '../../tipos';

const REGLAS_RA = { titulo: 'Reglas de Golf (The R&A)', url: 'https://www.randa.org/rog/the-rules-of-golf' };

export const HOYO_1: Hoyo = {
  numero: 1,
  titulo: 'Qué es el golf',
  objetivo: 'Entender de qué va el juego y cómo se cuenta.',
  minutos: 8,
  revisadoPorProfe: false,
  golpes: [
    {
      titulo: 'Del tee al hoyo',
      texto: [
        'El golf es sencillo de explicar: hay que llevar una bola desde la **salida** (el *tee*) hasta un **hoyo** que está en el **green**, dándole golpes con un palo. Gana quien lo consigue con **menos golpes**.',
        'Un campo completo tiene **18 hoyos**, aunque muchos campos pequeños tienen 9. Cada hoyo es distinto: unos cortos, otros largos, unos rectos y otros con curva.',
        'Lo que cuentas es cada vez que intentas darle a la bola. Si fallas y no la tocas, ese intento también cuenta.',
      ],
      figura: { id: 'plano-hoyo', pie: 'Un hoyo visto desde arriba, como en las libretas de los caddies.' },
      caddie: 'No te agobies con los nombres: en el hoyo 2 los vemos uno a uno.',
    },
    {
      titulo: 'El par',
      texto: [
        'Cada hoyo tiene un **par**: el número de golpes que necesitaría un buen jugador para terminarlo, contando **dos golpes en el green** (dos *putts*).',
        'Por eso hay hoyos de **par 3** (cortos: un golpe hasta el green y dos putts), **par 4** y **par 5** (los más largos). Cuanto más largo es el hoyo, más alto es su par.',
        'Al empezar, lo normal es hacer bastantes más golpes que el par. Es así para todo el mundo y no pasa nada: el par es una referencia, no un examen.',
      ],
      caddie: 'Tu primer objetivo no es el par. Es terminar los hoyos y disfrutar.',
    },
    {
      titulo: 'Birdie, par y bogey',
      texto: [
        'Cada resultado tiene nombre. Si haces **uno menos** que el par, es un **birdie**. Si haces justo el par, es **par**. **Uno más** es un **bogey** y **dos más**, un **doble bogey**.',
        'En la tarjeta muchos jugadores lo marcan con un **círculo** (por debajo del par) o un **cuadrado** (por encima). Es la misma idea que usamos en tu libreta de clases.',
      ],
      figura: { id: 'tarjeta', pie: 'Cuatro hoyos apuntados en una tarjeta.' },
      ejercicio: 'Mira la tarjeta: ¿cuántos golpes harías en total en esos cuatro hoyos? (3 + 3 + 6 + 6).',
    },
  ],
  preguntas: [
    {
      enunciado: 'En un hoyo de par 4 has hecho 5 golpes. ¿Cómo se llama?',
      opciones: ['Birdie', 'Par', 'Bogey'],
      correcta: 2,
      explicacion: 'Un golpe más que el par es un bogey. Con 3 golpes habría sido birdie, y con 4, par.',
    },
    {
      enunciado: '¿Qué cuenta como golpe?',
      opciones: ['Solo los golpes en los que le das a la bola', 'Cada vez que intentas darle a la bola, aunque falles', 'Solo los golpes fuera del green'],
      correcta: 1,
      explicacion: 'Si haces el movimiento para darle a la bola y fallas, ese intento cuenta como golpe.',
    },
  ],
  fuentes: [
    REGLAS_RA,
    { titulo: 'Qué cuenta como golpe (National Club Golfer)', url: 'https://www.nationalclubgolfer.com/rules/rules-of-golf-touching-sand-in-a-bunker/' },
    { titulo: 'Cómo se decide el par de un hoyo (Golf News Net)', url: 'https://thegolfnewsnet.com/golfnewsnetteam/2020/01/31/minimum-maximum-yardage-distance-how-long-to-be-a-par-3-par-4-par-5-golf-hole-109927/' },
  ],
};

export const HOYO_2: Hoyo = {
  numero: 2,
  titulo: 'El campo',
  objetivo: 'Reconocer cada zona del campo y lo que significan las estacas.',
  minutos: 10,
  revisadoPorProfe: false,
  golpes: [
    {
      titulo: 'Las cinco áreas',
      texto: [
        'Las reglas dividen el campo en **cinco áreas**: la **zona de salida** del hoyo que juegas, los **búnkeres** (zonas de arena), las **áreas de penalización** (agua, barrancos…), el **green** del hoyo que juegas y el **área general**, que es todo lo demás.',
        'Dentro del área general está la **calle** (la hierba cortada, por donde conviene ir) y el **rough** (la hierba alta de los lados, donde la bola cuesta más de sacar).',
        'Saber en qué área está tu bola importa, porque lo que puedes hacer cambia: por ejemplo, en el búnker no puedes apoyar el palo en la arena antes de golpear.',
      ],
      figura: { id: 'plano-hoyo', pie: 'Calle, rough, búnkeres, agua y green en un mismo hoyo.' },
    },
    {
      titulo: 'La zona de salida',
      texto: [
        'Cada hoyo empieza en la **zona de salida**, marcada con dos **marcas** en el suelo. La bola tiene que estar entre las dos marcas y, como mucho, **dos palos por detrás** de ellas (se mide con tu palo más largo, sin contar el putter).',
        'Tú puedes ponerte fuera de esa zona para golpear; lo que tiene que estar dentro es la bola. Aquí, y solo aquí, puedes poner la bola sobre un **tee** (el soporte pequeño).',
        'Delante de las marcas no vale. Si sales desde ahí en una competición por golpes, te ponen **dos golpes de penalización** y tienes que volver a salir desde la zona correcta.',
      ],
      figura: { id: 'zona-salida', pie: 'Las bolas con ✓ están bien colocadas; las de ✗, no.' },
      caddie: 'Hay marcas de varios colores para distintos jugadores. Pregunta en el club cuáles te tocan.',
    },
    {
      titulo: 'Las estacas',
      texto: [
        'Las **estacas blancas** marcan el **fuera de límites**: si tu bola acaba al otro lado, tienes que volver a jugar desde donde golpeaste por última vez, sumando **un golpe de penalización**.',
        'Las **amarillas** y las **rojas** marcan **áreas de penalización** (casi siempre agua). Puedes jugar la bola como esté si se puede, o sacarla con **un golpe de penalización**. Las rojas te dan una opción más: dejar caer la bola al lado, a dos palos del sitio por donde entró.',
        'Los detalles de cómo dejar caer la bola los veremos en el hoyo 16. De momento, quédate con los colores.',
      ],
      figura: { id: 'estacas' },
      ejercicio: 'La próxima vez que vayas al campo, busca una estaca de cada color y piensa qué harías si tu bola cayera allí.',
    },
  ],
  preguntas: [
    {
      enunciado: 'Tu bola cruza una línea de estacas blancas. ¿Qué haces?',
      opciones: ['La juego donde esté', 'Vuelvo a jugar desde donde golpeé, con un golpe de penalización', 'La dejo caer en la calle sin penalización'],
      correcta: 1,
      explicacion: 'Blanco es fuera de límites: se vuelve a golpear desde el sitio anterior y se suma un golpe de penalización.',
    },
    {
      enunciado: '¿Dónde puede estar la bola en la salida?',
      opciones: ['Entre las marcas y hasta dos palos por detrás', 'En cualquier sitio del tee', 'Un poco por delante de las marcas, si no molesta'],
      correcta: 0,
      explicacion: 'La zona de salida es un rectángulo de dos palos de fondo detrás de las marcas. Tú puedes estar fuera; la bola, no.',
    },
  ],
  fuentes: [
    REGLAS_RA,
    { titulo: 'La zona de salida (The Golf Business, con The R&A)', url: 'https://www.thegolfbusiness.co.uk/?p=914599' },
    { titulo: 'Salir desde fuera de la zona de salida (Golf Digest Australia)', url: 'https://www.australiangolfdigest.com.au/?p=112039' },
    { titulo: 'Bola perdida y fuera de límites, regla 18 (The R&A)', url: 'https://www.randa.org/articles/get-golf-rules-ready' },
    { titulo: 'Estacas rojas, amarillas y blancas (Golf Monthly)', url: 'https://golfmonthly.com/golf-rules/red-v-yellow-v-white-stakes' },
  ],
};

export const HOYO_3: Hoyo = {
  numero: 3,
  titulo: 'La bolsa de palos',
  objetivo: 'Saber para qué sirve cada palo y por qué unos levantan más la bola que otros.',
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
      ejercicio: 'Coge dos palos de casa o del club y míralos de lado, juntos. Fíjate en cuál tiene la cara más tumbada.',
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

export const HOYO_4: Hoyo = {
  numero: 4,
  titulo: 'Seguridad y etiqueta',
  objetivo: 'Jugar sin peligro y cuidar el campo y a los demás.',
  minutos: 9,
  revisadoPorProfe: false,
  golpes: [
    {
      titulo: 'Dónde ponerse',
      texto: [
        'Un palo en movimiento y una bola de golf hacen daño. Antes de que otro golpee, colócate **fuera del alcance de su swing**, **de frente a él** (para que te vea) y algo por detrás de la bola.',
        'Nunca te pongas **delante**, en la dirección del golpe, ni muy cerca detrás de su línea. Y antes de tu propio swing de práctica, mira que no haya nadie cerca.',
      ],
      figura: { id: 'seguridad' },
      caddie: 'Mientras otro prepara su golpe: quieto y callado. Es la norma de oro.',
    },
    {
      titulo: '¡Bola!',
      texto: [
        'Si tu bola sale hacia donde hay gente, grita **«¡bola!»** bien alto y enseguida. Es el aviso que todo el mundo entiende en el campo (en inglés se dice *fore*).',
        'Si oyes «¡bola!», no mires hacia arriba buscándola: **cúbrete la cabeza** con los brazos y agáchate.',
        'No golpees hasta que el grupo de delante esté **fuera de tu alcance**, aunque creas que no llegas.',
      ],
    },
    {
      titulo: 'Cuidar el campo',
      texto: [
        'En el **green**: no pises la línea por la que otro va a hacer rodar su bola, **marca tu bola** con una moneda antes de levantarla y **arregla el pique** que deja tu bola al caer (un pequeño hundimiento en la hierba).',
        'En el **búnker**: al salir, **rastrilla** la arena para dejarla como la encontraste.',
        'En la calle: si arrancas un trozo de hierba al golpear (una **chuleta**), vuelve a ponerlo en su sitio o sigue lo que indique el club.',
      ],
      figura: { id: 'green-cuidados' },
    },
    {
      titulo: 'Ritmo de juego',
      texto: [
        'Detrás de ti hay otros jugadores. Ten tu palo pensado antes de que te toque, no hagas muchos swings de práctica y, si buscas una bola, no te eternices: las reglas dan **tres minutos** para encontrarla.',
        'Si tu grupo va lento y el de detrás espera en cada golpe, déjale pasar. Es lo habitual y nadie se lo toma a mal.',
      ],
      ejercicio: 'En tu próxima clase, fíjate en cuánto tarda tu profe desde que llega a la bola hasta que golpea.',
    },
  ],
  preguntas: [
    {
      enunciado: 'Alguien va a golpear. ¿Dónde te pones?',
      opciones: ['Detrás de él, en su línea, para ver hacia dónde va', 'De frente a él, fuera de su alcance', 'Un poco por delante, para ver caer la bola'],
      correcta: 1,
      explicacion: 'De frente para que te vea y fuera del alcance del palo. Delante es peligroso y detrás de su línea le molesta.',
    },
    {
      enunciado: 'Oyes «¡bola!». ¿Qué haces?',
      opciones: ['Miro hacia arriba para ver la bola', 'Me cubro la cabeza y me agacho', 'Grito «¡bola!» yo también'],
      correcta: 1,
      explicacion: 'Buscar la bola con la mirada es justo lo que no hay que hacer: protege la cabeza.',
    },
  ],
  fuentes: [
    { titulo: 'Bola perdida: tres minutos de búsqueda, regla 18 (USGA)', url: 'https://www.usga.org/content/usga/home-page/custom-search-pages/rules/2019-golf-rules-and-interpretations/rule-18-interpretations.html' },
  ],
};
