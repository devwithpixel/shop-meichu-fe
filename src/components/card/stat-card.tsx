import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";

function CardLink({
  href,
  className,
  ...props
}: React.ComponentProps<"a"> & {
  href: string;
}) {
  return (
    <Link
      href={href}
      data-slot="card"
      className={cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      )}
      {...props}
    />
  );
}

export function StatCard({
  title,
  value,
  description,
  cardClassName,
  textClassName,
  iconClassName,
  href,
  Icon,
}: {
  title: string;
  value: number;
  description?: string;
  cardClassName?: string;
  textClassName?: string;
  iconClassName?: string;
  href?: string;
  Icon: LucideIcon;
}) {
  const Parent = href ? CardLink : Card;

  return (
    <Parent className={cardClassName} href={href || "#"}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div
          className={cn(
            iconClassName,
            "flex justify-center items-center rounded-lg size-8"
          )}
        >
          <Icon className="size-4" />
        </div>
      </CardHeader>
      <CardContent>
        <p className={cn(textClassName, "text-2xl font-bold")}>{value}</p>
        {description && (
          <>
            <Separator className="my-2" />
            <p className={cn(textClassName, "text-sm text-muted-foreground")}>
              {description}
            </p>
          </>
        )}
      </CardContent>
    </Parent>
  );
}
