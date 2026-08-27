import type { Meta, StoryObj } from '@storybook/angular';
import { ZrCheckboxComponent } from './zr-checkbox.component';

const meta: Meta<ZrCheckboxComponent> = {
  title: 'Core UI/Checkbox',
  component: ZrCheckboxComponent,
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Whether the checkbox is selected.'
    },
    label: {
      control: 'text',
      description: 'Visible label associated with the checkbox input.'
    },
    disabled: {
      control: 'boolean',
      description: 'Prevents interaction when true.'
    },
    inputId: {
      control: 'text',
      description: 'Stable id used to associate the label and input.'
    },
    checkedChange: {
      action: 'checkedChange',
      description: 'Emits the new checked state after user interaction.'
    }
  },
  parameters: {
    docs: {
      description: {
        component: `
A ZR-styled checkbox backed by PrimeNG.

### Usage

Import \`ZrCheckboxComponent\` from \`ui-table\` and bind \`checked\` with \`checkedChange\`.

### Accessibility

Provide a meaningful \`label\`. The component associates the visible label with the PrimeNG input through \`inputId\`. The native checkbox keyboard behavior is preserved.
        `
      }
    }
  }
};

export default meta;
type Story = StoryObj<ZrCheckboxComponent>;

export const Default: Story = {
  args: {
    checked: false,
    label: 'Enable notifications',
    disabled: false,
    inputId: 'checkbox-default'
  }
};

export const Checked: Story = {
  args: {
    checked: true,
    label: 'Notifications enabled',
    inputId: 'checkbox-checked'
  }
};

export const Disabled: Story = {
  args: {
    checked: true,
    label: 'Managed by administrator',
    disabled: true,
    inputId: 'checkbox-disabled'
  }
};
