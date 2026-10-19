import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, Input, OnChanges, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { CheckboxModule } from 'primeng/checkbox';
import type { ChartData, ChartOptions } from 'chart.js';
import { Specimen } from '../qt-documents/specimen.model';


interface AxisSettings {
  logarithmic: boolean;
  unit: string;
  name: string;
  scaling: string;
  lower: number | null;
  upper: number | null;
}

@Component({
  selector: 'app-qt-analysis',
  standalone: true,
  imports: [CommonModule, FormsModule, ChartModule, TableModule, SelectModule, InputTextModule, InputNumberModule, CheckboxModule],
  templateUrl: './qt-analysis.component.html',
  styleUrls: ['./qt-analysis.component.scss'],
})
export class QtAnalysisComponent implements OnChanges {
  @Input() specimens: Specimen[] = [];
  @Output() closed = new EventEmitter<void>();
  activeTab: 'curves' | 'insights' = 'curves';
  hiddenIds = new Set<number>();
  showGrid = true;
  showSettings = false;
  expandedAxis: 'x' | 'y' | null = 'x';
  readonly axes = [{ key: 'x' as const, label: 'X Axis' }, { key: 'y' as const, label: 'Y Axis' }];
  axisSettings = this.defaultSettings();
  draftSettings = this.defaultSettings();
  settingsError = '';
  readonly unitOptions = ['m', 'mm', 'N', 'kN', 'MPa'];
  readonly scalingOptions = [
    { value: 'auto', label: 'Option' },
    { value: 'fit', label: 'Extension to fit' },
    { value: 'manual', label: 'Manual' },
  ];
  constructor(private readonly element: ElementRef<HTMLElement>) {}

  private defaultSettings(): Record<'x' | 'y', AxisSettings> {
    return {
      x: { logarithmic: false, unit: 'm', name: 'Height', scaling: '', lower: null, upper: null },
      y: { logarithmic: false, unit: 'N', name: 'Force', scaling: '', lower: null, upper: null },
    };
  }
  toggleSettings(): void {
    if (!this.showSettings) {
      this.draftSettings = { x: { ...this.axisSettings.x }, y: { ...this.axisSettings.y } };
      this.settingsError = '';
    }
    this.showSettings = !this.showSettings;
  }
  clearSettings(): void {
    this.draftSettings = this.defaultSettings();
    for (const axis of this.axes) {
      this.draftSettings[axis.key].name = '';
      this.draftSettings[axis.key].unit = '';
    }
    this.settingsError = '';
  }
  applySettings(): void {
    for (const axis of this.axes) {
      const settings = this.draftSettings[axis.key];
      if (settings.lower !== null && settings.upper !== null && settings.lower >= settings.upper) {
        this.settingsError = `${axis.label}: Lower limit must be less than upper limit.`;
        return;
      }
      if (settings.logarithmic && axis.key === 'y') {
        this.settingsError = 'Y Axis: Demo curves contain nonpositive values and require a linear scale.';
        return;
      }
      if (settings.logarithmic && ((settings.lower !== null && settings.lower <= 0) || (settings.upper !== null && settings.upper <= 0))) {
        this.settingsError = `${axis.label}: Logarithmic limits must be positive.`;
        return;
      }
    }
    this.axisSettings = { x: { ...this.draftSettings.x }, y: { ...this.draftSettings.y } };
    this.showSettings = false;
    this.updateChart();
    this.element.nativeElement.querySelector<HTMLButtonElement>('.settings')?.focus();
  }
  @HostListener('document:click', ['$event'])
  closeSettingsOutside(event: MouseEvent): void {
    const target = event.target;
    if (this.showSettings && target instanceof Node && !this.element.nativeElement.querySelector('.settings-anchor')?.contains(target)) this.showSettings = false;
  }
  @HostListener('document:keydown.escape')
  closeSettingsOnEscape(): void {
    if (!this.showSettings) return;
    this.showSettings = false;
    this.element.nativeElement.querySelector<HTMLButtonElement>('.settings')?.focus();
  }
  chartData: ChartData<'line'> = { datasets: [] };
  chartOptions: ChartOptions<'line'> = {};
  updateChart(): void {
    this.chartData = {
      datasets: this.specimens.map((specimen, index) => ({
        label: specimen.name + ' (#' + specimen.id + ')',
        data: this.profiles[index % this.profiles.length].map((y, x) => ({ x: x + 1, y })),
        borderColor: specimen.color, backgroundColor: specimen.color,
        hidden: this.hiddenIds.has(specimen.id), tension: 0, pointRadius: 5,
      })),
    };
    const scale = (key: 'x' | 'y') => {
      const settings = this.axisSettings[key];
      return {
        type: settings.logarithmic ? 'logarithmic' as const : 'linear' as const,
        title: { display: true, text: settings.name + (settings.unit ? ' (' + settings.unit + ')' : '') },
        min: settings.scaling === 'manual' ? settings.lower ?? undefined : undefined,
        max: settings.scaling === 'manual' ? settings.upper ?? undefined : undefined,
        bounds: settings.scaling === 'fit' ? 'data' as const : 'ticks' as const,
        grid: { display: this.showGrid },
      };
    };
    this.chartOptions = {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: { x: { ...scale('x'), ticks: { callback: value => this.months[Number(value) - 1] ?? '' } }, y: scale('y') },
    };
  }
  readonly months = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  // Illustrative curves matching the reference; measured curve data is not available in the demo.
  private readonly profiles = [
    [-800, 940, 400, 80, -100, -340, 440],
    [-810, 260, 960, 800, -620, -570, -340],
    [-590, -360, 520, 350, 1000, -100, -100],
    [-880, -460, -680, -510, -200, -530, 0],
    [-890, -580, 520, -140, -100, 50, -840],
  ];

  ngOnChanges(): void { this.hiddenIds.clear(); this.updateChart(); }
  toggleCurve(id: number): void {
    this.hiddenIds.has(id) ? this.hiddenIds.delete(id) : this.hiddenIds.add(id);
    this.updateChart();
  }
  get visibleCount(): number { return this.specimens.length - this.hiddenIds.size; }
  get meanBreak(): number { return this.specimens.length ? this.specimens.reduce((sum, row) => sum + row.break, 0) / this.specimens.length : 0; }
  get breakSummaryRows(): { label: string; specimen: Specimen }[] {
    if (!this.specimens.length) return [];
    const min = this.specimens.reduce((result, row) => row.break < result.break ? row : result);
    const max = this.specimens.reduce((result, row) => row.break > result.break ? row : result);
    return [{ label: 'min', specimen: min }, { label: 'max', specimen: max }];
  }
  get minBreak(): number { return this.specimens.length ? Math.min(...this.specimens.map(row => row.break)) : 0; }
  get maxBreak(): number { return this.specimens.length ? Math.max(...this.specimens.map(row => row.break)) : 0; }
  get deviation(): number { return this.specimens.length ? Math.sqrt(this.specimens.reduce((sum, row) => sum + (row.break - this.meanBreak) ** 2, 0) / this.specimens.length) : 0; }
}
