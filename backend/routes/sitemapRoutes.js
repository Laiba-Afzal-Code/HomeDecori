// routes/sitemap.js
import express from "express";
import fetch from "node-fetch"; // install if needed

const router = express.Router();

let sitemapCache = null;
let lastGenerated = 0;
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

router.get("/sitemap.xml", async (req, res) => {
  try {
    const now = Date.now();

    // ✅ Serve cached sitemap
    if (sitemapCache && now - lastGenerated < CACHE_DURATION) {
      res.header("Content-Type", "application/xml");
      return res.send(sitemapCache);
    }

    const baseUrl = "https://homedecorim.com";

    // ✅ Fetch blogs from your API
    const response = await fetch("http://localhost:5000/api/posts/getallposts");
    const data = await response.json();

    // Adjust depending on your API structure
    const posts = data.posts || data;

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    // ✅ Static pages
    const staticPages = [
      { url: "", priority: "1.0" },
      { url: "/blogs", priority: "0.9" },
      { url: "/about-us", priority: "0.7" },
      { url: "/contact-us", priority: "0.7" },
    ];

    staticPages.forEach((page) => {
      xml += `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <changefreq>daily</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
    });

    // ✅ Dynamic blog posts
    posts.forEach((post) => {
      if (!post.slug) return; // skip invalid

      xml += `
  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${new Date(post.updatedAt || Date.now()).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
    });

    xml += `\n</urlset>`;

    // ✅ Cache result
    sitemapCache = xml;
    lastGenerated = now;

    res.header("Content-Type", "application/xml");
    res.send(xml);
  } catch (error) {
    console.error("SITEMAP ERROR:", error?.message || error);
    res.status(500).send("Error generating sitemap");
  }
});

export default router;
