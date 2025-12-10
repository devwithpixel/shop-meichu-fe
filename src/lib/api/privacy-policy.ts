"use server";

import { extendedFetch } from "./base";
import type { StrapiResponse } from "@/types/strapi/response";
import type { PrivacyPolicy } from "@/types/strapi/single-type/privacy-policy";

export async function getPrivacyPolicyData(): Promise<
  StrapiResponse<PrivacyPolicy>
> {
  const res = await extendedFetch("/privacy-policy", {
    init: {
      next: {
        revalidate: 60,
      },
    },
  });
  return await res.json();
}
