import { getDashboardSummary } from "@/lib/api/dashboard-summary";
import { getCurrentUser } from "@/lib/api/user";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Package,
  Tag,
  Calendar,
  ClockIcon,
  XIcon,
  CheckCheckIcon,
  CheckIcon,
  MailIcon,
} from "lucide-react";
import { getGreeting, getCurrentDateTime } from "@/lib/greets";
import { Suspense } from "react";
import { AdminHeader } from "@/components/layout/header/admin-header";
import { StatCard } from "@/components/card/stat-card";

export default async function Page() {
  const [{ data: summaryData }, user] = await Promise.all([
    getDashboardSummary(),
    getCurrentUser(),
  ]);

  const { greeting, dayMessage } = getGreeting();
  const { formattedDate, formattedTime } = getCurrentDateTime();

  return (
    <>
      <AdminHeader title="Dashboard" className="mb-5" />
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
        <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-12">
          <StatCard
            title="Total Categories"
            value={summaryData.totalCategories}
            href="/admin/categories"
            Icon={Tag}
            cardClassName="border-blue-500/20 bg-blue-500/20 dark:bg-blue-700/20"
            textClassName="text-blue-600 dark:text-blue-100"
            iconClassName="border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400"
          />

          <StatCard
            title="Total Products"
            value={summaryData.totalProducts}
            href="/admin/products"
            Icon={Package}
            cardClassName="border-purple-500/20 bg-purple-500/20 dark:bg-purple-700/20"
            textClassName="text-purple-600 dark:text-purple-100"
            iconClassName="border-purple-500/20 bg-purple-500/10 text-purple-600 dark:text-purple-400"
          />

          <StatCard
            title="Total Subscribers"
            href="/admin/subscribers"
            value={summaryData.totalSubscribers}
            Icon={MailIcon}
            cardClassName="border-orange-500/20 bg-orange-500/20 dark:bg-orange-700/20"
            textClassName="text-orange-600 dark:text-orange-100"
            iconClassName="border-orange-500/20 bg-orange-500/10 text-orange-600 dark:text-orange-400"
          />

          <StatCard
            title="Total Requests"
            value={summaryData.totalRequests}
            Icon={Package}
            href="/admin/requests"
            cardClassName="border-indigo-500/20 bg-indigo-500/20 dark:bg-indigo-700/20"
            textClassName="text-indigo-600 dark:text-indigo-100"
            iconClassName="border-indigo-500/20 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
          />
        </div>
      </Suspense>

      <h2 className="text-2xl font-semibold mb-5">Requests</h2>
      <Suspense fallback={<Skeleton className="h-16 w-full" />}>
        <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-12">
          <StatCard
            title="Pending"
            value={summaryData.requests.requestsPending}
            href="/admin/requests?requestStatus=pending"
            Icon={Tag}
            cardClassName="border-amber-500/20 bg-amber-500/20 dark:bg-amber-700/20"
            textClassName="text-amber-600 dark:text-amber-100"
            iconClassName="border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400"
          />

          <StatCard
            title="Confirmed"
            value={summaryData.requests.requestsConfirmed}
            href="/admin/requests?requestStatus=confirmed"
            Icon={CheckIcon}
            cardClassName="border-teal-500/20 bg-teal-500/20 dark:bg-teal-700/20"
            textClassName="text-teal-600 dark:text-teal-100"
            iconClassName="border-teal-500/20 bg-teal-500/10 text-teal-600 dark:text-teal-400"
          />

          <StatCard
            title="In Progress"
            value={summaryData.requests.requestsInProgress}
            href="/admin/requests?requestStatus=in_progress"
            Icon={ClockIcon}
            cardClassName="border-yellow-500/20 bg-yellow-500/20 dark:bg-yellow-700/20"
            textClassName="text-yellow-600 dark:text-yellow-100"
            iconClassName="border-yellow-500/20 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400"
          />

          <StatCard
            title="Completed"
            value={summaryData.requests.requestsCompleted}
            href="/admin/requests?requestStatus=completed"
            Icon={CheckCheckIcon}
            cardClassName="border-green-500/20 bg-green-500/20 dark:bg-green-700/20"
            textClassName="text-green-600 dark:text-green-100"
            iconClassName="border-green-500/20 bg-green-500/10 text-green-600 dark:text-green-400"
          />

          <StatCard
            title="Cancelled"
            value={summaryData.requests.requestsCancelled}
            Icon={XIcon}
            href="/admin/requests?requestStatus=cancelled"
            cardClassName="border-red-500/20 bg-red-500/20 dark:bg-red-700/20"
            textClassName="text-red-600 dark:text-red-100"
            iconClassName="border-red-500/20 bg-red-500/10 text-red-600 dark:text-red-400"
          />
        </div>
      </Suspense>
    </>
  );
}
