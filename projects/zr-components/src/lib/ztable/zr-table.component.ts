import {Component,Input,Output,EventEmitter,ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Table, TableModule } from 'primeng/table';
import {ZrTableColumn,ZrTableRow} from './zr-table.types';

@Component({
  selector: 'zr-table',
  standalone: true,
  imports: [CommonModule, TableModule],
  templateUrl: './zr-table.component.html',
  styleUrls: ['./zr-table.component.scss']
})
export class ZrtableComponent {

  @Input() data: ZrTableRow[] = [];

  @Input() columns: ZrTableColumn[] = [];

  @Input() dataKey = 'id';

  @Input() paginator = true;

  @Input() rows = 5;

  @Input() rowsPerPageOptions: number[] = [5, 10, 20];

  @Input() selectedRows: ZrTableRow[] = [];

  @Output() selectedRowsChange = new EventEmitter<ZrTableRow[]>();

  @ViewChild('dt') table?: Table;

  searchText = '';

  get globalFilterFields(): string[] {
    return this.columns.map(column => column.field);
  }

  onSearch(value: string): void {
    this.searchText = value;
    if (!this.table) {
      return;
    }
    this.table.first = 0;
    this.table.filterGlobal(value, 'contains');
  }

  get filteredRows(): ZrTableRow[] {
    if (!this.searchText.trim()) {
      return this.data;
    }
    return this.table?.filteredValue ?? [];
  }

  isSelected(row: ZrTableRow): boolean {
    return this.selectedRows.some(
      item => item[this.dataKey] === row[this.dataKey]
    );
  }

  toggleRow(row: ZrTableRow, checked: boolean): void {
    if (checked) {
      if (!this.isSelected(row)) {
        this.selectedRows = [...this.selectedRows, row];
      }
    } else {
      this.selectedRows = this.selectedRows.filter(
        item => item[this.dataKey] !== row[this.dataKey]
      );
    }

    this.notifySelection();
  }

  get allSelected(): boolean {
    const rows = this.filteredRows;
    return rows.length > 0 &&
      rows.every(row => this.isSelected(row));
  }

  get partiallySelected(): boolean {
    const rows = this.filteredRows;
    const selectedCount = rows.filter(
      row => this.isSelected(row)
    ).length;

    return selectedCount > 0 &&
      selectedCount < rows.length;
  }

  toggleAll(checked: boolean): void {
    const rows = this.filteredRows;

    if (checked) {
      const newRows = rows.filter(
        row => !this.isSelected(row)
      );

      this.selectedRows = [
        ...this.selectedRows,
        ...newRows
      ];
    } else {
      const keys = new Set(
        rows.map(row => row[this.dataKey])
      );

      this.selectedRows = this.selectedRows.filter(
        row => !keys.has(row[this.dataKey])
      );
    }

    this.notifySelection();
  }

  private notifySelection(): void {
    this.selectedRowsChange.emit([
      ...this.selectedRows
    ]);
  }
}