import { useRef } from "react";
import TextReveal from "./TextReveal";
import gsap from "@/libs/gsap";

const CARD_W = 300;
const CARD_H = 380;
const SCALE = 1.35;

const CarouselCard = ({ project, onHoverStart, onHoverEnd }) => {
  const imgRef = useRef(null);
  const cardRef = useRef(null);
  const numberRef = useRef(null);
  const titleRef = useRef(null);

  const onEnter = () => {
    onHoverStart?.();

    gsap.to(imgRef.current, {
      width: CARD_W * SCALE,
      height: CARD_H * SCALE,
      duration: 0.5,
      ease: "power3.out",
    });

    numberRef.current?.play();
    titleRef.current?.play();
  };

  const onLeave = () => {
    onHoverEnd?.();

    gsap.to(imgRef.current, {
      width: CARD_W,
      height: CARD_H,
      duration: 0.5,
      ease: "power3.out",
    });

    numberRef.current?.reset();
    titleRef.current?.reset();
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        width: CARD_W,
        height: CARD_H,
        flexShrink: 0,
        overflow: "visible",
        cursor: "pointer",
      }}
      className="relative"
    >
      {/* Title Panel */}
      <div
        className="titlePanel absolute left-0 pointer-events-none flex flex-col gap-4"
        style={{
          bottom: "calc(100% + 3rem)",
        }}
      >
        <TextReveal ref={numberRef} trigger="manual" splitBy="chars">
          <h3 className="text-base text-[#010101]">{project?.number}</h3>
        </TextReveal>

        <TextReveal ref={titleRef} trigger="manual" splitBy="words">
          <h3 className="text-base text-[#010101]">{project?.title}</h3>
        </TextReveal>
      </div>

      {/* Image */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          ref={imgRef}
          src={project?.coverImage}
          alt={project?.title}
          draggable={false}
          style={{
            width: CARD_W,
            height: CARD_H,
            transformOrigin: "center center",
            userSelect: "none",
          }}
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default CarouselCard;
