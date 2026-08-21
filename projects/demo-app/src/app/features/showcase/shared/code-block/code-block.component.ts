import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'sc-code-block',
  standalone: true,
  imports: [CommonModule],
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
