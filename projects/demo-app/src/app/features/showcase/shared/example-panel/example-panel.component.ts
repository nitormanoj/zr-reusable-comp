import { Component, Input } from '@angular/core';

import { CodeBlockComponent } from '../code-block/code-block.component';

@Component({
    selector: 'sc-example-panel',
    imports: [CodeBlockComponent],
    templateUrl: './example-panel.component.html',
    styleUrls: ['./example-panel.component.scss']
})
export class ExamplePanelComponent {
  @Input() code = '';
  @Input() language = 'ts';
  preview = true;
}
