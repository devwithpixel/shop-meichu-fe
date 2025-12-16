import { createLoader, parseAsInteger } from "nuqs/server";

const paginationParams = {
  page: parseAsInteger.withDefault(1),
  perPage: parseAsInteger.withDefault(6),
};

export const paginationLoader = createLoader(paginationParams);

export function buildPaginationUrl(
  baseUrl: string,
  page: number,
  perPage: number
): string {
  const params = new URLSearchParams();
  params.set("page", String(page));
  if (perPage !== 8) params.set("perPage", String(perPage));

  return `${baseUrl}?${params.toString()}`;
}

export function getPageNumbers(
  currentPage: number,
  totalPages: number
): (number | "ellipsis")[] {
  const pages: (number | "ellipsis")[] = [];
  const showEllipsisThreshold = 7;

  if (totalPages <= showEllipsisThreshold) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    pages.push(1);

    if (currentPage > 3) {
      pages.push("ellipsis");
    }
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push("ellipsis");
    }

    pages.push(totalPages);
  }

  return pages;
}
