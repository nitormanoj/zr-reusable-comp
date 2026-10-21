import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Table, TableModule } from 'primeng/table';
import { DatePicker, DatePickerModule } from 'primeng/datepicker';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { PopoverModule } from 'primeng/popover';
import { Specimen } from './specimen.model';
import { QtAnalysisComponent } from '../qt-analysis/qt-analysis.component';
interface DocumentRow extends Specimen { testedAt: Date; program: string; material: string; job: string; }
@Component({
 selector: 'app-qt-documents', standalone: true,
 imports: [CommonModule, FormsModule, TableModule, DatePickerModule, ButtonModule, InputTextModule, MultiSelectModule, SelectModule, PopoverModule, QtAnalysisComponent],
 templateUrl: './qt-documents.component.html', styleUrls: ['./qt-documents.component.scss'],
})
export class QtDocumentsComponent {
 @Output() workspaceChange = new EventEmitter<boolean>();
 analysisRows: Specimen[] = [];
 showAnalysis = false;
 search = '';
 // The initial range covers the historical demo tests.
 dateRange: (Date | null)[] | null = [new Date(2024, 2, 11), new Date(2024, 2, 18)];
 datePreset = '';
 calendarViewDate = new Date(2026, 7, 1);
 @ViewChild('table') resultsTable?: Table;
 @ViewChild('rangeCalendar') rangeCalendar?: DatePicker;
 showCalendar(): void {
  this.dateOpen = true;
  // Apply the initial view after ngModel restores the draft selection.
  if (this.rangeCalendar) this.rangeCalendar.defaultDate = this.calendarViewDate;
 }
 draftPreset = '';
 dateOpen = false;
 readonly datePresets = ['Last week', 'Last Month', 'Last Quarter', 'Last 6 Months', 'Last Year'];
 presetRange(label: string): Date[] {
  const now = new Date();
  const year = now.getFullYear(), month = now.getMonth();
  const today = new Date(year, month, now.getDate());
  if (label === 'Last week') return [new Date(year, month, today.getDate() - 7), new Date(year, month, today.getDate() - 1)];
  if (label === 'Last Month') return [new Date(year, month - 1, 1), new Date(year, month, 0)];
  if (label === 'Last Quarter') { const quarter = Math.floor(month / 3) * 3; return [new Date(year, quarter - 3, 1), new Date(year, quarter, 0)]; }
  if (label === 'Last 6 Months') return [new Date(year, month - 6, 1), new Date(year, month, 0)];
  return [new Date(year - 1, 0, 1), new Date(year - 1, 11, 31)];
 }
 presetDescription(label: string): string {
  const [start, end] = this.presetRange(label);
  const month = (date: Date) => date.toLocaleDateString('en-GB', { month: 'short' });
  if (label === 'Last week') return start.getDate() + ' ' + month(start) + ' - ' + end.getDate() + ' ' + month(end);
  if (label === 'Last Month') return start.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
  return month(start) + ' - ' + month(end) + ' ' + end.getFullYear();
 }
 choosePreset(label: string): void { this.draftDateRange = this.presetRange(label); this.calendarViewDate = new Date(this.draftDateRange[0]!); this.draftPreset = label; }
 clearDate(table: Table): void { this.dateRange = null; this.datePreset = ''; this.applyDateRange(); table.first = 0; }

