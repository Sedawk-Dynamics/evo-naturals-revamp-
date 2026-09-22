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
  // Glass image slider on the right (GlassSlider). Placeholder images from
  // 21st.dev — swap in brand photos (e.g. "/images/slide-1.jpg") any time.
  slides: [
    { title: "Ethereal Glow", description: "A soft, radiant light that illuminates the soul.", image: "https://cdn.21st.dev/assets/mirror/b2/b26ed9367c41626c7e61d837f0ea11cdaa3148a499e6bee171176886c8959950.jpg" },
    { title: "Rose Mirage", description: "Lost in a desert of blooming dreams and endless horizons.", image: "https://cdn.21st.dev/assets/mirror/40/4028a63d1229ffb5d2eccc4c4f7640858afb1bbf639fc41b9a86a376a1202555.jpg" },
    { title: "Velvet Mystique", description: "Wrapped in the deep, luxurious embrace of the night.", image: "https://cdn.21st.dev/assets/mirror/e6/e65a4e822aa4606715518071f6d85d2066b721b8e7e952e8ab6c051e87bc7a36.jpg" },
    { title: "Golden Hour", description: "That fleeting moment when the world is dipped in gold.", image: "https://cdn.21st.dev/assets/mirror/87/87882922b01fff1934486f69e7ee39a5a5e05bf2b935bb03a916234be898ee0e.jpg" },
    { title: "Midnight Dreams", description: "Where reality fades and imagination takes flight.", image: "https://cdn.21st.dev/assets/mirror/99/99ee55fd55281f879bd8cf899e4cb967a99a142d6b571765e46a88ad619ee9de.jpg" },
    { title: "Silver Light", description: "A cool, metallic shimmer reflecting the urban pulse.", image: "https://cdn.21st.dev/assets/mirror/24/24ae667023524d2b6621597f09bf7062c9eadf03fe98d0f2c741637ede1131fc.jpg" },
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
