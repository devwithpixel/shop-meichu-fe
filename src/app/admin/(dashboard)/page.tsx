import { getDashboardSummary } from "@/lib/api/dashboard-summary";
import { getCurrentUser } from "@/lib/api/user";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Tag, Calendar } from "lucide-react";
import { getGreeting, getCurrentDateTime } from "@/lib/greets";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default async function Page() {
  const [{ data: summaryData }, user] = await Promise.all([
    getDashboardSummary(),
    getCurrentUser(),
  ]);

  const { greeting, dayMessage } = getGreeting();
  const { formattedDate, formattedTime } = getCurrentDateTime();

  return (
    <>
      <Card className="mb-8 relative overflow-hidden bg-linear-to-br from-blue-600 to-blue-800 border-none">
        <CardContent className="px-6 flex items-center justify-between">
          <div className="flex flex-col gap-30">
            <div className="bg-white/30 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center gap-2 w-fit">
              <Calendar className="size-4 text-white" />
              <span className="text-sm text-white font-medium">
                {formattedDate} {formattedTime}
              </span>
            </div>

            <div>
              <Suspense>
                <h2 className="text-2xl font-bold text-white mb-1 truncate max-w-110">
                  {greeting}, {user.username}
                </h2>
              </Suspense>
              <p className="text-blue-100 text-sm">{dayMessage}</p>
            </div>
          </div>

          <div className="w-62 h-62 flex items-center justify-center shrink-0">
            <img
              src="/assets/illustration/design.png"
              alt="Design Illustration"
              className="w-full h-full object-contain"
            />
          </div>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-semibold mb-5">Total Summary</h2>
      <Suspense fallback={<Skeleton className="h-16 w-full" />}>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 mb-12">
          <Card className="bg-blue-100 dark:bg-blue-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Categories
              </CardTitle>
              <Tag className="size-4" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-100">
                {summaryData.totalCategories}
              </p>
            </CardContent>
          </Card>
          <Card className="bg-purple-100 dark:bg-purple-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Products
              </CardTitle>
              <Package className="size-4" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-100">
                {summaryData.totalProducts}
              </p>
            </CardContent>
          </Card>
          <Card className="bg-orange-100 dark:bg-orange-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Subscribers
              </CardTitle>
              <Package className="size-4" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-orange-600 dark:text-orange-100">
                {summaryData.totalSubscribers}
              </p>
            </CardContent>
          </Card>
          <Card className="bg-indigo-100 dark:bg-indigo-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Requests
              </CardTitle>
              <Package className="size-4" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-100">
                {summaryData.totalRequests}
              </p>
            </CardContent>
          </Card>
        </div>
      </Suspense>
    </>
  );
}
