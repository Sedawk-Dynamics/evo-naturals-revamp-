import Link from "next/link";
import type { ReactNode } from "react";

// Button styles from DESIGN.md. All are pills (1000px), 16px weight 400
// text, 1.5px border, no shadow.
//   primary  — Forest Depths fill, Snow White text. The only filled style.
//   ghost    — Snow White outline. For dark green sections / images.
//   inverted — Forest Depths outline on Snow White. For light sections.

type Variant = "primary" | "ghost" | "inverted";

const variants: Record<Variant, string> = {
  primary: "bg-forest-depths text-snow-white border-forest-depths hover:bg-forest-depths/90",
  ghost: "bg-transparent text-snow-white border-snow-white hover:bg-snow-white/10",
  inverted: "bg-snow-white text-forest-depths border-forest-depths hover:bg-warm-stone",
};

// md = 16px/24px padding (DESIGN.md default), sm = compact for nav and cards
const sizes = { md: "py-16", sm: "py-[12px]" };

const base =
  "inline-flex items-center justify-center gap-8 rounded-buttons border-[1.5px] px-24 text-body-sm leading-none font-normal whitespace-nowrap transition-colors";

type Props = {
  children: ReactNode;
  variant?: Variant;
  size?: keyof typeof sizes;
  href?: string;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
  /** Snap the magnetic cursor to this button (see magnetic-cursor.tsx) */
  magnetic?: boolean;
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  className = "",
  type = "button",
  onClick,
  disabled,
  magnetic,
}: Props) {
  const classes = `${base} ${sizes[size]} ${variants[variant]} ${className}`;
  const magneticAttr = magnetic ? { "data-magnetic": "" } : {};

  if (href) {
    return (
      <Link href={href} className={classes} onClick={onClick} {...magneticAttr}>
        {children}
      </Link>
    );
  }
  return (
    <button
      {...magneticAttr}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${classes} disabled:border-ash disabled:bg-ash disabled:text-snow-white`}
    >
      {children}
    </button>
  );
}
