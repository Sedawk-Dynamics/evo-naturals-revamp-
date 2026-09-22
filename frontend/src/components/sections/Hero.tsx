import { hero } from "@/data/site";
import { Container } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { HeroVideo } from "@/components/ui/HeroVideo";

// Hero — the capsule video (public/videos/hero.mp4). The left ~40% of every
// frame is plain cream (#f2ece2), so on desktop the headline sits on it and
// the video fills the band. On phones/tablets the text comes first and the
// video follows as a block (a portrait crop would cut the capsule off).
// It slides up under the see-through Navbar (-mt-[72px]) and has rounded
// bottom corners; the wrapper's Forest Depths — the colour of the Products
// section that follows — shows behind them. Change both together.
export function Hero() {
  return (
    <div className="-mt-[72px] bg-forest-depths">
      <section className="relative overflow-hidden rounded-b-large-cards bg-[#f2ece2] lg:h-[calc(100svh-40px)] lg:max-h-[900px] lg:min-h-[640px]">
        <Container className="relative z-10 pt-[136px] pb-48 lg:flex lg:h-full lg:items-center lg:pt-[72px] lg:pb-0">
          <div className="max-w-[560px] lg:max-w-[500px]">
            <h1 className="text-heading-lg font-w350 md:text-display">{hero.title}</h1>
            <p className="mt-24 max-w-[460px] text-body-sm">{hero.body}</p>

            <ul className="mt-32 flex flex-col gap-8 font-seed-sans-mono text-label font-light tracking-mono uppercase sm:flex-row sm:flex-wrap sm:gap-x-24">
              {hero.benefits.map((b) => (
                <li key={b} className="flex items-center gap-8">
                  <span className="h-8 w-8 rounded-full bg-eucalyptus" aria-hidden="true" />
                  {b}
                </li>
              ))}
            </ul>

            <div className="mt-40 flex flex-wrap gap-16">
              <Button href={hero.primary.href} magnetic>
                {hero.primary.label}
              </Button>
              <Button href={hero.secondary.href} variant="inverted" magnetic>
                {hero.secondary.label}
              </Button>
            </div>
          </div>
        </Container>

        {/* A block under the text on phones; full-bleed behind it on desktop */}
        <div className="relative aspect-[4/3] sm:aspect-video lg:absolute lg:inset-0 lg:aspect-auto">
          <HeroVideo
            src="/videos/hero.mp4"
            poster="/videos/hero-poster.webp"
            className="size-full object-cover object-right lg:object-center"
          />
          {/* Desktop: cream fades over the video's left side and top edge, so the
              headline and the see-through Navbar stay readable in every frame */}
          <div className="pointer-events-none absolute inset-0 hidden bg-linear-to-r from-[#f2ece2] from-25% via-[#f2ece2]/70 via-40% to-transparent to-60% lg:block" />
          <div className="pointer-events-none absolute inset-x-0 top-0 hidden h-[160px] bg-linear-to-b from-[#f2ece2]/70 to-transparent lg:block" />
        </div>
      </section>
    </div>
  );
}
