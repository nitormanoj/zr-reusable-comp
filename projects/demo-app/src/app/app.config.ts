import { provideZoneChangeDetection } from '@angular/core';
import 'zone.js';

import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';

import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';

import { AppComponent } from './app.component';
import { routes as showcaseRoutes } from '../app/features/showcase/showcase.routes';

const routes: Routes = [
  // { path: '', redirectTo: 'showcase', pathMatch: 'full' },
  // { path: 'showcase', children: showcaseRoutes },
   {
    path: '',
    loadComponent: () =>
      import('./textExpert_QT/qt-landingpage/qt-landingpage.component')
        .then(m => m.QtLandingpageComponent)
  },
];

bootstrapApplication(AppComponent, {
  providers: [
    provideZoneChangeDetection(),
    provideRouter(routes),

    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: 'none'
        }
      }
    })
  ]
}).catch(err => console.error(err));