import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'button',
    templateUrl: './button.component.html',
    styleUrl: './button.component.scss',
    imports: [ButtonModule],

    standalone: true
})
export class ButtonComponent {

}
