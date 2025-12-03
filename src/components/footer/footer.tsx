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
import { FooterLink } from "./footer-link";
import { Skeleton } from "@/components/ui/skeleton";
import FooterRunningText from "./footer-running-text";
import useSWR from "swr";

import type { Footer } from "@/types/strapi/components/shared/footer";
import type { StrapiResponse } from "@/types/strapi/response";

const fetcher = (url: string) =>
  fetch(url).then((r) => r.json() as Promise<StrapiResponse<Footer>>);

const columnClasses = ["lg:col-start-4", "lg:col-start-5", "lg:col-start-6"];

export default function Footer() {
  const {
    data: response,
    error,
    isLoading,
  } = useSWR(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/global/footer`,
    fetcher
  );

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <Skeleton className="h-64" />;

  const data = response!.data;

  return (
    <div className="bg-carbon text-white">
      {data.runningText && <FooterRunningText data={data.runningText} />}

      <div className="py-16 px-6 font-inter">
        <div className="grid grid-cols-1 lg:grid-cols-6 lg:grid-rows-1 gap-8">
          <div className="lg:col-span-2 leading-7">
            <p>{data.description}</p>

            <div className="mt-8 w-full">
              <div className="flex items-center border border-white/40 hover:border-white transition-colors p-1 rounded-full">
                <Input
                  placeholder="Email"
                  className="rounded-full bg-transparent text-white border-none h-12 px-6 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-white/50"
                />
                <Button className="rounded-full bg-white h-12 px-10 text-lg text-gray-900 font-semibold hover:bg-white/90">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>

          <Separator
            orientation="vertical"
            className="hidden lg:block h-44 mx-auto bg-white/20 lg:col-start-3"
          />

          {data.navigationGroups?.map((group, index) => (
            <div
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

      <div className="text-center py-4 bg-blackfull text-white text-sm">
        © {new Date().getFullYear()} Meichu. Powered by Pixel
      </div>
    </div>
  );
}
