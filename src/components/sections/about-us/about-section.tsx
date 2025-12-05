import StrapiImage from "@/components/global/strapi-image";
import { splitText } from "@/lib/splitText";
import { useMemo } from "react";

import type { StrapiImage as StrapiImageType } from "@/types/strapi/media/image";

interface AboutSectionProps {
  content: string;
  image: StrapiImageType;
  title: string;
  description?: string;
}

export default function AboutSection({
  content,
  image,
  title,
  description,
}: AboutSectionProps) {
  const titleWordCount = useMemo(() => title.split(" ").length, [title]);
  const [firstWord, restWord] = useMemo(
    () => splitText(title, titleWordCount - 1),
    [title]
  );

  return (
    <div className="bg-white pt-8 md:pt-16 space-y-8 md:space-y-20">
      <p className="font-rubik font-medium text-xl md:text-2xl lg:text-4xl px-6 md:px-30 lg:px-50 text-center">
        {content}
      </p>

      <div className="bg-gray-200 flex flex-col md:flex-row items-start justify-center md:gap-x-6 lg:gap-x-14">
        <div className="w-screen md:w-1/2 px-6 pt-10 md:px-6 md:py-16 lg:px-16 lg:py-16">
          <StrapiImage
            src={image}
            alt="Message Image"
            size="large"
            className="w-full md:h-90 lg:h-130 md:w-166 object-cover rounded-2xl"
          />
        </div>

        <div className="w-screen md:w-1/2 px-6 pt-5 pb-8 md:pb-0 md:px-6 md:py-16 lg:px-16 lg:py-16 font-rubik space-y-2 md:space-y-6">
          <h1 className="font-medium text-2xl md:text-3xl lg:text-5xl lg:leading-13.5">
            {firstWord}
            <span className="text-transparent text-outline-black">
              {" "}
              {restWord}
            </span>
          </h1>

          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}
