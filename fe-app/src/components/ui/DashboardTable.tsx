"use client";
import * as React from "react";
import { ReactNode } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableData,
} from "@/components/ui/Table";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/typography/Heading";
import clsx from "clsx";

export type TableColumn<T> = {
  header: string;
  accessor?: keyof T | ((row: T) => React.ReactNode);
  className?: string;
};

export type DashboardTableProps<T> = {
  title?: string;
  columns: TableColumn<T>[];
  data: T[];
  keyAccessor: keyof T;
  rowClassName?: (row: T) => string;
  onAction?: (row: T) => void;
  actionText?: string;
};

export function DashboardTable<T extends Record<string, unknown>>({
  title,
  columns,
  data,
  keyAccessor,
  rowClassName,
  onAction,
  actionText = "View",
}: DashboardTableProps<T>) {
  return (
    <Card>
      <CardContent className="p-4 sm:p-6">
        {title && <Heading level={3}>{title}</Heading>}

        <div className="overflow-x-auto scrollbar-thin">
          <Table className="min-w-full whitespace-nowrap">
            <TableHeader>
              <TableRow>
                {columns.map((col) => (
                  <TableHead
                    key={col.header}
                    className={clsx("text-xs sm:text-sm", col.className)}
                  >
                    {col.header}
                  </TableHead>
                ))}
                {onAction && (
                  <TableHead className="text-xs sm:text-sm">Action</TableHead>
                )}
              </TableRow>
            </TableHeader>

            <TableBody>
              {data.map((row) => (
                <TableRow
                  key={String(row[keyAccessor])}
                  className={clsx("text-xs sm:text-sm", rowClassName?.(row))}
                >
                  {columns.map((col) => {
                    const value: ReactNode =
                      typeof col.accessor === "function"
                        ? col.accessor(row)
                        : (row[
                            col.accessor as keyof T
                          ] as unknown as ReactNode);
                    return <TableData key={col.header}>{value}</TableData>;
                  })}

                  {onAction && (
                    <TableData>
                      <Button size="sm" onClick={() => onAction(row)}>
                        {actionText}
                      </Button>
                    </TableData>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
