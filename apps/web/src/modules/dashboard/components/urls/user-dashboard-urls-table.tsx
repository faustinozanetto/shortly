'use client';
import Button from '@modules/ui/components/button/button';
import IconButton from '@modules/ui/components/icon-button/icon-button';
import Table from '@modules/ui/components/table/table';
import TableBody from '@modules/ui/components/table/table-body';
import TableCell from '@modules/ui/components/table/table-cell';
import TableHead from '@modules/ui/components/table/table-head';
import TableHeader from '@modules/ui/components/table/table-header';
import TableRow from '@modules/ui/components/table/table-row';
import { Link } from '@prisma/client';
import {
  Column,
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Session } from 'next-auth';
import React, { useMemo, useState } from 'react';

type UserDashboardURLsTableProps = {
  links: Link[];
};

type SortableColumnProps = {
  column: Column<Link>;
  title: string;
};

const SortableColumn: React.FC<SortableColumnProps> = (props) => {
  const { column, title } = props;

  return (
    <Button
      size="sm"
      icon={
        <svg
          className="h-4 w-4 stroke-neutral-900 dark:stroke-neutral-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <line x1="17" y1="3" x2="17" y2="21" />
          <path d="M10 18l-3 3l-3 -3" />
          <line x1="7" y1="21" x2="7" y2="3" />
          <path d="M20 6l-3 -3l-3 3" />
        </svg>
      }
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
    >
      {title}
    </Button>
  );
};

const UserDashboardURLsTable = (props: UserDashboardURLsTableProps) => {
  const { links } = props;

  const columns: ColumnDef<Link>[] = [
    {
      header: 'ID',
      accessorKey: 'id',
      cell: ({ row }) => <div className="capitalize">{row.getValue('id')}</div>,
    },
    {
      header: 'URL',
      accessorKey: 'url',
      cell: ({ row }) => <div className="capitalize">{row.getValue('url')}</div>,
    },
    {
      header: 'Alias',
      accessorKey: 'alias',
      cell: ({ row }) => <div className="font-bold">{row.getValue('alias')}</div>,
    },
    {
      accessorKey: 'clicks',
      header: ({ column }) => {
        return <SortableColumn column={column} title="Clicks" />;
      },
      cell: ({ row }) => <div className="capitalize">{row.getValue('clicks')}</div>,
    },
    {
      accessorKey: 'createdAt',
      header: ({ column }) => {
        return <SortableColumn column={column} title="Created At" />;
      },
      cell: ({ row }) => <div className="capitalize">{new Date(row.getValue('createdAt')).toDateString()}</div>,
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const link = row.original;

        return (
          <IconButton
            aria-label="Delete Link"
            variant="danger"
            icon={
              <svg
                className="h-4 w-4 stroke-neutral-900 dark:stroke-neutral-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="10" y1="11" x2="10" y2="17" />
                <line x1="14" y1="11" x2="14" y2="17" />
                <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
              </svg>
            }
          />
        );
      },
    },
  ];

  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data: links,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 5,
      },
    },
  });

  return (
    <>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="text-neutral-900 dark:text-neutral-50">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex w-full items-center justify-end gap-2 pt-2 md:pt-4">
        <Button
          className="ml-auto w-full md:w-auto"
          variant="outline"
          aria-label="Previous Page"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          className="w-full md:w-auto"
          variant="outline"
          aria-label="Next Page"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </>
  );
};

export default UserDashboardURLsTable;
