import "@/styles/user-space.css";
import MainLayout from "@/components/layout/main-layout";
import NotFoundPage from "@/components/errors/not-found";

export default function NotFound() {
  return (
    <MainLayout>
      <NotFoundPage />
    </MainLayout>
  );
}
