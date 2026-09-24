import { Component } from '@angular/core';
import { ZrChipComponent } from 'zr-components';
import { FormsModule } from '@angular/forms';
import { ExamplePanelComponent } from '../../shared/example-panel/example-panel.component';

@Component({
  selector: 'sc-chip',
  standalone: true,
  imports: [
    ZrChipComponent,
    ExamplePanelComponent,FormsModule
  ],
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss']
})
export class ChipShowcaseComponent {

  basicCode = `<zr-chip
  label="Action">
</zr-chip>`;

  removableCode = `<zr-chip
  label="Apple"
  [removable]="true"
  (removed)="removeChip($event)">
</zr-chip>`;

  values: string[] = [];
  removableValues: string[] = [];

  removeChip(event: MouseEvent): void {
    console.log('Chip removed', event);
  }
}