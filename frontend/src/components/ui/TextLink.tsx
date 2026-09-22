import Link from "next/link";

// Text Link with Arrow (DESIGN.md): no background, 1.5px underline,
// 7px/10.5px padding, followed by →. Used for "Shop All", "Shop Now" etc.
// The negative margin keeps the text lined up with content above it.
export function TextLink({
  href,
  children,
  tone = "dark",
  className = "",
}: {
  href: string;
  children: string;
  tone?: "dark" | "light"; // dark text (on light bg) / light text (on dark bg)
  className?: string;
}) {
  const color = tone === "dark" ? "text-forest-depths" : "text-snow-white";
  return (
    <Link
      href={href}
      className={`group -mx-[10.5px] inline-flex items-center gap-8 px-[10.5px] py-[7px] text-body-sm font-normal ${color} ${className}`}
    >
      <span className="underline decoration-[1.5px] underline-offset-[5px]">{children}</span>
      <span aria-hidden="true" className="transition-transform group-hover:translate-x-[3px]">
        →
      </span>
    </Link>
  );
}
