"use client";

import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useFooter } from "@/context/footer-provider";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { subscribeSchema } from "@/schema/subscribers";
import { FooterLink } from "./footer-link";
import { z } from "zod";
import FooterRunningText from "./footer-running-text";

import type { Footer } from "@/types/strapi/components/shared/footer";
import { useCallback } from "react";
import { createSubscriber } from "@/lib/api/subscribers";
import toast from "react-hot-toast";
import { Field, FieldError } from "@/components/ui/field";

const columnClasses = ["lg:col-start-4", "lg:col-start-5", "lg:col-start-6"];

interface FooterProps {
  data: Footer;
}

export default function Footer({ data }: FooterProps) {
  const form = useForm<z.infer<typeof subscribeSchema>>({
    resolver: zodResolver(subscribeSchema),
    defaultValues: {
      email: "",
    },
  });

  const footer = useFooter();

  const onSubmit = useCallback(
    async (formData: z.infer<typeof subscribeSchema>) => {
      const result = await createSubscriber(formData);

      switch (result.type) {
        case "success":
          toast.success("Successfully subscribed!");
          break;
        case "validation":
          toast.error("Validation error");
          break;
        case "error":
          toast.error(result.message);
          break;
      }
    },
    [form]
  );

  return (
    <div
      style={{ backgroundColor: footer?.backgroundColor || "#1C1C1C" }}
      className="text-white"
    >
      <div className="py-16 px-6 font-inter">
        {data.runningText && (
          <FooterRunningText
            fadeColor={footer?.backgroundColor}
            data={data.runningText}
          />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-6 lg:grid-rows-1 gap-8">
          <div className="lg:col-span-2 leading-7">
            <p>{data.description}</p>

            <div className="mt-8 w-full">
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <Controller
                  name="email"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <div className="flex items-center border border-white/40 hover:border-white transition-colors p-1 rounded-full">
                        <Input
                          {...field}
                          type="email"
                          required
                          placeholder="Email"
                          className="rounded-full bg-transparent text-white border-none h-12 px-6 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-white/50"
                        />
                        <Button
                          type="submit"
                          className="rounded-full bg-white h-12 px-10 text-lg text-gray-900 font-semibold hover:bg-white/90"
                        >
                          Subscribe
                        </Button>
                      </div>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </form>
            </div>
          </div>

          <Separator
            orientation="vertical"
            className="hidden lg:block h-44 mx-auto bg-white/20 lg:col-start-3"
          />

          {data.navigationGroups?.map((group, index) => (
            <div
              key={group.id}
              className={`hidden lg:block space-y-6 ${columnClasses[index]}`}
            >
              <h1 className="font-semibold text-xl">{group.title}</h1>
              <ul className="space-y-2 text-white/70">
                {group.navigations?.map((navigation) => (
                  <li key={navigation.id}>
                    <FooterLink
                      href={navigation.url}
                      title={navigation.title}
                      icon={false}
                    />
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {data.socialMedia && (
            <div
              className={`hidden lg:block space-y-6 lg:col-start-6 ${columnClasses[data.navigationGroups?.length || 0]}`}
            >
              <h1 className="font-semibold text-xl">Follow us on</h1>
              <ul className="space-y-2 text-white/70">
                {data.socialMedia.map((socialMedia) => (
                  <li key={socialMedia.id}>
                    <FooterLink
                      href={socialMedia.url}
                      title={socialMedia.media}
                      icon
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="lg:hidden lg:col-span-4">
            <Accordion type="single" collapsible className="w-full">
              {data.navigationGroups?.map((group) => (
                <AccordionItem
                  key={group.id}
                  value={group.title}
                  className="border-white/20"
                >
                  <AccordionTrigger className="text-xl font-semibold hover:no-underline">
                    {group.title}
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-white/70 pt-2">
                      {group.navigations?.map((navigation) => (
                        <li key={navigation.id}>
                          <FooterLink
                            href={navigation.url}
                            title={navigation.title}
                          />
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
              {data.socialMedia && (
                <AccordionItem value="social" className="border-white/20">
                  <AccordionTrigger className="text-xl font-semibold hover:no-underline">
                    Follow us on
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-white/70 pt-2">
                      {data.socialMedia.map((socialMedia) => (
                        <li key={socialMedia.id}>
                          <FooterLink
                            href={socialMedia.url}
                            title={socialMedia.media}
                            icon
                          />
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              )}
            </Accordion>
          </div>
        </div>
      </div>

      <div
        style={{ backgroundColor: footer?.backgroundColor || "#1C1C1C" }}
        className="text-center py-4 text-white text-sm"
      >
        © {new Date().getFullYear()} Meichu. Powered by Pixel
      </div>
    </div>
  );
}
