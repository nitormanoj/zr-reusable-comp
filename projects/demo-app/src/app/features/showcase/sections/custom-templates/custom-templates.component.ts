import { Component, AfterViewInit, TemplateRef, ViewChild } from '@angular/core';

import { TableComponent, TableColumn } from 'ui-table';
import { ExamplePanelComponent } from '../../shared/example-panel/example-panel.component';
import { CT_ROWS, CTRow } from './custom-templates.mock-data';

@Component({
    selector: 'sc-custom-templates',
    imports: [TableComponent, ExamplePanelComponent],
    templateUrl: './custom-templates.component.html',
    styleUrls: ['./custom-templates.component.scss']
})
export class CustomTemplatesComponent implements AfterViewInit {
  rows: CTRow[] = CT_ROWS;
  columns: TableColumn<CTRow>[] = [
    { field: 'id', header: 'ID' },
    { field: 'avatar', header: 'Avatar', template: null as any },
    { field: 'name', header: 'Name' },
    { field: 'active', header: 'Status', template: null as any },
    { field: 'actions', header: 'Actions', template: null as any }
  ];

  @ViewChild('avatarTpl', { read: TemplateRef }) avatarTpl!: TemplateRef<any>;
  @ViewChild('statusTpl', { read: TemplateRef }) statusTpl!: TemplateRef<any>;
  @ViewChild('actionsTpl', { read: TemplateRef }) actionsTpl!: TemplateRef<any>;

  ngAfterViewInit(): void {
    const a = this.columns.find(c => c.field === 'avatar'); if (a) a.template = this.avatarTpl;
    const s = this.columns.find(c => c.field === 'active'); if (s) s.template = this.statusTpl;
    const ac = this.columns.find(c => c.field === 'actions'); if (ac) ac.template = this.actionsTpl;
    this.columns = [...this.columns];
  }

  onAction(row: CTRow, action: string) {
    alert(`${action} ${row.name}`);
  }

  code = `// template includes avatar, status, and action templates\n<ui-table [data]="rows" [columns]="columns"></ui-table>`;
}
