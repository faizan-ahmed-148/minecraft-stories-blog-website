import { getDomain } from "@/app/lib/getDomain";

export async function GET(req) {
  const domain = getDomain(req); // Extract domain from request headers


  return new Response(`Extracted Domain: ${domain}`, {
    headers: { "Content-Type": "text/plain" },
  });
}
