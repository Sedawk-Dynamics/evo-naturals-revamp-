import nodemailer from "nodemailer";
import { validateEnquiry } from "@/data/enquiries";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const fail = (status: number) => Response.json({ error: "Unable to submit enquiry." }, { status });
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return fail(403);
  if (!request.headers.get("content-type")?.includes("application/json")) return fail(415);
  let data: unknown;
  try {
    const body = await request.text();
    if (body.length > 4096) return fail(413);
    data = JSON.parse(body);
  } catch { return fail(400); }
  const enquiry = validateEnquiry(data);
  if (!enquiry || (data as Record<string, unknown>).website) return fail(400);
  const { SMTP_URL, SMTP_FROM, SALES_EMAIL } = process.env;
  if (!SMTP_URL || !SMTP_FROM || !SALES_EMAIL) return fail(503);

  try {
    const transport = nodemailer.createTransport({
      url: SMTP_URL,
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 15000,
      disableFileAccess: true,
      disableUrlAccess: true,
    });
    const result = await transport.sendMail({
      from: SMTP_FROM,
      to: SALES_EMAIL,
      replyTo: { name: enquiry.name, address: enquiry.email },
      subject: `Product enquiry: ${enquiry.product.name}`,
      text: `New Evo Naturals sales enquiry\n\nName: ${enquiry.name}\nPhone: ${enquiry.phone}\nEmail: ${enquiry.email}\nProduct: ${enquiry.product.name}\n\nPlease contact this customer about the selected product and collect their order details.`,
    });
    if (!result.accepted.length) return fail(502);
    return Response.json({ success: true });
  } catch {
    // Do not log SMTP credentials or customer details.
    return fail(502);
  }
}
