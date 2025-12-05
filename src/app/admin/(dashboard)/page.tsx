import { fetchAdmin } from "@/actions/admin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Tag, XIcon, CheckCheck, Clock, Wrench } from "lucide-react";

import type { DashboardSummary } from "@/types/strapi/api/dashboard-summary";
import type { StrapiResponse } from "@/types/strapi/response";

export default async function Page() {
  const response = await fetchAdmin(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/dashboard-summary`
  );
  const { data }: StrapiResponse<DashboardSummary> = await response.json();

  return (
    <>
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
        <Card className="border-orange-500 bg-orange-900">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="size-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.orderStatus.pending}</div>
          </CardContent>
        </Card>
        <Card className="border-teal-500 bg-teal-900">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Confirmed</CardTitle>
            <Package className="size-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data.orderStatus.confirmed}
            </div>
          </CardContent>
        </Card>
        <Card className="border-blue-500 bg-blue-900">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Wrench className="size-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data.orderStatus.inProgress}
            </div>
          </CardContent>
        </Card>
        <Card className="border-green-500 bg-green-900">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCheck className="size-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data.orderStatus.completed}
            </div>
          </CardContent>
        </Card>
        <Card className="border-red-500 bg-red-900">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cancelled</CardTitle>
            <XIcon className="size-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data.orderStatus.cancelled}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
