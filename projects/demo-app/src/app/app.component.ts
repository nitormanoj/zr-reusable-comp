import { Component, ViewChild, TemplateRef, AfterViewInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TableComponent, TableColumn } from 'ui-table';

interface DemoRow { id: number; name: string; active: boolean; score: number; joined: string }

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TableComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('status', { read: TemplateRef }) statusTpl!: TemplateRef<any>;
  lastAction = 'none';
  currentYear = new Date().getFullYear();

  ngAfterViewInit(): void {
    // assign template reference to Status column
    const c = this.columns.find(c => c.field === 'active');
    if (c) c.template = this.statusTpl;
    // trigger OnPush consumers by replacing the reference
    this.columns = [...this.columns];
    console.log('AppComponent columns after view init:', this.columns);
  }
  data: DemoRow[] = [];
  columns: TableColumn<DemoRow>[] = [];

  constructor() {
    this.data = [
      { id: 1, name: 'Alice', active: false, score: 42, joined: new Date(2020,1,5).toISOString() },
      { id: 2, name: 'Bob', active: true, score: 88, joined: new Date(2021,6,12).toISOString() },
      { id: 3, name: 'Charlie', active: true, score: 73, joined: new Date(2019,3,22).toISOString() },
      { id: 4, name: 'Diana', active: false, score: 91, joined: new Date(2018,11,2).toISOString() },
      { id: 5, name: 'Eve', active: true, score: 65, joined: new Date(2022,4,1).toISOString() },
      { id: 6, name: 'Frank', active: false, score: 58, joined: new Date(2017,8,14).toISOString() },
      { id: 7, name: 'Grace', active: true, score: 99, joined: new Date(2023,2,19).toISOString() },
      { id: 8, name: 'Heidi', active: false, score: 47, joined: new Date(2016,0,30).toISOString() }
    ];

    // columns include a template for status column via TemplateRef token mapping in runtime
    this.columns = [
      { field: 'id', header: 'ID', sortable: true },
      { field: 'name', header: 'Name', sortable: true },
      { field: 'active', header: 'Status', template: null as any },
      { field: 'score', header: 'Score', sortable: true }
    ];
  }

  

  handleRowClick(row: DemoRow) {
    console.log('rowClick', row);
    this.lastAction = `Clicked row ${row.id}`;
  }

  handleSort(ev: any) {
    console.log('sortChange', ev);
    this.lastAction = `Sorted ${ev.field} ${ev.order}`;
  }
}
