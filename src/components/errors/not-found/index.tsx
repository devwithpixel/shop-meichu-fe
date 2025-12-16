import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import ActionButton from "./action-button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-900 font-rubik p-6">
      <h1 className="text-7xl font-extrabold text-indigo-600">404</h1>

      <h2 className="mt-4 text-2xl font-semibold text-gray-800">
        Oops! Page Not Found
      </h2>

      <p className="mt-2 text-gray-600 dark:text-gray-400 text-center">
        The page you're looking for doesn’t exist or has been moved.
      </p>

      <div className="btn-wrap mt-8 flex flex-col sm:flex-row gap-4">
        <Suspense fallback={<Skeleton className="w-64 h-16" />}>
          <ActionButton />
        </Suspense>
      </div>
    </div>
  );
}
