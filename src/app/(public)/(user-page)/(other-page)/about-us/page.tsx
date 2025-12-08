import HeaderPage from "@/components/header/header-page";
import AboutSection from "./_components/sections/about-section";
import VideoSection from "./_components/sections/video-section";
import ReviewSection from "@/components/sections/review-section";
import { getAboutUsData } from "@/lib/api/about-us";

export default async function AboutUsPage() {
  const { data } = await getAboutUsData();

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
    </>
  );
}
