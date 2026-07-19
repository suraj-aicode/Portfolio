import { useEffect, useRef } from "react";
import CarouselCard from "./CarouselCard";
import gsap from "@/libs/gsap";

const CARD_W = 300;
const CARD_H = 380;
const SCALE = 1.35;
const CARD_GAP = 20; // Gap between cards (px)
const DURATION = 25;
const TRACK_H = CARD_H * SCALE;

const InfiniteCarousel = ({ projects = [] }) => {
  const trackRef = useRef(null);
  const tweenRef = useRef(null);

  useEffect(() => {
    if (!trackRef.current || projects.length === 0) return;

    // Width of one complete set of cards
    const singleWidth = projects.length * (CARD_W + CARD_GAP);

    tweenRef.current = gsap.to(trackRef.current, {
      x: -singleWidth,
      duration: DURATION,
      ease: "none",
      repeat: -1,
    });

    return () => {
      tweenRef.current?.kill();
    };
  }, [projects]);

  // Duplicate cards for seamless looping
  const doubledProjects = [...projects, ...projects];

  return (
    <div
      className="overflow-hidden"
      style={{
        padding: `${TRACK_H * 1.2}px 0 24px`,
      }}
    >
      <div
        ref={trackRef}
        className="flex items-center"
        style={{
          gap: `${CARD_GAP}px`,
          width: "max-content",
          height: `${TRACK_H}px`,
        }}
      >
        {doubledProjects.map((project, index) => (
          <CarouselCard
            key={`${project.id ?? index}-${index}`}
            project={project}
            onHoverStart={() => tweenRef.current?.pause()}
            onHoverEnd={() => tweenRef.current?.play()}
          />
        ))}
      </div>
    </div>
  );
};

export default InfiniteCarousel;
