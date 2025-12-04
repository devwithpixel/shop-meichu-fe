import Footer from "@/components/footer/footer";
import HeaderPage from "@/components/header/header-page";
import AboutSection from "@/components/sections/about-us/about-section";
import VideoSection from "@/components/sections/about-us/video-section";
import ReviewSection from "@/components/sections/home-page/review-section";

import type { StrapiResponse } from "@/types/strapi/response";
import type { HomePage } from "@/types/strapi/single-type/home-page";

const headerData = {
  type: "about",
  img: "/assets/gallery/girl4.jpg",
  title: "THE JOURNEY OF STYLE",
  desc: "A timeless exploration ,of fashion that evolves with you at ex=very step",
} as const;

const aboutData = {
  content:
    "From the soft drape of a blouse to the structured silhouette of a tailored jacket, every element is curated to empower you—inside and out. Our garments are more than just fashion; they are a celebration of individuality, resilience, and the beauty of authenticity.",

  img: "/assets/gallery/girl3.jpg",

  title: "TIMELESS PIECES THAT TELL STORIES OF POWER,",
  highlight: " BEAUTY",

  desc: "Timeless pieces are more than just garments — they are expressions of personal journeys, woven with threads of power, beauty, and individuality. Each design in our collection is thoughtfully crafted to honor your unique essence, celebrate your confidence, and elevate your everyday presence. Whether you're dressing for bold first impressions or quiet moments of reflection, these pieces carry the narrative of strength and self-expression in every detail.",
};

const videoData = {
  videoSrc: "/assets/video/The 1975 - About You.mp4",
  videoTitle: "WHERE STREET STYLE MEETS HIGH FASHION",
  boxes: [
    {
      title: "Explore Edgy Everyday Wear",
      desc: "Discover bold, street-smart styles crafted for comfort and everyday confidence.",
      link: "/collections/all",
    },
    {
      title: "100% ORIGINAL",
      desc: "At Our Store, we take pride in offering 100% original products, crafted with premium materials.",
      link: "/collections",
    },
  ],
};

async function getReviewData(): Promise<StrapiResponse<HomePage>> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/home-page?populate[reviewSection][populate][section]=true&populate[reviewSection][populate][reviews][populate][avatar]=true`
  );
  return await res.json();
}

export default async function AboutUsPage() {
  const { data } = await getReviewData();

  return (
    <>
      <HeaderPage
        type={headerData.type}
        img={headerData.img}
        title={headerData.title}
        desc={headerData.desc}
      />

      <AboutSection
        content={aboutData.content}
        img={aboutData.img}
        title={aboutData.title}
        highlight={aboutData.highlight}
        desc={aboutData.desc}
      />

      <VideoSection
        videoSrc={videoData.videoSrc}
        videoTitle={videoData.videoTitle}
        boxes={videoData.boxes}
      />
      <ReviewSection data={data.reviewSection!} />
      <Footer />
    </>
  );
}
