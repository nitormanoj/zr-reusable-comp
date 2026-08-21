export interface PageRow { id: number; name: string }

export const PAGE_ROWS: PageRow[] = Array.from({ length: 22 }).map((_, i) => ({ id: i + 1, name: `User ${i + 1}` }));
