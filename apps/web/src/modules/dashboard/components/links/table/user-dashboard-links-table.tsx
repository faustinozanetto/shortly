'use client';
import Button from '@modules/ui/components/button/button';
import Table from '@modules/ui/components/table/table';
import TableBody from '@modules/ui/components/table/table-body';
import TableCell from '@modules/ui/components/table/table-cell';
import TableHead from '@modules/ui/components/table/table-head';
import TableHeader from '@modules/ui/components/table/table-header';
import TableRow from '@modules/ui/components/table/table-row';
import { Link as PrismaLink } from '@prisma/client';
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
import React, { useState } from 'react';
import UserLinkManagement from '../management/user-link-management';
import { getCompleteShortenedURL } from '@modules/url-shortener/lib/url-shortener.lib';
import Link from 'next/link';

type UserDashboardURLsTableProps = {
  links: PrismaLink[];
};

type SortableColumnProps = {
  column: Column<PrismaLink>;
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

const UserDashboardLinksTable = (props: UserDashboardURLsTableProps) => {
  const { links } = props;

  const columns: ColumnDef<PrismaLink>[] = [
    {
      header: 'URL',
      accessorKey: 'url',
      cell: ({ row }) => row.getValue('url'),
    },
    {
      accessorKey: 'alias',
      header: 'Alias',
      cell: ({ row }) => {
        const completeURL = getCompleteShortenedURL(row.getValue('alias'));
        return (
          <Link
            href={completeURL}
            className="hover:text-primary-600 dark:hover:text-primary-500 font-bold"
            target="_blank"
            prefetch={false}
          >
            {row.getValue('alias')}
          </Link>
        );
      },
    },
    {
      accessorKey: 'clicks',
      header: ({ column }) => {
        return <SortableColumn column={column} title="Clicks" />;
      },
      cell: ({ row }) => row.getValue('clicks'),
    },
    {
      accessorKey: 'createdAt',
      header: ({ column }) => {
        return <SortableColumn column={column} title="Created At" />;
      },
      cell: ({ row }) => <div className="capitalize">{new Date(row.getValue('createdAt')).toDateString()}</div>,
    },
    {
      accessorKey: 'expiresAt',
      header: ({ column }) => {
        return <SortableColumn column={column} title="Expiress At" />;
      },
      cell: ({ row }) => (
        <div className="capitalize">
          {row.getValue('expiresAt') ? new Date(row.getValue('expiresAt')).toDateString() : 'None'}
        </div>
      ),
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const link = row.original;

        return <UserLinkManagement link={link} />;
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

export default UserDashboardLinksTable;
