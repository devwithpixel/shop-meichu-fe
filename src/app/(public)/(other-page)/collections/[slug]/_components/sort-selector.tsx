"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { ArrowUpDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const sortOptions = [
  { value: "default", label: "Default" },
  { value: "price:asc", label: "Price: Low to High" },
  { value: "price:desc", label: "Price: High to Low" },
  { value: "createdAt:desc", label: "Newest First" },
  { value: "createdAt:asc", label: "Oldest First" },
];

export default function SortSelector() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentSort = searchParams.get("sort") || "default";
  const currentLabel =
    sortOptions.find((o) => o.value === currentSort)?.label ?? "Default";

  function handleSortChange(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "default") {
      params.delete("sort");
    } else {
      params.set("sort", value);
    }
    params.delete("page");
    params.delete("perPage");
    const query = params.toString();
    router.push(`${pathname}${query ? `?${query}` : ""}`);
  }

  return (
    <Select value={currentSort} onValueChange={handleSortChange}>
      <SelectTrigger className="px-5 py-1.5 bg-black text-white flex items-center justify-center gap-2 rounded-full border-none">
        <ArrowUpDown className="size-4" />
        <SelectValue>Sort: {currentLabel}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        {sortOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
