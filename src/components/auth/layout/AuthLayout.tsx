import { ReactNode } from "react";
import AuthSideBanner from "./AuthSideBanner";

interface AuthLayoutProps {
  children: ReactNode;
  bannerProps?: {
    title?: string;
    description?: string;
    imageSrc?: string;
    stats?: {
      value: string;
      label: string;
    }[];
  };
}

export default function AuthLayout({ children, bannerProps }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-7xl h-[90vh] max-h-[900px] grid lg:grid-cols-2 bg-white rounded-3xl overflow-hidden shadow-2xl">
        <AuthSideBanner {...bannerProps} />
        
        <div className="flex items-center justify-center p-8 lg:p-12 bg-white">
          <div className="w-full max-w-md space-y-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}