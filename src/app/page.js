"use client"
import InfiniteCarousel from "@/components/InfiniteCarousel";
import TextReveal from "@/components/TextReveal";
import Image from "next/image";
import { useRef } from "react";
import { projects } from "./data/projects";

export default function Home() {

  // const triggerRef = useRef(null);
  // const handleHoverEnter = () => { 
  //   triggerRef.current?.play();
  // }
  // const handleHoverLeave = () => {
  //   triggerRef.current?.reverse();
  // }

  return (
    <main className="h-screen w-full flex items-center ">
     <InfiniteCarousel projects={projects}/>
    </main>
  );
}
