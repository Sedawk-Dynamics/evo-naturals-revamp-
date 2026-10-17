import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { articles } from "@/data/site";
import { PageShell } from "@/components/layout/PageShell";
import { Section } from "@/components/ui/Section";
import { BranchIllustration } from "@/components/ui/BranchIllustration";
export function generateStaticParams() { return articles.items.map(p => ({ slug: p.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = articles.items.find(p => p.slug === slug);
  return { title: `${post?.title ?? "Story not found"} | Evo Naturals`, description: post?.excerpt };
}
export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = articles.items.find(p => p.slug === slug);
  if (!post) notFound();
  return <PageShell><Section><article className="mx-auto max-w-[800px]">
    <Link href="/blog" className="underline underline-offset-4">← Back to the journal</Link>
    <p className="mt-40 font-seed-sans-mono text-label uppercase tracking-mono">{post.category}</p>
    <h1 className="mt-16 text-heading-lg font-w350 md:text-display">{post.title}</h1>
    <div className="relative mt-40 overflow-hidden rounded-large-cards bg-sage-moss">
      {post.image ? <Image src={post.image} alt={post.imageAlt ?? post.title} width={2752} height={1536} sizes="(min-width: 848px) 800px, 100vw" className="h-auto w-full" preload /> : <BranchIllustration seed={23} color="#fcfcf7" className="h-[240px] w-full opacity-60" />}
    </div>
    <div className="mt-40 space-y-24 text-body-sm leading-relaxed">
      {post.paragraphs.map((paragraph, index) => paragraph.startsWith("## ") ? <h2 key={index} className="pt-16 text-subheading font-w350">{paragraph.slice(3)}</h2> : <p key={index} className="whitespace-pre-line [overflow-wrap:anywhere]">{paragraph}</p>)}
    </div>
    <div className="mt-48 border-t border-frosted-glass pt-32"><Link href="/shop" className="underline underline-offset-4">Explore our products →</Link></div>
  </article></Section></PageShell>;
}
