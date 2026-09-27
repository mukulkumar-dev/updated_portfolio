import { Resend } from "resend";
import { z } from "zod";

// Server-only: never import this file from src/ — it reads the secret API key.

const CONTACT_EMAIL = "3003mukulkumar@gmail.com";

const contactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(200),
  designation: z.string().trim().max(100).optional().default(""),
  company: z.string().trim().max(100).optional().default(""),
  message: z.string().trim().min(1).max(5000),
});

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export type ContactResult = { status: number; body: { ok: boolean; error?: string } };

export const handleContact = async (payload: unknown): Promise<ContactResult> => {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set");
    return { status: 500, body: { ok: false, error: "Email service is not configured." } };
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return { status: 400, body: { ok: false, error: "Please fill in all required fields correctly." } };
  }

  const { name, email, designation, company, message } = parsed.data;
  const rows = [
    ["Name", name],
    ["Email", email],
    ["Designation", designation],
    ["Company", company],
  ].filter(([, value]) => value);

  const html = `
    <h2>New message from your portfolio</h2>
    <table cellpadding="6">
      ${rows.map(([label, value]) => `<tr><td><strong>${label}</strong></td><td>${escapeHtml(value)}</td></tr>`).join("")}
    </table>
    <h3>Message</h3>
    <p style="white-space: pre-wrap">${escapeHtml(message)}</p>
  `;

  // Plain-text alternative: HTML-only emails are more likely to be flagged as spam.
  const text = [...rows.map(([label, value]) => `${label}: ${value}`), "", "Message:", message].join("\n");

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: process.env.RESEND_FROM ?? "Portfolio Contact <onboarding@resend.dev>",
    to: process.env.CONTACT_TO ?? CONTACT_EMAIL,
    replyTo: email,
    subject: `New message from ${name}`,
    html,
    text,
  });

  if (error) {
    console.error("Resend error:", error);
    return { status: 502, body: { ok: false, error: "Could not send your message. Please try again later." } };
  }

  return { status: 200, body: { ok: true } };
};
