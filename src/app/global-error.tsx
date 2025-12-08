"use client";

import "@/styles/user-space.css";
import { useEffect } from "react";
import { ErrorComponent } from "@/components/errors/error";

export default function GlobalError({
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
    <html>
      <body>
        <ErrorComponent
          title="Application Error"
          message="A critical error occurred. Please refresh the page."
          reset={reset}
        />
      </body>
    </html>
  );
}
