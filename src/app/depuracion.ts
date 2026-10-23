import { inject, provideAppInitializer } from '@angular/core';
import { Router } from '@angular/router';

/** Escribe en la consola cada navegación. Solo tiene sentido mientras se desarrolla. */
export function provideDepuracion() {
  return provideAppInitializer(() => {
    inject(Router).events.subscribe((evento) => console.log('[depuracion]', evento));
  });
}
