"use client";

import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export default function BlogsPage() {
  const blogs = [
    {
      title: "The Top 10 Uses for Cloth",
      desc: "Cloth is one of humanity’s oldest and most versatile inventions. Made from natural fibers like cotton, wool, silk...",
      image: "/assets/image/woman.jpg",
      date: "March 10, 2025",
      author: "Shine Dezign",
      href: "/blogs/top-uses-cloth",
    },
    {
      title: "How to Mix & Match Outfit for Daily Style",
      desc: "Simple techniques for building easy, stylish everyday outfits.",
      image: "/assets/image/men.jpg",
      date: "Nov 28, 2025",
      author: "Shine Dezign",
      href: "/blogs/mix-match-outfit",
    },
    {
      title: "Essential Wardrobe Guide for Minimalist Lovers",
      desc: "A clean, modern approach to fashion that focuses on function and simplicity.",
      image: "/assets/image/popular.jpg",
      date: "Nov 12, 2025",
      author: "Shine Dezign",
      href: "/blogs/minimalist-wardrobe",
    },
  ];

  return (
    <div className="min-h-screen font-inter bg-white">

      {/* HEADER IMAGE */}
      <div className="relative w-full h-[55vh] md:h-[60vh] lg:h-[65vh]">
        <Image
          src="/assets/image/my.png"
          alt="Blog Header"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
            STORIES TO INSPIRE YOU
          </h1>
        </div>
      </div>

      {/* CONTENT */}
      <div className="px-6 pt-20 pb-28">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {blogs.map((blog, i) => (
            <Link key={i} href={blog.href} className="block group ">

              {/* CARD WRAPPER */}
              <div className="relative w-full rounded-3xl overflow-hidden">

                {/* IMAGE */}
                <div className="relative w-full h-[490px] rounded-3xl overflow-hidden">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                {/* WHITE FLOATING PANEL */}
                <div className="
                  absolute left-4 right-4 bottom-4 
                  bg-white rounded-3xl shadow-xl 
                  p-6 transition-all duration-500
                ">
                  
                  {/* META */}
                  <div className="text-neutral-900 text-sm flex gap-3">
                    <span>{blog.author}</span>
                    <span><Separator className="bg-neutral-900" /></span>
                    <span>{blog.date}</span>
                  </div>

                  {/* TITLE HOVER GROUP */}
                  <div className="group/title mt-2 cursor-pointer">
                    <h2 className="text-xl font-bold text-neutral-900">
                      {blog.title}
                    </h2>

                    {/* DESCRIPTION — only appears when hovering TITLE */}
                    <p className="
                      text-neutral-900 text-sm mt-2 
                      opacity-0 max-h-0 overflow-hidden
                      transition-all duration-700
                      group-hover/title:opacity-100
                      group-hover/title:max-h-32
                    ">
                      {blog.desc}
                    </p>
                  </div>

                </div>

              </div>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}
