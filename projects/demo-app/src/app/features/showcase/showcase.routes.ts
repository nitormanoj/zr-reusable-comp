import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./showcase.component').then(m => m.ShowcaseComponent),
    children: [
      { path: '', redirectTo: 'basic', pathMatch: 'full' },
      { path: 'button', loadComponent: () => import('./sections/button/button.component').then(m => m.ButtonComponent) },
      { path: 'checkbox', loadComponent: () => import('./sections/checkbox/checkbox.component').then(m => m.CheckboxShowcaseComponent) },
      { path: 'breadcrumb', loadComponent: () => import('./sections/breadcrumb/breadcrumb.component').then(m => m.BreadcrumbComponent) },
      { path: 'basic', loadComponent: () => import('./sections/basic/basic.component').then(m => m.BasicComponent) },
      { path: 'sorting', loadComponent: () => import('./sections/sorting/sorting.component').then(m => m.SortingComponent) },
      { path: 'pagination', loadComponent: () => import('./sections/pagination/pagination.component').then(m => m.PaginationComponent) },
      { path: 'composition', loadComponent: () => import('./sections/table-composition/table-composition.component').then(m => m.TableCompositionComponent) },
      { path: 'custom-templates', loadComponent: () => import('./sections/custom-templates/custom-templates.component').then(m => m.CustomTemplatesComponent) },
      { path: 'loading-state', loadComponent: () => import('./sections/loading-state/loading-state.component').then(m => m.LoadingStateComponent) },
      { path: 'theming', loadComponent: () => import('./sections/theming/theming.component').then(m => m.ThemingComponent) },
      { path: 'api-reference', loadComponent: () => import('./sections/api-reference/api-reference.component').then(m => m.ApiReferenceComponent) }
    ]
  }
];
