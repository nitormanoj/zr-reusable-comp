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
export class ShowcaseComponent implements OnInit {

  /** Active doc-level tab shown above the routed content ('features' | 'api') */
  activeTab: 'features' | 'api' = 'features';

  sections: ShowcaseMenuItem[] = [
    {
      label: 'Buttons',
      children: [
        {
          label: 'Button',
          children: [
            {
              label: 'Import',
              path: 'button-import'
            },
            {
              label: 'Basic',
              path: 'button-basic'
            },
          ]
        }
        // {
        //   label: 'SplitButton',
        //   children: [
        //     {
        //       label: 'Button',
        //       path: 'button/split-button/button'
        //     },
        //   ]
        // }
      ]
    },

    {
      label: 'Form',
      children: [
        {
          label: 'Checkbox',
          children: [
            {
              label: 'Import',
              path: 'checkbox'
            },
            {
              label: 'Basic',
              path: 'checkbox'
            },

          ]
        },
        {
          label: 'Chips',
          children: [
            {
              label: 'Chips',
              path: 'form/chips/chips'
            },

          ]
        }
      ]
    },

    {
      label: 'Table',
      children: [
        {
          label: 'Basic',
          path: 'basic'
        },
      ]
    },

    {
      label: 'Theming',
      path: 'theming'
    },

    {
      label: 'API Reference',
      path: 'api-reference'
    }
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
