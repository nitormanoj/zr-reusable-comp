import { Component } from '@angular/core';
import { ZrButtonDirective } from 'projects/ui-table/src/lib/buttons/zr-button.directive';
import { ZrButtonsComponent } from 'projects/ui-table/src/lib/buttons/zr-buttons.component';

@Component({
  selector: 'basic',
  imports: [ZrButtonDirective],
  templateUrl: './basic.component.html',
  styleUrl: './basic.component.scss',
})
export class BasicComponent {

}
  