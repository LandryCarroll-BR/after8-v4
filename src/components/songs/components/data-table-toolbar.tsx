import { Button, Input } from '@/components';
import { DataTablePagination } from './data-table-pagination';
import { XIcon } from '@/components/icons';

interface DataTableToolbarProps {
  table: any;
}

export function DataTableToolbar({ table }: DataTableToolbarProps) {
  const isFiltered =
    table.getPreFilteredRowModel().rows.length > table.getFilteredRowModel().rows.length;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter songs..."
          value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('title')?.setFilterValue(event.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <XIcon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTablePagination table={table} />
      {/* <DataTableViewOptions table={table} /> */}
    </div>
  );
}
