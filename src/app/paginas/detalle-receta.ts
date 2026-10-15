import { httpResource } from '@angular/common/http';
import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { environment } from '../../environments/environment';
import { Receta } from '../receta';

@Component({
  selector: 'app-detalle-receta',
  imports: [RouterLink],
  template: `
    @if (receta(); as receta) {
      <h1>{{ receta.nombre }}</h1>
      <p>{{ receta.minutos }} minutos</p>
      <h2>Ingredientes</h2>
      <ul>
        @for (ingrediente of receta.ingredientes; track ingrediente) {
          <li>{{ ingrediente }}</li>
        }
      </ul>
    }
    <p><a routerLink="/recetas">← Todas las recetas</a></p>
  `,
})
export class DetalleReceta {
  /** El :id de la ruta, gracias a withComponentInputBinding. */
  readonly id = input.required<string>();

  private readonly recetas = httpResource<Receta[]>(() => environment.datos);
  protected readonly receta = computed(() =>
    this.recetas.value()?.find((receta) => receta.id === Number(this.id())),
  );
}
