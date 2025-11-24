import type { StrapiPagination } from "./pagination";

export interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: StrapiPagination;
  };
}
