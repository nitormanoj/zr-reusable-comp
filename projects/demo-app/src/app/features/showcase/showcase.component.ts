import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-showcase',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.scss']
})
export class ShowcaseComponent {
  sections = [
    { path: 'basic', label: 'Basic' },
    { path: 'composition', label: 'Composition' },
    { path: 'sorting', label: 'Sorting' },
    { path: 'pagination', label: 'Pagination' },
    { path: 'custom-templates', label: 'Custom templates' },
    { path: 'loading-state', label: 'Loading state' },
    { path: 'theming', label: 'Theming' },
    { path: 'api-reference', label: 'API reference' }
  ];

  constructor(private router: Router, private route: ActivatedRoute) {}

  goTo(path: string, ev: Event) {
    ev.preventDefault();
    console.log('Showcase goTo', path);
    this.router.navigate([path], { relativeTo: this.route }).catch(err => console.error(err));
  }

  isActive(path: string) {
    const url = this.router.url.split('?')[0].split('#')[0];
    if (url === '/showcase' || url === '/showcase/') {
      return path === 'basic' || path === '';
    }
    return url === `/showcase/${path}` || url.endsWith(`/${path}`);
  }
}
