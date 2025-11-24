import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith("image/")) {
      reject(new Error("File is not an image"));
      return;
    }
    const reader = new FileReader();

    reader.onload = (e) => {
      resolve(e.target!.result as string);
    };

    reader.onerror = () => {
      reject(new Error("Failed to read file"));
    };

    reader.readAsDataURL(file);
  });
}

/**
 * Converts a base64 string to a File object
 * @param {string} base64 - The base64 string (with or without data URL prefix)
 * @param {string} filename - The desired filename
 * @param {string} mimeType - Optional MIME type (auto-detected from data URL if not provided)
 * @returns {File} The File object
 */
export function base64ToFile(
  base64: string,
  filename: string,
  mimeType: string | null = null
) {
  let base64Data = base64;
  let detectedMimeType = mimeType;

  if (base64.startsWith("data:")) {
    const matches = base64.match(/^data:([^;]+);base64,(.+)$/);
    if (matches) {
      detectedMimeType = detectedMimeType || matches[1];
      base64Data = matches[2];
    }
  }

  const binaryString = atob(base64Data);
  const bytes = new Uint8Array(binaryString.length);

  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  return new File([bytes], filename, {
    type: detectedMimeType || "application/octet-stream",
  });
}

export function formatCurrency(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "IDR",
  }).format(price);
}
