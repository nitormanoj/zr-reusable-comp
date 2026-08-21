import { TableComponent } from './table.component';
import { TableColumn } from './table.types';

interface Item { id: number; name: string; active: boolean }

describe('TableComponent sorting and pagination', () => {
  let comp: TableComponent<Item>;
  beforeEach(() => {
    comp = new TableComponent<Item>();
    comp.data = [
      { id: 3, name: 'Charlie', active: true },
      { id: 1, name: 'Alice', active: false },
      { id: 2, name: 'Bob', active: true }
    ];
    comp.columns = [
      { field: 'id', header: 'ID', sortable: true },
      { field: 'name', header: 'Name', sortable: true }
    ];
  });

  it('sorts ascending by id', () => {
    comp.onHeaderClick(comp.columns[0]);
    const ids = comp.sortedData.map(x => x.id);
    expect(ids).toEqual([1,2,3]);
  });

  it('toggles sort order', () => {
    comp.onHeaderClick(comp.columns[0]);
    comp.onHeaderClick(comp.columns[0]);
    expect(comp.currentSort?.order).toBe('desc');
  });

  it('paginates correctly', () => {
    comp.paginated = true;
    comp.pageSize = 2;
    comp.currentPage = 1;
    let page1 = comp.pagedData;
    expect(page1.length).toBe(2);
    comp.nextPage();
    let page2 = comp.pagedData;
    expect(page2.length).toBe(1);
  });
});
