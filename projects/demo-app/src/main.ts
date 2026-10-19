import { provideZoneChangeDetection } from '@angular/core';
import 'zone.js';

import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';

import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { definePreset } from '@primeuix/themes';

const QtPreset = definePreset(Aura, {
  semantic: { primary: {
    50: '#effafa', 100: '#d5eeee', 200: '#aedddd', 300: '#79c4c6',
    400: '#45a4a8', 500: '#188486', 600: '#007a7b', 700: '#006466',
    800: '#005153', 900: '#004446', 950: '#00292b',
  } },
});

import { AppComponent } from './app/app.component';
import { routes as showcaseRoutes } from './app/features/showcase/showcase.routes';
import { provideAnimations } from '@angular/platform-browser/animations';

const routes: Routes = [
  // { path: '', redirectTo: 'showcase', pathMatch: 'full' },
  // { path: 'showcase', children: showcaseRoutes },
   {
    path: '',
    loadComponent: () =>
      import(
        './app/textExpert_QT/qt-landingpage/qt-landingpage.component'
      ).then(m => m.QtLandingpageComponent)
  }
];

bootstrapApplication(AppComponent, {
  providers: [
    provideZoneChangeDetection(), provideAnimations(),
    provideRouter(routes),

    providePrimeNG({
      theme: {
        preset: QtPreset,
        options: { darkModeSelector: false }
      }
    })
  ]
}).catch(err => console.error(err));