/**
 * Badge component - shadcn/ui style
 * Small status indicators and labels
 */

import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Badge({ 
  children, 
  variant = 'default',
  size = 'md',
  className 
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-medium',
        {
          // Variants
          'bg-muted text-muted-foreground': variant === 'default',
          'bg-primary text-primary-foreground': variant === 'primary',
          'bg-secondary text-secondary-foreground': variant === 'secondary',
          'bg-accent text-accent-foreground': variant === 'accent',
          'bg-green-500 text-white': variant === 'success',
          'bg-yellow-500 text-white': variant === 'warning',
          'bg-red-500 text-white': variant === 'error',
          'border border-border bg-transparent text-foreground': variant === 'outline',
          // Sizes
          'px-2 py-0.5 text-xs': size === 'sm',
          'px-2.5 py-1 text-sm': size === 'md',
          'px-3 py-1.5 text-base': size === 'lg',
        },
        className
      )}
    >
      {children}
    </span>
  );
}

