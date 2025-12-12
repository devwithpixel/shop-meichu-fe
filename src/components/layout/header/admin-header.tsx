import { cn } from "@/lib/utils";

export function AdminHeader({
  title,
  className,
}: {
  title: string;
  className?: string;
}) {
  return (
    <h1 className={cn("text-2xl font-bold tracking-tight", className)}>
      {title}
    </h1>
  );
}
