import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { contact, site } from "@/data/site";
import { ContactForm } from "@/components/sections/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | Evo Naturals",
  description: "Get in touch with Evo Naturals for product questions, order enquiries and business opportunities.",
};

export default function ContactPage() {
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.address)}`;

  return (
    <PageShell>
      <Section>
        <p className="font-seed-sans-mono text-label uppercase tracking-mono">Contact us</p>
        <div className="mt-24 grid gap-24 lg:grid-cols-2 lg:items-end lg:gap-64">
          <h1 className="max-w-[620px] text-heading-lg font-w350 md:text-display">Good conversations.<br />Natural connections.</h1>
          <p className="max-w-[480px] text-body text-pewter">Have a question about our products, an order, or working together? We&apos;d love to hear from you.</p>
        </div>

        <div className="mt-48 grid gap-24 lg:grid-cols-2">
          <ContactForm />
          <div className="flex flex-col gap-24">
          <div className="rounded-large-cards bg-forest-depths p-32 text-snow-white md:p-48">
            <Mail size={32} strokeWidth={1.5} aria-hidden="true" />
            <h2 className="mt-32 text-heading font-w350">Let&apos;s talk.</h2>
            <p className="mt-16 max-w-[420px] text-body-sm text-snow-white/80">Send your questions to our team. For an order enquiry, include your order number so we can help.</p>
            <a href={`mailto:${contact.email}`} className="mt-32 inline-flex min-h-[44px] items-center gap-16 text-subheading underline-offset-4 hover:underline [overflow-wrap:anywhere]">
              <span>{contact.email}</span><ArrowUpRight size={24} className="shrink-0" aria-hidden="true" />
            </a>
            <div className="mt-40 border-t border-snow-white/20 pt-32">
              <p className="text-label uppercase tracking-mono text-snow-white/60">Prefer a conversation?</p>
              <a href={contact.phoneHref} className="mt-8 inline-flex min-h-[44px] items-center gap-16 text-body hover:underline">
                <Phone size={20} aria-hidden="true" />{contact.phone}
              </a>
            </div>
          </div>

          <div className="flex flex-col rounded-large-cards bg-warm-stone p-32 md:p-48">
            <MapPin size={32} strokeWidth={1.5} aria-hidden="true" />
            <h2 className="mt-32 text-heading font-w350">Find us in Jaipur.</h2>
            <p className="mt-24 text-body font-medium">{site.legalName}</p>
            <address className="mt-16 max-w-[400px] text-body-sm leading-relaxed text-pewter not-italic">{contact.address}</address>
            <a href={mapUrl} target="_blank" rel="noopener noreferrer" className="mt-32 inline-flex min-h-[44px] w-fit items-center gap-8 underline underline-offset-4">
              View on Google Maps <ArrowUpRight size={18} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span>
            </a>
            <p className="mt-auto pt-32 text-body-sm text-pewter">For partnerships and business enquiries, email us with a little about your organisation and how you&apos;d like to collaborate.</p>
          </div>
          </div>
        </div>

        <div className="mt-64 flex flex-col gap-24 border-t border-frosted-glass pt-32 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-subheading font-w350">Get to know Evo Naturals.</h2>
            <p className="mt-8 text-body-sm text-pewter">Explore our collection or find fresh perspectives in <Link href="/blog" className="underline underline-offset-4">the Evo Journal</Link>.</p>
          </div>
          <Button href="/shop" variant="inverted">Explore our products</Button>
        </div>
      </Section>
    </PageShell>
  );
}
