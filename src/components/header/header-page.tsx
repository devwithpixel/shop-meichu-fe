import StrapiImage from "@/components/global/strapi-image";
import type { StrapiImage as StrapiImageType } from "@/types/strapi/media/image";

const typeClassTemplate: Record<
  "collections" | "about",
  { aligns: string; text: string }
> = {
  collections: {
    aligns: "items-start",
    text: "text-start",
  },
  about: {
    aligns: "items-center",
    text: "text-center",
  },
};

interface HeaderPageProps {
  type: "collections" | "about";
  title: string;
  desc: string;
  image?: StrapiImageType;
}

export default function HeaderPage({
  type,
  title,
  desc,
  image,
}: HeaderPageProps) {
  const typeClass = typeClassTemplate[type];

  return (
    <section className="w-full relative">
      <StrapiImage
        src={image}
        className="h-62 md:h-74 w-full object-cover"
        alt="Header image"
        size="large"
      />
      <div
        className={`top-1/2 left-1/2 -translate-1/2 absolute ${typeClass.text} ${typeClass.aligns} font-albert-sans px-5 text-white space-y-3`}
      >
        <h1 className="text-3xl md:text-5xl font-bold">{title}</h1>
        <p className="md:max-w-2/3 lg:max-w-1/2">{desc}</p>
      </div>
    </section>
  );
}
