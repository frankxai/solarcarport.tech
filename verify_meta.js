const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '.next', 'server', 'app');

const routes = [
  '/',
  '/commercial-audit',
  '/digital',
  '/partner-widget',
  '/system-check',
  '/v2',
  '/vault'
];

let allUnique = true;
const titles = new Set();
const desc = new Set();
const ogUrls = new Set();
const canonicalUrls = new Set();

routes.forEach(route => {
  const routePath = route === '/' ? 'index.html' : `${route.substring(1)}.html`;
  const fullPath = path.join(baseDir, routePath);

  if (!fs.existsSync(fullPath)) {
    console.error(`Route missing HTML file: ${route}`);
    process.exit(1);
  }

  const content = fs.readFileSync(fullPath, 'utf-8');

  // Extract Title
  const titleMatch = content.match(/<title>([^<]+)<\/title>/);
  if (!titleMatch) {
    console.error(`No title for route ${route}`);
    allUnique = false;
  } else {
    const t = titleMatch[1];
    if (titles.has(t)) {
      console.error(`Duplicate title found: ${t} in ${route}`);
      allUnique = false;
    }
    titles.add(t);
  }

  // Extract description
  const descMatch = content.match(/<meta\s+name="description"\s+content="([^"]+)"/i);
  if (!descMatch) {
    console.error(`No description for route ${route}`);
    allUnique = false;
  } else {
    const d = descMatch[1];
    if (desc.has(d)) {
      console.error(`Duplicate description found: ${d} in ${route}`);
      allUnique = false;
    }
    desc.add(d);
  }

  // Extract canonical URL
  const canonicalMatch = content.match(/<link\s+rel="canonical"\s+href="([^"]+)"/i);
  if (!canonicalMatch) {
    console.error(`No canonical URL for route ${route}`);
    allUnique = false;
  } else {
    const c = canonicalMatch[1];
    if (canonicalUrls.has(c)) {
      console.error(`Duplicate canonical URL found: ${c} in ${route}`);
      allUnique = false;
    }
    canonicalUrls.add(c);
  }

  // Extract OpenGraph URL
  const ogUrlMatch = content.match(/<meta\s+property="og:url"\s+content="([^"]+)"/i);
  if (!ogUrlMatch) {
    console.error(`No OpenGraph URL for route ${route}`);
    allUnique = false;
  } else {
    const o = ogUrlMatch[1];
    if (ogUrls.has(o)) {
      console.error(`Duplicate OpenGraph URL found: ${o} in ${route}`);
      allUnique = false;
    }
    ogUrls.add(o);
  }

  // Check JSON-LD
  const jsonLdMatch = content.match(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/i);
  if (!jsonLdMatch) {
    console.error(`No JSON-LD for route ${route}`);
    allUnique = false;
  } else {
    try {
      const parsed = JSON.parse(jsonLdMatch[1]);
      if (parsed['@type'] !== 'Organization' && parsed['@type'] !== 'WebSite') {
          console.error(`JSON-LD does not have Organization or WebSite as type for route ${route}`);
          allUnique = false;
      }
    } catch (err) {
      console.error(`Failed to parse JSON-LD on route ${route}:`, err);
      allUnique = false;
    }
  }
});

if (allUnique) {
  console.log("SUCCESS: All metadata unique and JSON-LD is valid.");
} else {
  console.error("FAILURE: Metadata checks failed.");
  process.exit(1);
}
