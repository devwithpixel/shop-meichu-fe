import Footer from "@/components/footer/footer";
import HeaderPage from "@/components/header/header-page";
import AboutSection from "@/components/sections/about-us/about-section";
import VideoSection from "@/components/sections/about-us/video-section";
import ReviewSection from "@/components/sections/home-page/review-section";

import type { StrapiResponse } from "@/types/strapi/response";
import type { AboutUs } from "@/types/strapi/single-type/about-us";

async function getAboutUsData(): Promise<StrapiResponse<AboutUs>> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/about-us`
  );
  return await res.json();
}

export default async function AboutUsPage() {
  const { data } = await getAboutUsData();
  console.log(data);

  return (
    <>
      <HeaderPage
        type="about"
        img={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${data.heading.thumbnail?.url}`}
        title={data.heading.title}
        desc={data.heading.description}
      />

      <AboutSection
        content={data.message}
        image={data.messageSection.image}
        title={data.messageSection.section.title}
        description={data.messageSection.section.description}
      />

      <VideoSection
        videoSrc={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${data.videoSection.video?.url}`}
        videoTitle={data.videoSection.message}
        boxes={data.videoSection.cards}
      />

      <ReviewSection data={data.reviewSection} />
      <Footer />
    </>
  );
}
