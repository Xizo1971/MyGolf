// Inicio: el curso dibujado como un recorrido de 18 hoyos.
import { tx } from '../i18n/t';
import { HOYOS, PROGRAMA, hoyo, par } from '../curso';
import { Nav } from './Nav';
import { useHoyosHechos } from './preferencias';

// Posición de cada hoyo en el mapa (de la salida, abajo, al green final, arriba).
const PUNTOS: [number, number][] = [
  [30, 300], [90, 290], [150, 302], [210, 288], [270, 296], [320, 270],
  [290, 215], [230, 205], [170, 218], [110, 202], [50, 212],
  [40, 140], [100, 125], [160, 138], [220, 118], [280, 130],
  [300, 62], [236, 36],
];

function Mapa({ hechos, siguiente }: { hechos: number[]; siguiente: number | undefined }) {
  const linea = PUNTOS.map((p) => p.join(',')).join(' ');
  // Tramos ya jugados: solo entre dos hoyos consecutivos terminados.
  const tramos = PUNTOS.slice(0, -1).flatMap((p, i) => {
    const q = PUNTOS[i + 1]!;
    return hechos.includes(i + 1) && hechos.includes(i + 2) ? [`M${p[0]} ${p[1]} L${q[0]} ${q[1]}`] : [];
  });
  return (
    <svg
      className="mapa" viewBox="0 0 350 330" role="img"
      aria-label={tx('Mapa del curso: {0} de 18 hoyos completados', [hechos.length])}
    >
      <g fill="none" stroke="#9FB98A" strokeWidth="1" opacity=".7">
        <path d="M-10 250 C60 225 120 270 190 245 S300 230 360 255" />
        <path d="M-10 265 C70 240 120 290 200 262 S300 250 360 272" />
        <path d="M-10 180 C50 160 120 200 180 175 S290 150 360 182" />
        <path d="M-10 95 C70 80 130 120 200 92 S300 70 360 98" />
        <ellipse cx="236" cy="38" rx="56" ry="26" />
        <ellipse cx="236" cy="38" rx="74" ry="36" />
      </g>
      <path d="M150 168 c18 -10 44 -6 48 8 c4 14 -22 22 -42 18 c-16 -3 -20 -18 -6 -26z" fill="#BFD6E2" stroke="#3C7FA6" />
      <ellipse cx="64" cy="268" rx="14" ry="7" fill="#E4D3A2" />
      <ellipse cx="258" cy="182" rx="12" ry="6" fill="#E4D3A2" />
      <ellipse cx="178" cy="62" rx="13" ry="6" fill="#E4D3A2" />
      <polyline points={linea} fill="none" stroke="#D3E4BA" strokeWidth="24" strokeLinejoin="round" strokeLinecap="round" />
      <polyline points={linea} fill="none" stroke="#1E2B23" strokeWidth="1.5" strokeDasharray="4 5" strokeLinejoin="round" />
      {tramos.length > 0 && <path d={tramos.join(' ')} fill="none" stroke="#2E6B3C" strokeWidth="3" strokeLinecap="round" />}
      <ellipse cx="236" cy="36" rx="34" ry="17" fill="#A9CB86" />
      {PUNTOS.map(([x, y], i) => {
        const n = i + 1;
        const hecho = hechos.includes(n);
        const esSiguiente = n === siguiente;
        const escrito = !!hoyo(n);
        return (
          <a key={n} href={escrito ? `#/hoyo/${n}` : undefined} aria-label={tx('Hoyo {0}', [n])}>
            <circle
              cx={x} cy={y} r={esSiguiente ? 13 : 11}
              fill={hecho ? '#2E6B3C' : '#FBF8EF'}
              stroke={esSiguiente ? '#D9541E' : '#1E2B23'}
              strokeWidth={esSiguiente ? 3 : 1}
              opacity={escrito || hecho ? 1 : 0.55}
            />
            <text x={x} y={y + 4} textAnchor="middle" className="mapa-num" fill={hecho ? '#FFFFFF' : '#1E2B23'}>{n}</text>
            {esSiguiente && (
              <g>
                <path d={`M${x} ${y - 13}v-24`} stroke="#1E2B23" strokeWidth="2" />
                <path d={`M${x + 1} ${y - 37}l14 5-14 5z`} fill="#D9541E" />
              </g>
            )}
          </a>
        );
      })}
      <text x="14" y="326" className="mapa-rotulo">{tx('IDA · CONOCER EL JUEGO')}</text>
      <text x="14" y="166" className="mapa-rotulo">{tx('VUELTA · EL SWING')}</text>
    </svg>
  );
}

export function Recorrido() {
  const { hechos } = useHoyosHechos();
  const siguienteEscrito = HOYOS.find((h) => !hechos.includes(h.numero));
  const siguiente = siguienteEscrito ?? hoyo(1);
  return (
    <div className="pantalla">
      <header className="cabecera">
        <div className="marca">
          <svg width="22" height="28" viewBox="0 0 22 28" aria-hidden="true"><path d="M4 2v24" stroke="#1E2B23" strokeWidth="2" strokeLinecap="round" /><path d="M5 3l13 5-13 5z" fill="#D9541E" /></svg>
          <span>MyGolf</span>
        </div>
        <span className="lapiz gris">{tx('Tu libreta')}</span>
      </header>

      <main className="contenido">
        {siguiente && (
          <section className="tarjeta-siguiente" aria-label={tx('Siguiente hoyo')}>
            <div className="fila-rotulos">
              <span>{siguienteEscrito ? tx('Siguiente hoyo') : tx('Has terminado la ida')}</span>
              <span>{tx('Par {0} · {1} min', [par(siguiente), siguiente.minutos])}</span>
            </div>
            <div className="siguiente-titulo">
              <span className="num-grande">{siguiente.numero}</span>
              <span className="titulo-hoyo">{siguiente.titulo}</span>
            </div>
            <p className="objetivo">{siguiente.objetivo}</p>
            <a className="boton" href={`#/hoyo/${siguiente.numero}`}>{siguienteEscrito ? tx('Jugar el hoyo') : tx('Repasar')} <span aria-hidden="true">→</span></a>
          </section>
        )}

        <div className="fila-titulo">
          <h2>{tx('Tu recorrido')}</h2>
          <span>{tx('{0} de 18 hoyos', [hechos.length])}</span>
        </div>
        <Mapa hechos={hechos} siguiente={siguienteEscrito?.numero} />

        <ol className="lista-hoyos">
          {PROGRAMA.map((e) => {
            const escrito = hoyo(e.numero);
            const hecho = hechos.includes(e.numero);
            const dentro = (
              <>
                <span className={`lh-num${hecho ? ' hecho' : ''}`}>{e.numero}</span>
                <span className="lh-texto">
                  <span className="lh-titulo">{e.titulo}</span>
                  <span className="lh-sub">{escrito ? tx('Par {0} · {1} min', [par(escrito), escrito.minutos]) : tx('Próximamente')}</span>
                </span>
                {hecho && <span className="lh-ok" aria-label={tx('Terminado')} />}
              </>
            );
            return (
              <li key={e.numero} className={e.numero === 10 ? 'separa' : undefined}>
                {escrito ? <a href={`#/hoyo/${e.numero}`}>{dentro}</a> : <div className="lh-pendiente">{dentro}</div>}
              </li>
            );
          })}
        </ol>
      </main>
      <Nav actual="recorrido" />
    </div>
  );
}
