# Evo Naturals

Full-stack project. Only the frontend exists so far.

```
evo naturals/
├── DESIGN.md            ← the design system (Seed-style: forest green + snow white)
├── frontend/            ← Next.js app (what you see in the browser)
└── backend/             ← (coming later) API / database
```

## Run the frontend

```bash
cd frontend
npm install      # first time only
npm run dev      # open http://localhost:3000
```

## How the frontend is organised

```
frontend/src/
├── app/
│   ├── layout.tsx         ← fonts + <html>/<body> for every page
│   ├── page.tsx           ← the home page: list of sections, top to bottom
│   └── globals.css        ← DESIGN TOKENS from DESIGN.md (colours, type, spacing, radii)
│
├── data/
│   └── site.ts            ← ALL TEXT: headlines, products, prices, links
│
├── lib/
│   └── accents.ts         ← product colour → Tailwind class
│
└── components/
    ├── ui/                ← small reusable pieces from DESIGN.md
    │   ├── Button.tsx         primary (forest fill) / ghost (white outline) / inverted
    │   ├── TextLink.tsx       underlined link with →
    │   ├── Badge.tsx          sale badge (lime), "New" tag, product code pill
    │   ├── InputField.tsx     email input for dark sections
    │   ├── animated-dock.tsx  footer social dock (motion)
    │   ├── magnetic-cursor.tsx custom cursor (gsap)
    │   ├── SocialIcons.tsx    Instagram / Facebook / X logos
    │   ├── Section.tsx        light/dark full-width band + 1200px container
    │   ├── Icon.tsx           thin line icons
    │   ├── Jar.tsx            drawn product jar (placeholder for photos)
    │   └── BranchIllustration.tsx  organic line art
    ├── layout/            ← on every page
    │   ├── PromoBanner.tsx    40px announcement bar
    │   ├── Navbar.tsx         sticky nav + mobile menu
    │   ├── Footer.tsx
    │   └── Logo.tsx           emblem + "Evo Naturals" text
    └── sections/          ← blocks of the home page
        ├── Hero.tsx             light — Feel Balanced. Think Clear…
        ├── ProductShowcase.tsx  dark  — products + prices
        ├── Wellness.tsx         light — intro + 5 wellness categories
        ├── Philosophy.tsx       dark  — Built on Nature…
        ├── About.tsx            light — About Evo Naturals + full logo
        ├── Testimonials.tsx     dark  — customer testimonials
        └── Articles.tsx         light — blog articles

Logo files: public/images/logo-full.png (original), public/images/logo-mark.png
(emblem crop). Favicon: src/app/icon.png + apple-icon.png (emblem crop).
Footer social icons use components/ui/animated-dock.tsx.
```

### Where to make common changes

| I want to change…                    | Edit                                  |
|--------------------------------------|---------------------------------------|
| Any text, product, price or link     | `src/data/site.ts`                    |
| A colour, font size, spacing, radius | `src/app/globals.css`                 |
| Section order                        | `src/app/page.tsx`                    |
| How one section looks                | `src/components/sections/…`           |
| The logo                             | `src/components/layout/Logo.tsx`      |

### Design classes (from `globals.css`)

- Colours: `forest-depths` `lime-pulse` `sage-moss` `olive-gold` `eucalyptus` `snow-white` `warm-stone` `frosted-glass` `ash` `pewter` `ink` (use as `bg-…`, `text-…`, `border-…`)
- Text: `text-micro` `text-label` `text-caption` `text-body-sm` `text-body` `text-subheading` `text-heading-sm` `text-heading` `text-heading-lg` `text-display`
- Weights: `font-light` (300) `font-w350` `font-normal` (400) `font-medium` (500)
- Fonts: `font-seed-sans` (default) `font-seed-sans-mono` (codes, specs)
- Spacing: `8 16 24 32 40 48 56 64 80 96 128` → `p-24` = 24px, `gap-16` = 16px
- Radii: `rounded-cards` (16) `rounded-large-cards` (32) `rounded-inputs` (8) `rounded-buttons` / `rounded-badges` (pill)
