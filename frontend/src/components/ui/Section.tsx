import type { ReactNode } from "react";

// Full-bleed section band + centred 1200px container with 24px side margins.
// DESIGN.md: sections are either Snow White (light) or Forest Depths (dark),
// with 64–96px vertical padding.
export function Section({
  children,
  id,
  tone = "light",
  wide = false,
  className = "",
}: {
  children: ReactNode;
  id?: string;
  tone?: "light" | "dark";
  wide?: boolean;
  className?: string;
}) {
  const colors =
    tone === "dark" ? "bg-forest-depths text-snow-white" : "bg-snow-white text-forest-depths";
  return (
    <section id={id} className={`${colors} py-64 md:py-96 ${className}`}>
      <Container wide={wide}>{children}</Container>
    </section>
  );
}

// wide: runs edge to edge with the Navbar's 48px side padding (up to a
// 1920px screen) instead of the 1200px page column — for showcase sections.
export function Container({
  children,
  wide = false,
  className = "",
}: {
  children: ReactNode;
  wide?: boolean;
  className?: string;
}) {
  const width = wide ? "max-w-[1920px] lg:px-48" : "max-w-page";
  return <div className={`mx-auto w-full ${width} px-24 ${className}`}>{children}</div>;
}
