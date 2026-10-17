import { PageShell } from "@/components/layout/PageShell";
import { Section } from "@/components/ui/Section";
import { ProductShowcase } from "@/components/sections/ProductShowcase";
import { Wellness } from "@/components/sections/Wellness";
import { Philosophy } from "@/components/sections/Philosophy";

export const metadata = { title: "Shop | Evo Naturals" };

export default function ShopPage() {
  return <PageShell>
    <Section>
      <p className="font-seed-sans-mono text-label uppercase tracking-mono">The Evo Naturals collection</p>
      <h1 className="mt-16 text-heading-lg font-w350 md:text-display">Everyday wellness. Naturally.</h1>
      <p className="mt-24 max-w-[600px] text-body text-pewter">Explore our products and find out what goes into each formula. A thoughtful addition to your daily routine.</p>
    </Section>
    <ProductShowcase showShopLink={false} />
    <Wellness />
    <Philosophy />
  </PageShell>;
}
