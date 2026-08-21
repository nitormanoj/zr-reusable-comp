import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent, TableColumn } from 'ui-table';
import { ExamplePanelComponent } from '../../shared/example-panel/example-panel.component';
import { PAGE_ROWS, PageRow } from './pagination.mock-data';

@Component({
  selector: 'sc-pagination',
  standalone: true,
  imports: [CommonModule, TableComponent, ExamplePanelComponent],
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  rows: PageRow[] = PAGE_ROWS;
  columns: TableColumn<PageRow>[] = [
    { field: 'id', header: 'ID' },
    { field: 'name', header: 'Name' }
  ];

  code = `<ui-table [data]="rows" [columns]="columns" [paginated]="true" [pageSize]="5"></ui-table>`;
}
