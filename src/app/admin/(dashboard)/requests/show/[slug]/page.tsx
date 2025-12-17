import { getRequestData } from "@/lib/api/requests";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RequestStatusBadge } from "@/components/badge/request-status-badge";
import { MultipleImageView } from "@/components/form/multiple-image-view";
import AdminBreadcrumb from "@/components/breadcrumb/admin-breadcrumb";

import type { Request as RequestType } from "@/types/strapi/models/request";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ContactPlatformBadge } from "@/components/badge/contact-platform-badge";

function generateContactLink(
  platform: RequestType["contactPlatform"],
  contact: string
) {
  switch (platform) {
    case "email":
      return `mailto:${contact}`;
    case "whatsapp":
      return `https://wa.me/${contact.replace(/\D/g, "")}`;
    case "facebook":
      if (contact.startsWith("http") || contact.startsWith("facebook.com")) {
        return contact;
      }
      return `https://www.facebook.com/${contact}`;
    case "instagram":
      if (contact.startsWith("http") || contact.startsWith("instagram.com")) {
        return contact;
      }
      return `https://www.instagram.com/${contact}`;
    default:
      return "#";
  }
}

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
        type="show"
        modelRoute="/admin/requests"
        modelName="Requests"
        title={data.buyerName}
      />

      <div className="flex flex-col gap-3 md:flex-row justify-between">
        <h1 className="text-3xl font-medium mb-5">View {data.buyerName}</h1>
        <Button asChild>
          <Link
            href={generateContactLink(data.contactPlatform, data.contact)}
            prefetch={false}
            target="_blank"
          >
            Open Contact
          </Link>
        </Button>
      </div>
      <Card>
        <CardContent>
          <FieldSet>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-5">
                <Field>
                  <FieldLabel>Buyer Name</FieldLabel>
                  <Input type="text" readOnly value={data.buyerName} />
                </Field>

                <Field>
                  <FieldLabel>Status</FieldLabel>
                  <div>
                    <RequestStatusBadge status={data.requestStatus} />
                  </div>
                </Field>

                <Field>
                  <FieldLabel>Contact Platform</FieldLabel>
                  <div>
                    <ContactPlatformBadge platform={data.contactPlatform} />
                  </div>
                </Field>

                <Field>
                  <FieldLabel>Contact</FieldLabel>
                  <Input type="text" readOnly value={data.contact} />
                </Field>

                <Field>
                  <FieldLabel>Note</FieldLabel>
                  <Textarea readOnly value={data.note || "No note specified"} />
                </Field>

                <Field>
                  <FieldLabel>Reference Image</FieldLabel>
                  <MultipleImageView value={data.referenceImages!} />
                </Field>
              </div>
            </FieldGroup>
          </FieldSet>
        </CardContent>
      </Card>
    </>
  );
}
