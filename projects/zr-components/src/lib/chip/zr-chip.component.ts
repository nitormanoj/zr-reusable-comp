import {Component,Input,Output,EventEmitter,forwardRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ControlValueAccessor,NG_VALUE_ACCESSOR} from '@angular/forms';
import { ChipModule } from 'primeng/chip';

@Component({
  selector: 'zr-chip',
  standalone: true,
  imports: [CommonModule, ChipModule],
  templateUrl: './zr-chip.component.html',
  styleUrls: ['./zr-chip.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ZrChipComponent),
      multi: true
    }
  ]
})
export class ZrChipComponent implements ControlValueAccessor {

  @Input() placeholder = 'Type and press Enter';

  @Input() controlSize: 'small' | 'medium' | 'large' | 'full' = 'medium'

  @Input() removable = true;

  @Input() disabled = false;

  @Input() allowDuplicates = false;

  @Output()valuesChange = new EventEmitter<string[]>();

  values: string[] = [];
  inputValue = '';

  readonly primeChipStyle: Record<string, string> = {
    background: 'transparent',
    color: 'inherit',
    padding: '0',
    margin: '0',
    border: 'none',
    'box-shadow': 'none'
  };

  private onChange:
    (value: string[]) => void = () => {};

  private onTouched:
    () => void = () => {};
  private normalize(value: string): string {
    return value.trim().toLowerCase();
  }

  // CHECK DUPLICATE

  private isDuplicate(value: string): boolean {
    const normalizedValue = this.normalize(value);
    return this.values.some(
      chip => this.normalize(chip) === normalizedValue
    );

  }

  writeValue(value: string[] | null): void {
    this.values = Array.isArray(value)
      ? [...value]
      : [];
  }

  registerOnChange(
    fn: (value: string[]) => void
  ): void {

    this.onChange = fn;
  }

  registerOnTouched(
    fn: () => void
  ): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }


  addChip(): void {

    if (this.disabled) return;
    const value = this.inputValue.trim();
    if (!value) return;

    // Check duplicates only when not allowed
    if (
      !this.allowDuplicates &&
      this.isDuplicate(value)
    ) {
      this.inputValue = '';
      return;

    }
    this.values = [
      ...this.values,
      value
    ];
    this.inputValue = '';
    this.notifyChanges();

  }

  removeChip(index: number): void {
    if (
      this.disabled ||
      !this.removable ||
      index < 0 ||
      index >= this.values.length
    ) {
      return;
    }

    this.values = this.values.filter(
      (_, i) => i !== index
    );
    this.notifyChanges();

  }

  onKeyDown(event: KeyboardEvent): void {
    if (this.disabled) return;
    if (event.key === 'Enter') {
      event.preventDefault();
      this.addChip();
      return;

    }

    if (
      event.key === 'Backspace' &&
      !this.inputValue &&
      this.values.length > 0 &&
      this.removable
    ) {
      this.removeChip(this.values.length - 1);
    }

  }

  // NOTIFY PARENT AND ANGULAR FORMS

  private notifyChanges(): void {
    const updated = [...this.values];
    this.onChange(updated);
    this.valuesChange.emit(updated);

  }

  markTouched(): void {
    this.onTouched();
  }

}