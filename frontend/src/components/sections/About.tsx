import Image from "next/image";
import { about, site } from "@/data/site";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

// About — full logo on a Warm Stone panel left, story right.
export function About() {
  return (
    <Section id="about">
      <div className="grid items-center gap-48 lg:grid-cols-2 lg:gap-64">
        <div className="flex aspect-[5/4] items-center justify-center rounded-large-cards bg-warm-stone p-48">
          <Image
            src={site.logoFull}
            alt={`${site.name} logo`}
            width={399}
            height={397}
            unoptimized // SVG: already sharp at any size, nothing to resize
            className="h-auto w-[60%] max-w-[320px]"
          />
        </div>

        <div className="lg:max-w-[520px]">
          <h2 className="text-heading-lg font-w350">{about.title}</h2>
          <div className="mt-24 flex flex-col gap-16">
            {about.paragraphs.map((p) => (
              <p key={p} className="text-body font-w350">
                {p}
              </p>
            ))}
          </div>
          <Button href={about.cta.href} variant="inverted" className="mt-40">
            {about.cta.label}
          </Button>
        </div>
      </div>
    </Section>
  );
}
