export interface CTRow { id: number; name: string; active: boolean; avatar?: string; actions?: string }

export const CT_ROWS: CTRow[] = [
  { id: 1, name: 'Alice', active: true, avatar: '' },
  { id: 2, name: 'Bob', active: false, avatar: '' },
  { id: 3, name: 'Charlie', active: true, avatar: '' }
];
