import { Component } from '@angular/core';

import {
  ZrtableComponent,
  ZrTableColumn,
  ZrTableRow
} from 'zr-components';

import {
  ExamplePanelComponent
} from '../../shared/example-panel/example-panel.component';
import { columns,projects} from './table.component.mock-data'

@Component({
  selector: 'sc-table',
  standalone: true,
  imports: [
    ZrtableComponent,
    ExamplePanelComponent
  ],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {

  columns: ZrTableColumn[] = columns;
  projects: ZrTableRow[] = projects;
  selectedProjects: ZrTableRow[] = [];

  tableCode = `<zr-table
  [data]="projects"
  [columns]="columns"
  dataKey="id"
  [paginator]="true"
  [rows]="5"
  [rowsPerPageOptions]="[5, 10, 20]"
  [(selectedRows)]="selectedProjects">
</zr-table>`;
}