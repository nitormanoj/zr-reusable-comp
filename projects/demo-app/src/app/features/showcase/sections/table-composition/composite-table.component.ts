import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * A single row of data rendered by CompositeTableComponent.
 * Rows may be nested via `children` to render a hierarchical / tree table.
 */
export interface TableRow {
  id: number;
  no: number;
  title: string;
  subtitle?: string;
  status: 'Active' | 'Inactive';
  value: string;
  date: string;
  refTitle: string;
  refSubtitle?: string;
  selected?: boolean;
  expanded?: boolean;
  children?: TableRow[];
}

type SortableField = 'no' | 'title' | 'value' | 'date';
type SortOrder = 'asc' | 'desc' | null;

/**
 * Reusable composite table: checkbox selection, sortable columns, a
 * frozen trailing column, hierarchical/tree rows, and hover tooltips
 * on truncated cell content.
 */
@Component({
  selector: 'app-composite-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './composite-table.component.html',
  styleUrls: ['./composite-table.component.scss'],
})
export class CompositeTableComponent {
  @Input() rows: TableRow[] = [];

  sortField: SortableField | null = null;
  sortOrder: SortOrder = null;

  get allSelected(): boolean {
    return this.rows.length > 0 && this.rows.every((r) => r.selected);
  }

  get someSelected(): boolean {
    return this.rows.some((r) => r.selected) && !this.allSelected;
  }

  toggleSelectAll(checked: boolean): void {
    this.rows.forEach((r) => (r.selected = checked));
  }

  toggleRow(row: TableRow): void {
    row.selected = !row.selected;
  }

  toggleExpand(row: TableRow): void {
    row.expanded = !row.expanded;
  }

  /** Cycles asc -> desc -> unsorted on repeated clicks of the same header. */
  sortBy(field: SortableField): void {
    if (this.sortField !== field) {
      this.sortField = field;
      this.sortOrder = 'asc';
    } else if (this.sortOrder === 'asc') {
      this.sortOrder = 'desc';
    } else if (this.sortOrder === 'desc') {
      this.sortField = null;
      this.sortOrder = null;
    } else {
      this.sortOrder = 'asc';
    }

    if (!this.sortField || !this.sortOrder) {
      return;
    }

    const field1 = this.sortField;
    const order = this.sortOrder === 'asc' ? 1 : -1;

    this.rows.sort((a, b) => {
      const valA = a[field];
      const valB = b[field];
      if (valA < valB) return -1 * order;
      if (valA > valB) return 1 * order;
      return 0;
    });
  }

  /** Hook for a future column-resize implementation (mousedown on the resize handle). */
  onResizeStart(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    // Wire up mousemove/mouseup listeners here to adjust column width live.
  }

  trackByRow(_index: number, row: TableRow): number {
    return row.id;
  }
}
