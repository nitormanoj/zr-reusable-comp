import { provideZoneChangeDetection } from '@angular/core';
import 'zone.js';

import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';

import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';

import { AppComponent } from './app/app.component';
import { routes as showcaseRoutes } from './app/features/showcase/showcase.routes';
import { provideAnimations } from '@angular/platform-browser/animations';

const routes: Routes = [
  { path: '', redirectTo: 'showcase', pathMatch: 'full' },
  { path: 'showcase', children: showcaseRoutes }
];

bootstrapApplication(AppComponent, {
  providers: [
    provideZoneChangeDetection(), provideAnimations(),
    provideRouter(routes),

    providePrimeNG({
      theme: {
        preset: Aura
      }
    })
  ]
}).catch(err => console.error(err));