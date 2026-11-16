// Una lección («hoyo»): sus golpes uno a uno, las preguntas de green y el final.
import { useEffect, useState } from 'react';
import { tx } from '../i18n/t';
import { hoyo as buscarHoyo, par, type Hoyo } from '../curso';
import type { Pregunta } from '../curso/tipos';
import { FIGURAS } from '../figuras';
import { Texto } from './Texto';
import { useHoyosHechos, useMano } from './preferencias';
import { Sello } from './Sello';

/** Plano pequeño del hoyo con un punto por golpe. */
function PlanoGolpes({ total, actual }: { total: number; actual: number }) {
  const puntos = Array.from({ length: total }, (_, i) => {
    const t = total === 1 ? 0 : i / (total - 1);
    return { x: 44 + Math.sin(t * 2.2) * 16, y: 150 - t * 92 };
  });
  return (
    <svg className="plano-golpes" viewBox="0 0 110 170" role="img" aria-label={tx('Golpe {0} de {1}', [Math.min(actual + 1, total), total])}>
      <g fill="none" stroke="#9FB98A" strokeWidth="1"><ellipse cx="55" cy="30" rx="40" ry="22" /><ellipse cx="55" cy="30" rx="52" ry="30" /></g>
      <path d="M40 160 C30 120 70 100 60 70 C55 52 50 45 55 30" fill="none" stroke="#D3E4BA" strokeWidth="26" strokeLinecap="round" />
      <ellipse cx="55" cy="28" rx="22" ry="13" fill="#A9CB86" />
      <ellipse cx="82" cy="92" rx="10" ry="5" fill="#E4D3A2" />
      <path d="M55 27v-20" stroke="#1E2B23" strokeWidth="1.5" /><path d="M56 7l10 4-10 4z" fill="#D9541E" />
      {puntos.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r={i === actual ? 10 : 9} fill={i < actual ? '#2E6B3C' : '#FBF8EF'} stroke={i === actual ? '#D9541E' : '#1E2B23'} strokeWidth={i === actual ? 2.5 : 1} />
          <text x={p.x} y={p.y + 4} textAnchor="middle" className="mapa-num" fill={i < actual ? '#FFFFFF' : '#1E2B23'}>{i + 1}</text>
        </g>
      ))}
    </svg>
  );
}

function PreguntaGreen({ p, n, total, onSiguiente }: { p: Pregunta; n: number; total: number; onSiguiente: () => void }) {
  const [elegida, setElegida] = useState<number | null>(null);
  useEffect(() => setElegida(null), [p]);
  const acierto = elegida === p.correcta;
  return (
    <section className="pregunta" aria-live="polite">
      <span className="rotulo verde">{tx('Pregunta de green {0} de {1}', [n, total])}</span>
      <h3>{p.enunciado}</h3>
      <div className="opciones">
        {p.opciones.map((o, i) => {
          const estado = elegida === null ? '' : i === p.correcta ? ' correcta' : i === elegida ? ' fallada' : ' apagada';
          return (
            <button key={i} type="button" className={`opcion${estado}`} disabled={elegida !== null} onClick={() => setElegida(i)}>
              <span className="marca-opcion" aria-hidden="true" />
              {o}
            </button>
          );
        })}
      </div>
      {elegida !== null && (
        <div className={`explicacion ${acierto ? 'bien' : 'mal'}`}>
          <strong>{acierto ? tx('¡Dentro!') : tx('Casi: repasa esto.')}</strong> {p.explicacion}
        </div>
      )}
      {elegida !== null && (
        <button type="button" className="boton ancho" onClick={onSiguiente}>{n < total ? tx('Siguiente pregunta →') : tx('Terminar el hoyo →')}</button>
      )}
    </section>
  );
}

