"use client";

import { useEffect } from "react";
import { useFooter } from "@/context/footer-provider";

export default function SetFooter({
  backgroundColor,
}: {
  backgroundColor: string;
}) {
  const { setBackgroundColor } = useFooter();

  useEffect(() => {
    setBackgroundColor(backgroundColor);
  }, [backgroundColor]);

  return null;
}
