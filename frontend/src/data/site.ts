// ==========================================================================
// ALL SITE TEXT LIVES HERE — content from the Evo Naturals website.
// Change wording, products, links and prices in this file only.
// (Later the backend can return this same shape from an API.)
// ==========================================================================

export type Accent = "forest-depths" | "sage-moss" | "olive-gold" | "eucalyptus";

export const site = {
  name: "Evo Naturals",
  legalName: "EvoNaturals Private Limited",
  description:
    "EvoNaturals Private Limited is dedicated to nurturing healthier lifestyles through thoughtfully developed wellness solutions inspired by nature and guided by knowledge.",
  // Full stacked logo (vector). The nav/footer lockup in Logo.tsx is built
  // from the same shapes.
  logoFull: "/images/logo.svg",
};

export const contact = {
  phone: "+91 95877 77461",
  phoneHref: "tel:+919587777461",
  email: "info@evonaturals.com",
  address:
    "B-5, Commercial Complex, VKIA Road No. 5, Road No-5 VKIA, Jaipur – 302013, Rajasthan, India",
};

export const promo = {
  text: `Questions? Call us at ${contact.phone}`,
  link: { label: "Contact us", href: "#contact" },
};

export const nav = {
  links: [
    { label: "Products", href: "#products" },
    { label: "About Us", href: "#about" },
    { label: "Blog", href: "#articles" },
    { label: "Contact Us", href: "#contact" },
  ],
  cta: { label: "Shop Now", href: "#products" },
};

// --- Hero ----------------------------------------------------------------
export const hero = {
  title: "Feel Balanced. Think Clear. Live Naturally.",
  body: "Support your everyday well-being with thoughtfully formulated natural solutions designed to align body, mind, and lifestyle.",
  benefits: ["Promotes Mental Clarity", "Encourages Calm Energy", "Supports Daily Wellness Rhythm"],
  primary: { label: "Shop Now", href: "#products" },
  secondary: { label: "About Us", href: "#about" },
};

// --- Products (dark) -----------------------------------------------------
export type Product = {
  id: string;
  name: string;
  tagline: string; // small line above the name
  label: string; // short text printed on the jar illustration
  accent: Accent;
  href: string;
  price?: string;
  image?: string; // product photo; without one, a jar illustration is drawn
  comingSoon?: boolean; // shown with a "Coming soon" badge, no price or button
};

export const products: { title: string; items: Product[] } = {
  title: "Products",
  items: [
    {
      id: "calmroot",
      name: "CALMROOT™ Capsules",
      tagline: "Ashwagandha KSM-66® · 60 capsules",
      label: "CALMROOT",
      price: "₹799",
      accent: "forest-depths",
      href: "#",
      image: "/images/products/calmroot.webp",
    },
    // When one launches: give it a name, price and image, and drop comingSoon
    { id: "coming-soon-1", name: "New Formula", tagline: "In development", label: "SOON", accent: "sage-moss", href: "#", comingSoon: true },
    { id: "coming-soon-2", name: "New Formula", tagline: "In development", label: "SOON", accent: "eucalyptus", href: "#", comingSoon: true },
  ],
};

// --- Wellness intro + categories (light) --------------------------------
export const wellness = {
  title: "Wellness That Cares For You & Your Everyday Life",
  body: "A gentle approach to staying well, designed to integrate seamlessly into modern living.",
  categoriesTitle: "Wellness Categories",
  categories: [
    "Daily Wellness Essentials",
    "Preventive Health Solutions",
    "Immunity & Vitality Support",
    "Mind & Lifestyle Balance",
    "Natural Nutrition & Care",
  ],
};

