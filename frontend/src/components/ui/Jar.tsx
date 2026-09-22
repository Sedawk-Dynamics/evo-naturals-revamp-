// Frosted-glass supplement jar, drawn flat (no gradients, no shadows).
// Stand-in for product photography until real photos are added.
// `accent` is the colour of the capsules inside (the product's variant colour).

const accents = {
  "forest-depths": "#1c3a13",
  "sage-moss": "#757c5d",
  "olive-gold": "#9f995b",
  eucalyptus: "#698e79",
} as const;

export type Accent = keyof typeof accents;

export function Jar({
  accent,
  code,
  className = "",
}: {
  accent: Accent;
  code: string;
  className?: string;
}) {
  const fill = accents[accent];
  // A row of capsules resting on top of the fill line
  const capsules = [
    { x: 44, y: 104, r: -18 },
    { x: 66, y: 98, r: 12 },
    { x: 88, y: 102, r: -6 },
    { x: 110, y: 97, r: 20 },
    { x: 132, y: 103, r: -14 },
  ];

  return (
    <svg viewBox="0 0 200 260" className={className} role="img" aria-label={`${code} jar`}>
      {/* Lid */}
      <rect x="48" y="14" width="104" height="40" rx="12" fill="#d6d8d3" />
      <rect x="48" y="40" width="104" height="14" rx="4" fill="#c4c7c4" />
      {/* Glass body */}
      <rect x="28" y="56" width="144" height="196" rx="36" fill="#c4c7c4" fillOpacity="0.55" />
      {/* Capsules */}
      <g fill={fill}>
        {capsules.map((c, i) => (
          <rect
            key={i}
            x={c.x}
            y={c.y}
            width="26"
            height="12"
            rx="6"
            transform={`rotate(${c.r} ${c.x + 13} ${c.y + 6})`}
          />
        ))}
        <rect x="38" y="112" width="124" height="130" rx="28" />
      </g>
      {/* Frosted glass over the contents */}
      <rect x="28" y="56" width="144" height="196" rx="36" fill="#fcfcf7" fillOpacity="0.14" />
      {/* Flat highlight strip */}
      <rect x="42" y="74" width="9" height="150" rx="4.5" fill="#fcfcf7" fillOpacity="0.45" />
      {/* Label pill */}
      <rect x="64" y="162" width="72" height="26" rx="13" fill="none" stroke="#fcfcf7" strokeWidth="1.5" />
      <text
        x="100"
        y="179"
        textAnchor="middle"
        fill="#fcfcf7"
        fontSize="11"
        style={{ fontFamily: "var(--font-seed-sans-mono)" }}
        letterSpacing="0.2"
      >
        {code}
      </text>
    </svg>
  );
}
