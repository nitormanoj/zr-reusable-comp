import { Directive, ElementRef, HostBinding, Input, OnChanges, OnInit, Renderer2, SimpleChanges } from '@angular/core';

export type ZrButtonSeverity =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'info'
  | 'warning'
  | 'danger'
  | 'help';

@Directive({
  selector: '[zrButton]',
  standalone: true
})
export class ZrButtonDirective implements OnInit, OnChanges {

  /** Text to display on the button */
  @Input() label?: string;

  /** Visual color variant, e.g. severity="success" -> class "zr-button-success" */
  @Input() severity?: ZrButtonSeverity;

  /** Renders the button with an outlined style */
  @Input() outlined = false;

  /** Renders the button with fully rounded corners */
  @Input() rounded = false;

  /** Disables the button */
  @Input() disabled = false;

  @HostBinding('class.zr-button') readonly baseClass = true;
  @HostBinding('attr.type') readonly type = 'button';
  @HostBinding('disabled') get isDisabled(): boolean {
    return this.disabled;
  }

  constructor(
    private readonly el: ElementRef<HTMLButtonElement>,
    private readonly renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.updateLabel();
    this.updateClasses();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['label']) {
      this.updateLabel();
    }
    if (changes['severity'] || changes['outlined'] || changes['rounded']) {
      this.updateClasses();
    }
  }

  private updateLabel(): void {
    if (this.label != null) {
      this.renderer.setProperty(this.el.nativeElement, 'textContent', this.label);
    }
  }

  private updateClasses(): void {
    const el = this.el.nativeElement;
    Array.from(el.classList)
      .filter(cls => cls.startsWith('zr-button-'))
      .forEach(cls => this.renderer.removeClass(el, cls));

    if (this.severity) {
      this.renderer.addClass(el, `zr-button-${this.severity}`);
    }
    if (this.outlined) {
      this.renderer.addClass(el, 'zr-button-outlined');
    }
    if (this.rounded) {
      this.renderer.addClass(el, 'zr-button-rounded');
    }
  }
}