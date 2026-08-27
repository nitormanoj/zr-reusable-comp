import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
    selector: 'sc-checkbox',
    imports: [],
    templateUrl: './checkbox.component.html',
    styleUrls: ['./checkbox.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckboxComponent {
  @Input() checked = false;
  @Input() label = '';
  @Output() checkedChange = new EventEmitter<boolean>();

  onChange(ev: Event) {
    const input = ev.target as HTMLInputElement;
    this.checkedChange.emit(input.checked);
  }
}
