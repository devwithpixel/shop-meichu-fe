"use server";

import { extendedFetchWithAuth } from "./base";
import type { User } from "@/types/strapi/user";

export async function getCurrentUser(): Promise<User> {
  const response = await extendedFetchWithAuth("/users/me", {
    init: {
      next: {
        revalidate: 0,
      },
    },
    populate: "role",
  });

  return await response.json();
}
