import { EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { TableColumn } from './table.types';
import * as i0 from "@angular/core";
export declare class TableComponent<T> implements OnInit, OnChanges {
    data: T[];
    columns: TableColumn<T>[];
    loading: boolean;
    paginated: boolean;
    pageSize: number;
    rowClick: EventEmitter<T>;
    sortChange: EventEmitter<{
        field: string;
        order: 'asc' | 'desc';
    }>;
    currentSort: {
        field: string;
        order: 'asc' | 'desc';
    } | null;
    currentPage: number;
    get sortedData(): T[];
    get pagedData(): T[];
    get totalPages(): number;
    onHeaderClick(col: TableColumn<T>): void;
    displaySortIndicator(col: TableColumn<T>): "" | "▲" | "▼";
    getAriaSort(col: TableColumn<T>): "none" | "ascending" | "descending";
    prevPage(): void;
    nextPage(): void;
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TableComponent<any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TableComponent<any>, "ui-table", never, { "data": { "alias": "data"; "required": false; }; "columns": { "alias": "columns"; "required": false; }; "loading": { "alias": "loading"; "required": false; }; "paginated": { "alias": "paginated"; "required": false; }; "pageSize": { "alias": "pageSize"; "required": false; }; }, { "rowClick": "rowClick"; "sortChange": "sortChange"; }, never, never, true, never>;
}
