import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeBlockComponent } from '../code-block/code-block.component';

@Component({
  selector: 'sc-example-panel',
  standalone: true,
  imports: [CommonModule, CodeBlockComponent],
  templateUrl: './example-panel.component.html',
  styleUrls: ['./example-panel.component.scss']
})
export class ExamplePanelComponent {
  @Input() code = '';
  @Input() language = 'ts';
  preview = true;
}
