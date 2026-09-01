import { ZrBreadcrumbComponent } from './zr-breadcrumb.component';
import { ZrBreadcrumbItem } from './zr-breadcrumb.types';

describe('ZrBreadcrumbComponent', () => {
  let component: ZrBreadcrumbComponent;

  beforeEach(() => {
    component = new ZrBreadcrumbComponent();
  });

  it('renders the last item as non-interactive current-page text', () => {
    component.items = [
      { label: 'Home', routerLink: '/' },
      { label: 'Current', routerLink: '/current', command: () => undefined }
    ];
    const current = component.primeItems[component.primeItems.length - 1];
    expect(current.label).toBe('Current');
    expect(current.isCurrent).toBeTrue();
    expect(current.routerLink).toBeUndefined();
    expect(current.command).toBeUndefined();
  });

  it('emits the correct ZR item when an item is selected', () => {
    const item: ZrBreadcrumbItem = { label: 'Details', routerLink: '/details' };
    component.items = [item];
    let emitted: ZrBreadcrumbItem | undefined;
    component.itemClick.subscribe(value => emitted = value);

    component.onPrimeItemClick({ item: component.primeItems[0] });

    expect(emitted).toBe(item);
  });

  it('truncates middle items while keeping every hidden item reachable', () => {
    component.items = [
      { label: 'Home' },
      { label: 'One' },
      { label: 'Two' },
      { label: 'Three' },
      { label: 'Four' },
      { label: 'Current' }
    ];
    component.maxVisible = 4;

    expect(component.shouldTruncate).toBeTrue();
    expect(component.primeItems.map(item => item.label)).toEqual(['Home', 'More', 'One', 'Current']);
    expect(component.overflowItems.map(item => item.label)).toEqual(['Two', 'Three', 'Four']);
  });

  it('marks only the last rendered item with aria-current', () => {
    component.items = [
      { label: 'Home' },
      { label: 'Section' },
      { label: 'Current' }
    ];
    const currentItems = component.primeItems.filter(item => item.isCurrent);
    expect(currentItems.length).toBe(1);
    expect(currentItems[0].label).toBe('Current');
  });
});
