// Inicio: cada nivel es un recorrido de hoyos dibujado como en una libreta de caddie.
import { tx } from '../i18n/t';
import { NIVELES, esNivel, hoyo, idHoyo, par, programaDe, type Nivel } from '../curso';
import { Nav } from './Nav';
import { useHoyosHechos, useNivelVisto } from './preferencias';
import { Sello } from './Sello';

// Camino del recorrido (de la salida, abajo, al green final, arriba).
const CAMINO: [number, number][] = [
  [30, 300], [90, 290], [150, 302], [210, 288], [270, 296], [320, 270],
  [290, 215], [230, 205], [170, 218], [110, 202], [50, 212],
  [40, 140], [100, 125], [160, 138], [220, 118], [280, 130],
  [300, 62], [236, 36],
];

/** Reparte n hoyos a lo largo del camino, a la misma distancia unos de otros. */
export function puntosRecorrido(n: number): [number, number][] {
  const tramos = CAMINO.slice(1).map((p, i) => Math.hypot(p[0] - CAMINO[i]![0], p[1] - CAMINO[i]![1]));
  const total = tramos.reduce((a, b) => a + b, 0);
  const out: [number, number][] = [];
  for (let k = 0; k < n; k++) {
    let objetivo = n === 1 ? 0 : (total * k) / (n - 1);
    let i = 0;
    while (i < tramos.length - 1 && objetivo > tramos[i]!) { objetivo -= tramos[i]!; i++; }
    const t = Math.min(1, objetivo / tramos[i]!);
    const a = CAMINO[i]!, b = CAMINO[i + 1]!;
    out.push([Math.round(a[0] + (b[0] - a[0]) * t), Math.round(a[1] + (b[1] - a[1]) * t)]);
  }
  return out;
}

function Mapa({ nivel, hechos, siguiente }: { nivel: Nivel; hechos: string[]; siguiente: number | undefined }) {
  const entradas = programaDe(nivel);
  const puntos = puntosRecorrido(entradas.length);
  const linea = CAMINO.map((p) => p.join(',')).join(' ');
  const hecho = (n: number) => hechos.includes(idHoyo(nivel, n));
  const tramos = puntos.slice(0, -1).flatMap((p, i) => {
    const q = puntos[i + 1]!;
    return hecho(i + 1) && hecho(i + 2) ? [`M${p[0]} ${p[1]} L${q[0]} ${q[1]}`] : [];
  });
  const fin = puntos[puntos.length - 1]!;
  return (
    <svg className="mapa" viewBox="0 0 350 330" role="img" aria-label={tx('Mapa del recorrido: {0} de {1} hoyos terminados', [entradas.filter((e) => hecho(e.numero)).length, entradas.length])}>
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
      <ellipse cx={fin[0]} cy={fin[1]} rx="34" ry="17" fill="#A9CB86" />
      {puntos.map(([x, y], i) => {
        const n = i + 1;
        const h = hecho(n);
        const esSiguiente = n === siguiente;
        const escrito = !!hoyo(nivel, n);
        return (
          <a key={n} href={escrito ? `#/hoyo/${nivel}/${n}` : undefined} aria-label={tx('Hoyo {0}', [n])}>
            <circle cx={x} cy={y} r={esSiguiente ? 13 : 11} fill={h ? '#2E6B3C' : '#FBF8EF'} stroke={esSiguiente ? '#D9541E' : '#1E2B23'} strokeWidth={esSiguiente ? 3 : 1} opacity={escrito || h ? 1 : 0.5} />
            <text x={x} y={y + 4} textAnchor="middle" className="mapa-num" fill={h ? '#FFFFFF' : '#1E2B23'}>{n}</text>
            {esSiguiente && (
              <g>
                <path d={`M${x} ${y - 13}v-24`} stroke="#1E2B23" strokeWidth="2" />
                <path d={`M${x + 1} ${y - 37}l14 5-14 5z`} fill="#D9541E" />
              </g>
            )}
          </a>
        );
      })}
    </svg>
  );
}

export function Recorrido({ nivelRuta }: { nivelRuta?: string }) {
  const { hechos } = useHoyosHechos();
  const [visto, ponerVisto] = useNivelVisto();
  const nivel: Nivel = nivelRuta && esNivel(nivelRuta) ? nivelRuta : esNivel(visto) ? visto : 'principiante';
  const ficha = NIVELES.find((n) => n.id === nivel)!;
  const entradas = programaDe(nivel);
  const escritos = entradas.map((e) => hoyo(nivel, e.numero)).filter((h) => h !== undefined);
  const siguiente = escritos.find((h) => !hechos.includes(idHoyo(nivel, h.numero)));
  const hechosNivel = entradas.filter((e) => hechos.includes(idHoyo(nivel, e.numero))).length;

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
        <nav className="niveles" aria-label={tx('Niveles')}>
          {NIVELES.map((n) => (
            <a key={n.id} href={`#/nivel/${n.id}`} className={n.id === nivel ? 'on' : undefined} aria-current={n.id === nivel ? 'page' : undefined} onClick={() => ponerVisto(n.id)}>
              <span className="niv-etq">{tx(n.etiqueta)}</span>
              <span className="niv-nombre">{tx(n.nombre)}</span>
            </a>
          ))}
        </nav>
        <p className="niv-desc">{tx(ficha.descripcion)}</p>

        {siguiente ? (
          <section className="tarjeta-siguiente" aria-label={tx('Siguiente hoyo')}>
            <div className="fila-rotulos">
              <span>{tx('Siguiente hoyo')}</span>
              <span>{tx('Par {0} · {1} min', [par(siguiente), siguiente.minutos])}</span>
            </div>
            <div className="siguiente-titulo">
              <span className="num-grande">{siguiente.numero}</span>
              <span className="titulo-hoyo">{siguiente.titulo}</span>
            </div>
            <p className="objetivo">{siguiente.objetivo}</p>
            <a className="boton" href={`#/hoyo/${nivel}/${siguiente.numero}`}>{tx('Jugar el hoyo')} <span aria-hidden="true">→</span></a>
          </section>
        ) : (
          <section className="tarjeta-siguiente">
            <p className="objetivo">{escritos.length ? tx('Has terminado todos los hoyos escritos de este recorrido. Los siguientes llegan pronto.') : tx('Este recorrido aún está en obras: los hoyos llegarán en próximas entregas.')}</p>
          </section>
        )}

        <div className="fila-titulo">
          <h2>{tx(ficha.nombre)}</h2>
          <span>{tx('{0} de {1} hoyos', [hechosNivel, entradas.length])}</span>
        </div>
        <Mapa nivel={nivel} hechos={hechos} siguiente={siguiente?.numero} />

        <ol className="lista-hoyos">
          {entradas.map((e) => {
            const escrito = hoyo(nivel, e.numero);
            const hecho = hechos.includes(idHoyo(nivel, e.numero));
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
            return <li key={e.numero}>{escrito ? <a href={`#/hoyo/${nivel}/${e.numero}`}>{dentro}</a> : <div className="lh-pendiente">{dentro}</div>}</li>;
          })}
        </ol>
        <Sello />
      </main>
      <Nav actual="recorrido" />
    </div>
  );
}
