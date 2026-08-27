import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, Routes } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes as showcaseRoutes } from './app/features/showcase/showcase.routes';

const routes: Routes = [
	{ path: '', redirectTo: 'showcase', pathMatch: 'full' },
	{ path: 'showcase', children: showcaseRoutes }
];

bootstrapApplication(AppComponent, {
	providers: [provideRouter(routes), provideAnimations()]
}).catch(err => console.error(err));
