"use client";

import "@/styles/user-space.css";
import { useEffect } from "react";
import { ErrorComponent } from "@/components/errors/error";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <ErrorComponent
      title="Something went wrong"
      message={
        process.env.NODE_ENV === "development"
          ? error.message
          : "An unexpected error occurred. Please try again."
      }
      reset={reset}
    />
  );
}
