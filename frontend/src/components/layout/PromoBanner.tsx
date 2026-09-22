import Link from "next/link";
import { promo } from "@/data/site";
import { Icon } from "@/components/ui/Icon";

// Promo Banner (DESIGN.md): thin 40px band at the very top, Lime Pulse,
// Forest Depths 12px/500 uppercase text, small icon + message + inline link.
export function PromoBanner() {
  return (
    <div className="flex h-40 items-center justify-center gap-8 bg-lime-pulse px-24 text-label leading-none font-medium text-forest-depths uppercase">
      <Icon name="leaf" size={14} className="shrink-0" />
      <span className="truncate">{promo.text}</span>
      <Link
        href={promo.link.href}
        className="shrink-0 underline decoration-[1.5px] underline-offset-[3px]"
      >
        {promo.link.label}
      </Link>
    </div>
  );
}
