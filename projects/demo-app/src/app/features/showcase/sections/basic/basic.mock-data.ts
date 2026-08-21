export interface BasicRow { id: number; name: string; score: number; active: boolean; joined: string }

export const BASIC_ROWS: BasicRow[] = Array.from({ length: 25 }).map((_, i) => {
  const id = i + 1;
  return {
    id,
    name: `User ${id}`,
    score: Math.floor(40 + Math.random() * 60),
    active: id % 3 !== 0,
    joined: new Date(2018 + (i % 6), i % 12, (i % 28) + 1).toISOString()
  } as BasicRow;
});
