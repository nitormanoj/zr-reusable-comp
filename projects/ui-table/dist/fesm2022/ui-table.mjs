import * as i0 from '@angular/core';
import { EventEmitter, Component, ChangeDetectionStrategy, Input, Output } from '@angular/core';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i2 from '@angular/forms';
import { FormsModule } from '@angular/forms';
import * as i1$1 from 'primeng/checkbox';
import { CheckboxModule } from 'primeng/checkbox';

class TableComponent {
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

class ZrCheckboxComponent {
    checked = false;
    label = '';
    disabled = false;
    inputId = `zr-checkbox-${Math.random().toString(36).slice(2, 9)}`;
    checkedChange = new EventEmitter();
    onCheckedChange(value) {
        this.checkedChange.emit(value);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ZrCheckboxComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: ZrCheckboxComponent, isStandalone: true, selector: "zr-checkbox", inputs: { checked: "checked", label: "label", disabled: "disabled", inputId: "inputId" }, outputs: { checkedChange: "checkedChange" }, ngImport: i0, template: "<div class=\"zr-checkbox\">\r\n  <p-checkbox\r\n    [binary]=\"true\"\r\n    [inputId]=\"inputId\"\r\n    [ngModel]=\"checked\"\r\n    [disabled]=\"disabled\"\r\n    (ngModelChange)=\"onCheckedChange($event)\">\r\n  </p-checkbox>\r\n  <label class=\"label\" [for]=\"inputId\">{{ label }}</label>\r\n</div>\r\n", styles: [".zr-checkbox{display:inline-flex;align-items:center;gap:var(--zr-spacing-control-gap, .5rem);cursor:pointer}.zr-checkbox .label{-webkit-user-select:none;user-select:none}.zr-checkbox:has(.p-checkbox-disabled){cursor:not-allowed;opacity:.65}\n"], dependencies: [{ kind: "ngmodule", type: CheckboxModule }, { kind: "component", type: i1$1.Checkbox, selector: "p-checkbox", inputs: ["value", "name", "disabled", "binary", "label", "ariaLabelledBy", "ariaLabel", "tabindex", "inputId", "style", "styleClass", "labelStyleClass", "formControl", "checkboxIcon", "readonly", "required", "trueValue", "falseValue"], outputs: ["onChange"] }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ZrCheckboxComponent, decorators: [{
            type: Component,
            args: [{ selector: 'zr-checkbox', standalone: true, imports: [CheckboxModule, FormsModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"zr-checkbox\">\r\n  <p-checkbox\r\n    [binary]=\"true\"\r\n    [inputId]=\"inputId\"\r\n    [ngModel]=\"checked\"\r\n    [disabled]=\"disabled\"\r\n    (ngModelChange)=\"onCheckedChange($event)\">\r\n  </p-checkbox>\r\n  <label class=\"label\" [for]=\"inputId\">{{ label }}</label>\r\n</div>\r\n", styles: [".zr-checkbox{display:inline-flex;align-items:center;gap:var(--zr-spacing-control-gap, .5rem);cursor:pointer}.zr-checkbox .label{-webkit-user-select:none;user-select:none}.zr-checkbox:has(.p-checkbox-disabled){cursor:not-allowed;opacity:.65}\n"] }]
        }], propDecorators: { checked: [{
                type: Input
            }], label: [{
                type: Input
            }], disabled: [{
                type: Input
            }], inputId: [{
                type: Input
            }], checkedChange: [{
                type: Output
            }] } });

const ZR_DESIGN_TOKENS = {
    colorBrand: '#006f8f',
    colorTextPrimary: '#1a2433',
    colorTextSecondary: '#596579',
    colorSurface: '#ffffff',
    colorBorder: '#d8dee8',
    colorFocus: '#006f8f',
    spacingControlGap: '10px',
    fontSizeBody: '14px',
    radiusControl: '4px',
};

/**
 * Generated bundle index. Do not edit.
 */

export { TableComponent, ZR_DESIGN_TOKENS, ZrCheckboxComponent };
//# sourceMappingURL=ui-table.mjs.map
