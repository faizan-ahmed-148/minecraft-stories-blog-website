export function getDomain(req) {
    try {
      // Get host from request headers
      const host = req.headers.get("host") || "minecraftstories.gg";
  
      // Remove subdomains if necessary (optional)
      const domainParts = host.split(".");
      if (domainParts.length > 2) {
        // Assuming "sub.example.com" → returns "example.com"
        return domainParts.slice(-2).join(".");
      }
  
      return host; // Returns full host if no subdomain stripping is needed
    } catch (error) {
      console.error("Error extracting domain:", error);
      return "minecraftstories.gg"; // Fallback domain
    }
  }
  