// --- Philosophy (dark) ---------------------------------------------------
export const philosophy = {
  title: "Built on Nature. Guided by Knowledge.",
  body: "Combining traditional wellness wisdom with responsible innovation to support long-term vitality.",
  points: ["Supports Active Living", "Encourages Sustainable Health", "Designed for Holistic Wellbeing"],
  // Glass image slider on the right (GlassSlider). Images must live in
  // public/ (same site): WebGL can't use images from other servers unless
  // they allow it, and the original 21st.dev CDN only allows localhost —
  // which is why the slider worked locally but not on Vercel.
  // Placeholders from 21st.dev; swap in brand photos any time.
  slides: [
    { title: "Ethereal Glow", description: "A soft, radiant light that illuminates the soul.", image: "/images/slides/slide-1.webp" },
    { title: "Rose Mirage", description: "Lost in a desert of blooming dreams and endless horizons.", image: "/images/slides/slide-2.webp" },
    { title: "Velvet Mystique", description: "Wrapped in the deep, luxurious embrace of the night.", image: "/images/slides/slide-3.webp" },
    { title: "Golden Hour", description: "That fleeting moment when the world is dipped in gold.", image: "/images/slides/slide-4.webp" },
    { title: "Midnight Dreams", description: "Where reality fades and imagination takes flight.", image: "/images/slides/slide-5.webp" },
    { title: "Silver Light", description: "A cool, metallic shimmer reflecting the urban pulse.", image: "/images/slides/slide-6.webp" },
  ],
};

// --- About (light) -------------------------------------------------------
export const about = {
  title: "About Evo Naturals",
  paragraphs: [
    "EvoNaturals Private Limited is dedicated to nurturing healthier lifestyles through thoughtfully developed wellness solutions inspired by nature and guided by knowledge.",
    "Our philosophy goes beyond short-term health goals. We focus on sustainable wellbeing — supporting individuals in building a balanced, active, and mindful life.",
    "We combine natural inspiration with responsible innovation to create wellness solutions that integrate seamlessly into daily routines.",
  ],
  cta: { label: "Contact Us", href: "#contact" },
};

// --- Testimonials (dark) -------------------------------------------------
export const testimonials = {
  title: "Customer Testimonials",
  items: [
    {
      name: "Ankit Sharma",
      role: "Working Professional",
      quote:
        "EvoNaturals has helped me become more conscious about my daily wellness routine. The approach feels natural and easy to maintain with my busy schedule.",
    },
    {
      name: "Neha Verma",
      role: "Wellness Enthusiast",
      quote:
        "I appreciate how thoughtfully designed the products are. They align perfectly with my goal of maintaining balance without making drastic lifestyle changes.",
    },
    {
      name: "Rahul Mehta",
      role: "Entrepreneur",
      quote:
        "The philosophy behind EvoNaturals really stands out. It’s not just about products—it’s about encouraging a healthier way of living.",
    },
    {
      name: "Dr. Pooja Singh",
      role: "Healthcare Professional",
      quote:
        "I was looking for something that supports overall wellbeing in a gentle and sustainable way. EvoNaturals fits seamlessly into my everyday life.",
    },
  ],
};

// --- Articles (light) ----------------------------------------------------
export const articles = {
  title: "Articles",
  link: { label: "View all", href: "#articles" },
  items: [
    "Sample -1",
    "Organic dairy farming calls for even healthier cows",
    "Healthy, resilient cows for organic dairy farming",
    "What breeds can I choose for organic dairy farming?",
    "Breeding solutions for organic dairy farmers",
    "Why is Saved Feed important in organic farming?",
    "What’s going on in cattle breeding organic farm",
    "Investing in feed efficiency can reduce cattle emissions",
  ].map((title) => ({ title, href: "#" })),
};

// --- Footer --------------------------------------------------------------
export const footer = {
  description:
    "EvoNaturals Private Limited is dedicated to transforming healthcare management through holistic and integrated solutions.",
  quickLinks: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "#about" },
    { label: "Blog", href: "#articles" },
    { label: "Contact Us", href: "#contact" },
  ],
  // TODO: these pages don't exist yet
  importantLinks: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms & Conditions", href: "#" },
    { label: "Return & Refund Policy", href: "#" },
    { label: "Shipping Policy", href: "#" },
  ],
  // TODO: replace "#" with the real profile URLs
  social: [
    { name: "Instagram", href: "#" },
    { name: "Facebook", href: "#" },
    { name: "X", href: "#" },
  ] as { name: "Instagram" | "Facebook" | "X"; href: string }[],
};
