import { contentRoutes } from "#shared/data/projects";

export default defineEventHandler((event) => {
    setHeader(event, "Content-Type", "application/xml; charset=utf-8");
    const urls = contentRoutes.map(path => `<url><loc>https://xavierchampoux.com${path}</loc></url>`).join("");
    return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;
});
