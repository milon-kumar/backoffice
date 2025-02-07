import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/common/components/atoms/Table';
import { ScrollArea } from '@/common/components/molecules/ScrollArea/ScrollArea';
import { TableBody } from '@ballerine/ui';
import { flexRender } from '@tanstack/react-table';
import { ChevronDown } from 'lucide-react';
import { ctw } from '@/common/utils/ctw/ctw';
import React, { FunctionComponent } from 'react';
import { IAlertsTableProps } from '@/pages/TransactionMonitoringAlerts/components/AlertsTable/interfaces';
import { useAlertsTableLogic } from '@/pages/TransactionMonitoringAlerts/components/AlertsTable/hooks/useAlertsTableLogic/useAlertsTableLogic';
import { Link } from 'react-router-dom';

export const AlertsTable: FunctionComponent<IAlertsTableProps> = ({ data }) => {
  const { table, locale, onRowClick, search } = useAlertsTableLogic({ data });

  return (
    <div className="d-full relative overflow-auto rounded-md border bg-white shadow">
      <ScrollArea orientation="both" className="h-full">
        <Table>
          <TableHeader className="border-0">
            {table.getHeaderGroups().map(({ id, headers }) => {
              return (
                <TableRow key={id} className={`border-b-none`}>
                  {headers.map(header => (
                    <TableHead
                      key={header.id}
                      className={`sticky top-0 z-10 h-[34px] bg-white p-1 text-[14px] font-bold text-[#787981]`}
                    >
                      {header.column.id === 'select' && (
                        <span className={'pe-4'}>
                          {flexRender(header.column.columnDef.header, header.getContext())}
                        </span>
                      )}
                      {header.column.id !== 'select' && (
                        <button
                          className="flex h-9 flex-row items-center gap-x-2 px-3 text-left text-[#A3A3A3]"
                          onClick={() => header.column.toggleSorting()}
                        >
                          <span>
                            {flexRender(header.column.columnDef.header, header.getContext())}
                          </span>
                          <ChevronDown
                            className={ctw('d-4', {
                              'rotate-180': header.column.getIsSorted() === 'asc',
                            })}
                          />
                        </button>
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              );
            })}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map(row => {
              return (
                <TableRow
                  key={row.id}
                  className="h-[76px] border-b-0 even:bg-[#F4F6FD]/50 hover:bg-[#F4F6FD]/90"
                >
                  {row.getVisibleCells().map(cell => {
                    const itemId = cell.id.replace(`_${cell.column.id}`, '');
                    const item = data.find(item => item.id === itemId);

                    return (
                      <TableCell key={cell.id} className={`p-0`}>
                        {cell.column.id === 'select' &&
                          flexRender(cell.column.columnDef.cell, cell.getContext())}
                        {cell.column.id !== 'select' && (
                          <Link
                            to={`/${locale}/transaction-monitoring/alerts/${itemId}${search}&businessId=${
                              item?.merchant?.id ?? ''
                            }&counterpartyId=${item?.counterpartyId ?? ''}`}
                            onClick={onRowClick}
                            className={`d-full flex p-4`}
                          >
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </Link>
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
};
