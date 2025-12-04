import ScrollSmootherWrapper from "@/components/ScrollSmootherWrapper";
import Navbar from "@/components/navbar/navbar";

export default function HomePageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* <Navbar /> */}
      <ScrollSmootherWrapper>
        <main className="md:pb-0 pb-16 select-none pt-0">{children}</main>
      </ScrollSmootherWrapper>
    </>
  );
}
