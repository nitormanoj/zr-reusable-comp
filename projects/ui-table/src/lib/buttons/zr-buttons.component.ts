import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ZrButtonDirective, ZrButtonSeverity } from './zr-button.directive';

/**
 * ZrButtonsComponent
 *
 * Presentational wrapper around the [zrButton] directive. Use this when you
 * want a proper Angular component (inputs/outputs, content projection,
 * Storybook-friendly API) rather than applying the directive to a raw
 * <button> yourself.
 */
@Component({
  selector: 'zr-buttons',
  standalone: true,
  imports: [CommonModule, ButtonModule, ZrButtonDirective],
  template: `
    <button
      zrButton
      [label]="icon ? undefined : label"
      [severity]="severity"
      [outlined]="outlined"
      [rounded]="rounded"
      [disabled]="disabled"
      (click)="onClick($event)">
      <ng-container *ngIf="icon">
        <i [class]="icon" aria-hidden="true"></i>
        <span>{{ label }}</span>
      </ng-container>
    </button>
  `,
  styleUrls: ['./zr-buttons.component.scss']
})
export class ZrButtonsComponent {

  /** Text to display on the button */
  @Input() label = 'Button';

  /** Visual color variant */
  @Input() severity: ZrButtonSeverity = 'primary';

  /** Renders the button with an outlined style */
  @Input() outlined = false;

  /** Renders the button with fully rounded corners */
  @Input() rounded = false;

  /** Disables the button */
  @Input() disabled = false;

  /** Optional icon class (e.g. a font-icon class like "pi pi-check") shown before the label */
  @Input() icon?: string;

  @Output() clicked = new EventEmitter<Event>();

  onClick(event: Event): void {
    if (!this.disabled) {
      this.clicked.emit(event);
    }
  }
}