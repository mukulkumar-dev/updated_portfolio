// The ".js" extension is required: Vercel runs this as native ES modules (package.json "type": "module").
import { handleContact } from "../server/contact.js";

// Vercel serverless function: POST /api/contact
export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const { status, body } = await handleContact(payload);
  return Response.json(body, { status });
}
