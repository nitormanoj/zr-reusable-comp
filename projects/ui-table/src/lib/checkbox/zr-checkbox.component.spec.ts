import { ZrCheckboxComponent } from './zr-checkbox.component';

describe('ZrCheckboxComponent', () => {
  it('has a reusable checked API', () => {
    const component = new ZrCheckboxComponent();
    component.checked = true;
    component.label = 'Accept terms';

    expect(component.checked).toBeTrue();
    expect(component.label).toBe('Accept terms');
    expect(component.inputId).toContain('zr-checkbox-');
  });

  it('emits checkedChange when the PrimeNG value changes', () => {
    const component = new ZrCheckboxComponent();
    let emittedValue: boolean | undefined;
    component.checkedChange.subscribe(value => emittedValue = value);

    component.onCheckedChange(true);

    expect(emittedValue).toBeTrue();
  });
});
