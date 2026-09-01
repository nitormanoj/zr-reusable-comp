import { Component } from '@angular/core';

import { TableComponent } from 'zr-components';
import { TableColumn } from 'zr-components';

@Component({
    selector: 'sc-api-reference',
    imports: [],
    templateUrl: './api-reference.component.html',
    styleUrls: ['./api-reference.component.scss']
})
export class ApiReferenceComponent {
  inputs = [
    { name: 'data', type: 'T[]', description: 'Rows to render' },
    { name: 'columns', type: 'TableColumn<T>[]', description: 'Column definitions (field, header, template, sortable)' },
    { name: 'loading', type: 'boolean', description: 'Show loading state' },
    { name: 'paginated', type: 'boolean', description: 'Enable pagination controls' },
    { name: 'pageSize', type: 'number', description: 'Rows per page when paginated' }
  ];

  outputs = [
    { name: 'rowClick', type: 'EventEmitter<T>', description: 'Emits when a row is clicked' },
    { name: 'sortChange', type: "EventEmitter<{ field: string; order: 'asc'|'desc' }>", description: 'Emits when user sorts a column' }
  ];

  columnFields = [
    { name: 'field', type: 'keyof T & string', description: 'Property name to display' },
    { name: 'header', type: 'string', description: 'Header cell text' },
    { name: 'sortable', type: 'boolean', description: 'Enable sorting for this column' },
    { name: 'template', type: 'TemplateRef<any>', description: 'Custom cell template' }
  ];
}
