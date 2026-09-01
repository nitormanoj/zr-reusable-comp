import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export interface ShowcaseMenuItem {
  label: string;
  path?: string;
  expanded?: boolean;
  children?: ShowcaseMenuItem[];
}

@Component({
  selector: 'app-showcase',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.scss']
})
export class ShowcaseComponent {
  sections = [
    { path: 'button', label: 'Buttons' },
    { path: 'checkbox', label: 'Checkbox' },
    { path: 'breadcrumb', label: 'Breadcrumb' },
    { path: 'basic', label: 'Basic' },
    { path: 'composition', label: 'Composition' },
    { path: 'sorting', label: 'Sorting' },
    { path: 'pagination', label: 'Pagination' },
    { path: 'custom-templates', label: 'Custom templates' },
    { path: 'loading-state', label: 'Loading state' },
    { path: 'theming', label: 'Theming' },
    { path: 'api-reference', label: 'API reference' }
  ];

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Nested items (e.g. "Button" > "Import") default to expanded so the
    // side nav reads as a flat, always-visible list, matching the design.
    const expandAll = (items: ShowcaseMenuItem[]) => {
      items.forEach(item => {
        if (item.children?.length) {
          item.expanded = true;
          expandAll(item.children);
        }
      });
    };
    expandAll(this.sections);
  }

  setTab(tab: 'features' | 'api'): void {
    this.activeTab = tab;
  }

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

  toggleMenu(item: ShowcaseMenuItem): void {
    item.expanded = !item.expanded;
  }
}
