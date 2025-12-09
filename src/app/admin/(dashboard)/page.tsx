import { fetchAdmin } from "@/actions/admin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Package,
  Tag,
  XIcon,
  CheckCheck,
  Clock,
  Wrench,
  Calendar,
  TrendingUp,
} from "lucide-react";
import { getGreeting, getCurrentDateTime } from "@/lib/date-time";

import type { DashboardSummary } from "@/types/strapi/api/dashboard-summary";
import type { StrapiResponse } from "@/types/strapi/response";
import type { User } from "@/types/strapi/user";

export default async function Page() {
  const [dashboardResponse, userResponse] = await Promise.all([
    fetchAdmin(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/dashboard-summary`),
    fetchAdmin(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/users/me`),
  ]);

  const { data }: StrapiResponse<DashboardSummary> =
    await dashboardResponse.json();
  const user: User = await userResponse.json();

  const { greeting, dayMessage } = getGreeting();
  const { formattedDate, formattedTime } = getCurrentDateTime();

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-1 gap-3 mb-8">
        <Card className="relative col-span-2 overflow-hidden bg-linear-to-br from-blue-600 to-blue-800 border-none">
          <CardContent className="px-6 h-full min-h-[200px] flex items-center justify-between">
            <div className="flex flex-col gap-30">
              <div className="bg-white/30 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center gap-2 w-fit">
                <Calendar className="size-4 text-white" />
                <span className="text-sm text-white font-medium">
                  {formattedDate} {formattedTime}
                </span>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-1 truncate max-w-110">
                  {greeting}, {user.username}
                </h2>
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

        <Card className="relative col-start-3 overflow-hidden bg-linear-to-br from-blue-600 to-blue-800 border-none">
          <CardContent className="p-6 h-full flex flex-col justify-between min-h-[200px]">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="size-5 text-white" />
              <h3 className="text-lg font-semibold text-white">
                Orders Summary
              </h3>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <span className="text-purple-100 text-sm">Order Products</span>
                <span className="text-2xl font-bold text-white">
                  {data.orderStatus.pending +
                    data.orderStatus.confirmed +
                    data.orderStatus.inProgress +
                    data.orderStatus.completed +
                    data.orderStatus.cancelled}
                </span>
              </div>
              <div className="flex justify-between items-center bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <span className="text-purple-100 text-sm">Active Orders</span>
                <span className="text-2xl font-bold text-white">
                  {data.orderStatus.pending +
                    data.orderStatus.confirmed +
                    data.orderStatus.inProgress}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-2xl font-semibold mb-5">Total Summary</h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 mb-12">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Categories
            </CardTitle>
            <Tag className="size-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalCategories}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Products
            </CardTitle>
            <Package className="size-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalProducts}</div>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-2xl font-semibold mb-5">Order Status Summary</h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-none bg-linear-to-br from-orange-600 to-orange-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm text-white font-medium">
              Pending
            </CardTitle>
            <Clock className="size-4 text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-white font-bold">
              {data.orderStatus.pending}
            </div>
          </CardContent>
        </Card>
        <Card className="border-none bg-linear-to-br from-teal-600 to-teal-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm text-white font-medium">
              Confirmed
            </CardTitle>
            <Package className="size-4 text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-white font-bold">
              {data.orderStatus.confirmed}
            </div>
          </CardContent>
        </Card>
        <Card className="border-none bg-linear-to-br from-blue-600 to-blue-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm text-white font-medium">
              In Progress
            </CardTitle>
            <Wrench className="size-4 text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-white font-bold">
              {data.orderStatus.inProgress}
            </div>
          </CardContent>
        </Card>
        <Card className="border-none bg-linear-to-br from-green-600 to-green-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm text-white font-medium">
              Completed
            </CardTitle>
            <CheckCheck className="size-4 text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-white font-bold">
              {data.orderStatus.completed}
            </div>
          </CardContent>
        </Card>
        <Card className="border-none bg-linear-to-br from-red-600 to-red-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm text-white font-medium">
              Cancelled
            </CardTitle>
            <XIcon className="size-4 text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-white font-bold">
              {data.orderStatus.cancelled}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
