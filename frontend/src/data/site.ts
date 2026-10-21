// ==========================================================================
// ALL SITE TEXT LIVES HERE — content from the Evo Naturals website.
// Change wording, products, links and prices in this file only.
// (Later the backend can return this same shape from an API.)
// ==========================================================================

import { blogPosts } from "./blog";

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
  link: { label: "Contact us", href: "/contact" },
};

export const nav = {
  links: [
    { label: "Products", href: "/shop" },
    { label: "About Us", href: "/#about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact Us", href: "/contact" },
  ],
  cta: { label: "Shop Now", href: "/shop" },
};

// --- Hero ----------------------------------------------------------------
export const hero = {
  title: "Feel Balanced. Think Clear. Live Naturally.",
  body: "Support your everyday well-being with thoughtfully formulated natural solutions designed to align body, mind, and lifestyle.",
  benefits: ["Promotes Mental Clarity", "Encourages Calm Energy", "Supports Daily Wellness Rhythm"],
  primary: { label: "Shop Now", href: "/shop" },
  secondary: { label: "About Us", href: "/#about" },
};

// --- Products (dark) -----------------------------------------------------
export type Product = {
  id: string;
  name: string;
  tagline: string; // small line above the name
  label: string; // short text printed on the jar illustration
  accent: Accent;
  href: string;
  description?: string;
  price?: string;
  image?: string; // product photo; without one, a jar illustration is drawn
  images?: { src: string; alt: string }[];
  story?: {
    eyebrow: string;
    headline: string;
    ingredient: string;
    ingredientNote: string;
    introduction: string;
  };
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
      href: "/shop/calmroot",
      description: "Meet CALMROOT, the Evo Naturals capsule formula featuring Ashwagandha KSM-66®. Each bottle contains 60 capsules, in a simple format for your everyday wellness routine.",
      image: "/images/products/calmroot-front.png",
      story: {
        eyebrow: "A moment for yourself",
        headline: "Make room for your daily ritual.",
        ingredient: "Ashwagandha KSM-66®",
        ingredientNote: "The featured ingredient in CALMROOT, presented in a capsule format.",
        introduction: "Meet a simpler way to make space for wellness. CALMROOT brings Ashwagandha KSM-66® into a 60-capsule bottle, with a format that fits neatly into your personal routine.",
      },
      images: [
        { src: "/images/products/calmroot-front.png", alt: "CALMROOT capsules bottle" },
        { src: "/images/products/calmroot-packaging.png", alt: "CALMROOT capsules bottle and box" },
      ],
    },
    {
      id: "mucuna-quench",
      name: "MUCUNA QUENCH Capsules",
      tagline: "Kaunch Beej · 60 capsules",
      label: "MUCUNA QUENCH",
      accent: "eucalyptus",
      href: "/shop/mucuna-quench",
      description: "Meet MUCUNA QUENCH, the Evo Naturals capsule formula featuring Kaunch Beej (Mucuna pruriens). Each bottle contains 60 capsules. Contact our team for ingredient, usage, pricing, and availability information.",
      image: "/images/products/mucuna-quench-front.png",
      story: {
        eyebrow: "Your routine. Your rhythm.",
        headline: "A considered addition to everyday life.",
        ingredient: "Kaunch Beej",
        ingredientNote: "Also known as Mucuna pruriens, the featured ingredient in MUCUNA QUENCH.",
        introduction: "Discover MUCUNA QUENCH, our Kaunch Beej capsule formula for adults. A 60-capsule format, thoughtfully presented for those who take an interest in their everyday wellness routine.",
      },
      images: [
        { src: "/images/products/mucuna-quench-front.png", alt: "MUCUNA QUENCH capsules bottle" },
        { src: "/images/products/mucuna-quench-packaging.png", alt: "MUCUNA QUENCH capsules bottle and box" },
      ],
    },
    // When one launches: give it a name, price and image, and drop comingSoon
    { id: "coming-soon-2", name: "New Formula", tagline: "In development", label: "SOON", accent: "eucalyptus", href: "#", comingSoon: true },
  ],
};

export const productPage = {
  collection: "Evo Naturals / The capsule collection",
  enquiry: "Enquire about this product",
  explore: "Explore the formula",
  detailsLabel: "01 / A closer look",
  detailsTitle: "Small details. Thoughtfully considered.",
  facts: [
    { value: "60", label: "Capsules per bottle", description: "A clearly labelled capsule count in every bottle." },
    { value: "Capsule", label: "Product format", description: "A straightforward format for your personal wellness routine." },
    { value: "Adults", label: "Labelled for", description: "A nutraceutical product intended for adults." },
  ],
  ingredientLabel: "02 / The featured ingredient",
  ingredientFooter: "Want the full picture? Ask our team for the complete ingredient list and product label.",
  packLabel: "Bottle & packaging",
  questionsLabel: "03 / Good to know",
  questionsTitle: "A little clarity before you choose.",
  questions: [
    { question: "What comes in a bottle?", answer: "Each bottle contains 60 capsules. You can explore the bottle and outer packaging using the product gallery above." },
    { question: "Where can I find ingredients and directions?", answer: "Contact our team for the complete ingredient list, product label, and directions for your chosen formula." },
    { question: "How do I check the price and availability?", answer: "Use the enquiry button to contact Evo Naturals. Our team can confirm current pricing, availability, and ordering details." },
  ],
  closingLabel: "Let’s make it personal",
  closingTitle: "Your next step starts with a conversation.",
  closingBody: "Have a question about the formula or how to order? We’re here to help you get to know the product.",
  relatedLabel: "Continue exploring",
  relatedTitle: "Meet the rest of the collection.",
  relatedLink: "Discover this formula",
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
  cta: { label: "Contact Us", href: "/contact" },
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
export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  image?: string;
  imageAlt?: string;
  paragraphs: string[];
};

// Add supplied blog content here. Cards and detail pages share this source.
export const articles: { title: string; link: { label: string; href: string }; items: BlogPost[] } = {
  title: "The Evo Journal",
  link: { label: "View all posts", href: "/blog" },
  items: blogPosts,
};

// --- Footer --------------------------------------------------------------
export const footer = {
  description:
    "EvoNaturals Private Limited is dedicated to transforming healthcare management through holistic and integrated solutions.",
  quickLinks: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/#about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact Us", href: "/contact" },
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
