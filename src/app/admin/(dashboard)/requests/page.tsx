import { requestsColumn } from "@/config/table-column";
import { getAllRequests } from "@/lib/api/requests";
import { TableActionProvider } from "@/context/table-action-provider";
import { AdminHeader } from "@/components/layout/header/admin-header";
import { AdminTable } from "@/components/table/admin-table";

export default async function Page() {
  return (
    <>
      <AdminHeader title="Requests" />
      <TableActionProvider
        getAction={getAllRequests}
        filters={{
          buyerName: "$contains",
          contact: "$contains",
          requestStatus: "$eq",
        }}
      >
        <AdminTable columns={requestsColumn} />
      </TableActionProvider>
    </>
  );
}
