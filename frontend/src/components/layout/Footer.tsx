import Link from "next/link";
import type { ReactNode } from "react";
import { contact, footer, site } from "@/data/site";
import { Container } from "@/components/ui/Section";
import { AnimatedDock } from "@/components/ui/animated-dock";
import { socialIcons } from "@/components/ui/SocialIcons";
import { Logo } from "@/components/layout/Logo";

export function Footer() {
  const year = new Date().getFullYear();

  const socialItems = footer.social.map(({ name, href }) => {
    const SocialIcon = socialIcons[name];
    // Open real profiles in a new tab; "#" placeholders stay on the page
    const target = href.startsWith("http") ? "_blank" : undefined;
    return { link: href, target, label: name, Icon: <SocialIcon size={20} /> };
  });

  return (
    <footer id="contact" className="bg-forest-depths pt-64 pb-32 text-snow-white md:pt-96">
      <Container>
        <div className="grid gap-64 lg:grid-cols-[5fr_7fr]">
          <div>
            <Logo tone="light" />
            <p className="mt-24 max-w-[400px] text-body-sm text-snow-white/80">{footer.description}</p>

            {/* Social links — animated dock. Extra top margin leaves room
                for icons to grow upward on hover. */}
            <AnimatedDock
              items={socialItems}
              className="mx-0 mt-48 w-fit border-snow-white/20 bg-snow-white/15 shadow-none"
            />
          </div>

          <div className="grid gap-40 sm:grid-cols-3">
            <FooterColumn title="Quick Links">
              {footer.quickLinks.map((l) => (
                <FooterLink key={l.label} href={l.href}>
                  {l.label}
                </FooterLink>
              ))}
            </FooterColumn>

            <FooterColumn title="Important Links">
              {footer.importantLinks.map((l) => (
                <FooterLink key={l.label} href={l.href}>
                  {l.label}
                </FooterLink>
              ))}
            </FooterColumn>

            <FooterColumn title="Contact">
              <FooterLink href={contact.phoneHref}>{contact.phone}</FooterLink>
              <FooterLink href={`mailto:${contact.email}`}>{contact.email}</FooterLink>
              <li>
                <address className="text-body-sm text-snow-white/80 not-italic">{contact.address}</address>
              </li>
            </FooterColumn>
          </div>
        </div>

        <div className="mt-96 border-t border-snow-white/20 pt-32">
          <p className="text-label text-snow-white/60">
            © {year} {site.legalName}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h3 className="font-seed-sans-mono text-label font-light tracking-mono text-snow-white/60 uppercase">
        {title}
      </h3>
      <ul className="mt-16 flex flex-col gap-8">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-body-sm break-words hover:underline">
        {children}
      </Link>
    </li>
  );
}
