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
  index,
  link,
}: CollectionsCardProps) {
  const isVariantA = index < 4;
  const isVariantB = index >= 4;

  return (
    <Link href={link} className="group relative block w-1/2 overflow-hidden">
      {isVariantA && (
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
      )}

      {isVariantB && (
        <div className="relative py-6 md:p-2.5 lg:p-6 border-r border-b border-gray-200 cursor-pointer">
          <div
            className={`absolute inset-0 ${bgColor} origin-top scale-y-0 transition-transform duration-500 ease-out pointer-events-none lg:group-hover:scale-y-110`}
          />

          {/* Desktop / Tablet */}
          <div className="hidden relative z-10 md:flex flex-col-reverse md:flex-row items-start gap-y-6 md:gap-x-6 lg:gap-x-8 px-3 py-4 md:px-2 lg:px-8">
            <div className="md:w-40 md:h-40 lg:w-76 lg:h-70 rounded-xl overflow-hidden">
              <img
                src={image}
                alt={title}
                className="md:w-40 md:h-40 lg:w-76 lg:h-70 object-cover rounded-xl transition-transform duration-500 ease-out lg:group-hover:scale-115"
              />
            </div>

            <div className="relative text-center md:text-start z-10">
              <h1 className="text-xl lg:text-2xl font-rubik font-medium">
                {title}
              </h1>
              <p className="text-lg font-inter">{productsCount} Products</p>
            </div>
          </div>

          {/* Mobile */}
          <div className="md:hidden relative z-10 px-3 py-2 rounded-xl flex flex-col gap-y-6 text-center">
            <h1 className="text-xl font-rubik font-medium">{title}</h1>

            <div className="w-full h-46 rounded-xl overflow-hidden">
              <img
                src={image}
                alt={title}
                className="w-full h-46 object-cover rounded-xl transition-transform duration-500 ease-out"
              />
            </div>

            <p className="text-lg font-inter">{productsCount} Products</p>
          </div>
        </div>
      )}
    </Link>
  );
}
