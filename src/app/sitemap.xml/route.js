import { getBaseUrl } from "@/config";
import { NextResponse } from "next/server";
import { store } from "../store/store";
import { getApi } from "../Services/ChacheApis";

export const dynamic = "force-dynamic";
const encodeURL = (str) => str.replace(/&/g, "&amp;");

function generateSiteMap({ url, pageNames, productPages, categoriesPages }) {
  const today = new Date().toISOString().split("T")[0];

  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>https://${url}</loc>
        <lastmod>${today}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      </url>
      ${pageNames
        .map(
          (pageURL) => `
        <url>
          <loc>https://${url}/${encodeURL(pageURL)}</loc>
          <lastmod>${today}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.7</priority>
        </url>`
        )
        .join("")}
      ${productPages
        .map(
          (pageURL) => `
        <url>
          <loc>https://${url}/posts/${encodeURL(pageURL?.slug)}</loc>
          <lastmod>${today}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.9</priority>
        </url>`
        )
        .join("")}
      ${categoriesPages
        .map(
          (pageURL) => `
        <url>
          <loc>https://${url}/list/categories/${encodeURL(pageURL?.slug)}</loc>
          <lastmod>${today}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.9</priority>
        </url>`
        )
        .join("")}
    </urlset>`;
}

// ✅ **Use RTK Query API Manually (Instead of Hooks)**
export async function GET(req) {
  try {
    const headersList = req.headers;
    const host = headersList.get("host"); // Get host dynamically

    const baseUrl = getBaseUrl();

    let staticPages = [
      "about",
      "article/new-article",
      "article/your-article",
      "auth/login",
      "auth/sign-up",
      "contact",
      "list/editor-pick-posts",
      "list/featured-posts",
      "list/recent-posts",
      "list/trending-posts",
      "list/categories",
      "news-feed",
      "terms&conditions",
      "videos",
      "privacyPolicy",
      "profile/change-password",
      "profile/edit",
    ];
    let productPages = [
      "minecraft-building-guide",
      "best-minecraft-seeds",
      "redstone-tutorial",
      "minecraft-survival-tips",
    ];
    let categoriesPages = [
      "minecraft-building-guide",
      "best-minecraft-seeds",
      "redstone-tutorial",
      "minecraft-survival-tips",
    ];

    // ✅ Fetch Dynamic Data Using RTK Query Without Hooks
    const response = await store.dispatch(
      getApi.endpoints.getSiteMap.initiate({ baseUrl, apiType: "/client/getSiteMap" })
    );

    
    if (response?.data) {
    
      productPages = response.data?.posts?.length
        ? response.data?.posts
        : productPages;
      categoriesPages = response.data?.category?.length
        ? response.data?.category
        : categoriesPages;
    } else {
      console.warn("Failed to fetch dynamic sitemap data. Using static data.");
    }

    // ✅ Generate XML Sitemap
    const sitemap = generateSiteMap({
      url: host,
      pageNames: staticPages,
      productPages,
      categoriesPages,
    });

    return new NextResponse(sitemap, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
