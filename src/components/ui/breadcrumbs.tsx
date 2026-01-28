import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * A single breadcrumb item for rendering.
 */
export interface BreadcrumbItem {
  name: string;
  href: string;
}

/**
 * Accessible breadcrumb navigation.
 */
export function Breadcrumbs({
  items,
  className,
}: {
  items: BreadcrumbItem[];
  className?: string;
}) {
  if (items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className={cn("w-full", className)}>
      <ol className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={`${item.href}-${idx}`} className="flex items-center gap-1">
              {idx > 0 ? <span className="mx-1 select-none text-muted-foreground/60">/</span> : null}
              {isLast ? (
                <span aria-current="page" className="font-medium text-foreground">
                  {item.name}
                </span>
              ) : (
                <Link href={item.href} className="hover:text-foreground underline-offset-4 hover:underline">
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

