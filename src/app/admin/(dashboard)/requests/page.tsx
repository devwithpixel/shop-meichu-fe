import { requestsColumn } from "@/config/table-column";
import { getAllRequests } from "@/lib/api/requests";
import { TableActionProvider } from "@/context/table-action-provider";
import { AdminTable } from "@/components/table/admin-table";

export default async function Page() {
  return (
    <TableActionProvider getAction={getAllRequests}>
      <AdminTable columns={requestsColumn} />
    </TableActionProvider>
  );
}
