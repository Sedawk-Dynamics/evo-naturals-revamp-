import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { Section } from "@/components/ui/Section";
import { policies } from "@/data/policies";

type Props = { params: Promise<{ policy: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return policies.map(({ slug }) => ({ policy: slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { policy: slug } = await params;
  const policy = policies.find((item) => item.slug === slug);
  if (!policy) notFound();
  return { title: `${policy.title} | Evo Naturals` };
}

export default async function PolicyPage({ params }: Props) {
  const { policy: slug } = await params;
  const policy = policies.find((item) => item.slug === slug);
  if (!policy) notFound();

  return (
    <PageShell>
      <Section>
        <article className="mx-auto max-w-[800px]">
          <p className="font-seed-sans-mono text-label uppercase tracking-mono">Evo Naturals</p>
          <h1 className="mt-24 text-heading-lg font-w350 md:text-display">{policy.title}</h1>
          <div
            className="mt-32 text-body-sm leading-relaxed text-pewter [overflow-wrap:anywhere] [&_p]:my-24 [&_h2]:mt-40 [&_h2]:mb-16 [&_h2]:text-subheading [&_h2]:font-w350 [&_h2]:text-forest-depths [&_ul]:my-24 [&_ul]:list-disc [&_ul]:pl-24 [&_li]:my-8 [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-forest-depths [&_strong]:font-semibold"
            dangerouslySetInnerHTML={{ __html: policy.html }}
          />
        </article>
      </Section>
    </PageShell>
  );
}
