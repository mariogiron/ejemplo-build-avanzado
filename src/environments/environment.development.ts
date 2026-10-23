import { provideDepuracion } from '../app/depuracion';
import { Entorno } from './entorno';

export const environment: Entorno = {
  nombre: 'desarrollo',
  datos: '/recetas.json',
  aviso: 'DESARROLLO',
  proveedores: [provideDepuracion()],
};
