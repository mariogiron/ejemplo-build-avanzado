import { Routes } from '@angular/router';
import { Inicio } from './paginas/inicio';

export const routes: Routes = [
  { path: '', component: Inicio, title: 'Recetario' },
  // Las demás páginas se cargan en diferido: cada una será un fichero aparte en el build
  {
    path: 'recetas',
    loadComponent: () => import('./paginas/recetas').then((m) => m.Recetas),
    title: 'Recetas · Recetario',
  },
  {
    path: 'recetas/:id',
    loadComponent: () => import('./paginas/detalle-receta').then((m) => m.DetalleReceta),
    title: 'Receta · Recetario',
  },
  {
    path: 'acerca',
    loadComponent: () => import('./paginas/acerca').then((m) => m.Acerca),
    title: 'Acerca de · Recetario',
  },
  { path: '**', redirectTo: '' },
];
