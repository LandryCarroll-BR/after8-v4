import { cn } from '@/lib/utils';
import React from 'react';

interface DataTableColumnHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
}

export function DataTableColumnHeader({ title, className }: DataTableColumnHeaderProps) {
  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <span>{title}</span>
    </div>
  );
}
