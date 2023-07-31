'use client';

// import { ColumnDef } from "@tanstack/react-table"
// import { song } from "../data/schema"
import { DataTableColumnHeader } from './data-table-column-header';

export const columns: any = [
  {
    accessorKey: 'title',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Title" />,
    cell: ({ row }) => <div className="w-48">{row.getValue('title')}</div>,
    enableSorting: true,
    enableHiding: true,
    size: 10,
  },
  {
    accessorKey: 'id',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Artist" className="" />,
    cell: ({ row }) => <div className="lg:w-96">{row.getValue('id')}</div>,
    enableSorting: true,
    enableHiding: true,
    size: 10,
  },
];
