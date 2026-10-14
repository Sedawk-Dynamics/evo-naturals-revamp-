import Link from "next/link";
import { promo } from "@/data/site";
import { Icon } from "@/components/ui/Icon";

// Promo Banner (DESIGN.md): thin 40px band at the very top, Lime Pulse,
// Forest Depths 12px/500 uppercase text, small icon + message + inline link.
export function PromoBanner() {
  return (
    <div className="flex min-h-40 flex-wrap items-center justify-center gap-x-8 bg-lime-pulse px-16 py-8 text-center text-label leading-label font-medium text-forest-depths uppercase sm:px-24">
      <Icon name="leaf" size={14} className="shrink-0" />
      <span>{promo.text}</span>
      <Link
        href={promo.link.href}
        className="shrink-0 underline decoration-[1.5px] underline-offset-[3px]"
      >
        {promo.link.label}
      </Link>
    </div>
  );
}
