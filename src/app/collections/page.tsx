import CollectionsCard from "@/components/card/collections-card";
import Footer from "@/components/footer/footer";
import HeaderPage from "@/components/header/header-page";
import ScrollSmootherWrapper from "@/components/ScrollSmootherWrapper";

const headerData = {
  type: "collections",
  img: "/assets/gallery/girl3.jpg",
  title: "SEASONAL MUST-HAVES",
  desc: "Elevate your wardrobe with the latest essentials tailored for the season—handpicked styles that blend comfort, trend, and timeless appeal.",
} as const;

const collections = [
  {
    id: 1,
    title: "SPORTS JACKET",
    image: "/assets/gallery/girl3.jpg",
    productsCount: 6,
    bgColor: "bg-gray-200",
    link: "/collections/sports",
  },
  {
    id: 2,
    title: "SPORTS WEAR",
    image: "/assets/gallery/girl4.jpg",
    productsCount: 8,
    bgColor: "bg-green-200",
    link: "/collections/sports",
  },
  {
    id: 3,
    title: "SUMMER DRIFT",
    image: "/assets/gallery/girl3.jpg",
    productsCount: 8,
    bgColor: "bg-purple-200",
    link: "/collections/sports",
  },
  {
    id: 4,
    title: "SUMMER DRIFT",
    image: "/assets/gallery/girl4.jpg",
    productsCount: 13,
    bgColor: "bg-orange-200",
    link: "/collections/sports",
  },
  {
    id: 5,
    title: "SUMMER ESSENTIALS",
    image: "/assets/gallery/girl4.jpg",
    productsCount: 13,
    bgColor: "bg-orange-200",
    link: "/collections/sports",
  },
  {
    id: 6,
    title: "SUMMER ESSENTIALS",
    image: "/assets/gallery/girl3.jpg",
    productsCount: 13,
    bgColor: "bg-orange-200",
    link: "/collections/sports",
  },
  {
    id: 7,
    title: "SUMMER ESSENTIALS",
    image: "/assets/gallery/girl4.jpg",
    productsCount: 13,
    bgColor: "bg-orange-200",
    link: "/collections/sports",
  },
  {
    id: 8,
    title: "SUMMER ESSENTIALS",
    image: "/assets/gallery/girl3.jpg",
    productsCount: 13,
    bgColor: "bg-orange-200",
    link: "/collections/sports",
  },
];

export default function CollectionsAllPage() {
  return (
    <ScrollSmootherWrapper>
      <div className="bg-white">
        <HeaderPage
          type={headerData.type}
          img={headerData.img}
          title={headerData.title}
          desc={headerData.desc}
        />
        <div className="flex flex-wrap w-screen">
          {collections.map((collec, index) => (
            <CollectionsCard
              key={collec.id}
              index={index}
              title={collec.title}
              image={collec.image}
              productsCount={collec.productsCount}
              bgColor={collec.bgColor}
              link={collec.link}
            />
          ))}
        </div>
        <Footer />
      </div>
      <Footer/>
    </ScrollSmootherWrapper>
  );
}
