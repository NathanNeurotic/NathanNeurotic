// Builds the HTML pages in public/ from src/pages/*.html.
// Each page file starts with a one-line JSON comment:
//   <!-- {"title": "...", "description": "...", "path": "/work/", "nav": "work"} -->
// Run: node build.mjs
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const SITE = "https://nathanneurotic.com";
const CSS_VERSION = "1";

const nav = [
  ["work", "/work/", "Projects"],
  ["visual", "/visual/", "Art"],
  ["sound", "/sound/", "Music"],
  ["about", "/about/", "About"],
  ["contact", "/contact/", "Contact"],
];

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function layout(meta, body) {
  const navHtml = nav
    .map(([key, href, label]) => `<a href="${href}"${meta.nav === key ? ' aria-current="page"' : ""}>${label}</a>`)
    .join("");
  const url = SITE + meta.path;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(meta.title)}</title>
<meta name="description" content="${esc(meta.description)}">
${meta.noindex ? '<meta name="robots" content="noindex">' : `<link rel="canonical" href="${url}">`}
<meta property="og:title" content="${esc(meta.title)}">
<meta property="og:description" content="${esc(meta.description)}">
<meta property="og:type" content="website">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${SITE}/og.jpg">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#f6f4ef" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#131116" media="(prefers-color-scheme: dark)">
<link rel="icon" type="image/png" href="/favicon.png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="preload" href="/fonts/ibm-plex-sans-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/style.css?v=${CSS_VERSION}">
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<header class="site-header">
<div class="wrap">
<a class="site-name" href="/">NathanNeurotic</a>
<nav class="site-nav" aria-label="Main">${navHtml}</nav>
</div>
</header>
<main id="main">
<div class="wrap">
${body.trim()}
</div>
</main>
<footer class="site-footer">
<div class="wrap">
<p>Nathan / Ripto &middot; <a href="mailto:contact@nathanneurotic.com">contact@nathanneurotic.com</a></p>
<ul>
<li><a href="https://github.com/NathanNeurotic">GitHub</a></li>
<li><a href="https://tinyurl.com/NEURALOTICS">Discord</a></li>
<li><a href="https://t.me/NEURALOTICS">Telegram</a></li>
<li><a href="https://www.psx-place.com/members/ripto.201268/">PSX-Place</a></li>
<li><a href="https://github.com/sponsors/NathanNeurotic">Sponsor</a></li>
</ul>
</div>
</footer>
</body>
</html>
`;
}

const pagesDir = join(root, "src", "pages");
const urls = [];
for (const file of readdirSync(pagesDir).filter((f) => f.endsWith(".html")).sort()) {
  const raw = readFileSync(join(pagesDir, file), "utf8");
  const m = raw.match(/^<!--\s*(\{.*?\})\s*-->\s*/s);
  if (!m) throw new Error(`${file}: missing JSON header comment`);
  const meta = JSON.parse(m[1]);
  const html = layout(meta, raw.slice(m[0].length));
  const out = meta.output
    ? join(root, "public", meta.output)
    : join(root, "public", meta.path, "index.html");
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, html);
  if (!meta.noindex) urls.push(SITE + meta.path);
  console.log(`built ${out.replace(root + "/", "")}`);
}

writeFileSync(
  join(root, "public", "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((u) => `  <url><loc>${u}</loc></url>`)
    .join("\n")}\n</urlset>\n`
);
writeFileSync(join(root, "public", "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);
console.log("built sitemap.xml, robots.txt");
