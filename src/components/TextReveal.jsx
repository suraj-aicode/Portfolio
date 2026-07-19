"use client";

import gsap, { ScrollTrigger, SplitText, useGSAP } from "@/libs/gsap";
import { forwardRef, useImperativeHandle, useRef } from "react";

const TextReveal = forwardRef(
  (
    {
      children,
      className = "",
      trigger = "mount", // "mount" | "scroll"
      scrollStart = "top 75%",
      splitBy = "lines", // "lines", "words", "chars"
      duration = 0.67,
      stagger = 0.085,
      ease = "power3.out",
    },
    ref,
  ) => {
    const wrapperRef = useRef(null);
    const splitRef = useRef(null);
    const tlRef = useRef(null);
    const scrollTriggerRef = useRef(null);

    useImperativeHandle(ref, () => ({
      play: () => tlRef.current?.play(),
      reverse: () => tlRef.current?.reverse(),
      reset: () => tlRef.current?.pause(0),
    }));

    useGSAP(
      () => {
        // Split the text
        splitRef.current = new SplitText(wrapperRef.current, {
          type: splitBy,
          lineThreshold: 0.3,
        });

        const elements = splitRef.current[splitBy];

        // Initial state
        gsap.set(elements, {
          yPercent: 110,
          opacity: 0,
        });

        // Timeline
        tlRef.current = gsap.timeline({
          paused: true,
        });

        tlRef.current.to(elements, {
          yPercent: 0,
          opacity: 1,
          duration,
          ease,
          stagger: {
            each: stagger,
            from: "start",
          },
        });

        // Play immediately
        if (trigger === "mount") {
          tlRef.current.play();
        }

        // Play on scroll
        if (trigger === "scroll") {
          scrollTriggerRef.current = ScrollTrigger.create({
            trigger: wrapperRef.current,
            start: scrollStart,
            once: true,
            onEnter: () => tlRef.current?.play(),
          });
        }

        return () => {
          tlRef.current?.kill();
          scrollTriggerRef.current?.kill();
          splitRef.current?.revert();
        };
      },
      {
        scope: wrapperRef,
        dependencies: [splitBy, trigger, scrollStart, duration, stagger, ease],
      },
    );

    return (
      <div ref={wrapperRef} className={`overflow-hidden ${className}`}>
        {children}
      </div>
    );
  },
);

TextReveal.displayName = "TextReveal";

export default TextReveal;
