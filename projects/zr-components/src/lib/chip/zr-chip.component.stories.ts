import type { Meta, StoryObj } from '@storybook/angular';

import { ZrChipComponent } from './zr-chip.component';


const meta: Meta<ZrChipComponent> = {

  title: 'Components/Chip',

  component: ZrChipComponent,

  tags: ['autodocs'],

  parameters: {
    layout: 'padded'
  },

  argTypes: {

    placeholder: {
      control: 'text',
      description: 'Placeholder displayed when no chips exist.'
    },

    controlSize: {
      control: 'select',
      options: [
        'small',
        'medium',
        'large',
        'full'
      ],
      description: 'Controls the width and minimum height.'
    },

    removable: {
      control: 'boolean',
      description: 'Enables or disables chip removal.'
    },

    disabled: {
      control: 'boolean',
      description: 'Disables the chip input and removal.'
    },

    allowDuplicates: {
      control: 'boolean',
      description: 'Allows duplicate chip values when enabled.'
    },

    valuesChange: {
      action: 'valuesChange',
      description: 'Emits the updated chip values.'
    }

  },

  args: {

    placeholder: 'Type and press Enter',

    controlSize: 'small',

    removable: true,

    disabled: false,

    allowDuplicates: false

  }

};

export default meta;

type Story = StoryObj<ZrChipComponent>;



export const Default: Story = {

  args: {

    controlSize: 'small',

    placeholder: 'Enter value',

    removable: true,

    allowDuplicates: false

  }

};


export const Small: Story = {

  args: {

    controlSize: 'small',

    placeholder: 'Small - 200px'

  }

};


export const Medium: Story = {

  args: {

    controlSize: 'medium',

    placeholder: 'Medium - 350px'

  }

};


export const Large: Story = {

  args: {

    controlSize: 'large',

    placeholder: 'Large - 500px'

  }

};


export const FullWidth: Story = {

  args: {

    controlSize: 'full',

    placeholder: 'Full width'

  }

};



export const PreventDuplicates: Story = {

  args: {

    controlSize: 'medium',

    placeholder: 'Try entering Angular twice',

    allowDuplicates: false

  }

};



export const AllowDuplicates: Story = {

  args: {

    controlSize: 'medium',

    placeholder: 'Enter Angular multiple times',

    allowDuplicates: true

  }

};


export const NonRemovable: Story = {

  args: {

    controlSize: 'medium',

    placeholder: 'Add non-removable chips',

    removable: false

  }

};


// ======================================
// 9. DISABLED
// ======================================

export const Disabled: Story = {

  args: {

    controlSize: 'medium',

    placeholder: 'Disabled input',

    disabled: true

  }

};


export const Playground: Story = {

  args: {

    placeholder: 'Type and press Enter',

    controlSize: 'medium',

    removable: true,

    disabled: false,

    allowDuplicates: false

  }

};