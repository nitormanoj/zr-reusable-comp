import type {
  Meta,
  StoryObj
} from '@storybook/angular';

import {
  moduleMetadata,
  applicationConfig
} from '@storybook/angular';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { ZrSidebarComponent } from './zr-sidebar.component';


// =====================================
// STORYBOOK META
// =====================================

const meta: Meta<ZrSidebarComponent> = {

  title: 'Components/Sidebar',

  component: ZrSidebarComponent,

  tags: ['autodocs'],

  decorators: [

    moduleMetadata({
      imports: [
        ZrSidebarComponent
      ]
    }),

    applicationConfig({
      providers: [
        provideAnimationsAsync()
      ]
    })

  ],

  parameters: {

    layout: 'fullscreen',

    docs: {

      description: {
        component: `
ZR Sidebar is a reusable component built using PrimeNG Drawer.

It supports:

- Left, right, top and bottom positions
- Modal overlay
- Outside-click dismissal
- Escape-key dismissal
- Configurable width
- Close icon
- Content projection
- Two-way visibility binding

### Basic Usage

\`\`\`html
<button (click)="visible = true">
  Open Sidebar
</button>

<zr-sidebar
  header="Project Details"
  [(visible)]="visible">

  Sidebar Content

</zr-sidebar>
\`\`\`
        `
      }

    }

  },

  argTypes: {

    visible: {
      control: 'boolean',
      description: 'Controls sidebar visibility.'
    },

    header: {
      control: 'text',
      description: 'Sidebar header.'
    },

    position: {
      control: 'select',
      options: [
        'left',
        'right',
        'top',
        'bottom'
      ],
      description: 'Sidebar opening position.'
    },

    width: {
      control: 'text',
      description: 'Sidebar width.'
    },

    modal: {
      control: 'boolean',
      description: 'Displays modal overlay.'
    },

    dismissible: {
      control: 'boolean',
      description: 'Closes sidebar on outside click.'
    },

    closeOnEscape: {
      control: 'boolean',
      description: 'Closes sidebar on Escape.'
    },

    showCloseIcon: {
      control: 'boolean',
      description: 'Displays close icon.'
    },

    blockScroll: {
      control: 'boolean',
      description: 'Blocks background scrolling.'
    },

    visibleChange: {
      action: 'visibleChange',
      description: 'Emits updated visibility.'
    }

  },

  args: {

    visible: false,

    header: 'Project Details',

    position: 'right',

    width: '24rem',

    modal: true,

    dismissible: true,

    closeOnEscape: true,

    showCloseIcon: true,

    blockScroll: false

  }

};

export default meta;

type Story = StoryObj<ZrSidebarComponent>;


// =====================================
// SHARED RENDER FUNCTION
// =====================================

const renderSidebar: Story['render'] = (args) => ({

  props: {
    ...args
  },

  template: `

    <div
      style="
        min-height: 400px;
        padding: 24px;
        box-sizing: border-box;
      "
    >

      <button
        type="button"
        (click)="visible = true"
        style="
          padding: 10px 18px;
          background: #3b82f6;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
        "
      >
        Open {{ position }} Sidebar
      </button>


      <zr-sidebar

        [(visible)]="visible"

        [header]="header"

        [position]="position"

        [width]="width"

        [modal]="modal"

        [dismissible]="dismissible"

        [closeOnEscape]="closeOnEscape"

        [showCloseIcon]="showCloseIcon"

        [blockScroll]="blockScroll"

      >

        <div style="padding: 12px;">

          <h3>Construction Project</h3>

          <p>
            <strong>Project:</strong>
            Commercial Tower
          </p>

          <p>
            <strong>Client:</strong>
            ABC Construction
          </p>

          <p>
            <strong>Manager:</strong>
            John Smith
          </p>

          <p>
            <strong>Status:</strong>
            In Progress
          </p>

        </div>

      </zr-sidebar>

    </div>

  `

});


// =====================================
// DEFAULT
// =====================================

export const Default: Story = {

  render: renderSidebar,

  args: {
    header: 'Project Details',
    position: 'right'
  }

};


// =====================================
// LEFT
// =====================================

export const Left: Story = {

  render: renderSidebar,

  args: {
    header: 'Left Sidebar',
    position: 'left'
  }

};


// =====================================
// RIGHT
// =====================================

export const Right: Story = {

  render: renderSidebar,

  args: {
    header: 'Right Sidebar',
    position: 'right'
  }

};


// =====================================
// TOP
// =====================================

export const Top: Story = {

  render: renderSidebar,

  args: {
    header: 'Top Sidebar',
    position: 'top'
  }

};


// =====================================
// BOTTOM
// =====================================

export const Bottom: Story = {

  render: renderSidebar,

  args: {
    header: 'Bottom Sidebar',
    position: 'bottom'
  }

};


// =====================================
// NON MODAL
// =====================================

export const NonModal: Story = {

  render: renderSidebar,

  args: {
    header: 'Non Modal Sidebar',
    position: 'right',
    modal: false,
    dismissible: false
  }

};


// =====================================
// WITHOUT CLOSE ICON
// =====================================

export const WithoutCloseIcon: Story = {

  render: renderSidebar,

  args: {
    header: 'Without Close Icon',
    position: 'right',
    showCloseIcon: false
  }

};


// =====================================
// NON DISMISSIBLE
// =====================================

export const NonDismissible: Story = {

  render: renderSidebar,

  args: {
    header: 'Non Dismissible Sidebar',
    position: 'right',
    dismissible: false
  }

};


// =====================================
// BLOCK SCROLL
// =====================================

export const BlockScroll: Story = {

  render: renderSidebar,

  args: {
    header: 'Block Scroll Sidebar',
    position: 'right',
    blockScroll: true
  }

};


// =====================================
// CUSTOM WIDTH
// =====================================

export const CustomWidth: Story = {

  render: renderSidebar,

  args: {
    header: 'Custom Width Sidebar',
    position: 'right',
    width: '35rem'
  }

};