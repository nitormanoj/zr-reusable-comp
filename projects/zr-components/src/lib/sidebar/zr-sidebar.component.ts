import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DrawerModule } from "primeng/drawer";

export type ZrSidebarPosition = "left" | "right" | "top" | "bottom";

@Component({
  selector: "zr-sidebar",
  standalone: true,
  imports: [CommonModule, DrawerModule],
  templateUrl: "./zr-sidebar.component.html",
  styleUrls: ["./zr-sidebar.component.scss"],
})
export class ZrSidebarComponent {

  @Input()
  visible = false;

  @Input()
  header = "";

  @Input()
  position: ZrSidebarPosition = "right";

  @Input()
  width = "24rem";

  @Input()
  modal = true;

  @Input()
  dismissible = true;

  @Input()
  closeOnEscape = true;

  @Input()
  showCloseIcon = true;

  @Input()
  blockScroll = false;

  @Input()
  styleClass = "";

  @Output()
  visibleChange = new EventEmitter<boolean>();

  @Output()
  opened = new EventEmitter<void>();

  @Output()
  closed = new EventEmitter<void>();

  onVisibleChange(value: boolean): void {
    this.visible = value;
    this.visibleChange.emit(value);
  }

  onShow(): void {
    this.opened.emit();
  }

  onHide(): void {
    setTimeout(() => {
      this.removeStaleMask();
    }, 200);

    this.closed.emit();
  }

  private removeStaleMask(): void {
    if (this.visible) {
      return;
    }
    const masks = document.querySelectorAll<HTMLElement>(".p-drawer-mask");
    masks.forEach((mask) => {
      const drawer = mask.querySelector<HTMLElement>(".p-drawer");
      if (!drawer) {
        mask.remove();
      }
    });

    const remainingMask = document.querySelector(".p-drawer-mask");

    if (!remainingMask) {
      document.body.classList.remove("p-overflow-hidden");
    }
  }
}
