import Image from "next/image";
import { products, type Product } from "@/data/site";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Jar } from "@/components/ui/Jar";
import { accentBg } from "@/lib/accents";

// Products — full-bleed Forest Depths band, equal-width card grid with
// 16px gaps. Cards have no visible container (DESIGN.md). The grid runs
// wide (edge to edge, 48px margins) so the cards read big, like a shelf.
// Launched products show their photo, price and Shop Now; the rest show a
// faded jar with a "Coming soon" badge.
export function ProductShowcase() {
  return (
    <Section id="products" tone="dark" wide>
      <h2 className="text-heading-lg font-w350 md:text-display">{products.title}</h2>

      {/* One column until three fit side by side (two columns would leave
          the third card alone on its own row) */}
      <div className="mt-48 grid gap-x-16 gap-y-48 md:grid-cols-3">
        {products.items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </Section>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <article className="flex flex-col">
      {product.image ? (
        <div className="relative aspect-square overflow-hidden rounded-cards bg-warm-stone">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 1920px) 600px, (min-width: 768px) 33vw, 100vw"
            className="object-cover"
          />
        </div>
      ) : (
        <div
          className={`relative flex aspect-square items-end justify-center overflow-hidden rounded-cards ${accentBg[product.accent]}`}
        >
          <div className="absolute inset-x-0 bottom-0 h-[24%] bg-forest-depths/10" />
          <Jar
            accent="forest-depths"
            code={product.label}
            className={`relative mb-[10%] w-[54%] ${product.comingSoon ? "opacity-60 blur-[2px]" : ""}`}
          />
          {product.comingSoon && (
            <span className="absolute top-16 left-16 xl:top-24 xl:left-24">
              <Badge variant="new">Coming soon</Badge>
            </span>
          )}
        </div>
      )}

      <p className="mt-24 font-seed-sans-mono text-label font-light tracking-mono text-snow-white/60 uppercase">
        {product.tagline}
      </p>
      <h3 className="mt-8 text-subheading font-w350 xl:text-heading">{product.name}</h3>

      {/* mt-auto: price rows line up even when a name wraps to two lines.
          min-h = 16px top padding + a 44px row, the height of the button,
          so "Launching soon" sits level with the price. */}
      <div className="mt-auto flex min-h-[60px] items-center justify-between gap-16 pt-16">
        {product.comingSoon ? (
          <span className="flex items-center gap-8 text-body-sm text-snow-white/80 xl:text-body">
            {/* Lime dot with a soft ping: "on its way" */}
            <span className="relative flex h-8 w-8" aria-hidden="true">
              <span className="absolute inset-0 animate-ping rounded-full bg-lime-pulse opacity-75 motion-reduce:animate-none" />
              <span className="relative h-8 w-8 rounded-full bg-lime-pulse" />
            </span>
            Launching soon
          </span>
        ) : (
          <>
            <span className="text-body-sm font-medium xl:text-body">{product.price}</span>
            <Button href={product.href} variant="ghost" size="sm">
              Shop Now
            </Button>
          </>
        )}
      </div>
    </article>
  );
}
