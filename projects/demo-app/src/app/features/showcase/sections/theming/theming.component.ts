import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent, TableColumn } from 'ui-table';
import { ExamplePanelComponent } from '../../shared/example-panel/example-panel.component';
import { T_ROWS, TRow } from './theming.mock-data';

@Component({
    selector: 'sc-theming',
    imports: [CommonModule, TableComponent, ExamplePanelComponent],
    templateUrl: './theming.component.html',
    styleUrls: ['./theming.component.scss']
})
export class ThemingComponent {
  rows: TRow[] = T_ROWS;
  columns: TableColumn<TRow>[] = [
    { field: 'id', header: 'ID' },
    { field: 'name', header: 'Name' },
    { field: 'score', header: 'Score' }
  ];

  vars: Record<string, string> = {
    '--table-header-bg': '#f3f3f3',
    '--table-row-hover': '#f9f9f9'
  };

  presets = [
    { name: 'Cool blue', vars: { '--table-header-bg': '#e8f4ff', '--table-row-hover': '#eef8ff' } },
    { name: 'Warm', vars: { '--table-header-bg': '#fff0e6', '--table-row-hover': '#fff6f0' } }
  ];

  applyPreset(p: any) { this.vars = { ...p.vars }; }
}
