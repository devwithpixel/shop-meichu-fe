import { useMemo } from "react";

const typeClassTemplate = {
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
  img: string;
  title: string;
  desc: string;
}

export default function HeaderPage({
  type,
  img,
  title,
  desc,
}: HeaderPageProps) {
  const typeClass = useMemo(() => typeClassTemplate[type], [type]);
  return (
    <div className="w-screen relative flex items-center">
      <div>
        <img
          src={img}
          className="h-62 md:h-74 w-screen object-cover"
          alt={type}
        />
      </div>
      <div
        className={`absolute w-screen ${typeClass.text} flex flex-col ${typeClass.aligns} font-rubik px-5 text-white space-y-3`}
      >
        <h1 className="text-3xl md:text-5xl font-semibold">{title}</h1>
        <p className="md:max-w-2/3 lg:max-w-1/2">{desc}</p>
      </div>
    </div>
  );
}
