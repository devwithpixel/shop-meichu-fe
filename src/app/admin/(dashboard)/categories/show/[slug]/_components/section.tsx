import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import {
  ColorPicker,
  ColorPickerSwatch,
  ColorPickerTrigger,
} from "@/components/ui/color-picker";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { MultipleImageView } from "@/components/form/multiple-image-view";
import { LinkIcon } from "lucide-react";
import StrapiImage from "@/components/global/strapi-image";
import Link from "next/link";

import type { Category } from "@/types/strapi/models/category";
import type { Product } from "@/types/strapi/models/product";

export function ShowCategoryForm({
  data,
  products,
}: {
  data: Category;
  products: Product[];
}) {
  return (
    <Card>
      <CardContent>
        <FieldSet>
          <FieldGroup className="mb-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field>
                <FieldLabel>Name</FieldLabel>
                <Input type="text" readOnly value={data.name} />
              </Field>

              <Field>
                <FieldLabel>Background Color</FieldLabel>
                <ColorPicker
                  value={data.backgroundColor}
                  defaultFormat="hex"
                  format="hex"
                  readOnly
                >
                  <div className="flex items-center gap-3">
                    <ColorPickerTrigger disabled asChild>
                      <Button
                        variant="outline"
                        className="justify-start w-full"
                      >
                        <ColorPickerSwatch className="size-4" />
                        {data.backgroundColor}
                      </Button>
                    </ColorPickerTrigger>
                  </div>
                </ColorPicker>
              </Field>

              <Field>
                <FieldLabel>Thumbnail</FieldLabel>
                <MultipleImageView value={[data.thumbnail!]} />
              </Field>
              <Field>
                <FieldLabel>Products</FieldLabel>
                <ScrollArea className="h-64">
                  <div className="space-y-3">
                    {products.map((product) => (
                      <div
                        key={product.id}
                        className="flex justify-between border p-2 rounded-lg bg-card text-sm font-medium"
                      >
                        <Link
                          href={`/products/${product.slug}`}
                          className="w-full flex items-center gap-3 "
                        >
                          <StrapiImage
                            src={product.images?.[0]}
                            alt={product.name}
                            size="thumbnail"
                            className="w-8 h-8 object-cover rounded-lg"
                          />
                          {product.name}
                        </Link>
                        <Button variant="outline" asChild>
                          <Link href={`/admin/products/edit/${product.slug}`}>
                            <LinkIcon />
                          </Link>
                        </Button>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </Field>
            </div>
          </FieldGroup>
          <Accordion
            type="single"
            collapsible
            className="w-full border rounded-lg p-4"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-xl font-semibold p-0">
                Heading
              </AccordionTrigger>
              <AccordionContent>
                <FieldGroup className="mt-5">
                  <Field>
                    <FieldLabel>Title</FieldLabel>
                    <Input type="text" readOnly value={data.heading!.title} />
                  </Field>

                  <Field>
                    <FieldLabel>Description</FieldLabel>
                    <Textarea readOnly value={data.heading!.description} />
                  </Field>

                  <Field>
                    <FieldLabel>Thumbnail</FieldLabel>
                    <MultipleImageView value={[data.heading!.thumbnail!]} />
                  </Field>
                </FieldGroup>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </FieldSet>
      </CardContent>

      <CardFooter>
        <Field orientation="horizontal">
          <Button type="button" variant="outline" asChild>
            <Link href="/admin/categories/create">Create</Link>
          </Button>
          <Button type="button" variant="outline" asChild>
            <Link href={`/admin/categories/edit/${data.slug}`}>Edit</Link>
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
