import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import * as i0 from "@angular/core";
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TableComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: TableComponent, isStandalone: true, selector: "ui-table", inputs: { data: "data", columns: "columns", loading: "loading", paginated: "paginated", pageSize: "pageSize" }, outputs: { rowClick: "rowClick", sortChange: "sortChange" }, ngImport: i0, template: `
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
  `, isInline: true, styles: [":host{display:block}.ui-table{width:100%;border-collapse:collapse}th{background:var(--table-header-bg,#f3f3f3);padding:8px;text-align:left}td{padding:8px;border-top:1px solid #e0e0e0}tr.row-hover:hover{background:var(--table-row-hover,#f9f9f9)}.header-btn{background:none;border:none;padding:0;font:inherit;cursor:pointer}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TableComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ui-table', standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, template: `
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi90YWJsZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSx1QkFBdUIsRUFBNkIsTUFBTSxlQUFlLENBQUM7O0FBa0QzSCxNQUFNLE9BQU8sY0FBYztJQUNoQixJQUFJLEdBQVEsRUFBRSxDQUFDO0lBQ2YsT0FBTyxHQUFxQixFQUFFLENBQUM7SUFDL0IsT0FBTyxHQUFHLEtBQUssQ0FBQztJQUNoQixTQUFTLEdBQUcsS0FBSyxDQUFDO0lBQ2xCLFFBQVEsR0FBRyxFQUFFLENBQUM7SUFFYixRQUFRLEdBQUcsSUFBSSxZQUFZLEVBQUssQ0FBQztJQUNqQyxVQUFVLEdBQUcsSUFBSSxZQUFZLEVBQTRDLENBQUM7SUFFcEYsV0FBVyxHQUFvRCxJQUFJLENBQUM7SUFDcEUsV0FBVyxHQUFHLENBQUMsQ0FBQztJQUVoQixJQUFJLFVBQVU7UUFDWixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVc7WUFBRSxPQUFPLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDN0MsTUFBTSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQzFDLE9BQU8sQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFNLEVBQUUsQ0FBTSxFQUFFLEVBQUU7WUFDNUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3BCLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNwQixJQUFJLEVBQUUsSUFBSSxJQUFJLElBQUksRUFBRSxJQUFJLElBQUk7Z0JBQUUsT0FBTyxDQUFDLENBQUM7WUFDdkMsSUFBSSxF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aXR0ZXIsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBUZW1wbGF0ZVJlZiwgSG9zdExpc3RlbmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFRhYmxlQ29sdW1uIH0gZnJvbSAnLi90YWJsZS50eXBlcyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ3VpLXRhYmxlJyxcclxuICBzdGFuZGFsb25lOiB0cnVlLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgPGRpdiBjbGFzcz1cInVpLXRhYmxlLXdyYXBwZXJcIj5cclxuICAgIDx0YWJsZSBjbGFzcz1cInVpLXRhYmxlXCIgcm9sZT1cInRhYmxlXCI+XHJcbiAgICAgIDx0aGVhZD5cclxuICAgICAgICA8dHIgcm9sZT1cInJvd1wiPlxyXG4gICAgICAgICAgPHRoICpuZ0Zvcj1cImxldCBjb2wgb2YgY29sdW1uczsgbGV0IGkgPSBpbmRleFwiXHJcbiAgICAgICAgICAgICAgcm9sZT1cImNvbHVtbmhlYWRlclwiXHJcbiAgICAgICAgICAgICAgW2F0dHIuYXJpYS1zb3J0XT1cImdldEFyaWFTb3J0KGNvbClcIlxyXG4gICAgICAgICAgICAgIFtjbGFzcy5zb3J0YWJsZV09XCJjb2wuc29ydGFibGVcIlxyXG4gICAgICAgICAgICAgIChjbGljayk9XCJvbkhlYWRlckNsaWNrKGNvbClcIj5cclxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImhlYWRlci1idG5cIiAoa2V5ZG93bik9XCIkZXZlbnQua2V5ID09PSAnRW50ZXInICYmIG9uSGVhZGVyQ2xpY2soY29sKVwiIHRhYmluZGV4PVwiMFwiPlxyXG4gICAgICAgICAgICAgIHt7Y29sLmhlYWRlcn19XHJcbiAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJjb2wuc29ydGFibGVcIj57e2Rpc3BsYXlTb3J0SW5kaWNhdG9yKGNvbCl9fTwvc3Bhbj5cclxuICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICA8L3RoPlxyXG4gICAgICAgIDwvdHI+XHJcbiAgICAgIDwvdGhlYWQ+XHJcbiAgICAgIDx0Ym9keT5cclxuICAgICAgICA8dHIgKm5nSWY9XCJsb2FkaW5nXCI+XHJcbiAgICAgICAgICA8dGQgW2F0dHIuY29sc3Bhbl09XCJjb2x1bW5zPy5sZW5ndGhcIj5Mb2FkaW5nLi4uPC90ZD5cclxuICAgICAgICA8L3RyPlxyXG4gICAgICAgIDx0ciAqbmdGb3I9XCJsZXQgcm93IG9mIHBhZ2VkRGF0YTsgbGV0IHJpID0gaW5kZXhcIiByb2xlPVwicm93XCIgKGNsaWNrKT1cInJvd0NsaWNrLmVtaXQocm93KVwiIFtjbGFzcy5yb3ctaG92ZXJdPVwidHJ1ZVwiPlxyXG4gICAgICAgICAgPHRkICpuZ0Zvcj1cImxldCBjb2wgb2YgY29sdW1uc1wiPlxyXG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiY29sLnRlbXBsYXRlOyBlbHNlIGRlZmF1bHRDZWxsXCI+XHJcbiAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImNvbC50ZW1wbGF0ZTsgY29udGV4dDogeyAkaW1wbGljaXQ6IHJvdywgcm93OiByb3cgfVwiPjwvbmctY29udGFpbmVyPlxyXG4gICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgICAgICAgICAgPG5nLXRlbXBsYXRlICNkZWZhdWx0Q2VsbD57eyByb3dbY29sLmZpZWxkXSB9fTwvbmctdGVtcGxhdGU+XHJcbiAgICAgICAgICA8L3RkPlxyXG4gICAgICAgIDwvdHI+XHJcbiAgICAgIDwvdGJvZHk+XHJcbiAgICA8L3RhYmxlPlxyXG5cclxuICAgIDxkaXYgY2xhc3M9XCJwYWdpbmF0aW9uXCIgKm5nSWY9XCJwYWdpbmF0ZWRcIj5cclxuICAgICAgPGJ1dHRvbiAoY2xpY2spPVwicHJldlBhZ2UoKVwiIFtkaXNhYmxlZF09XCJjdXJyZW50UGFnZSA9PT0gMVwiPlByZXY8L2J1dHRvbj5cclxuICAgICAgPHNwYW4+UGFnZSB7e2N1cnJlbnRQYWdlfX0gLyB7e3RvdGFsUGFnZXN9fTwvc3Bhbj5cclxuICAgICAgPGJ1dHRvbiAoY2xpY2spPVwibmV4dFBhZ2UoKVwiIFtkaXNhYmxlZF09XCJjdXJyZW50UGFnZSA9PT0gdG90YWxQYWdlc1wiPk5leHQ8L2J1dHRvbj5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG4gIGAsXHJcbiAgc3R5bGVzOiBbXHJcbiAgICBgOmhvc3R7ZGlzcGxheTpibG9ja30gLnVpLXRhYmxle3dpZHRoOjEwMCU7Ym9yZGVyLWNvbGxhcHNlOmNvbGxhcHNlfSB0aHtiYWNrZ3JvdW5kOnZhcigtLXRhYmxlLWhlYWRlci1iZywjZjNmM2YzKTtwYWRkaW5nOjhweDt0ZXh0LWFsaWduOmxlZnR9IHRke3BhZGRpbmc6OHB4O2JvcmRlci10b3A6MXB4IHNvbGlkICNlMGUwZTB9IHRyLnJvdy1ob3Zlcjpob3ZlcntiYWNrZ3JvdW5kOnZhcigtLXRhYmxlLXJvdy1ob3ZlciwjZjlmOWY5KX0gLmhlYWRlci1idG57YmFja2dyb3VuZDpub25lO2JvcmRlcjpub25lO3BhZGRpbmc6MDtmb250OmluaGVyaXQ7Y3Vyc29yOnBvaW50ZXJ9YFxyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIFRhYmxlQ29tcG9uZW50PFQ+IHtcclxuICBASW5wdXQoKSBkYXRhOiBUW10gPSBbXTtcclxuICBASW5wdXQoKSBjb2x1bW5zOiBUYWJsZUNvbHVtbjxUPltdID0gW107XHJcbiAgQElucHV0KCkgbG9hZGluZyA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIHBhZ2luYXRlZCA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIHBhZ2VTaXplID0gMTA7XHJcblxyXG4gIEBPdXRwdXQoKSByb3dDbGljayA9IG5ldyBFdmVudEVtaXR0ZXI8VD4oKTtcclxuICBAT3V0cHV0KCkgc29ydENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8eyBmaWVsZDogc3RyaW5nOyBvcmRlcjogJ2FzYycgfCAnZGVzYycgfT4oKTtcclxuXHJcbiAgY3VycmVudFNvcnQ6IHsgZmllbGQ6IHN0cmluZzsgb3JkZXI6ICdhc2MnIHwgJ2Rlc2MnIH0gfCBudWxsID0gbnVsbDtcclxuICBjdXJyZW50UGFnZSA9IDE7XHJcblxyXG4gIGdldCBzb3J0ZWREYXRhKCk6IFRbXSB7XHJcbiAgICBpZiAoIXRoaXMuY3VycmVudFNvcnQpIHJldHVybiBbLi4udGhpcy5kYXRhXTtcclxuICAgIGNvbnN0IHsgZmllbGQsIG9yZGVyIH0gPSB0aGlzLmN1cnJlbnRTb3J0O1xyXG4gICAgcmV0dXJuIFsuLi50aGlzLmRhdGFdLnNvcnQoKGE6IGFueSwgYjogYW55KSA9PiB7XHJcbiAgICAgIGNvbnN0IHZhID0gYVtmaWVsZF07XHJcbiAgICAgIGNvbnN0IHZiID0gYltmaWVsZF07XHJcbiAgICAgIGlmICh2YSA9PSBudWxsICYmIHZiID09IG51bGwpIHJldHVybiAwO1xyXG4gICAgICBpZiAodmEgPT0gbnVsbCkgcmV0dXJuIC0xO1xyXG4gICAgICBpZiAodmIgPT0gbnVsbCkgcmV0dXJuIDE7XHJcbiAgICAgIGlmICh0eXBlb2YgdmEgPT09ICdudW1iZXInICYmIHR5cGVvZiB2YiA9PT0gJ251bWJlcicpIHJldHVybiBvcmRlciA9PT0gJ2FzYycgPyB2YSAtIHZiIDogdmIgLSB2YTtcclxuICAgICAgY29uc3Qgc2EgPSBTdHJpbmcodmEpLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgIGNvbnN0IHNiID0gU3RyaW5nKHZiKS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICBpZiAoc2EgPCBzYikgcmV0dXJuIG9yZGVyID09PSAnYXNjJyA/IC0xIDogMTtcclxuICAgICAgaWYgKHNhID4gc2IpIHJldHVybiBvcmRlciA9PT0gJ2FzYycgPyAxIDogLTE7XHJcbiAgICAgIHJldHVybiAwO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBnZXQgcGFnZWREYXRhKCk6IFRbXSB7XHJcbiAgICBjb25zdCBkYXRhID0gdGhpcy5zb3J0ZWREYXRhO1xyXG4gICAgaWYgKCF0aGlzLnBhZ2luYXRlZCkgcmV0dXJuIGRhdGE7XHJcbiAgICBjb25zdCBzdGFydCA9ICh0aGlzLmN1cnJlbnRQYWdlIC0gMSkgKiB0aGlzLnBhZ2VTaXplO1xyXG4gICAgcmV0dXJuIGRhdGEuc2xpY2Uoc3RhcnQsIHN0YXJ0ICsgdGhpcy5wYWdlU2l6ZSk7XHJcbiAgfVxyXG5cclxuICBnZXQgdG90YWxQYWdlcygpOiBudW1iZXIge1xyXG4gICAgaWYgKCF0aGlzLnBhZ2luYXRlZCkgcmV0dXJuIDE7XHJcbiAgICByZXR1cm4gTWF0aC5tYXgoMSwgTWF0aC5jZWlsKHRoaXMuZGF0YS5sZW5ndGggLyB0aGlzLnBhZ2VTaXplKSk7XHJcbiAgfVxyXG5cclxuICBvbkhlYWRlckNsaWNrKGNvbDogVGFibGVDb2x1bW48VD4pIHtcclxuICAgIGlmICghY29sLnNvcnRhYmxlKSByZXR1cm47XHJcbiAgICBjb25zdCBmaWVsZCA9IGNvbC5maWVsZCBhcyBzdHJpbmc7XHJcbiAgICBpZiAoIXRoaXMuY3VycmVudFNvcnQgfHwgdGhpcy5jdXJyZW50U29ydC5maWVsZCAhPT0gZmllbGQpIHtcclxuICAgICAgdGhpcy5jdXJyZW50U29ydCA9IHsgZmllbGQsIG9yZGVyOiAnYXNjJyB9O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5jdXJyZW50U29ydC5vcmRlciA9IHRoaXMuY3VycmVudFNvcnQub3JkZXIgPT09ICdhc2MnID8gJ2Rlc2MnIDogJ2FzYyc7XHJcbiAgICB9XHJcbiAgICB0aGlzLnNvcnRDaGFuZ2UuZW1pdCh7IGZpZWxkLCBvcmRlcjogdGhpcy5jdXJyZW50U29ydC5vcmRlciB9KTtcclxuICAgIHRoaXMuY3VycmVudFBhZ2UgPSAxO1xyXG4gIH1cclxuXHJcbiAgZGlzcGxheVNvcnRJbmRpY2F0b3IoY29sOiBUYWJsZUNvbHVtbjxUPikge1xyXG4gICAgaWYgKCF0aGlzLmN1cnJlbnRTb3J0IHx8IHRoaXMuY3VycmVudFNvcnQuZmllbGQgIT09IGNvbC5maWVsZCkgcmV0dXJuICcnO1xyXG4gICAgcmV0dXJuIHRoaXMuY3VycmVudFNvcnQub3JkZXIgPT09ICdhc2MnID8gJ+KWsicgOiAn4pa8JztcclxuICB9XHJcblxyXG4gIGdldEFyaWFTb3J0KGNvbDogVGFibGVDb2x1bW48VD4pIHtcclxuICAgIGlmICghY29sLnNvcnRhYmxlKSByZXR1cm4gbnVsbDtcclxuICAgIGlmICghdGhpcy5jdXJyZW50U29ydCB8fCB0aGlzLmN1cnJlbnRTb3J0LmZpZWxkICE9PSBjb2wuZmllbGQpIHJldHVybiAnbm9uZSc7XHJcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50U29ydC5vcmRlciA9PT0gJ2FzYycgPyAnYXNjZW5kaW5nJyA6ICdkZXNjZW5kaW5nJztcclxuICB9XHJcblxyXG4gIHByZXZQYWdlKCkge1xyXG4gICAgaWYgKHRoaXMuY3VycmVudFBhZ2UgPiAxKSB0aGlzLmN1cnJlbnRQYWdlLS07XHJcbiAgfVxyXG5cclxuICBuZXh0UGFnZSgpIHtcclxuICAgIGlmICh0aGlzLmN1cnJlbnRQYWdlIDwgdGhpcy50b3RhbFBhZ2VzKSB0aGlzLmN1cnJlbnRQYWdlKys7XHJcbiAgfVxyXG59XHJcbiJdfQ==