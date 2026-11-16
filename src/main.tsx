// Arranque de la web y rutas por almohadilla (#/…): funciona igual como web, PWA o app.
import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { tx } from './i18n/t';
import { Recorrido } from './ui/Recorrido';
import { HoyoPantalla } from './ui/HoyoPantalla';
import { Ajustes, EnObras } from './ui/Secciones';
import { esNivel } from './curso';

function useRuta(): string {
  const [ruta, setRuta] = useState(() => location.hash.slice(1) || '/');
  useEffect(() => {
    const al = () => setRuta(location.hash.slice(1) || '/');
    window.addEventListener('hashchange', al);
    return () => window.removeEventListener('hashchange', al);
  }, []);
  return ruta;
}

function App() {
  const ruta = useRuta();
  const mHoyo = /^\/hoyo\/([a-z]+)\/(\d+)$/.exec(ruta);
  if (mHoyo && esNivel(mHoyo[1]!)) return <HoyoPantalla nivel={mHoyo[1]} numero={Number(mHoyo[2])} />;
  const mNivel = /^\/nivel\/([a-z]+)$/.exec(ruta);
  if (mNivel) return <Recorrido nivelRuta={mNivel[1]} />;
  if (ruta === '/ajustes') return <Ajustes />;
  if (ruta === '/libreta') return <EnObras pestana="libreta" titulo={tx('Libreta')} texto={tx('Aquí apuntarás tus clases con el profe. Llega en la siguiente entrega.')} />;
  if (ruta === '/caddie') return <EnObras pestana="caddie" titulo={tx('Caddie')} texto={tx('Aquí podrás preguntar dudas del curso y pedir un plan de práctica. Necesita las cuentas y tu clave de Claude.')} />;
  return <Recorrido />;
}

createRoot(document.getElementById('root')!).render(<App />);
