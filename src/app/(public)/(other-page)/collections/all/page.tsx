import { getCollectionData } from "@/lib/api/collection";
import { getAllProducts } from "@/lib/api/products";
import {
  paginationLoader,
  getPageNumbers,
  buildPaginationUrl,
} from "@/lib/pagination";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import IconElement from "@/components/ui/icon-element";
import ProductCard from "@/components/card/product-card";
import HeaderPage from "@/components/header/header-page";
import Link from "next/link";

import type { Metadata } from "next";
import type { SearchParams } from "nuqs/server";

export const metadata: Metadata = {
  title: "Collections – Shop Meichu",
};

export default async function CollectionsAllProductsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { page, perPage } = await paginationLoader(searchParams);
  const currentPage = Math.max(1, page);
  const currentPerPage = Math.max(1, perPage);

  const { data: collection } = await getCollectionData();
  const { data: products, meta } = await getAllProducts({
    populate: {
      images: true,
    },
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
    <div className="bg-[#D9E4E8]">
      <HeaderPage
        type="collections"
        image={collection.heading.thumbnail}
        title={collection.heading.title}
        desc={collection.heading.description}
      />

      <div className="relative">
        <IconElement variant={3} />
        <div className="px-5 py-10 space-y-6 md:space-y-14 h-full">
          <Link href="/collections">
            <button className="z-10 mb-12 px-5 py-1.5 bg-black text-white flex items-center justify-center gap-2 rounded-full">
              All Collections
            </button>
          </Link>
          <div className="flex items-center justify-center md:justify-start lg:justify-start flex-wrap gap-y-14 md:gap-y-14 lg:gap-y-14 gap-2 md:gap-5.5 lg:gap-4 pb-6 overflow-x-scroll lg:overflow-x-visible">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} size="lg" />
            ))}
          </div>
        </div>

        {pagination && totalPages > 1 && (
          <Pagination className="py-5">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href={
                    currentPage > 1
                      ? buildPaginationUrl(
                          "/collections/all",
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
                        "/collections/all",
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
                          "/collections/all",
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
    </div>
  );
}
