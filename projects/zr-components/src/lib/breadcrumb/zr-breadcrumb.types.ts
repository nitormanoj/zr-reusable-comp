/** An item displayed in a ZR breadcrumb trail. */
export interface ZrBreadcrumbItem {
  /** Text displayed for the breadcrumb item. */
  label: string;
  /** Optional PrimeIcons class displayed before the label. */
  icon?: string;
  /** Optional router link used to navigate to the item. */
  routerLink?: string | string[];
  /** Optional action invoked when the item is selected. */
  command?: () => void;
  /** Prevents interaction with the item when true. */
  disabled?: boolean;
}
