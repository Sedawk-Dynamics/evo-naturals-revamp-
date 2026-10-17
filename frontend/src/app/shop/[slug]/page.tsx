import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products, contact } from "@/data/site";
import { PageShell } from "@/components/layout/PageShell";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Jar } from "@/components/ui/Jar";
import { Wellness } from "@/components/sections/Wellness";

export function generateStaticParams() {
  return products.items.filter(p => !p.comingSoon).map(p => ({ slug: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.items.find(p => p.id === slug && !p.comingSoon);
  return { title: `${product?.name ?? "Product not found"} | Evo Naturals`, description: product?.description };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.items.find(p => p.id === slug && !p.comingSoon);
  if (!product) notFound();
  return <PageShell>
    <Section>
      <nav aria-label="Breadcrumb" className="mb-32 text-body-sm"><Link href="/shop" className="underline underline-offset-4">Shop all products</Link><span aria-hidden="true"> / </span><span>{product.name}</span></nav>
      <div className="grid items-center gap-40 lg:grid-cols-2 lg:gap-64">
        <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-large-cards bg-warm-stone">
          {product.image ? <Image src={product.image} alt={product.name} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-contain" priority /> : <Jar accent={product.accent} code={product.label} className="w-1/2" />}
        </div>
        <div>
          <p className="font-seed-sans-mono text-label uppercase tracking-mono">{product.tagline}</p>
          <h1 className="mt-16 text-heading-lg font-w350 md:text-display">{product.name}</h1>
          <p className="mt-24 text-subheading">{product.price}</p>
          <p className="mt-24 text-body-sm leading-relaxed text-pewter">{product.description}</p>
          <Button href={`mailto:${contact.email}?subject=${encodeURIComponent(`Enquiry about ${product.name}`)}`} className="mt-32">Enquire about this product</Button>
          <div className="mt-40 border-t border-frosted-glass pt-24">
            <h2 className="text-subheading font-w350">Product details</h2>
            <p className="mt-16 text-body-sm">{product.tagline}</p>
            <p className="mt-16 text-body-sm text-pewter">For ingredient, usage, and availability information, contact our team.</p>
          </div>
        </div>
      </div>
    </Section>
    <Wellness />
  </PageShell>;
}
