import { getCollectionData } from "@/lib/api/collection";
import { getAllCategories } from "@/lib/api/categories";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import CollectionsCard from "@/components/card/collections-card";
import HeaderPage from "@/components/header/header-page";
import {
  paginationLoader,
  getPageNumbers,
  buildPaginationUrl,
} from "@/lib/pagination";

import type { Metadata } from "next";
import type { SearchParams } from "nuqs/server";
import type { StrapiRelationCount } from "@/types/strapi/count-relation";

export const metadata: Metadata = {
  title: "Collections – Shop Meichu",
};

export default async function CollectionsAllPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { page, perPage } = await paginationLoader(searchParams);
  const currentPage = Math.max(1, page);
  const currentPerPage = Math.max(1, perPage);

  const { data: collection } = await getCollectionData();
  const { data: categories, meta } = await getAllCategories({
    populate: {
      products: {
        count: true,
      },
      thumbnail: true,
    },
    sort: ["name:asc"],
    pagination: {
      page: currentPage,
      pageSize: currentPerPage,
      withCount: true,
    },
  });

  const pagination = meta?.pagination;
  const totalPages = pagination?.pageCount || 1;
  const pageNumbers = getPageNumbers(currentPage, totalPages);

  return (
    <div className="bg-white">
      <HeaderPage
        type="collections"
        image={collection.heading.thumbnail}
        title={collection.heading.title}
        desc={collection.heading.description}
      />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {categories.map((category, index) => (
          <CollectionsCard
            key={category.id}
            index={index}
            title={category.name}
            image={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${category.thumbnail?.url}`}
            productsCount={
              (category.products as StrapiRelationCount)?.count || 0
            }
            bgColor={category.backgroundColor}
            link={`/collections/${category.slug}`}
          />
        ))}
      </div>

      {pagination && totalPages > 1 && (
        <Pagination className="py-5">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={
                  currentPage > 1
                    ? buildPaginationUrl(
                        "/collections",
                        currentPage - 1,
                        currentPerPage
                      )
                    : "#"
                }
                aria-disabled={currentPage <= 1}
                className={
                  currentPage <= 1 ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>

            {pageNumbers.map((pageNum, index) =>
              pageNum === "ellipsis" ? (
                <PaginationItem key={`ellipsis-${index}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              ) : (
                <PaginationItem key={pageNum}>
                  <PaginationLink
                    href={buildPaginationUrl(
                      "/collections",
                      pageNum,
                      currentPerPage
                    )}
                    isActive={pageNum === currentPage}
                  >
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              )
            )}

            <PaginationItem>
              <PaginationNext
                href={
                  currentPage < totalPages
                    ? buildPaginationUrl(
                        "/collections",
                        currentPage + 1,
                        currentPerPage
                      )
                    : "#"
                }
                aria-disabled={currentPage >= totalPages}
                className={
                  currentPage >= totalPages
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
