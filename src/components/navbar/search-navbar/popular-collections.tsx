"use client";

import { useState } from "react";
import Link from "next/link";
import { MdOutlineArrowOutward } from "react-icons/md";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Collection } from "@/types/search";

interface PopularCollectionsProps {
  collections: Collection[];
}

export default function PopularCollections({
  collections,
}: PopularCollectionsProps) {
  const [hoveredCollectionId, setHoveredCollectionId] = useState<number | null>(
    null
  );

  return (
    <div className="lg:w-3/8 lg:fixed lg:top-0 lg:right-0 lg:h-full h-auto w-full bg-white px-10 py-10 lg:rounded-3xl text-left mt-1 lg:mt-0">
      <div className="flex flex-col text-left">
        <div>
          <h1 className="text-xl lg:text-5xl font-medium font-rubik text-left">
            POPULAR COLLECTIONS
          </h1>
        </div>
        <ScrollArea className="lg:h-125 mt-4 lg:mt-10 text-left">
          {collections.map((collection) => (
            <div
              key={collection.id}
              className="flex flex-col gap-2 mt-1 lg:mt-3"
            >
              <Link
                href={collection.href}
                onMouseEnter={() => setHoveredCollectionId(collection.id)}
                onMouseLeave={() => setHoveredCollectionId(null)}
                className="flex gap-3 items-center group hover:translate-x-1 transition-transform"
              >
                <div className="p-1 border rounded-full group-hover:border-black transition-colors">
                  <MdOutlineArrowOutward className="lg:w-4 lg:h-4 w-2 h-2" />
                </div>
                <div className="relative overflow-hidden h-9">
                  <div
                    className={`transition-transform duration-300 ${
                      hoveredCollectionId === collection.id
                        ? "-translate-y-9"
                        : "translate-y-0"
                    }`}
                  >
                    <div className="h-9 flex items-center">
                      <h1 className="text-base lg:text-2xl font-rubik font-medium text-left">
                        {collection.name}
                      </h1>
                    </div>
                    <div className="h-9 flex items-center">
                      <h1 className="text-base lg:text-2xl font-rubik font-medium text-left">
                        {collection.name}
                      </h1>
                    </div>
                  </div>
                </div>
              </Link>
              <Separator />
            </div>
          ))}
        </ScrollArea>
      </div>
    </div>
  );
}
