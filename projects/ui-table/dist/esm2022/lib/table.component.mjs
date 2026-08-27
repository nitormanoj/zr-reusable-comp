import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class TableComponent {
    data = [];
    columns = [];
    loading = false;
    paginated = false;
    pageSize = 10;
    rowClick = new EventEmitter();
    sortChange = new EventEmitter();
    currentSort = null;
    currentPage = 1;
    get sortedData() {
        if (!this.currentSort)
            return [...this.data];
        const { field, order } = this.currentSort;
        return [...this.data].sort((a, b) => {
            const va = a[field];
            const vb = b[field];
            if (va == null && vb == null)
                return 0;
            if (va == null)
                return -1;
            if (vb == null)
                return 1;
            if (typeof va === 'number' && typeof vb === 'number')
                return order === 'asc' ? va - vb : vb - va;
            const sa = String(va).toLowerCase();
            const sb = String(vb).toLowerCase();
            if (sa < sb)
                return order === 'asc' ? -1 : 1;
            if (sa > sb)
                return order === 'asc' ? 1 : -1;
            return 0;
        });
    }
    get pagedData() {
        const data = this.sortedData;
        if (!this.paginated)
            return data;
        const start = (this.currentPage - 1) * this.pageSize;
        return data.slice(start, start + this.pageSize);
    }
    get totalPages() {
        if (!this.paginated)
            return 1;
        return Math.max(1, Math.ceil(this.data.length / this.pageSize));
    }
    onHeaderClick(col) {
        if (!col.sortable)
            return;
        const field = col.field;
        if (!this.currentSort || this.currentSort.field !== field) {
            this.currentSort = { field, order: 'asc' };
        }
        else {
            this.currentSort.order = this.currentSort.order === 'asc' ? 'desc' : 'asc';
        }
        this.sortChange.emit({ field, order: this.currentSort.order });
        this.currentPage = 1;
    }
    displaySortIndicator(col) {
        if (!this.currentSort || this.currentSort.field !== col.field)
            return '';
        return this.currentSort.order === 'asc' ? '▲' : '▼';
    }
    getAriaSort(col) {
        if (!col.sortable)
            return null;
        if (!this.currentSort || this.currentSort.field !== col.field)
            return 'none';
        return this.currentSort.order === 'asc' ? 'ascending' : 'descending';
    }
    prevPage() {
        if (this.currentPage > 1)
            this.currentPage--;
    }
    nextPage() {
        if (this.currentPage < this.totalPages)
            this.currentPage++;
    }
    ngOnInit() {
        console.log('TableComponent ngOnInit', { dataLen: this.data?.length, columnsLen: this.columns?.length });
    }
    ngOnChanges(changes) {
        console.log('TableComponent ngOnChanges', changes);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TableComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: TableComponent, isStandalone: true, selector: "ui-table", inputs: { data: "data", columns: "columns", loading: "loading", paginated: "paginated", pageSize: "pageSize" }, outputs: { rowClick: "rowClick", sortChange: "sortChange" }, usesOnChanges: true, ngImport: i0, template: `
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
  `, isInline: true, styles: [":host{display:block}.ui-table{width:100%;border-collapse:collapse}th{background:var(--table-header-bg,#f3f3f3);padding:8px;text-align:left}td{padding:8px;border-top:1px solid #e0e0e0}tr.row-hover:hover{background:var(--table-row-hover,#f9f9f9)}.header-btn{background:none;border:none;padding:0;font:inherit;cursor:pointer}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TableComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ui-table', standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: `
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
  `, styles: [":host{display:block}.ui-table{width:100%;border-collapse:collapse}th{background:var(--table-header-bg,#f3f3f3);padding:8px;text-align:left}td{padding:8px;border-top:1px solid #e0e0e0}tr.row-hover:hover{background:var(--table-row-hover,#f9f9f9)}.header-btn{background:none;border:none;padding:0;font:inherit;cursor:pointer}\n"] }]
        }], propDecorators: { data: [{
                type: Input
            }], columns: [{
                type: Input
            }], loading: [{
                type: Input
            }], paginated: [{
                type: Input
            }], pageSize: [{
                type: Input
            }], rowClick: [{
                type: Output
            }], sortChange: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi90YWJsZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSx1QkFBdUIsRUFBaUQsTUFBTSxlQUFlLENBQUM7QUFDL0ksT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDOzs7QUFtRC9DLE1BQU0sT0FBTyxjQUFjO0lBQ2hCLElBQUksR0FBUSxFQUFFLENBQUM7SUFDZixPQUFPLEdBQXFCLEVBQUUsQ0FBQztJQUMvQixPQUFPLEdBQUcsS0FBSyxDQUFDO0lBQ2hCLFNBQVMsR0FBRyxLQUFLLENBQUM7SUFDbEIsUUFBUSxHQUFHLEVBQUUsQ0FBQztJQUViLFFBQVEsR0FBRyxJQUFJLFlBQVksRUFBSyxDQUFDO0lBQ2pDLFVBQVUsR0FBRyxJQUFJLFlBQVksRUFBNEMsQ0FBQztJQUVwRixXQUFXLEdBQW9ELElBQUksQ0FBQztJQUNwRSxXQUFXLEdBQUcsQ0FBQyxDQUFDO0lBRWhCLElBQUksVUFBVTtRQUNaLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVztZQUFFLE9BQU8sQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QyxNQUFNLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDMUMsT0FBTyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQU0sRUFBRSxDQUFNLEVBQUUsRUFBRTtZQUM1QyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDcEIsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3BCLElBQUksRUFBRSxJQUFJLElBQUksSUFBSSxFQUFF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QUksV0FDUCxDQUFDLFlBQVksQ0FBQyxtQkFDTix1QkFBdUIsQ0FBQyxNQUFNLFlBQ3JDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNDVDs4QkFNUSxJQUFJO3NCQUFaLEtBQUs7Z0JBQ0csT0FBTztzQkFBZixLQUFLO2dCQUNHLE9BQU87c0JBQWYsS0FBSztnQkFDRyxTQUFTO3NCQUFqQixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBRUksUUFBUTtzQkFBakIsTUFBTTtnQkFDRyxVQUFVO3NCQUFuQixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBUZW1wbGF0ZVJlZiwgT25Jbml0LCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgVGFibGVDb2x1bW4gfSBmcm9tICcuL3RhYmxlLnR5cGVzJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAndWktdGFibGUnLFxyXG4gIHN0YW5kYWxvbmU6IHRydWUsXHJcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXHJcbiAgdGVtcGxhdGU6IGBcclxuICA8ZGl2IGNsYXNzPVwidWktdGFibGUtd3JhcHBlclwiPlxyXG4gICAgPHRhYmxlIGNsYXNzPVwidWktdGFibGVcIiByb2xlPVwidGFibGVcIj5cclxuICAgICAgPHRoZWFkPlxyXG4gICAgICAgIDx0ciByb2xlPVwicm93XCI+XHJcbiAgICAgICAgICA8dGggKm5nRm9yPVwibGV0IGNvbCBvZiBjb2x1bW5zOyBsZXQgaSA9IGluZGV4XCJcclxuICAgICAgICAgICAgICByb2xlPVwiY29sdW1uaGVhZGVyXCJcclxuICAgICAgICAgICAgICBbYXR0ci5hcmlhLXNvcnRdPVwiZ2V0QXJpYVNvcnQoY29sKVwiXHJcbiAgICAgICAgICAgICAgW2NsYXNzLnNvcnRhYmxlXT1cImNvbC5zb3J0YWJsZVwiXHJcbiAgICAgICAgICAgICAgKGNsaWNrKT1cIm9uSGVhZGVyQ2xpY2soY29sKVwiPlxyXG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiaGVhZGVyLWJ0blwiIChrZXlkb3duKT1cIiRldmVudC5rZXkgPT09ICdFbnRlcicgJiYgb25IZWFkZXJDbGljayhjb2wpXCIgdGFiaW5kZXg9XCIwXCI+XHJcbiAgICAgICAgICAgICAge3tjb2wuaGVhZGVyfX1cclxuICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cImNvbC5zb3J0YWJsZVwiPnt7ZGlzcGxheVNvcnRJbmRpY2F0b3IoY29sKX19PC9zcGFuPlxyXG4gICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgIDwvdGg+XHJcbiAgICAgICAgPC90cj5cclxuICAgICAgPC90aGVhZD5cclxuICAgICAgPHRib2R5PlxyXG4gICAgICAgIDx0ciAqbmdJZj1cImxvYWRpbmdcIj5cclxuICAgICAgICAgIDx0ZCBbYXR0ci5jb2xzcGFuXT1cImNvbHVtbnM/Lmxlbmd0aFwiPkxvYWRpbmcuLi48L3RkPlxyXG4gICAgICAgIDwvdHI+XHJcbiAgICAgICAgPHRyICpuZ0Zvcj1cImxldCByb3cgb2YgcGFnZWREYXRhOyBsZXQgcmkgPSBpbmRleFwiIHJvbGU9XCJyb3dcIiAoY2xpY2spPVwicm93Q2xpY2suZW1pdChyb3cpXCIgW2NsYXNzLnJvdy1ob3Zlcl09XCJ0cnVlXCI+XHJcbiAgICAgICAgICA8dGQgKm5nRm9yPVwibGV0IGNvbCBvZiBjb2x1bW5zXCI+XHJcbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJjb2wudGVtcGxhdGU7IGVsc2UgZGVmYXVsdENlbGxcIj5cclxuICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiY29sLnRlbXBsYXRlOyBjb250ZXh0OiB7ICRpbXBsaWNpdDogcm93LCByb3c6IHJvdyB9XCI+PC9uZy1jb250YWluZXI+XHJcbiAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgICAgICAgICA8bmctdGVtcGxhdGUgI2RlZmF1bHRDZWxsPnt7IHJvd1tjb2wuZmllbGRdIH19PC9uZy10ZW1wbGF0ZT5cclxuICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgPC90cj5cclxuICAgICAgPC90Ym9keT5cclxuICAgIDwvdGFibGU+XHJcblxyXG4gICAgPGRpdiBjbGFzcz1cInBhZ2luYXRpb25cIiAqbmdJZj1cInBhZ2luYXRlZFwiPlxyXG4gICAgICA8YnV0dG9uIChjbGljayk9XCJwcmV2UGFnZSgpXCIgW2Rpc2FibGVkXT1cImN1cnJlbnRQYWdlID09PSAxXCI+UHJldjwvYnV0dG9uPlxyXG4gICAgICA8c3Bhbj5QYWdlIHt7Y3VycmVudFBhZ2V9fSAvIHt7dG90YWxQYWdlc319PC9zcGFuPlxyXG4gICAgICA8YnV0dG9uIChjbGljayk9XCJuZXh0UGFnZSgpXCIgW2Rpc2FibGVkXT1cImN1cnJlbnRQYWdlID09PSB0b3RhbFBhZ2VzXCI+TmV4dDwvYnV0dG9uPlxyXG4gICAgPC9kaXY+XHJcbiAgPC9kaXY+XHJcbiAgYCxcclxuICBzdHlsZXM6IFtcclxuICAgIGA6aG9zdHtkaXNwbGF5OmJsb2NrfSAudWktdGFibGV7d2lkdGg6MTAwJTtib3JkZXItY29sbGFwc2U6Y29sbGFwc2V9IHRoe2JhY2tncm91bmQ6dmFyKC0tdGFibGUtaGVhZGVyLWJnLCNmM2YzZjMpO3BhZGRpbmc6OHB4O3RleHQtYWxpZ246bGVmdH0gdGR7cGFkZGluZzo4cHg7Ym9yZGVyLXRvcDoxcHggc29saWQgI2UwZTBlMH0gdHIucm93LWhvdmVyOmhvdmVye2JhY2tncm91bmQ6dmFyKC0tdGFibGUtcm93LWhvdmVyLCNmOWY5ZjkpfSAuaGVhZGVyLWJ0bntiYWNrZ3JvdW5kOm5vbmU7Ym9yZGVyOm5vbmU7cGFkZGluZzowO2ZvbnQ6aW5oZXJpdDtjdXJzb3I6cG9pbnRlcn1gXHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgVGFibGVDb21wb25lbnQ8VD4gaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XHJcbiAgQElucHV0KCkgZGF0YTogVFtdID0gW107XHJcbiAgQElucHV0KCkgY29sdW1uczogVGFibGVDb2x1bW48VD5bXSA9IFtdO1xyXG4gIEBJbnB1dCgpIGxvYWRpbmcgPSBmYWxzZTtcclxuICBASW5wdXQoKSBwYWdpbmF0ZWQgPSBmYWxzZTtcclxuICBASW5wdXQoKSBwYWdlU2l6ZSA9IDEwO1xyXG5cclxuICBAT3V0cHV0KCkgcm93Q2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyPFQ+KCk7XHJcbiAgQE91dHB1dCgpIHNvcnRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPHsgZmllbGQ6IHN0cmluZzsgb3JkZXI6ICdhc2MnIHwgJ2Rlc2MnIH0+KCk7XHJcblxyXG4gIGN1cnJlbnRTb3J0OiB7IGZpZWxkOiBzdHJpbmc7IG9yZGVyOiAnYXNjJyB8ICdkZXNjJyB9IHwgbnVsbCA9IG51bGw7XHJcbiAgY3VycmVudFBhZ2UgPSAxO1xyXG5cclxuICBnZXQgc29ydGVkRGF0YSgpOiBUW10ge1xyXG4gICAgaWYgKCF0aGlzLmN1cnJlbnRTb3J0KSByZXR1cm4gWy4uLnRoaXMuZGF0YV07XHJcbiAgICBjb25zdCB7IGZpZWxkLCBvcmRlciB9ID0gdGhpcy5jdXJyZW50U29ydDtcclxuICAgIHJldHVybiBbLi4udGhpcy5kYXRhXS5zb3J0KChhOiBhbnksIGI6IGFueSkgPT4ge1xyXG4gICAgICBjb25zdCB2YSA9IGFbZmllbGRdO1xyXG4gICAgICBjb25zdCB2YiA9IGJbZmllbGRdO1xyXG4gICAgICBpZiAodmEgPT0gbnVsbCAmJiB2YiA9PSBudWxsKSByZXR1cm4gMDtcclxuICAgICAgaWYgKHZhID09IG51bGwpIHJldHVybiAtMTtcclxuICAgICAgaWYgKHZiID09IG51bGwpIHJldHVybiAxO1xyXG4gICAgICBpZiAodHlwZW9mIHZhID09PSAnbnVtYmVyJyAmJiB0eXBlb2YgdmIgPT09ICdudW1iZXInKSByZXR1cm4gb3JkZXIgPT09ICdhc2MnID8gdmEgLSB2YiA6IHZiIC0gdmE7XHJcbiAgICAgIGNvbnN0IHNhID0gU3RyaW5nKHZhKS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICBjb25zdCBzYiA9IFN0cmluZyh2YikudG9Mb3dlckNhc2UoKTtcclxuICAgICAgaWYgKHNhIDwgc2IpIHJldHVybiBvcmRlciA9PT0gJ2FzYycgPyAtMSA6IDE7XHJcbiAgICAgIGlmIChzYSA+IHNiKSByZXR1cm4gb3JkZXIgPT09ICdhc2MnID8gMSA6IC0xO1xyXG4gICAgICByZXR1cm4gMDtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0IHBhZ2VkRGF0YSgpOiBUW10ge1xyXG4gICAgY29uc3QgZGF0YSA9IHRoaXMuc29ydGVkRGF0YTtcclxuICAgIGlmICghdGhpcy5wYWdpbmF0ZWQpIHJldHVybiBkYXRhO1xyXG4gICAgY29uc3Qgc3RhcnQgPSAodGhpcy5jdXJyZW50UGFnZSAtIDEpICogdGhpcy5wYWdlU2l6ZTtcclxuICAgIHJldHVybiBkYXRhLnNsaWNlKHN0YXJ0LCBzdGFydCArIHRoaXMucGFnZVNpemUpO1xyXG4gIH1cclxuXHJcbiAgZ2V0IHRvdGFsUGFnZXMoKTogbnVtYmVyIHtcclxuICAgIGlmICghdGhpcy5wYWdpbmF0ZWQpIHJldHVybiAxO1xyXG4gICAgcmV0dXJuIE1hdGgubWF4KDEsIE1hdGguY2VpbCh0aGlzLmRhdGEubGVuZ3RoIC8gdGhpcy5wYWdlU2l6ZSkpO1xyXG4gIH1cclxuXHJcbiAgb25IZWFkZXJDbGljayhjb2w6IFRhYmxlQ29sdW1uPFQ+KSB7XHJcbiAgICBpZiAoIWNvbC5zb3J0YWJsZSkgcmV0dXJuO1xyXG4gICAgY29uc3QgZmllbGQgPSBjb2wuZmllbGQgYXMgc3RyaW5nO1xyXG4gICAgaWYgKCF0aGlzLmN1cnJlbnRTb3J0IHx8IHRoaXMuY3VycmVudFNvcnQuZmllbGQgIT09IGZpZWxkKSB7XHJcbiAgICAgIHRoaXMuY3VycmVudFNvcnQgPSB7IGZpZWxkLCBvcmRlcjogJ2FzYycgfTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuY3VycmVudFNvcnQub3JkZXIgPSB0aGlzLmN1cnJlbnRTb3J0Lm9yZGVyID09PSAnYXNjJyA/ICdkZXNjJyA6ICdhc2MnO1xyXG4gICAgfVxyXG4gICAgdGhpcy5zb3J0Q2hhbmdlLmVtaXQoeyBmaWVsZCwgb3JkZXI6IHRoaXMuY3VycmVudFNvcnQub3JkZXIgfSk7XHJcbiAgICB0aGlzLmN1cnJlbnRQYWdlID0gMTtcclxuICB9XHJcblxyXG4gIGRpc3BsYXlTb3J0SW5kaWNhdG9yKGNvbDogVGFibGVDb2x1bW48VD4pIHtcclxuICAgIGlmICghdGhpcy5jdXJyZW50U29ydCB8fCB0aGlzLmN1cnJlbnRTb3J0LmZpZWxkICE9PSBjb2wuZmllbGQpIHJldHVybiAnJztcclxuICAgIHJldHVybiB0aGlzLmN1cnJlbnRTb3J0Lm9yZGVyID09PSAnYXNjJyA/ICfilrInIDogJ+KWvCc7XHJcbiAgfVxyXG5cclxuICBnZXRBcmlhU29ydChjb2w6IFRhYmxlQ29sdW1uPFQ+KSB7XHJcbiAgICBpZiAoIWNvbC5zb3J0YWJsZSkgcmV0dXJuIG51bGw7XHJcbiAgICBpZiAoIXRoaXMuY3VycmVudFNvcnQgfHwgdGhpcy5jdXJyZW50U29ydC5maWVsZCAhPT0gY29sLmZpZWxkKSByZXR1cm4gJ25vbmUnO1xyXG4gICAgcmV0dXJuIHRoaXMuY3VycmVudFNvcnQub3JkZXIgPT09ICdhc2MnID8gJ2FzY2VuZGluZycgOiAnZGVzY2VuZGluZyc7XHJcbiAgfVxyXG5cclxuICBwcmV2UGFnZSgpIHtcclxuICAgIGlmICh0aGlzLmN1cnJlbnRQYWdlID4gMSkgdGhpcy5jdXJyZW50UGFnZS0tO1xyXG4gIH1cclxuXHJcbiAgbmV4dFBhZ2UoKSB7XHJcbiAgICBpZiAodGhpcy5jdXJyZW50UGFnZSA8IHRoaXMudG90YWxQYWdlcykgdGhpcy5jdXJyZW50UGFnZSsrO1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICBjb25zb2xlLmxvZygnVGFibGVDb21wb25lbnQgbmdPbkluaXQnLCB7IGRhdGFMZW46IHRoaXMuZGF0YT8ubGVuZ3RoLCBjb2x1bW5zTGVuOiB0aGlzLmNvbHVtbnM/Lmxlbmd0aCB9KTtcclxuICB9XHJcblxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcclxuICAgIGNvbnNvbGUubG9nKCdUYWJsZUNvbXBvbmVudCBuZ09uQ2hhbmdlcycsIGNoYW5nZXMpO1xyXG4gIH1cclxufVxyXG4iXX0=