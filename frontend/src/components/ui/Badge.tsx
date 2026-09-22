// Badges from DESIGN.md — all pills, 6px/8px padding, 12px weight 500.
//   sale — Lime Pulse fill, Forest Depths text. The only use of the vivid accent.
//   new  — translucent Snow White (20%), Snow White text. Sits over product photos.
export function Badge({
  children,
  variant,
}: {
  children: string;
  variant: "sale" | "new";
}) {
  const styles =
    variant === "sale"
      ? "bg-lime-pulse text-forest-depths"
      : "bg-snow-white/20 text-snow-white backdrop-blur-[8px]";
  return (
    <span
      className={`inline-flex items-center rounded-badges px-8 py-[6px] text-label leading-none font-medium ${styles}`}
    >
      {children}
    </span>
  );
}

// Product Code Pill (DESIGN.md): 1.5px outline, pill, 12px/500.
// The "specimen label" above product names. Set in the mono face.
export function CodePill({
  children,
  tone = "dark",
}: {
  children: string;
  tone?: "dark" | "light"; // dark outline on light bg / light outline on dark bg
}) {
  const color =
    tone === "dark" ? "border-forest-depths text-forest-depths" : "border-snow-white text-snow-white";
  return (
    <span
      className={`inline-flex items-center rounded-badges border-[1.5px] px-8 py-[6px] font-seed-sans-mono text-label leading-none font-normal tracking-mono ${color}`}
    >
      {children}
    </span>
  );
}
