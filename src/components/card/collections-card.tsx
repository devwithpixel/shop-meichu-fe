import Link from "next/link";

interface CollectionsCardProps {
  title: string;
  image: string;
  productsCount: number;
  bgColor: string;
  index: number;
  link: string;
}

export default function CollectionsCard({
  title,
  image,
  productsCount,
  bgColor,
  link,
}: CollectionsCardProps) {
  return (
    <Link href={link} className="group relative block w-1/2 overflow-hidden">
      <div className="relative py-8 border-r border-b border-gray-200 text-center font-rubik font-medium text-xl md:text-2xl lg:text-3xl space-y-4 lg:space-y-10 cursor-pointer">
        <div
          className={`absolute inset-0 ${bgColor} origin-top scale-y-0 transition-transform duration-500 ease-out pointer-events-none lg:group-hover:scale-y-110`}
        />

        <h1 className="relative z-10 transition-all duration-300 ease-out lg:group-hover:-translate-y-6 lg:group-hover:opacity-0">
          {title}
        </h1>

        <div className="relative z-10 flex items-center justify-center">
          <img
            src={image}
            className="w-full h-46 md:h-110 lg:w-106 lg:h-116 px-3 lg:px-0 object-cover rounded-3xl lg:rounded-2xl transition-transform duration-500 ease-out lg:group-hover:scale-115"
            alt={title}
          />

          <h1 className="absolute text-white opacity-0 translate-y-6 transition-all duration-300 ease-out lg:group-hover:opacity-100 lg:group-hover:translate-y-0">
            {title}
          </h1>
        </div>

        <p className="font-inter font-normal md:text-xl lg:text-2xl relative z-10">
          {productsCount} Products
        </p>
      </div>
    </Link>
  );
}
