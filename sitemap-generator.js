import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Emulate __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseUrl = "https://palivoslovensko.sk";
const routes = ["/", "/statistiky", "/oprojekte", "/podportenas"];

const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${routes
    .map(
      (route) => `
  <url>
    <loc>${baseUrl}${route}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>`
    )
    .join("")}
</urlset>`;

fs.writeFileSync(
  path.join(__dirname, "public", "sitemap.xml"),
  sitemapContent,
  "utf-8"
);

console.log("Sitemap generated successfully!");
