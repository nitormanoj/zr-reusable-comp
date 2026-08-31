import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { Popover, PopoverModule } from 'primeng/popover';
import { ZrBreadcrumbItem } from './zr-breadcrumb.types';

type BreadcrumbMenuItem = MenuItem & { zrItem?: ZrBreadcrumbItem; isOverflow?: boolean; isCurrent?: boolean };

@Component({
  selector: 'zr-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterModule, BreadcrumbModule, PopoverModule],
  templateUrl: './zr-breadcrumb.component.html',
  styleUrls: ['./zr-breadcrumb.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ZrBreadcrumbComponent {
  @Input() items: ZrBreadcrumbItem[] = [];
  @Input() home: ZrBreadcrumbItem | null = null;
  @Input() maxVisible?: number;
  @Output() itemClick = new EventEmitter<ZrBreadcrumbItem>();

  @ViewChild('overflowPanel') overflowPanel?: Popover;

  get overflowItems(): ZrBreadcrumbItem[] {
    const middle = this.items.slice(1, -1);
    return this.shouldTruncate ? middle.slice(this.visibleMiddleCount) : [];
  }

  get visibleMiddleCount(): number {
    return Math.max(0, (this.maxVisible ?? 0) - 3);
  }

  get shouldTruncate(): boolean {
    return !!this.maxVisible && this.maxVisible >= 3 && this.items.length > this.maxVisible;
  }

  get primeItems(): BreadcrumbMenuItem[] {
    if (!this.items.length) return [];

    const first = this.items[0];
    const last = this.items[this.items.length - 1];
    const middle = this.shouldTruncate
      ? [this.overflowMenuItem, ...this.items.slice(1, 1 + this.visibleMiddleCount)]
      : this.items.slice(1, -1);

    return [this.toMenuItem(first), ...middle, this.toMenuItem(last, true)];
  }

  get primeHome(): BreadcrumbMenuItem | undefined {
    return this.home ? this.toMenuItem(this.home) : undefined;
  }

  get overflowMenuItem(): BreadcrumbMenuItem {
    return { label: 'More', icon: 'pi pi-ellipsis-h', isOverflow: true };
  }

  onPrimeItemClick(event: { item?: MenuItem }): void {
    const item = event.item as BreadcrumbMenuItem | undefined;
    if (item?.zrItem && !item.isCurrent && !item.isOverflow) {
      if (item.zrItem.command) item.zrItem.command();
      this.itemClick.emit(item.zrItem);
    }
  }

  onItemTemplateClick(item: BreadcrumbMenuItem, event: Event): void {
    if (item.isOverflow) {
      event.preventDefault();
      this.overflowPanel?.toggle(event, event.target);
      return;
    }
    if (item.zrItem) {
      if (item.zrItem.command) item.zrItem.command();
      this.itemClick.emit(item.zrItem);
    }
  }

  onOverflowItemClick(item: ZrBreadcrumbItem, event: Event): void {
    event.preventDefault();
    if (item.disabled) return;
    if (item.command) item.command();
    this.itemClick.emit(item);
    this.overflowPanel?.hide();
  }

  private toMenuItem(item: ZrBreadcrumbItem, isLast = false): BreadcrumbMenuItem {
    const menuItem: BreadcrumbMenuItem = {
      label: item.label,
      icon: item.icon,
      disabled: item.disabled,
      zrItem: item,
      isCurrent: isLast,
    };
    if (!isLast) {
      menuItem.routerLink = item.routerLink;
      menuItem.command = item.command ? () => item.command?.() : undefined;
    }
    return menuItem;
  }
}
