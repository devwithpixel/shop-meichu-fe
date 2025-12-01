"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FooterLink } from "./footer-link";

export default function Footer() {
  const footerRef = useRef(null);

  useGSAP(() => {
    gsap.to(".footer-text", {
      xPercent: -100,
      repeat: -1,
      ease: "none",
      duration: 22,
    });
  });

  const quickLinks = [
    { title: "Home", href: "/", icon: false },
    { title: "Search", href: "/search", icon: false },
    { title: "Collections", href: "/collections", icon: false },
    { title: "About Us", href: "/about", icon: false },
    { title: "News", href: "/news", icon: false },
  ];

  const supportLinks = [
    { title: "Privacy Policy", href: "/privacy", icon: false },
    { title: "Refund Policy", href: "/refund", icon: false },
    { title: "Shipping Policy", href: "/shipping", icon: false },
    { title: "Contact", href: "/contact", icon: false },
    { title: "FAQ", href: "/faq", icon: false },
  ];

  const socialLinks = [
    { title: "Facebook", href: "https://facebook.com", icon: true },
    { title: "X (Twitter)", href: "https://twitter.com", icon: true },
    { title: "Instagram", href: "https://instagram.com", icon: true },
    { title: "YouTube", href: "https://youtube.com", icon: true },
  ];

  return (
    <div ref={footerRef} className="bg-carbon text-white">
      <div className="relative w-full overflow-hidden">
        <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-linear-to-r from-carbon to-transparent z-20" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-linear-to-l from-carbon to-transparent z-20" />

        <div className="footer-text flex whitespace-nowrap font-rubik pt-5">
          <p className="text-7xl md:text-8xl font-medium">
            Your Favorite Styles at &nbsp;
          </p>
          <p className="text-7xl md:text-8xl font-medium text-transparent text-outline-white">
            Unmissable Princess! &nbsp;
          </p>

          <p className="text-7xl md:text-8xl font-medium">
            Your Favorite Styles at &nbsp;
          </p>
          <p className="text-7xl md:text-8xl font-medium text-transparent text-outline-white">
            Unmissable Princess! &nbsp;
          </p>
        </div>
      </div>

      <div className="py-16 pl-6 font-inter">
        <div className="grid grid-cols-1 lg:grid-cols-6 lg:grid-rows-1 gap-4">
          <div className="lg:col-span-2 leading-7">
            <p>
              Whether you're looking for chic essentials, statement outfits, or
              casual staples, we've got something to suit every style. Browse
              our fresh arrivals and update your wardrobe with the season's
              hottest looks today!
            </p>

            <div className="mt-8 w-full">
              <div className="flex items-center border border-white/40 hover:border-white transition-colors p-1 rounded-full">
                <Input
                  placeholder="Email"
                  className="rounded-full bg-transparent text-white border-none h-12 px-6 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-white/50"
                />
                <Button className="rounded-full bg-white h-12 px-10 text-lg text-gray-900 font-semibold hover:bg-white/90">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>

          <Separator
            orientation="vertical"
            className="hidden lg:block h-44 mx-auto bg-white/20 lg:col-start-3"
          />

          <div className="space-y-6 lg:col-start-4">
            <h1 className="font-semibold text-xl">Quick links</h1>
            <ul className="space-y-2 text-white/70">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <FooterLink
                    href={link.href}
                    title={link.title}
                    icon={link.icon}
                  />
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6 lg:col-start-5">
            <h1 className="font-semibold text-xl">Support</h1>
            <ul className="space-y-2 text-white/70">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <FooterLink
                    href={link.href}
                    title={link.title}
                    icon={link.icon}
                  />
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6 lg:col-start-6">
            <h1 className="font-semibold text-xl">Follow us on</h1>
            <ul className="space-y-2 text-white/70">
              {socialLinks.map((link) => (
                <li key={link.href}>
                  <FooterLink
                    href={link.href}
                    title={link.title}
                    icon={link.icon}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      <div className="text-center py-4 bg-blackfull text-white text-sm">
        © 2025 Meichu. Powered by Pixel
      </div>
    </div>
  );
}
