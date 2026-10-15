/** Lo que cambia de un entorno a otro. Todos los ficheros de entorno cumplen este contrato. */
export interface Entorno {
  nombre: 'desarrollo' | 'preproduccion' | 'produccion';
  /** De dónde salen las recetas. En un proyecto real, la dirección de la API. */
  datos: string;
  /** Un aviso en la cabecera, para no confundir un entorno con otro. En producción, ninguno. */
  aviso: string | null;
}
