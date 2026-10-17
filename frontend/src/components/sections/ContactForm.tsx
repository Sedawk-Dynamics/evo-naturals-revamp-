"use client";

import { useRef, useState, type FormEvent } from "react";
import { enquiryProducts, validateEnquiry } from "@/data/enquiries";
import { contact } from "@/data/site";
import { Button } from "@/components/ui/Button";

const fieldClass = "mt-8 w-full rounded-inputs border border-frosted-glass bg-snow-white px-16 py-16 text-forest-depths";

export function ContactForm() {
  const [pending, setPending] = useState(false);
  const submitting = useRef(false);
  const [error, setError] = useState("");
  const [submittedProduct, setSubmittedProduct] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const enquiry = validateEnquiry(data);
    if (!enquiry) { setError("Please enter your name, a valid email and phone number, and select a product."); return; }
    submitting.current = true;
    setPending(true);
    setError("");
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (!response.ok) throw new Error("submission failed");
      setSubmittedProduct(enquiry.product.name);
    } catch {
      setError(`We couldn't send your enquiry. Please try again or email ${contact.email}.`);
    } finally { submitting.current = false; setPending(false); }
  }

  return <div className="rounded-large-cards bg-warm-stone p-32 md:p-48">
    <h2 className="text-heading font-w350">Request a callback</h2>
    {submittedProduct ? <div role="status" className="mt-24">
      <h3 className="text-subheading font-w350">Thank you for submitting your enquiry!</h3>
      <p className="mt-16 text-body-sm">A salesperson will contact you about {submittedProduct} and help you with your order details.</p>
      <Button className="mt-32" onClick={() => setSubmittedProduct("")}>Send another enquiry</Button>
    </div> : <>
      <p className="mt-16 text-body-sm text-pewter">Tell us which product you&apos;re interested in. Our sales team will contact you to discuss your order. All fields are required.</p>
      <form onSubmit={submit} className="mt-32 space-y-24" aria-busy={pending}>
        <fieldset disabled={pending} className="space-y-24">
          <label className="block text-body-sm" htmlFor="contact-name">Full name <span aria-hidden="true">*</span><input id="contact-name" name="name" autoComplete="name" required maxLength={100} className={fieldClass} /></label>
          <label className="block text-body-sm" htmlFor="contact-phone">Phone number <span aria-hidden="true">*</span><input id="contact-phone" name="phone" type="tel" autoComplete="tel" required maxLength={30} className={fieldClass} /></label>
          <label className="block text-body-sm" htmlFor="contact-email">Email address <span aria-hidden="true">*</span><input id="contact-email" name="email" type="email" autoComplete="email" required maxLength={254} className={fieldClass} /></label>
          <label className="block text-body-sm" htmlFor="contact-product">Product / medicine <span aria-hidden="true">*</span><select id="contact-product" name="product" required defaultValue="" className={fieldClass}>
            <option value="" disabled>Select a product</option>
            {enquiryProducts.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select></label>
          <div className="hidden" aria-hidden="true"><label htmlFor="contact-website">Website</label><input id="contact-website" name="website" tabIndex={-1} autoComplete="off" /></div>
        </fieldset>
        <p className="text-caption text-pewter">By submitting, you agree that our sales team may contact you by phone or email about this enquiry.</p>
        {error && <p role="alert" className="text-body-sm text-red-800">{error}</p>}
        <Button type="submit" disabled={pending} className="w-full">{pending ? "Submitting…" : "Submit enquiry"}</Button>
      </form>
    </>}
  </div>;
}
