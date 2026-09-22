"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";

// Input Field (DESIGN.md): for dark green sections only. Transparent,
// 1.5px Snow White border, 8px radius, 14px/20px padding, placeholder in
// semi-transparent Snow White. Paired here with a ghost button.
// TODO(backend): send the email to the API instead of just showing thanks.
export function EmailForm({
  placeholder,
  buttonLabel,
}: {
  placeholder: string;
  buttonLabel: string;
}) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (email) setSent(true);
  }

  if (sent) {
    return <p className="text-body-sm text-snow-white">Thanks — you&apos;re on the list.</p>;
  }

  return (
    <form onSubmit={onSubmit} className="flex w-full max-w-[480px] flex-col gap-8 sm:flex-row">
      <label htmlFor="newsletter-email" className="sr-only">
        {placeholder}
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={placeholder}
        className="min-w-0 flex-1 rounded-inputs border-[1.5px] border-snow-white bg-transparent px-[20px] py-[14px] text-body-sm leading-none text-snow-white placeholder:text-snow-white/60 focus:outline-none focus-visible:border-lime-pulse"
      />
      <Button type="submit" variant="ghost">
        {buttonLabel}
      </Button>
    </form>
  );
}
