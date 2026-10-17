import Link from "next/link";
import Image from "next/image";
import { articles } from "@/data/site";
import { Section } from "@/components/ui/Section";
import { TextLink } from "@/components/ui/TextLink";
import { BranchIllustration } from "@/components/ui/BranchIllustration";

export function Articles({ fullPage = false }: { fullPage?: boolean }) {
  const Heading = fullPage ? "h1" : "h2";
  const posts = fullPage ? articles.items : articles.items.slice(0, 3);
  return <Section id="articles">
    <div className="flex flex-wrap items-end justify-between gap-24">
      <div><p className="mb-16 font-seed-sans-mono text-label uppercase tracking-mono">Blog</p><Heading className="text-heading-lg font-w350 md:text-display">{articles.title}</Heading></div>
      {!fullPage && <TextLink href={articles.link.href}>{articles.link.label}</TextLink>}
    </div>
    <div className="mt-48 grid gap-32 md:grid-cols-2">
      {posts.map((post, i) => <Link key={post.slug} href={`/blog/${post.slug}`} className="group flex flex-col">
        <div className={`relative aspect-[16/9] overflow-hidden rounded-cards ${i % 2 ? "bg-eucalyptus" : "bg-sage-moss"}`}>
          {post.image ? <Image src={post.image} alt={post.imageAlt ?? post.title} fill sizes="(min-width: 1200px) 576px, (min-width: 768px) 50vw, 100vw" className="object-contain" /> : <BranchIllustration seed={23 + i * 17} color="#fcfcf7" className="absolute inset-0 h-full w-full opacity-60 transition-transform duration-300 group-hover:scale-105" />}
        </div>
        <p className="mt-16 text-label uppercase tracking-mono text-pewter">{post.category}</p>
        <h3 className="mt-24 text-subheading font-w350 group-hover:underline">{post.title}</h3>
        <p className="mt-16 text-body-sm text-pewter">{post.excerpt}</p>
        <span className="mt-24 text-body-sm underline underline-offset-4">Read story <span aria-hidden="true">→</span></span>
      </Link>)}
    </div>
  </Section>;
}
