import { getAboutUsData } from "@/lib/api/about-us";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import HeaderPage from "@/components/header/header-page";
import AboutSection from "./_components/sections/about-section";
import VideoSection from "./_components/sections/video-section";
import ReviewSection from "@/components/sections/review-section";

export default async function AboutUsPage() {
  const { data } = await getAboutUsData();

  return (
    <Suspense fallback={<Skeleton className="w-full h-96" />}>
      <HeaderPage
        type="about"
        image={data.heading.thumbnail}
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
    </Suspense>
  );
}
