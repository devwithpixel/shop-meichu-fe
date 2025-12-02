import CollectionsCard from "@/components/card/collections-card";
import HeaderPage from "@/components/header/header-page";
import ScrollSmootherWrapper from "@/components/ScrollSmootherWrapper";

export default function CollectionsAllPage() {
  const collections = [
    {
      id: 1,
      title: "SPORTS JACKET",
      image: "/assets/gallery/girl3.jpg",
      productsCount: 6,
      bgColor: "bg-gray-100",
    },
    {
      id: 2,
      title: "SPORTS WEAR",
      image: "/assets/gallery/girl4.jpg",
      productsCount: 8,
      bgColor: "bg-green-200",
    },
    {
      id: 3,
      title: "SUMMER DRIFT",
      image: "/assets/gallery/girl3.jpg",
      productsCount: 8,
      bgColor: "bg-purple-200",
    },
    {
      id: 4,
      title: "SUMMER ESSENTIALS",
      image: "/assets/gallery/girl4.jpg",
      productsCount: 13,
      bgColor: "bg-orange-200",
    },
  ];
  return (
    <ScrollSmootherWrapper>
      <div className="bg-white overflow-x-hidden">
        <HeaderPage
          type="collections"
          img="/assets/gallery/girl3.jpg"
          title="SEASONAL MUST-HAVES"
          desc="Elevate your wardrobe with the latest essentials tailored for the season—handpicked styles
                      that blend comfort, trend, and timeless appeal."
        />
        <div className="flex flex-wrap w-screen">
          {collections.map((collec) => (
            <CollectionsCard
              key={collec.id}
              title={collec.title}
              image={collec.image}
              productsCount={collec.productsCount}
              bgColor={collec.bgColor}
            />
          ))}
        </div>
      </div>
    </ScrollSmootherWrapper>
  );
}
