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

export async function fetchImageAsFile(
  url: string,
  filename?: string
): Promise<File> {
  const response = await fetch(url);
  if (!response.ok)
    throw new Error(
      `Failed to fetch image: ${response.status} ${response.statusText}`
    );

  const blob = await response.blob();
  const finalFilename = filename || url.split("/").pop() || "image";

  const file = new File([blob], finalFilename, { type: blob.type });

  return file;
}

export function bytesToMB(bytes: number) {
  return bytes / (1024 * 1024);
}

export function getAvatarInitials(username: string): string {
  if (!username) return "";

  const cleaned = username.trim();
  if (!cleaned) return "";

  const parts = cleaned.split(/\s+/);

  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  if (cleaned.length === 1) {
    return cleaned[0].toUpperCase();
  }

  return (cleaned[0] + cleaned[1]).toUpperCase();
}
