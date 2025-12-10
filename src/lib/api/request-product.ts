// "use server";

// import type { ResultContract } from "@/types/api-return";

// interface RequestProductParams {
//   buyerName: string;
//   contact: string;
//   orderItems: {
//     productId: number;
//     quantity: number;
//   }[];
//   note?: string;
// }

// export async function requestProduct(
//   params: RequestProductParams
// ): Promise<ResultContract<null>> {
//   const response = await fetch(
//     `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/orders/new`,
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(params),
//     }
//   );

//   if (!response.ok) {
//     if (response.status === 400) {
//       const { error } = await response.json();
//       return { type: "validation", validation: error };
//     }
//     return { type: "error", message: "An error occurred" };
//   }

//   return { type: "success", data: null };
// }

"use server";

import type { ResultContract } from "@/types/api-return";

interface RequestProductParams {
  buyerName: string;
  contactPlatform: string;
  contact: string;
  referenceImages: any[];
  note?: string;
}

export async function requestProduct(
  params: RequestProductParams
): Promise<ResultContract<null>> {
  const formData = new FormData();

  formData.append("buyerName", params.buyerName);
  formData.append("contactPlatform", params.contactPlatform);
  formData.append("contact", params.contact);

  if (params.note) {
    formData.append("note", params.note);
  }

  params.referenceImages.forEach((image) => {
    if (image instanceof File) {
      formData.append("referenceImages", image);
    }
  });

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/requests`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    if (response.status === 400) {
      const { error } = await response.json();
      return { type: "validation", validation: error };
    }
    return { type: "error", message: "An error occurred" };
  }

  return { type: "success", data: null };
}