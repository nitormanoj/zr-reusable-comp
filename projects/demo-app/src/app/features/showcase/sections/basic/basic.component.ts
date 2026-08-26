import { Component, AfterViewInit, TemplateRef, ViewChild } from '@angular/core';

import { TableComponent, TableColumn } from 'ui-table';
import { ExamplePanelComponent } from '../../shared/example-panel/example-panel.component';
import { CodeBlockComponent } from '../../shared/code-block/code-block.component';
import { BASIC_ROWS, BasicRow } from './basic.mock-data';

@Component({
    selector: 'sc-basic',
    imports: [TableComponent, ExamplePanelComponent, CodeBlockComponent],
    templateUrl: './basic.component.html',
    styleUrls: ['./basic.component.scss']
})
export class BasicComponent implements AfterViewInit {
  rows: BasicRow[] = BASIC_ROWS;
  columns: TableColumn<BasicRow>[] = [
    { field: 'id', header: 'ID' },
    { field: 'name', header: 'Name' },
    { field: 'active', header: 'Status', template: null as any },
    { field: 'score', header: 'Score' },
    { field: 'joined', header: 'Joined' }
  ];

  @ViewChild('statusTpl', { read: TemplateRef }) statusTpl!: TemplateRef<any>;

  ngAfterViewInit(): void {
    const c = this.columns.find(c => c.field === 'active');
    if (c) c.template = this.statusTpl;
    this.columns = [...this.columns];
  }

  code = `
<ng-template #statusTpl let-row>
  <span [style.color]="row.active ? 'green' : 'gray'">{{row.active ? 'Active' : 'Inactive'}}</span>
</ng-template>

<ui-table [data]="rows" [columns]="columns" [paginated]="true" [pageSize]="5"></ui-table>

// TS
rows = ${JSON.stringify(this.rows.slice(0, 10), null, 2)}
columns = ${JSON.stringify(this.columns.map(c => ({ field: c.field, header: c.header })), null, 2)}
`;
}
