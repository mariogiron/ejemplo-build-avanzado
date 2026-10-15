/** Una receta, tal como viene en recetas.json. */
export interface Receta {
  id: number;
  nombre: string;
  minutos: number;
  ingredientes: string[];
}
