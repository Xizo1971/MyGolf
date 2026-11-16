// Ajustes (hoy: con qué mano juegas) y las secciones que llegan en la siguiente entrega.
import { tx } from '../i18n/t';
import { Nav, type Pestana } from './Nav';
import { useMano, type Mano } from './preferencias';
import { Sello } from './Sello';

export function Ajustes() {
  const [mano, ponerMano] = useMano();
  return (
    <div className="pantalla">
      <header className="cabecera-seccion">
        <span className="rotulo">{tx('Tarjeta del jugador')}</span>
        <h1>{tx('Ajustes')}</h1>
      </header>
      <main className="contenido">
        <div className="grupo">
          <span className="rotulo">{tx('Juegas como')}</span>
          <div className="segmentos" role="radiogroup" aria-label={tx('Mano con la que juegas')}>
            {(['diestro', 'zurdo'] as Mano[]).map((m) => (
              <button key={m} type="button" role="radio" aria-checked={mano === m} className={mano === m ? 'on' : undefined} onClick={() => ponerMano(m)}>
                {m === 'diestro' ? tx('Diestro') : tx('Zurdo')}
              </button>
            ))}
          </div>
          <p className="lapiz gris">{tx('Los dibujos del curso se giran según tu mano.')}</p>
        </div>
        <div className="grupo apagado">
          <span className="rotulo">{tx('Cuenta y clave de Claude')}</span>
          <p>{tx('Llegan en la siguiente entrega, con las cuentas de Miguel y Ana.')}</p>
        </div>
        <Sello />
      </main>
      <Nav actual="ajustes" />
    </div>
  );
}

export function EnObras({ pestana, titulo, texto }: { pestana: Pestana; titulo: string; texto: string }) {
  return (
    <div className="pantalla">
      <header className="cabecera-seccion">
        <span className="rotulo">{tx('En obras')}</span>
        <h1>{titulo}</h1>
      </header>
      <main className="contenido">
        <p className="lapiz grande">{texto}</p>
        <Sello />
      </main>
      <Nav actual={pestana} />
    </div>
  );
}
