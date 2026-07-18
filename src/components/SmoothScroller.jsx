"use client";

import useLenis from "@/app/hooks/useLenis";

const SmoothScroller = ({ children }) => {
  useLenis();
  return <>{children}</>;
};

export default SmoothScroller;
