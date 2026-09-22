"use client";

import { useRef, type ReactNode, type RefObject } from "react";
import { motion, useMotionTemplate, useScroll, useTransform, type MotionValue } from "motion/react";
import { cn } from "@/lib/utils";

export interface ScrollSplitCardItem {
  title: string;
  description: string;
  bgColor: string;
  textColor: string;
  /** Sits at the top of the card's back */
  icon?: ReactNode;
}

interface ScrollSplitCardProps {
  className?: string;
  imageSrc: string;
  /** Fills the strips while the image loads (use the image's main colour) */
  imageColor?: string;
  cards: ScrollSplitCardItem[];
  containerRef?: RefObject<HTMLElement | null>;
  /** Shown at the bottom of the image at the start, fades as scrolling begins */
  hint?: ReactNode;
  /** Height of a sticky site header, so the viewport sits below it */
  stickyTop?: number;
}

// (21st.dev) A full-screen image cut into vertical strips. Scrolling through
// the tall wrapper pulls the strips apart, flips each over to reveal a card
// on its back, then holds so the cards can be read. Works with any number
// of strips.
//   0 → 0.2  seams appear (corners round, shadows fade in)
//   0 → 0.4  strips pull apart and shrink to 80%
//   0.4 → 0.8  strips flip and fan out
//   0.8 → 1  hold
const RADIUS = 16;
const SPREAD = 48; // px each strip moves out per step from the centre

// A 256px tile of SVG noise for the grain on the card backs
const GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

export function ScrollSplitCard({
  className,
  imageSrc,
  imageColor,
  cards,
  containerRef: externalContainerRef,
  hint = "Scroll down",
  stickyTop = 0,
}: ScrollSplitCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    container: externalContainerRef,
    offset: ["start start", "end end"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.4], [1, 0.8]);
  const rotateY = useTransform(scrollYProgress, [0.4, 0.8], [0, 180]);

  const borderOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 0.2]);
  const shadowOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 0.4]);
  const boxShadow = useMotionTemplate`inset 0 1px 1px rgba(255, 255, 255, ${borderOpacity}), inset 0 -24px 48px rgba(0, 0, 0, ${shadowOpacity}), 0 25px 50px -12px rgba(0, 0, 0, ${shadowOpacity})`;

  // Motion runs `opacity` as a native scroll animation, where a missing end
  // keyframe falls back to the element's normal opacity (1) — so this fade
  // must cover the whole 0 → 1 range or it drifts back in.
  const hintOpacity = useTransform(scrollYProgress, [0, 0.1, 1], [1, 0, 0]);
  const hintY = useTransform(scrollYProgress, [0, 0.1], [0, 20]);

  return (
    <div ref={containerRef} className={cn("relative h-[500vh] w-full", className)}>
      <div
        className="sticky flex w-full items-center justify-center overflow-hidden perspective-[1200px]"
        style={{ top: stickyTop, height: `calc(100vh - ${stickyTop}px)` }}
      >
        <motion.div style={{ scale, transformStyle: "preserve-3d" }} className="relative flex size-full">
          {cards.map((card, i) => (
            <Strip
              key={card.title}
              card={card}
              index={i}
              count={cards.length}
              progress={scrollYProgress}
              imageSrc={imageSrc}
              imageColor={imageColor}
              rotateY={rotateY}
              boxShadow={boxShadow}
            />
          ))}
        </motion.div>

        {hint && (
          <motion.div
            className="absolute inset-x-0 bottom-32 z-10 text-center font-seed-sans-mono text-label font-light tracking-mono uppercase"
            style={{ opacity: hintOpacity, y: hintY }}
          >
            {/* dimmed on an inner span — the outer opacity is animated */}
            <span className="opacity-80">{hint}</span>
          </motion.div>
        )}
      </div>
    </div>
  );
}

// One strip: a slice of the image on the front, a card on the back.
// Its own component so each strip can have its own scroll transforms.
function Strip({
  card,
  index,
  count,
  progress,
  imageSrc,
  imageColor,
  rotateY,
  boxShadow,
}: {
  card: ScrollSplitCardItem;
  index: number;
  count: number;
  progress: MotionValue<number>;
  imageSrc: string;
  imageColor?: string;
  rotateY: MotionValue<number>;
  boxShadow: MotionValue<string>;
}) {
  // -1 / 0 / 1 for three strips, -1.5 / -0.5 / 0.5 / 1.5 for four
  const offset = index - (count - 1) / 2;
  const edge = (count - 1) / 2 || 1;

  const x = useTransform(progress, [0, 0.4, 0.8], [0, offset * SPREAD, (offset * SPREAD) / 2]);
  // After the 180° flip +Z reads as counter-clockwise, so left strips get +Z
  // and the outermost strips tilt the most (6°), fanning the cards out.
  const rotateZ = useTransform(progress, [0.4, 0.8], [0, (-offset / edge) * 6]);
  // Square while the strips still form one edge-to-edge image
  const borderRadius = useTransform(progress, [0, 0.2], ["0px", `${RADIUS}px`]);

  return (
    <motion.div
      className="relative h-full flex-1"
      style={{ x, rotateY, rotateZ, zIndex: index, transformStyle: "preserve-3d" }}
    >
      {/* Front: this strip's slice of the image */}
      <motion.div
        className="absolute inset-0 overflow-hidden backface-hidden"
        style={{ zIndex: 2, borderRadius, boxShadow, backgroundColor: imageColor }}
      >
        <div
          className="absolute inset-y-0"
          style={{
            width: `${count * 100}%`,
            left: `${-100 * index}%`,
            backgroundImage: `url(${imageSrc})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </motion.div>

      {/* Back: the card, pre-flipped so it faces forward after the turn */}
      <motion.div
        className="absolute inset-0 flex flex-col justify-end overflow-hidden border border-white/5 bg-linear-to-br from-white/10 to-transparent p-24 backface-hidden will-change-transform"
        style={{
          backgroundColor: card.bgColor,
          color: card.textColor,
          transform: "rotateY(180deg)",
          zIndex: 1,
          borderRadius,
          boxShadow,
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-20 mix-blend-overlay"
          style={{ backgroundImage: GRAIN, backgroundRepeat: "repeat" }}
        />
        <div className="relative z-10 mb-auto">{card.icon}</div>
        <h3 className="relative z-10 mb-8 text-subheading font-w350">{card.title}</h3>
        <p className="relative z-10 text-caption opacity-80">{card.description}</p>
      </motion.div>
    </motion.div>
  );
}
