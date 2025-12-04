import { useMemo } from "react";

interface IconItem {
  src: string;
  className: string;
}

interface IconElementProps {
  variant?: number;
}

const variants: Record<number, IconItem[]> = {
  1: [
    {
      src: "/assets/element/exclude.png",
      className: "absolute -bottom-10 -left-4 w-50 h-50 opacity-20",
    },
    {
      src: "/assets/element/vector.png",
      className: "absolute top-12 left-24 w-12 h-12 opacity-20",
    },
    {
      src: "/assets/element/star1.png",
      className: "absolute top-18 left-1/3 w-35 h-35 opacity-20",
    },
    {
      src: "/assets/element/star2.png",
      className: "absolute bottom-10 left-1/2 w-7 h-7 opacity-20",
    },
    {
      src: "/assets/element/union.png",
      className: "absolute top-10 right-24 w-20 h-20 opacity-20",
    },
    {
      src: "/assets/element/vector.png",
      className: "absolute -bottom-10 right-20 w-30 h-30 opacity-20",
    },
  ],
  2: [
    {
      src: "/assets/element/star1.png",
      className: "absolute top-1/3 -left-6 w-30 h-30 opacity-20",
    },
    {
      src: "/assets/element/union.png",
      className: "absolute top-1/5 left-1/2 w-30 h-30 opacity-20",
    },
    {
      src: "/assets/element/star2.png",
      className: "absolute top-1/4 right-1/4 w-10 h-10 opacity-20",
    },
    {
      src: "/assets/element/vector.png",
      className: "absolute bottom-8 left-1/3 w-20 h-20 opacity-20",
    },
    {
      src: "/assets/element/vector.png",
      className: "absolute top-10 -right-4 w-20 h-20 opacity-20",
    },
    {
      src: "/assets/element/exclude.png",
      className: "absolute bottom-10 right-1/4 w-70 h-70 opacity-20",
    },
  ],
  3: [
    {
      src: "/assets/element/exclude.png",
      className: "absolute -bottom-12 right-1/4 w-70 h-70 opacity-20",
    },
    {
      src: "/assets/element/star1.png",
      className: "absolute -bottom-10 left-1/4 w-30 h-30 opacity-20",
    },
    {
      src: "/assets/element/star2.png",
      className: "absolute top-1/4 right-1/3 w-14 h-14 opacity-20",
    },
    {
      src: "/assets/element/vector.png",
      className: "absolute -top-10 left-1/4 w-20 h-20 opacity-20",
    },
    {
      src: "/assets/element/vector.png",
      className: "absolute -top-4 -right-16 w-40 h-40 opacity-20",
    },
    {
      src: "/assets/element/union.png",
      className: "absolute top-10 -left-10 rotate-40 w-45 h-45 opacity-20",
    },
  ],
  4: [
    {
      src: "/assets/element/exclude.png",
      className: "absolute -bottom-12 right-1/4 w-70 h-70 opacity-20",
    },
    {
      src: "/assets/element/star2.png",
      className: "absolute top-1/4 right-1/4 w-14 h-14 opacity-20",
    },
    {
      src: "/assets/element/vector.png",
      className: "absolute -top-4 -right-16 w-40 h-40 opacity-20",
    },
  ],
};

export default function IconElement({ variant = 1 }: IconElementProps) {
  const items = useMemo(() => variants[variant] || [], [variant]);

  return (
    <div className="hidden md:block absolute inset-0 z-0">
      {items.map((item, i) => (
        <img key={i} src={item.src} className={item.className} />
      ))}
    </div>
  );
}
