import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent, TableColumn } from 'ui-table';
import { ExamplePanelComponent } from '../../shared/example-panel/example-panel.component';
import { L_ROWS, LRow } from './loading-state.mock-data';

@Component({
  selector: 'sc-loading-state',
  standalone: true,
  imports: [CommonModule, TableComponent, ExamplePanelComponent],
  templateUrl: './loading-state.component.html',
  styleUrls: ['./loading-state.component.scss']
})
export class LoadingStateComponent {
  rows: LRow[] = L_ROWS;
  loading = false;
  columns: TableColumn<LRow>[] = [
    { field: 'id', header: 'ID' },
    { field: 'name', header: 'Name' }
  ];

  toggleLoading() {
    this.loading = true;
    setTimeout(() => this.loading = false, 1200);
  }

  code = `<button (click)="toggleLoading()">Toggle loading</button>\n<ui-table [data]="rows" [columns]="columns" [loading]="loading"></ui-table>`;
}
