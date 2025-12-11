import { getRequestData } from "@/lib/api/requests";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import AdminBreadcrumb from "@/components/breadcrumb/admin-breadcrumb";
import RequestStatusBadge from "./_components/request-status-badge";
import StrapiImage from "@/components/global/strapi-image";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data } = await getRequestData(slug);

  return (
    <>
      <AdminBreadcrumb
        type="update"
        modelRoute="/admin/requests"
        modelName="Requests"
        title={data.buyerName}
      />

      <h1 className="text-3xl font-medium mb-5">View {data.buyerName}</h1>
      <Card>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            <div>
              <h2 className="text-lg font-medium mb-2">Buyer Name</h2>
              <Input value={data.buyerName} type="text" readOnly />
            </div>
            <div>
              <h2 className="text-lg font-medium mb-2">Contact</h2>
              <Input value={data.contact} type="text" readOnly />
            </div>
            <div>
              <h2 className="text-lg font-medium mb-2">Status</h2>
              <RequestStatusBadge status={data.requestStatus} />
            </div>
            <div>
              <h2 className="text-lg font-medium mb-2">Note</h2>
              <Textarea value={data.note || "No note specified"} readOnly />
            </div>
          </div>
          <div>
            <h2 className="text-lg font-medium mb-2">Reference Image</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {data.referenceImages?.map((image) => (
                <StrapiImage
                  key={image.id}
                  src={image}
                  size="large"
                  alt={""}
                  className="object-cover w-48 h-48 rounded-lg border"
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
