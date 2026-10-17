export const enquiryProducts = [
  { id: "calmroot", name: "CALMROOT Capsules" },
  { id: "mucuna-quench", name: "MUCUNA QUENCH" },
] as const;

export function validateEnquiry(value: unknown) {
  if (!value || typeof value !== "object") return null;
  const data = value as Record<string, unknown>;
  const name = typeof data.name === "string" ? data.name.trim() : "";
  const email = typeof data.email === "string" ? data.email.trim() : "";
  const phone = typeof data.phone === "string" ? data.phone.trim() : "";
  const product = enquiryProducts.find(p => p.id === data.product);
  if (!name || name.length > 100 || /[\r\n]/.test(name) ||
      email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      phone.length > 30 || !/^[+\d\s().-]+$/.test(phone) ||
      phone.replace(/\D/g, "").length < 7 || phone.replace(/\D/g, "").length > 15 || !product) return null;
  return { name, email, phone, product };
}
