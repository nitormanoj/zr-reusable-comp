import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'zr-checkbox',
  standalone: true,
  imports: [CheckboxModule, FormsModule],
  templateUrl: './zr-checkbox.component.html',
  styleUrls: ['./zr-checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ZrCheckboxComponent {
  @Input() checked = false;
  @Input() label = '';
  @Input() disabled = false;
  @Input() inputId = `zr-checkbox-${Math.random().toString(36).slice(2, 9)}`;
  @Output() checkedChange = new EventEmitter<boolean>();

  onCheckedChange(value: boolean): void {
    this.checkedChange.emit(value);
  }
}
