import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { ZrButtonsComponent } from './zr-buttons.component';

const severities = [
  'primary',
  'secondary',
  'success',
  'info',
  'warning',
  'danger',
  'help'
] as const;

const meta: Meta<ZrButtonsComponent> = {
  title: 'Components/ZrButtons',
  component: ZrButtonsComponent,
  decorators: [
    moduleMetadata({
      imports: [ZrButtonsComponent]
    })
  ],
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Text displayed on the button'
    },
    severity: {
      control: 'select',
      options: severities,
      description: 'Visual color variant'
    },
    outlined: {
      control: 'boolean',
      description: 'Renders the button with an outlined style'
    },
    rounded: {
      control: 'boolean',
      description: 'Renders the button with fully rounded corners'
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the button'
    },
    icon: {
      control: 'text',
      description: 'Optional icon class shown before the label (e.g. "pi pi-check")'
    },
    clicked: { action: 'clicked' }
  },
  args: {
    label: 'Submit',
    severity: 'primary',
    outlined: false,
    rounded: false,
    disabled: false,
    icon: undefined
  },
  parameters: {
    layout: 'centered'
  }
};

export default meta;
type Story = StoryObj<ZrButtonsComponent>;

// --------------------------------------------------------------------------
// Playground — all controls exposed
// --------------------------------------------------------------------------

export const Playground: Story = {
  args: {
    label: 'Submit',
    severity: 'primary'
  }
};

// --------------------------------------------------------------------------
// Severity variants
// --------------------------------------------------------------------------

export const Primary: Story = {
  args: { label: 'Primary', severity: 'primary' }
};

export const Secondary: Story = {
  args: { label: 'Secondary', severity: 'secondary' }
};

export const Success: Story = {
  args: { label: 'Success', severity: 'success' }
};

export const Info: Story = {
  args: { label: 'Info', severity: 'info' }
};

export const Warning: Story = {
  args: { label: 'Warning', severity: 'warning' }
};

export const Danger: Story = {
  args: { label: 'Danger', severity: 'danger' }
};

export const Help: Story = {
  args: { label: 'Help', severity: 'help' }
};

// --------------------------------------------------------------------------
// Modifiers
// --------------------------------------------------------------------------

export const Outlined: Story = {
  args: { label: 'Outlined', severity: 'primary', outlined: true }
};

export const Rounded: Story = {
  args: { label: 'Rounded', severity: 'primary', rounded: true }
};

export const Disabled: Story = {
  args: { label: 'Disabled', severity: 'primary', disabled: true }
};

export const WithIcon: Story = {
  args: { label: 'Submit', severity: 'success', icon: 'pi pi-check' }
};

// --------------------------------------------------------------------------
// All variants side by side (custom render, no shared args)
// --------------------------------------------------------------------------

export const AllSeverities: Story = {
  render: () => ({
    template: `
      <div style="display:flex; gap:10px; flex-wrap:wrap;">
        <zr-buttons label="Primary" severity="primary"></zr-buttons>
        <zr-buttons label="Secondary" severity="secondary"></zr-buttons>
        <zr-buttons label="Success" severity="success"></zr-buttons>
        <zr-buttons label="Info" severity="info"></zr-buttons>
        <zr-buttons label="Warning" severity="warning"></zr-buttons>
        <zr-buttons label="Danger" severity="danger"></zr-buttons>
        <zr-buttons label="Help" severity="help"></zr-buttons>
      </div>
    `
  }),
  parameters: {
    controls: { disable: true }
  }
};

export const AllOutlined: Story = {
  render: () => ({
    template: `
      <div style="display:flex; gap:10px; flex-wrap:wrap;">
        <zr-buttons label="Primary" severity="primary" [outlined]="true"></zr-buttons>
        <zr-buttons label="Success" severity="success" [outlined]="true"></zr-buttons>
        <zr-buttons label="Danger" severity="danger" [outlined]="true"></zr-buttons>
      </div>
    `
  }),
  parameters: {
    controls: { disable: true }
  }
};