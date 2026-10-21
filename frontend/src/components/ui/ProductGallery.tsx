"use client";

import Image from "next/image";
import { useState } from "react";

export function ProductGallery({ images }: { images: { src: string; alt: string }[] }) {
  const [selected, setSelected] = useState(0);
  const active = images[selected];

  return (
    <div>
      <div className="product-photo-stage relative aspect-square overflow-hidden rounded-large-cards">
        <div key={active.src} className="product-photo-reveal absolute inset-16 md:inset-24">
          <Image src={active.src} alt={active.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="product-photo object-contain" priority />
        </div>
        <span className="absolute right-16 bottom-16 rounded-full bg-snow-white/90 px-16 py-8 font-seed-sans-mono text-label" aria-hidden="true">
          {String(selected + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
        </span>
      </div>
      {images.length > 1 && (
        <div className="mt-16 flex justify-center gap-16" aria-label="Product photos">
          {images.map((image, index) => (
            <button
              key={image.src}
              type="button"
              onClick={() => setSelected(index)}
              aria-label={`View ${image.alt}`}
              aria-pressed={selected === index}
              className={`product-photo-thumbnail relative h-96 w-96 overflow-hidden rounded-[16px] border-2 bg-warm-stone focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest-depths ${selected === index ? "border-forest-depths" : "border-frosted-glass"}`}
            >
              <Image src={image.src} alt={image.alt} fill sizes="96px" className="product-photo object-contain p-8" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
