import { subscribersColumn } from "@/config/table-column";
import { getAllSubscribers } from "@/lib/api/subscribers";
import { TableActionProvider } from "@/context/table-action-provider";
import { AdminTable } from "@/components/table/admin-table";

export default async function Page() {
  return (
    <TableActionProvider
      getAction={getAllSubscribers}
      filters={{ email: "$contains" }}
    >
      <AdminTable columns={subscribersColumn} />
    </TableActionProvider>
  );
}
