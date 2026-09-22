import Image from "next/image";
import { testimonials } from "@/data/site";
import { Container } from "@/components/ui/Section";
import { ScrollSplitCard, type ScrollSplitCardItem } from "@/components/ui/scroll-split-card";

// The banner carries the visible "Testimonials" title
const banner = "/images/testimonials-banner.webp";
const bannerGreen = "#35753c"; // its background colour, shown while it loads

// Card backs alternate Lime Pulse / Warm Stone, both with Forest Depths text
const backs = [
  { bgColor: "var(--color-lime-pulse)", textColor: "var(--color-forest-depths)" },
  { bgColor: "var(--color-warm-stone)", textColor: "var(--color-forest-depths)" },
];

// On the back of each strip: the quote at the top, name + role at the bottom
const cards: ScrollSplitCardItem[] = testimonials.items.map((t, i) => ({
  ...backs[i % backs.length],
  title: t.name,
  description: t.role,
  icon: (
    <>
      <span className="block text-heading leading-none font-light" aria-hidden="true">
        “
      </span>
      {/* sized up because the cards are shown at 80% */}
      <blockquote className="mt-16 text-body xl:text-subheading">{t.quote}</blockquote>
    </>
  ),
}));

// Customer testimonials — dark band.
// Desktop: the banner fills the screen, then splits into strips that flip
// over into the quote cards as you scroll. Phones/tablets: the banner above
// a swipeable strip of quote cards (strips would be too narrow to read).
export function Testimonials() {
  return (
    <section className="bg-forest-depths text-snow-white">
      <h2 className="sr-only">{testimonials.title}</h2>

      <Container className="py-64 md:py-96 lg:hidden">
        <Image src={banner} alt="" width={2103} height={748} sizes="100vw" className="w-full rounded-cards" />
        <div className="no-scrollbar -mx-24 mt-32 flex snap-x snap-mandatory gap-16 overflow-x-auto px-24">
          {testimonials.items.map((t) => (
            <figure
              key={t.name}
              className="flex w-[300px] shrink-0 snap-start flex-col rounded-cards border-[1.5px] border-snow-white/20 p-24"
            >
              <span className="text-heading leading-none font-light text-lime-pulse" aria-hidden="true">
                “
              </span>
              <blockquote className="mt-16 text-body-sm text-snow-white/90">{t.quote}</blockquote>
              <figcaption className="mt-auto pt-32">
                <span className="block text-body-sm font-medium">{t.name}</span>
                <span className="mt-8 block font-seed-sans-mono text-label font-light tracking-mono text-snow-white/60 uppercase">
                  {t.role}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>

      <ScrollSplitCard
        className="hidden h-[350vh] lg:block"
        imageSrc={banner}
        imageColor={bannerGreen}
        cards={cards}
        hint="Scroll to read their stories"
        stickyTop={72} // the sticky Navbar is 72px tall
      />
    </section>
  );
}
