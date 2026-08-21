import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, TemplateRef, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableColumn } from './table.types';

@Component({
  selector: 'ui-table',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <div class="ui-table-wrapper">
    <table class="ui-table" role="table">
      <thead>
        <tr role="row">
          <th *ngFor="let col of columns; let i = index"
              role="columnheader"
              [attr.aria-sort]="getAriaSort(col)"
              [class.sortable]="col.sortable"
              (click)="onHeaderClick(col)">
            <button class="header-btn" (keydown)="$event.key === 'Enter' && onHeaderClick(col)" tabindex="0">
              {{col.header}}
              <span *ngIf="col.sortable">{{displaySortIndicator(col)}}</span>
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr *ngIf="loading">
          <td [attr.colspan]="columns?.length">Loading...</td>
        </tr>
        <tr *ngFor="let row of pagedData; let ri = index" role="row" (click)="rowClick.emit(row)" [class.row-hover]="true">
          <td *ngFor="let col of columns">
            <ng-container *ngIf="col.template; else defaultCell">
              <ng-container *ngTemplateOutlet="col.template; context: { $implicit: row, row: row }"></ng-container>
            </ng-container>
            <ng-template #defaultCell>{{ row[col.field] }}</ng-template>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="pagination" *ngIf="paginated">
      <button (click)="prevPage()" [disabled]="currentPage === 1">Prev</button>
      <span>Page {{currentPage}} / {{totalPages}}</span>
      <button (click)="nextPage()" [disabled]="currentPage === totalPages">Next</button>
    </div>
  </div>
  `,
  styles: [
    `:host{display:block} .ui-table{width:100%;border-collapse:collapse} th{background:var(--table-header-bg,#f3f3f3);padding:8px;text-align:left} td{padding:8px;border-top:1px solid #e0e0e0} tr.row-hover:hover{background:var(--table-row-hover,#f9f9f9)} .header-btn{background:none;border:none;padding:0;font:inherit;cursor:pointer}`
  ]
})
export class TableComponent<T> implements OnInit, OnChanges {
  @Input() data: T[] = [];
  @Input() columns: TableColumn<T>[] = [];
  @Input() loading = false;
  @Input() paginated = false;
  @Input() pageSize = 10;

  @Output() rowClick = new EventEmitter<T>();
  @Output() sortChange = new EventEmitter<{ field: string; order: 'asc' | 'desc' }>();

  currentSort: { field: string; order: 'asc' | 'desc' } | null = null;
  currentPage = 1;

  get sortedData(): T[] {
    if (!this.currentSort) return [...this.data];
    const { field, order } = this.currentSort;
    return [...this.data].sort((a: any, b: any) => {
      const va = a[field];
      const vb = b[field];
      if (va == null && vb == null) return 0;
      if (va == null) return -1;
      if (vb == null) return 1;
      if (typeof va === 'number' && typeof vb === 'number') return order === 'asc' ? va - vb : vb - va;
      const sa = String(va).toLowerCase();
      const sb = String(vb).toLowerCase();
      if (sa < sb) return order === 'asc' ? -1 : 1;
      if (sa > sb) return order === 'asc' ? 1 : -1;
      return 0;
    });
  }

  get pagedData(): T[] {
    const data = this.sortedData;
    if (!this.paginated) return data;
    const start = (this.currentPage - 1) * this.pageSize;
    return data.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    if (!this.paginated) return 1;
    return Math.max(1, Math.ceil(this.data.length / this.pageSize));
  }

  onHeaderClick(col: TableColumn<T>) {
    if (!col.sortable) return;
    const field = col.field as string;
    if (!this.currentSort || this.currentSort.field !== field) {
      this.currentSort = { field, order: 'asc' };
    } else {
      this.currentSort.order = this.currentSort.order === 'asc' ? 'desc' : 'asc';
    }
    this.sortChange.emit({ field, order: this.currentSort.order });
    this.currentPage = 1;
  }

  displaySortIndicator(col: TableColumn<T>) {
    if (!this.currentSort || this.currentSort.field !== col.field) return '';
    return this.currentSort.order === 'asc' ? '▲' : '▼';
  }

  getAriaSort(col: TableColumn<T>) {
    if (!col.sortable) return null;
    if (!this.currentSort || this.currentSort.field !== col.field) return 'none';
    return this.currentSort.order === 'asc' ? 'ascending' : 'descending';
  }

  prevPage() {
    if (this.currentPage > 1) this.currentPage--;
  }

  nextPage() {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }

  ngOnInit(): void {
    console.log('TableComponent ngOnInit', { dataLen: this.data?.length, columnsLen: this.columns?.length });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('TableComponent ngOnChanges', changes);
  }
}