 status = '';
 readonly testPrograms = [
  { label: 'Advartest_KK_Tensile test', count: 7 },
  { label: 'Brakes India Limited_Compression test', count: 7 },
  { label: 'Advartest_KK_Ueberpruefung_020725', count: 7 },
  { label: 'Brakes India Limited_Tensile test_804.6', count: 7 },
  { label: 'Brakes India Limited_Flexure test', count: 7 },
 ];
 programs: string[] = this.testPrograms.slice(0, 4).map(program => program.label);
 materials: string[] = ['Steel', 'Glass'];
 jobs: string[] = [];
 readonly programOptions = [
  { label: 'Recommended', items: this.testPrograms.slice(0, 3) },
  { label: 'All test programs', items: this.testPrograms },
 ];
 readonly materialOptions = ['Steel', 'Glass', 'Aluminium'];
 readonly jobOptions = ['JOB-001', 'JOB-002', 'JOB-003'];
 readonly savedOptions = [{ label: 'Current criteria', value: 'saved' }];
 selectedCriteria: string[] = [];
 draftDateRange: (Date | null)[] | null = null;
 get dateLabel(): string {
  const format = (date: Date) => date.toLocaleDateString('en-GB');
  const [start, end] = this.dateRange ?? [];
  return start ? format(start) + (end ? ' - ' + format(end) : '') : 'Date';
 }
 openDates(): void { this.calendarViewDate = new Date(2026, 7, 1); this.draftPreset = this.datePreset; this.draftDateRange = this.dateRange?.map(date => date ? new Date(date) : null) ?? null; }
 get validDraftRange(): boolean {
  const [start, end] = this.draftDateRange ?? [];
  return start instanceof Date && end instanceof Date && Number.isFinite(start.getTime()) && Number.isFinite(end.getTime()) && start <= end;
 }
 applyDates(table: Table): boolean {
  if (!this.validDraftRange) return false;
  this.dateRange = this.draftDateRange!.map(date => date ? new Date(date) : null);
  this.datePreset = this.draftPreset;
  this.applyDateRange(); table.first = 0;
  return true;
 }
 get activeFilters(): { kind: 'programs' | 'materials' | 'jobs'; value: string }[] {
  return (['programs', 'materials', 'jobs'] as const).flatMap(kind => this[kind].map(value => ({ kind, value })));
 }
 removeFilter(kind: 'programs' | 'materials' | 'jobs', value: string, table: Table): void {
  this[kind] = this[kind].filter(item => item !== value); this.applyDateRange(); table.first = 0;
 }

 savedCriteria: { search: string; range: (Date | null)[] | null; preset: string; programs: string[]; materials: string[]; jobs: string[] } | null = null;
 readonly columns = [
  { field: 'id', label: 'No.', type: 'numeric' }, { field: 'name', label: 'Name', type: 'text' },
  { field: 'young', label: "Begin of Young's", type: 'text' }, { field: 'length', label: 'Length (m)', type: 'text' },
  { field: 'modulus', label: '(C/N)^1/3', type: 'text' }, { field: 'testedAt', label: 'Date and Time', type: 'date' },
  { field: 'distance', label: 'Distance (m)', type: 'text' }, { field: 'bruch', label: 'Bruch kN', type: 'numeric' },
  { field: 'engineer', label: 'Appl. Eng.', type: 'text' }, { field: 'break', label: 'Break N', type: 'numeric' },
 ];
 private parseDate(value: string): Date {
  const [day, month, year, hour, minute, second] = value.split(/\D+/).map(Number);
  return new Date(year, month - 1, day, hour, minute, second);
 }
  readonly rows: DocumentRow[] = [
    ['Probe 10.1.1', '12.3.2024, 15:24:47', 425.76e-3, 'Groner, Lars', 425.68, '#eda5ff'],
    ['Probe 9.1.1', '13.3.2024, 10:16:19', 558.74e-3, 'Groner, Lars', 559.67, '#ffe580'],
    ['Probe 11.1.6', '12.3.2024, 15:24:47', 425.76e-3, 'Groner, Lars', 1018.52, '#91c4ff'],
    ['Probe 5.1.1', '13.3.2024, 10:16:19', 558.74e-3, 'Groner, Lars', 559.67, '#80edab'],
    ['Probe 11.1.6', '12.3.2024, 15:24:47', 425.76e-3, 'Groner, Lars', 1018.52, '#80edab'],
    ['Probe 5.1.3', '13.3.2024, 10:25:37', 563.12e-3, 'Chen, Wei', 561.89, '#c7b1ff'],
    ['Probe 5.1.4', '13.3.2024, 10:30:58', 564.01e-3, 'Johnson, Mark', 562.33, '#61dfef'],
    ['Probe 5.1.5', '13.3.2024, 10:35:45', 565.78e-3, 'Smith, Emily', 563.12, '#ffe46b'],
    ['Probe 11.1.6', '12.3.2024, 15:24:47', 425.76e-3, 'Groner, Lars', 1018.52, '#ffbc73'],
    ['Probe 11.1.6', '12.3.2024, 15:24:47', 425.76e-3, 'Groner, Lars', 1018.52, '#61dfef'],
    ['Probe 5.1.5', '13.3.2024, 10:35:45', 565.78e-3, 'Smith, Emily', 563.12, '#ffe46b'],
    ['Probe 8.1.5', '13.3.2024, 10:35:45', 565.78e-3, 'Smith, Emily', 563.12, '#ffe46b'],
    ...Array.from({ length: 23 }, (_, index) => [
      `Probe ${13 + index}.1.${index % 6 + 1}`,
      `${14 + Math.floor(index / 6)}.3.2024, ${String(9 + index % 8).padStart(2, '0')}:${String(index * 7 % 60).padStart(2, '0')}:00`,
      Number((0.42576 + index * 0.00613).toFixed(5)),
      ['Groner, Lars', 'Chen, Wei', 'Johnson, Mark', 'Smith, Emily'][index % 4],
      Number((425.68 + index * 19.37).toFixed(2)),
      ['#eda5ff', '#ffe580', '#91c4ff', '#80edab', '#c7b1ff', '#61dfef', '#ffbc73'][index % 7],
    ]),
  ].map((r, index) => ({ id: index + 1, name: String(r[0]), date: String(r[1]), bruch: Number(r[2]), engineer: String(r[3]), break: Number(r[4]), color: String(r[5]), young: '-', length: '-', modulus: '-', distance: '-', testedAt: this.parseDate(String(r[1])),
    // Demo metadata for the criteria controls; replace with API fields when connected.
    program: this.testPrograms[index % this.testPrograms.length].label, material: this.materialOptions[index % 3], job: this.jobOptions[index % 3] }));


