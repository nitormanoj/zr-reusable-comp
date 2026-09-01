import type { Meta, StoryObj } from '@storybook/angular';
import { TableComponent } from './table.component';
import { TableColumn } from './table.types';

interface Item { id: number; name: string; active: boolean }

const sampleData: Item[] = [
  { id: 1, name: 'Alice', active: true },
  { id: 2, name: 'Bob', active: false },
  { id: 3, name: 'Charlie', active: true }
];

const columns: TableColumn<Item>[] = [
  { field: 'id', header: 'ID', sortable: true },
  { field: 'name', header: 'Name', sortable: true },
  { field: 'active', header: 'Active' }
];

const meta: Meta<TableComponent<Item>> = {
  title: 'Core UI/Table',
  component: TableComponent,
  tags: ['autodocs'],
  argTypes: {
    data: { control: 'object', description: 'Array of row data.' },
    columns: { control: 'object', description: 'Column definitions.' },
    loading: { control: 'boolean', description: 'Show loading state.' },
    paginated: { control: 'boolean', description: 'Enable simple client-side pagination.' },
    pageSize: { control: 'number', description: 'Number of rows per page when paginated.' },
    rowClick: { action: 'rowClick', description: 'Emitted when a row is clicked.' },
    sortChange: { action: 'sortChange', description: 'Emitted when sort changes.' }
  },
  parameters: {
    docs: {
      description: {
        component: 'A simple table component with sortable columns, optional templates, and client-side pagination.'
      }
    }
  }
};

export default meta;
type Story = StoryObj<TableComponent<Item>>;

export const Basic: Story = {
  args: {
    data: sampleData,
    columns,
    loading: false,
    paginated: false
  }
};

export const Paginated: Story = {
  args: {
    data: sampleData,
    columns,
    paginated: true,
    pageSize: 2
  }
};

export const Loading: Story = {
  args: {
    data: [],
    columns,
    loading: true
  }
};
