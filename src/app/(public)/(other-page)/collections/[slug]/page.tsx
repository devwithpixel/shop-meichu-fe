import { getCategoryData } from "@/lib/api/categories";
import { getProductsByCategory } from "@/lib/api/products";
import { notFound } from "next/navigation";
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
import SetFooter from "./_components/set-footer";
import Link from "next/link";

import type { Metadata } from "next";
import type { SearchParams } from "nuqs/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { data: category } = await getCategoryData(slug);

  if (!category)
    return {
      title: "Not Found",
    };

  return {
    title: `${category.name} – Shop Meichu`,
  };
}

export default async function CollectionsPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<SearchParams>;
}) {
  const { page, perPage } = await paginationLoader(searchParams);
  const currentPage = Math.max(1, page);
  const currentPerPage = Math.max(1, perPage);

  const { slug } = await params;
  const { data: products, meta } = await getProductsByCategory(slug, {
    populate: "*",
    pagination: {
      page: currentPage,
      pageSize: currentPerPage,
      withCount: true,
    },
  });
  const { data: category } = await getCategoryData(slug);

  if (!category || !products) {
    return notFound();
  }

  const pagination = meta?.pagination;
  const totalPages = pagination?.pageCount || 1;
  const pageNumbers = getPageNumbers(currentPage, totalPages);

  return (
    <div className="bg-[#D9E4E8]">
      <HeaderPage
        type="collections"
        image={category.heading?.thumbnail}
        title={category.heading!.title}
        desc={category.heading!.description}
      />
      <SetFooter backgroundColor={category.backgroundColor} />

      <div className="relative">
        <IconElement variant={2} />
        <div className="px-5 py-10 space-y-6 md:space-y-14 h-full">
          <Link href="/collections">
            <button className="z-10 mb-12 px-5 py-1.5 bg-black text-white flex items-center justify-center gap-2 rounded-full">
              All Collections
            </button>
          </Link>

          <div className="flex items-center justify-center md:justify-start lg:justify-start flex-wrap gap-y-14 md:gap-y-14 lg:gap-y-14 gap-2 md:gap-5.5 lg:gap-4 pb-6 overflow-x-scroll lg:overflow-x-visible">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} size="lg" />
            ))}
          </div>
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
                        `/collections/${slug}`,
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
                      `/collections/${slug}`,
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
                        `/collections/${slug}`,
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
