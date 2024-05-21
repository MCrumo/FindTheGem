import type { SortKey } from 'svelte-headless-table/plugins';

// Defaults:
// hiddenColumns: none []
// sortKey: []
export type InitialLayout = {
  hiddenColumns: string[];
  sortKeys: SortKey[];
};

// Defaults:
// temporalFilter: true
// freeText: true
export type TableOptions = {
  updateHiddenColumns: boolean;
  temporalFilter: boolean;
  freeTextFilter: boolean;
};

export function createTableConfig(
  initialLayout?: Partial<InitialLayout>,
  tableOptions?: Partial<TableOptions>
): { resolvedInitialLayout: InitialLayout; resolvedTableOptions: TableOptions } {
  const defaultInitialLayout: InitialLayout = {
    hiddenColumns: [],
    sortKeys: []
  };
  const defautTableOptions: TableOptions = {
    updateHiddenColumns: true,
    temporalFilter: true,
    freeTextFilter: true
  };

  return {
    resolvedInitialLayout: { ...defaultInitialLayout, ...initialLayout },
    resolvedTableOptions: { ...defautTableOptions, ...tableOptions }
  };
}

export function compareNatural(left: any, right: any) {
  if (left == null && left == undefined && left === right) return 0;
  if (left == null || left === undefined) return 1;
  if (right == null || left === undefined) return -1;

  if (left < right) return 1;
  else return -1;
}
