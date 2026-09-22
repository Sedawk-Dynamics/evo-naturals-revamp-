"use client";

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import { nav, site } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "@/components/layout/Logo";

// Once the page has scrolled past the 40px Promo Banner, the bar is stuck
// over the content.
const PROMO_HEIGHT = 40;
const subscribe = (onChange: () => void) => {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
};
const getScrolled = () => window.scrollY > PROMO_HEIGHT;
const getServerScrolled = () => false;

// Navigation Bar (DESIGN.md): full-width, sticky, 72px tall, 24–48px side
// padding. Left: logo. Centre: links. Right: primary CTA. Desktop uses a
// 1fr/auto/1fr grid so the links sit at the true centre of the page (with
// flex they'd drift, because the logo is wider than the button).
// At the top it's see-through, blending into the hero video; once the page
// scrolls it turns to frosted Snow White glass.
export function Navbar() {
  const [open, setOpen] = useState(false);
  const scrolled = useSyncExternalStore(subscribe, getScrolled, getServerScrolled);

  const surface = open
    ? "bg-snow-white"
    : scrolled
      ? "bg-snow-white/80 shadow-[0_1px_0_rgba(28,58,19,0.08)] backdrop-blur-[16px]"
      : "bg-transparent";

  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300 ${surface}`}
    >
      <div className="flex h-[72px] items-center justify-between px-24 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:px-48">
        <Link href="/" aria-label={`${site.name} home`} className="justify-self-start">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-32 lg:flex">
          {nav.links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-body-sm text-forest-depths decoration-[1.5px] underline-offset-[6px] hover:underline"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-8 justify-self-end">
          {/* Wrapper hides the CTA on phones (Button's own inline-flex would override `hidden`) */}
          <div className="hidden sm:block">
            <Button href={nav.cta.href} size="sm" magnetic>
              {nav.cta.label}
            </Button>
          </div>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-40 w-40 items-center justify-center rounded-full lg:hidden"
          >
            <Icon name={open ? "close" : "menu"} size={24} />
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-warm-stone px-24 pt-16 pb-32 lg:hidden">
          <nav className="flex flex-col">
            {nav.links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-warm-stone py-16 text-subheading font-w350"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <Button href={nav.cta.href} className="mt-24 w-full" onClick={() => setOpen(false)}>
            {nav.cta.label}
          </Button>
        </div>
      )}
    </header>
  );
}
