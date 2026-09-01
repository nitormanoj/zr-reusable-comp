import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig } from '@storybook/angular';
import { provideRouter } from '@angular/router';
import { ZrBreadcrumbComponent } from './zr-breadcrumb.component';
import { ZrBreadcrumbItem } from './zr-breadcrumb.types';

const basicItems: ZrBreadcrumbItem[] = [
  { label: 'Projects', routerLink: '/projects' },
  { label: 'Core UI', routerLink: '/projects/core-ui' },
  { label: 'Breadcrumb' }
];

const meta: Meta<ZrBreadcrumbComponent> = {
  title: 'Platform Core Components/Breadcrumb',
  component: ZrBreadcrumbComponent,
  tags: ['autodocs'],
  argTypes: {
    items: { control: 'object', description: 'Breadcrumb items rendered in order.' },
    home: { control: 'object', description: 'Optional leading home item.' },
    maxVisible: { control: 'number', description: 'Maximum rendered entries before middle items move into overflow.' },
    itemClick: { action: 'itemClick', description: 'Emits the selected ZR breadcrumb item.' }
  },
  parameters: {
    docs: {
      description: {
        component: 'A typed, accessible ZR breadcrumb backed by PrimeNG. The final item is always rendered as the current page and overflow items remain keyboard reachable.'
      }
    }
  }
};

export default meta;
type Story = StoryObj<ZrBreadcrumbComponent>;

export const Basic: Story = { args: { items: basicItems } };

export const WithHomeIcon: Story = {
  args: {
    home: { label: 'Home', icon: 'pi pi-home', routerLink: '/' },
    items: basicItems
  }
};

export const LongPath: Story = {
  args: {
    maxVisible: 5,
    items: [
      { label: 'Company', routerLink: '/company' },
      { label: 'Products', routerLink: '/products' },
      { label: 'Testing', routerLink: '/testing' },
      { label: 'Machines', routerLink: '/machines' },
      { label: 'Materials', routerLink: '/materials' },
      { label: 'Reports', routerLink: '/reports' },
      { label: '2026', routerLink: '/reports/2026' },
      { label: 'Overview' }
    ]
  }
};

export const WithRouterLinks: Story = {
  decorators: [applicationConfig({ providers: [provideRouter([])] })],
  args: { items: basicItems }
};

export const DisabledItem: Story = {
  args: {
    items: [
      { label: 'Projects', routerLink: '/projects' },
      { label: 'Restricted', routerLink: '/restricted', disabled: true },
      { label: 'Current page' }
    ]
  }
};
