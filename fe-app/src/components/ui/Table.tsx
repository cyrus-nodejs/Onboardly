import clsx from "clsx";
import React from "react";

type TableProps = React.TableHTMLAttributes<HTMLTableElement> & {
  containerClassName?: string;
};

export function Table({ className, containerClassName, ...props }: TableProps) {
  return (
    <div
      className={clsx("relative w-full overflow-x-auto", containerClassName)}
    >
      <table
        className={clsx(
          "w-full border-collapse text-sm min-w-[640px]",
          className,
        )}
        {...props}
      />
    </div>
  );
}

export function TableHeader(
  props: React.HTMLAttributes<HTMLTableSectionElement>,
) {
  return <thead className=" text-left border-b" {...props} />;
}

export function TableBody(
  props: React.HTMLAttributes<HTMLTableSectionElement>,
) {
  return <tbody {...props} />;
}

type TrProps = React.HTMLAttributes<HTMLTableRowElement> & {
  clickable?: boolean;
};

export function TableRow({ clickable, className, ...props }: TrProps) {
  return (
    <tr
      className={clsx(
        "border-b last:border-b-0",
        clickable && "cursor-pointer hover:bg-gray-50",
        className,
      )}
      {...props}
    />
  );
}

export function TableHead(props: React.ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      className="px-4 py-3 text-left font-medium text-gray-700  whitespace-nowrap"
      {...props}
    />
  );
}

type TdProps = React.TdHTMLAttributes<HTMLTableCellElement> & {
  label?: string;
};

export function TableData({ label, className, ...props }: TdProps) {
  return (
    <td
      className={clsx(
        " align-middle",
        label && "block md:table-cell md:border md:px-4 md:py-3",
        className,
      )}
      {...props}
    >
      {label && (
        <span className="block md:hidden mb-1 text-xs font-medium text-gray-500">
          {label}
        </span>
      )}
      {props.children}
    </td>
  );
}
