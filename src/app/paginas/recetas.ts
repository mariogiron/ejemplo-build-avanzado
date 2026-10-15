import { httpResource } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { environment } from '../../environments/environment';
import { Receta } from '../receta';

@Component({
  selector: 'app-recetas',
  imports: [RouterLink],
  template: `
    <h1>Recetas</h1>
    @if (recetas.hasValue()) {
      <ul>
        @for (receta of recetas.value(); track receta.id) {
          <li>
            <a [routerLink]="['/recetas', receta.id]">{{ receta.nombre }}</a> ·
            {{ receta.minutos }} min
          </li>
        }
      </ul>
    }
  `,
})
export class Recetas {
  /** La dirección sale del entorno. recetas.json está en public/: se copia tal cual al build. */
  protected readonly recetas = httpResource<Receta[]>(() => environment.datos);
}
