import * as React from "react";
import { cn } from "@/lib/utils";

interface ListProps<T> {
  items: T[];

  renderItem: (item: T, index: number) => React.ReactNode;

  emptyState?: React.ReactNode;

  className?: string;

  itemClassName?: string;

  keyExtractor?: (item: T, index: number) => string | number;
}

export function List<T>({
  items,
  renderItem,
  emptyState,
  className,
  itemClassName,
  keyExtractor,
}: ListProps<T>) {
  if (items.length === 0) {
    return emptyState || null;
  }

  return (
    <ul className={cn("flex flex-col gap-2 list-none p-0 m-0", className)}>
      {items.map((item, index) => (
        <li
          key={keyExtractor ? keyExtractor(item, index) : index}
          className={itemClassName}
        >
          {renderItem(item, index)}
        </li>
      ))}
    </ul>
  );
}
