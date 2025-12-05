import NavbarServer from "@/components/navbar/navbar-server";
import ScrollSmootherWrapper from "@/components/ScrollSmootherWrapper";

export default async function UserPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavbarServer />
      <ScrollSmootherWrapper>{children}</ScrollSmootherWrapper>
    </>
  );
}
