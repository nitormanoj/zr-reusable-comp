export interface ZrTableColumn {
  field: string;
  header: string;
  width?: string;
}

export type ZrTableRow = Record<string, any>;