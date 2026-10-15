import { Component } from '@angular/core';
import recetario from '../datos/recetario-completo.json';

/** Lo nuevo de la aplicación. Se escribe en cualquier orden. */
const NOVEDADES = [
  { fecha: '2026-09-15', texto: 'Las recetas tienen su propia página' },
  { fecha: '2026-10-02', texto: 'Tiempo de preparación en cada receta' },
  { fecha: '2026-09-28', texto: 'Página «Acerca de»' },
];

@Component({
  selector: 'app-inicio',
  template: `
    <h1>Recetario</h1>
    <p>{{ total }} recetas de toda la vida. Usa el menú para moverte.</p>
    <h2>Novedades</h2>
    <ul>
      @for (novedad of novedades; track novedad.fecha) {
        <li>{{ novedad.fecha }} · {{ novedad.texto }}</li>
      }
    </ul>
  `,
})
export class Inicio {
  /** Para el contador de la portada. */
  protected readonly total = recetario.length;

  /** De la más reciente a la más antigua. */
  protected readonly novedades = [...NOVEDADES].sort((a, b) => b.fecha.localeCompare(a.fecha));
}
