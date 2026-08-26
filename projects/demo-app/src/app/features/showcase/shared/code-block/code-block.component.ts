import { Component, Input } from '@angular/core';


@Component({
    selector: 'sc-code-block',
    imports: [],
    templateUrl: './code-block.component.html',
    styleUrls: ['./code-block.component.scss']
})
export class CodeBlockComponent {
  @Input() code = '';
  @Input() language = 'ts';

  copy() {
    if (navigator.clipboard) navigator.clipboard.writeText(this.code || '');
  }
}
