import { Component } from '@angular/core';
import { ZrCheckboxComponent } from 'zr-components';

@Component({
  selector: 'sc-checkbox-showcase',
  standalone: true,
  imports: [ZrCheckboxComponent],
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxShowcaseComponent {
  notificationsEnabled = true;
}
