"use server";

import { extendedFetchWithAuth } from "./base";
import type { ResultContract } from "@/types/api-return";
import type { StrapiImage } from "@/types/strapi/media/image";

export async function createImage(
  file: File | File[]
): Promise<ResultContract<StrapiImage[]>> {
  const formData = new FormData();

  if (file instanceof File) {
    formData.set("files", file);
  } else {
    file.forEach((file) => {
      formData.append("files", file);
    });
  }

  const response = await extendedFetchWithAuth("/upload", {
    init: {
      method: "POST",
      body: formData,
    },
  });

  if (!response.ok) {
    if (response.status === 400) {
      const { error } = await response.json();
      return { type: "validation", validation: error };
    }

    return { type: "error", message: "An error occurred" };
  }

  return { type: "success", data: await response.json() };
}