export function HoyoPantalla({ numero }: { numero: number }) {
  const h = buscarHoyo(numero);
  const [paso, setPaso] = useState(0);
  const [mano] = useMano();
  const { marcar } = useHoyosHechos();
  useEffect(() => { setPaso(0); window.scrollTo(0, 0); }, [numero]);
  useEffect(() => { window.scrollTo(0, 0); }, [paso]);
  if (!h) {
    return (
      <div className="pantalla">
        <main className="contenido"><p>{tx('Este hoyo aún no está escrito.')}</p><a className="boton" href="#/">{tx('Volver al recorrido')}</a><Sello /></main>
      </div>
    );
  }
  const nGolpes = h.golpes.length;
  const enPreguntas = paso >= nGolpes && paso < nGolpes + h.preguntas.length;
  const terminado = paso >= nGolpes + h.preguntas.length;
  const golpe = h.golpes[paso];

  return (
    <div className="pantalla">
      <header className="barra-hoyo">
        <a href="#/" className="icono" aria-label={tx('Volver al recorrido')}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>
        </a>
        <span className="rotulo">{h.numero <= 9 ? tx('Ida · hoyo {0} de 18', [h.numero]) : tx('Vuelta · hoyo {0} de 18', [h.numero])}</span>
        <span className="icono" />
      </header>

      <main className="contenido">
        <div className="cabeza-hoyo">
          <div>
            <span className="num-enorme">{h.numero}</span>
            <h1 className="titulo-hoyo">{h.titulo}</h1>
            <span className="sub">{tx('Par {0} · {1} min', [par(h), h.minutos])}</span>
          </div>
          <PlanoGolpes total={nGolpes} actual={Math.min(paso, nGolpes)} />
        </div>
        {!h.revisadoPorProfe && (
          <p className="aviso-profe">{tx('Borrador: pendiente de que lo revise tu profesor.')}</p>
        )}

        {golpe && (
          <article className="golpe">
            <span className="rotulo verde">{tx('Golpe {0} · {1}', [paso + 1, golpe.titulo])}</span>
            {golpe.texto.map((t, i) => <p key={i}><Texto t={t} /></p>)}
            {golpe.figura && (() => {
              const ficha = FIGURAS[golpe.figura.id];
              const Figura = ficha.componente;
              return (
                <figure>
                  <Figura zurdo={mano === 'zurdo'} />
                  {(golpe.figura.pie || ficha.porMano) && (
                    <figcaption>
                      {golpe.figura.pie}
                      {ficha.porMano && <> {tx(mano === 'zurdo' ? '(Dibujo para zurdos.)' : '(Dibujo para diestros; cámbialo en Ajustes.)')}</>}
                    </figcaption>
                  )}
                </figure>
              );
            })()}
            {golpe.caddie && <p className="nota-caddie">{tx('Nota del caddie:')} {golpe.caddie}</p>}
            {golpe.ejercicio && (
              <div className="ejercicio"><span className="rotulo">{tx('Para practicar')}</span><p>{golpe.ejercicio}</p></div>
            )}
          </article>
        )}

        {enPreguntas && (
          <PreguntaGreen
            p={h.preguntas[paso - nGolpes]!}
            n={paso - nGolpes + 1}
            total={h.preguntas.length}
            onSiguiente={() => {
              if (paso + 1 >= nGolpes + h.preguntas.length) marcar(h.numero);
              setPaso(paso + 1);
            }}
          />
        )}

        {terminado && (
          <section className="final-hoyo">
            <svg width="64" height="64" viewBox="0 0 64 64" aria-hidden="true">
              <ellipse cx="32" cy="50" rx="26" ry="9" fill="#A9CB86" />
              <ellipse cx="32" cy="50" rx="5" ry="2.4" fill="#1E2B23" />
              <path d="M32 50V10" stroke="#1E2B23" strokeWidth="2.5" /><path d="M33 10l18 7-18 7z" fill="#D9541E" />
            </svg>
            <h2>{tx('Hoyo {0} terminado', [h.numero])}</h2>
            <p>{h.objetivo}</p>
            {h.fuentes.length > 0 && (
              <div className="fuentes">
                <span className="rotulo">{tx('Fuentes')}</span>
                <ul>{h.fuentes.map((f) => <li key={f.url}><a href={f.url} target="_blank" rel="noreferrer">{f.titulo}</a></li>)}</ul>
              </div>
            )}
            <div className="botones">
              <a className="boton secundario" href="#/">{tx('Al recorrido')}</a>
              {buscarHoyo(h.numero + 1) && <a className="boton" href={`#/hoyo/${h.numero + 1}`}>{tx('Hoyo {0} →', [h.numero + 1])}</a>}
            </div>
          </section>
        )}
        <Sello />
      </main>

      {!terminado && !enPreguntas && (
        <footer className="pie-hoyo">
          <button type="button" className="boton secundario" disabled={paso === 0} onClick={() => setPaso(paso - 1)}>{tx('← Anterior')}</button>
          <button type="button" className="boton" onClick={() => setPaso(paso + 1)}>
            {paso + 1 < nGolpes ? tx('Siguiente golpe →') : tx('Al green →')}
          </button>
        </footer>
      )}
    </div>
  );
}
