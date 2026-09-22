// Tailwind needs full class names written out (it can't read `bg-${x}`),
// so the product accent colours are mapped to classes here.
export const accentBg = {
  "forest-depths": "bg-frosted-glass", // dark green would vanish on a dark section
  "sage-moss": "bg-sage-moss",
  "olive-gold": "bg-olive-gold",
  eucalyptus: "bg-eucalyptus",
} as const;
