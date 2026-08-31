import { Component } from '@angular/core';
import { ZrBreadcrumbComponent, ZrBreadcrumbItem } from 'zr-components';
import { CodeBlockComponent } from '../../shared/code-block/code-block.component';
import { ExamplePanelComponent } from '../../shared/example-panel/example-panel.component';
import { BREADCRUMB_ITEMS, LONG_BREADCRUMB_ITEMS } from './breadcrumb.mock-data';

@Component({
  selector: 'sc-breadcrumb',
  standalone: true,
  imports: [ZrBreadcrumbComponent, ExamplePanelComponent, CodeBlockComponent],
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent {
  items: ZrBreadcrumbItem[] = BREADCRUMB_ITEMS;
  longItems: ZrBreadcrumbItem[] = LONG_BREADCRUMB_ITEMS;
  home: ZrBreadcrumbItem = { label: 'Home', icon: 'pi pi-home', routerLink: '/showcase' };
  selected = 'None';

  onItemClick(item: ZrBreadcrumbItem): void {
    this.selected = item.label;
  }

  code = `import { ZrBreadcrumbComponent } from 'zr-components';

items = [
  { label: 'Products', routerLink: '/products' },
  { label: 'Current product' }
];`;
}
