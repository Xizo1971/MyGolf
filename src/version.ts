// La versión sale de package.json: así compilar no modifica ningún fichero del repositorio.
import pkg from '../package.json';

export const VERSION: string = pkg.version;
