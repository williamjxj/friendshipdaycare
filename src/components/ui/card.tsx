/**
 * Card component - shadcn/ui style
 * Reusable card component with variants
 */

import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'outlined' | 'elevated' | 'gradient';
  hover?: boolean;
}

export function Card({ 
  children, 
  className, 
  variant = 'default',
  hover = false 
}: CardProps) {
  return (
    <div
      className={cn(
        'rounded-xl p-6',
        {
          'bg-card border border-border': variant === 'default',
          'bg-card border-2 border-primary/20': variant === 'outlined',
          'bg-card shadow-lg': variant === 'elevated',
          'bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20': variant === 'gradient',
          'transition-all duration-300 hover:shadow-lg hover:scale-[1.02]': hover,
        },
        className
      )}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

export function CardHeader({ children, className }: CardHeaderProps) {
  return (
    <div className={cn('mb-4', className)}>
      {children}
    </div>
  );
}

interface CardTitleProps {
  children: ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export function CardTitle({ 
  children, 
  className,
  as: Component = 'h3'
}: CardTitleProps) {
  return (
    <Component className={cn('text-xl font-semibold text-foreground', className)}>
      {children}
    </Component>
  );
}

interface CardDescriptionProps {
  children: ReactNode;
  className?: string;
}

export function CardDescription({ children, className }: CardDescriptionProps) {
  return (
    <p className={cn('text-sm text-muted-foreground mt-2', className)}>
      {children}
    </p>
  );
}

interface CardContentProps {
  children: ReactNode;
  className?: string;
}

export function CardContent({ children, className }: CardContentProps) {
  return (
    <div className={cn('', className)}>
      {children}
    </div>
  );
}

interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

export function CardFooter({ children, className }: CardFooterProps) {
  return (
    <div className={cn('mt-4 pt-4 border-t border-border', className)}>
      {children}
    </div>
  );
}

