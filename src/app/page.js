"use client"
import TextReveal from "@/components/TextReveal";
import Image from "next/image";
import { useRef } from "react";

export default function Home() {

  const triggerRef = useRef(null);
  const handleHoverEnter = () => { 
    triggerRef.current?.play();
  }
  const handleHoverLeave = () => {
    triggerRef.current?.reverse();
  }

  return (
    <main className="h-[300vh] w-full bg-black ">
      <div onPointerEnter={handleHoverEnter} onPointerLeave={handleHoverLeave} className = "h-[8rem] w-[10rem] bg-red-300"></div>
      <TextReveal ref={triggerRef} splitBy="words" trigger="manual"
        className="text-[3rem] text-white ">Hello EveryOne</TextReveal>
    </main>
  );
}
