import { Inter, Rubik, Albert_Sans, Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { FooterProvider } from "@/context/footer-provider";
import { getGlobalData } from "@/lib/api/global";
import localFont from "next/font/local";

import type { Metadata } from "next";

const rubik = Rubik({
  variable: "--font-rubik",
  fallback: ["sans-serif"],
});

const inter = Inter({
  variable: "--font-inter",
  fallback: ["sans-serif"],
});

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  fallback: ["sans-serif"],
  subsets: ["latin"],
});

const albertSans = Albert_Sans({
  variable: "--font-albert-sans",
  subsets: ["latin"],
  fallback: ["sans-serif"],
});

const jogging = localFont({
  src: "../../public/assets/fonts/Jogging.otf",
  variable: "--font-jogging",
  fallback: ["sans-serif"],
});

export async function generateMetadata(): Promise<Metadata> {
  const { data: globalData } = await getGlobalData();

  return {
    title: globalData.siteName || "Shop Meichu",
    description: globalData.siteDescription || "",
    icons: globalData.favicon && {
      icon: `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${globalData.favicon.url}`,
      apple: `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${globalData.favicon.url}`,
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${rubik.variable} ${inter.variable} ${albertSans.variable} ${jogging.variable} ${poppins.variable} antialiased`}
        suppressHydrationWarning
      >
        <NuqsAdapter>
          <FooterProvider>{children}</FooterProvider>
        </NuqsAdapter>
        <Toaster
          position="top-center"
          reverseOrder={false}
          containerClassName="font-outfit"
        />
      </body>
    </html>
  );
}
