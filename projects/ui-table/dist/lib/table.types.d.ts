import { TemplateRef } from '@angular/core';
export interface TableColumn<T> {
    field: keyof T & string;
    header: string;
    sortable?: boolean;
    template?: TemplateRef<any>;
}
