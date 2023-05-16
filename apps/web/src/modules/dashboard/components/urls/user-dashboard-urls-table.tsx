'use client';
import Table from '@modules/ui/components/table/table';
import { Link } from '@prisma/client';
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { Session } from 'next-auth';
import React, { useMemo } from 'react';

type UserDashboardURLsTableProps = {
  links: Link[];
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
  ];

  const table = useReactTable({ data: links, columns, getCoreRowModel: getCoreRowModel() });

  return (
    <Table>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <th key={header.id}>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              );
            })}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <tr key={row.id} data-state={row.getIsSelected() && 'selected'}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
              ))}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={columns.length} className="h-24 text-center">
              No results.
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default UserDashboardURLsTable;
