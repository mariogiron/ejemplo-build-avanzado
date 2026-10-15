import { Entorno } from './entorno';

/** Producción. Es el fichero que importa el código; los demás lo sustituyen al construir. */
export const environment: Entorno = {
  nombre: 'produccion',
  datos: '/recetas.json',
  aviso: null,
};
