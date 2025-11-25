import TrendingProduct from "../card/trending-product";

export default function FakeSection() {
  const products = [
    {
      id: 1,
      title: "Full Sleeve Round Neck T-shirt",
      price: 4400,
      images: {
        front: "/assets/image/arya/arya-green.png",
        hover: "/assets/image/arya/arya-hover.png",
      },
      sizes: ["S", "M", "L"],
      colors: [
        {
          label: "Green",
          bgImg: "/assets/image/arya/arya-green.png",
          bgColor: "bg-green-500",
        },
        {
          label: "Orange",
          bgImg: "/assets/image/arya/arya-orange.png",
          bgColor: "bg-orange-500",
        },
        {
          label: "Blue",
          bgImg: "/assets/image/arya/arya-blue.png",
          bgColor: "bg-blue-500",
        },
        {
          label: "Navy ",
          bgImg: "/assets/image/arya/arya-deepblue.png",
          bgColor: "bg-blue-900",
        },
      ],
    },
    {
      id: 1,
      title: "Full Sleeve Round Neck T-shirt",
      price: 4400,
      images: {
        front: "/assets/image/arya/arya-green.png",
        hover: "/assets/image/arya/arya-hover.png",
      },
      sizes: ["S", "M", "L"],
      colors: [
        {
          label: "Green",
          bgImg: "/assets/image/arya/arya-green.png",
          bgColor: "bg-green-500",
        },
        {
          label: "Orange",
          bgImg: "/assets/image/arya/arya-orange.png",
          bgColor: "bg-orange-500",
        },
        {
          label: "Blue",
          bgImg: "/assets/image/arya/arya-blue.png",
          bgColor: "bg-blue-500",
        },
        {
          label: "Navy ",
          bgImg: "/assets/image/arya/arya-deepblue.png",
          bgColor: "bg-blue-900",
        },
      ],
    },
    {
      id: 1,
      title: "Full Sleeve Round Neck T-shirt",
      price: 4400,
      images: {
        front: "/assets/image/arya/arya-green.png",
        hover: "/assets/image/arya/arya-hover.png",
      },
      sizes: ["S", "M", "L"],
      colors: [
        {
          label: "Green",
          bgImg: "/assets/image/arya/arya-green.png",
          bgColor: "bg-green-500",
        },
        {
          label: "Orange",
          bgImg: "/assets/image/arya/arya-orange.png",
          bgColor: "bg-orange-500",
        },
        {
          label: "Blue",
          bgImg: "/assets/image/arya/arya-blue.png",
          bgColor: "bg-blue-500",
        },
        {
          label: "Navy ",
          bgImg: "/assets/image/arya/arya-deepblue.png",
          bgColor: "bg-blue-900",
        },
      ],
    },
    {
      id: 1,
      title: "Full Sleeve Round Neck T-shirt",
      price: 4400,
      images: {
        front: "/assets/image/arya/arya-green.png",
        hover: "/assets/image/arya/arya-hover.png",
      },
      sizes: ["S", "M", "L"],
      colors: [
        {
          label: "Green",
          bgImg: "/assets/image/arya/arya-green.png",
          bgColor: "bg-green-500",
        },
        {
          label: "Orange",
          bgImg: "/assets/image/arya/arya-orange.png",
          bgColor: "bg-orange-500",
        },
        {
          label: "Blue",
          bgImg: "/assets/image/arya/arya-blue.png",
          bgColor: "bg-blue-500",
        },
        {
          label: "Navy ",
          bgImg: "/assets/image/arya/arya-deepblue.png",
          bgColor: "bg-blue-900",
        },
      ],
    },
    {
      id: 1,
      title: "Full Sleeve Round Neck T-shirt",
      price: 4400,
      images: {
        front: "/assets/image/arya/arya-green.png",
        hover: "/assets/image/arya/arya-hover.png",
      },
      sizes: ["S", "M", "L"],
      colors: [
        {
          label: "Green",
          bgImg: "/assets/image/arya/arya-green.png",
          bgColor: "bg-green-500",
        },
        {
          label: "Orange",
          bgImg: "/assets/image/arya/arya-orange.png",
          bgColor: "bg-orange-500",
        },
        {
          label: "Blue",
          bgImg: "/assets/image/arya/arya-blue.png",
          bgColor: "bg-blue-500",
        },
        {
          label: "Navy ",
          bgImg: "/assets/image/arya/arya-deepblue.png",
          bgColor: "bg-blue-900",
        },
      ],
    },
    {
      id: 1,
      title: "Full Sleeve Round Neck T-shirt",
      price: 4400,
      images: {
        front: "/assets/image/arya/arya-green.png",
        hover: "/assets/image/arya/arya-hover.png",
      },
      sizes: ["S", "M", "L"],
      colors: [
        {
          label: "Green",
          bgImg: "/assets/image/arya/arya-green.png",
          bgColor: "bg-green-500",
        },
        {
          label: "Orange",
          bgImg: "/assets/image/arya/arya-orange.png",
          bgColor: "bg-orange-500",
        },
        {
          label: "Blue",
          bgImg: "/assets/image/arya/arya-blue.png",
          bgColor: "bg-blue-500",
        },
        {
          label: "Navy ",
          bgImg: "/assets/image/arya/arya-deepblue.png",
          bgColor: "bg-blue-900",
        },
      ],
    },
  ];
  return (
    <div className="trending-wrapper bg-white lg:relative lg:flex lg:items-center lg:justify-center min-h-96 lg:min-h-106 overflow-x-hidden">
      <div className="trendCard lg:absolute bg-transparent flex items-center justify-start lg:justify-center gap-2 lg:gap-4.5 p-6 mb-6 overflow-x-scroll lg:overflow-x-hidden">
        {products.map((p) => (
          <TrendingProduct
            key={p.id}
            product={p}
            className="trendingCard"
            size="md"
          />
        ))}
      </div>
    </div>
  );
}
