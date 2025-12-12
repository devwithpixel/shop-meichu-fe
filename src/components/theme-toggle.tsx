"use client";

import { useTheme } from "next-themes";
import { useIsClient } from "@/hooks/use-is-client";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "./ui/skeleton";

export function ThemeToggle() {
  const isClient = useIsClient();
  const { theme, setTheme } = useTheme();

  if (!isClient) return <Skeleton className="h-8 w-8" />;

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5 transition-all" />
      ) : (
        <Moon className="h-5 w-5 transition-all" />
      )}
    </Button>
  );
}
