import Link from "next/link";
import { articles, type Accent } from "@/data/site";
import { Section } from "@/components/ui/Section";
import { TextLink } from "@/components/ui/TextLink";
import { BranchIllustration } from "@/components/ui/BranchIllustration";
import { accentBg } from "@/lib/accents";

// Tile colours cycle through the product accents (no article images yet)
const tileAccents: Accent[] = ["sage-moss", "eucalyptus", "olive-gold"];

export function Articles() {
  return (
    <Section id="articles">
      <div className="flex flex-col gap-24 md:flex-row md:items-end md:justify-between">
        <h2 className="text-heading-lg font-w350">{articles.title}</h2>
        <TextLink href={articles.link.href}>{articles.link.label}</TextLink>
      </div>

      <div className="mt-48 grid gap-x-16 gap-y-40 sm:grid-cols-2 lg:grid-cols-4">
        {articles.items.map((a, i) => (
          <Link key={a.title} href={a.href} className="group flex flex-col">
            <div
              className={`relative aspect-[4/3] overflow-hidden rounded-cards ${accentBg[tileAccents[i % tileAccents.length]]}`}
            >
              <BranchIllustration
                seed={23 + i * 17}
                color="#fcfcf7"
                className="absolute top-1/2 left-1/2 w-[90%] -translate-x-1/2 -translate-y-1/2 opacity-60 transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <h3 className="mt-16 text-body font-w350 decoration-[1.5px] underline-offset-[4px] group-hover:underline">
              {a.title}
            </h3>
          </Link>
        ))}
      </div>
    </Section>
  );
}
