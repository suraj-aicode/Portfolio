"use client"
import InfiniteCarousel from "@/components/InfiniteCarousel";
import TextReveal from "@/components/TextReveal";
import { useRef } from "react";
import { projects } from "./data/projects";

export default function Home() {


  return (
    <main className="h-screen flex items-start w-full  ">
     <InfiniteCarousel projects={projects}/>
    </main>
  );
}