 selectedRows: DocumentRow[] = this.rows.filter(row => [1, 3, 5].includes(row.id));
 filteredRows: DocumentRow[] = this.rows;
 constructor() { this.applyDateRange(); this.saveCriteria(); this.status = ''; }
 applyDateRange(): void {
  const [start, end] = this.dateRange ?? [];
  const lower = start ? new Date(start.getFullYear(), start.getMonth(), start.getDate()).getTime() : null;
  const upper = end ? new Date(end.getFullYear(), end.getMonth(), end.getDate() + 1).getTime() : null;
  const query = this.search.trim().toLowerCase();
  this.filteredRows = this.rows.filter(row =>
   (!this.programs.length || this.programs.includes(row.program)) &&
   (!this.materials.length || this.materials.includes(row.material)) &&
   (!this.jobs.length || this.jobs.includes(row.job)) &&
   (lower === null || row.testedAt.getTime() >= lower) &&
   (upper === null || row.testedAt.getTime() < upper) &&
   (!query || [row.name, row.engineer, row.date, String(row.id)].some(value => value.toLowerCase().includes(query)))
  );
  // Hidden rows must not remain selected for Analyse after criteria change.
  const matchingIds = new Set(this.filteredRows.map(row => row.id));
  this.selectedRows = this.selectedRows.filter(row => matchingIds.has(row.id));
  if (this.resultsTable) {
   this.resultsTable.first = 0;
   this.resultsTable.filteredValue = null;
  }
 }
 clearFilters(table: Table): void {
  this.search = ''; this.programs = []; this.materials = []; this.jobs = [];
  this.selectedCriteria = []; this.draftDateRange = null; this.draftPreset = '';
  this.dateRange = null; this.datePreset = ''; this.status = '';
  table.clear();
  this.applyDateRange();
  table.first = 0;
 }

 saveCriteria(): void {
  this.savedCriteria = { search: this.search, preset: this.datePreset, programs: [...this.programs], materials: [...this.materials], jobs: [...this.jobs], range: this.dateRange?.map(date => date ? new Date(date) : null) ?? null };
  this.status = 'Search and date range saved for this session.';
 }
 loadCriteria(table: Table): void {
  if (!this.savedCriteria) return;
  this.search = this.savedCriteria.search; this.datePreset = this.savedCriteria.preset;
  this.programs = [...this.savedCriteria.programs]; this.materials = [...this.savedCriteria.materials]; this.jobs = [...this.savedCriteria.jobs];
  this.dateRange = this.savedCriteria.range?.map(date => date ? new Date(date) : null) ?? null;
  table.clear(); this.applyDateRange(); table.first = 0;
 }
 analyse(): void {
  this.analysisRows = [...this.selectedRows];
  if (!this.analysisRows.length) return;
  this.showAnalysis = true; this.workspaceChange.emit(true);
 }
 closeAnalysis(): void { this.showAnalysis = false; this.workspaceChange.emit(false); }
}
