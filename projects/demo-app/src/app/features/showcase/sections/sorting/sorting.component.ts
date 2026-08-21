import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent, TableColumn } from 'ui-table';
import { ExamplePanelComponent } from '../../shared/example-panel/example-panel.component';
import { SORT_ROWS, SortRow } from './sorting.mock-data';

@Component({
  selector: 'sc-sorting',
  standalone: true,
  imports: [CommonModule, TableComponent, ExamplePanelComponent],
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.scss']
})
export class SortingComponent {
  rows: SortRow[] = SORT_ROWS;
  columns: TableColumn<SortRow>[] = [
    { field: 'id', header: 'ID', sortable: true },
    { field: 'name', header: 'Name', sortable: true },
    { field: 'score', header: 'Score', sortable: true }
  ];

  code = `<ui-table [data]="rows" [columns]="columns"></ui-table>`;

  onSort(ev: any) { console.log('sort', ev); }
}
