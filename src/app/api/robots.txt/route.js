import { getDomain } from "@/app/lib/getDomain";

export default function handler(req, res) {
    const domain = getDomain(req) || req.headers.host; // Fallback to req.headers.host

    res.setHeader("Content-Type", "text/plain"); 
    res.status(200).send(
        `User-agent: *
        Sitemap: https://${domain}/sitemap.xml`
    );
}
