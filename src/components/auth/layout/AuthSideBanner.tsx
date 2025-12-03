import Image from "next/image";

interface AuthSideBannerProps {
  imageSrc?: string;
}

export default function AuthSideBanner({
  imageSrc = "/assets/gallery/girl5.webp",
}: AuthSideBannerProps) {
  return (
    <div className="relative hidden lg:block h-full overflow-hidden font-rubik">
      <Image
        src={imageSrc}
        alt="authentication illustration"
        fill
        priority
        className="object-cover"
        sizes="50vw"
      />

      <div className="absolute bottom-0 inset-x-0 h-40 bg-linear-to-t from-black/50 to-transparent z-10" />
    </div>
  );
}
