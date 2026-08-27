/**
 * One-off: extract reviews from _user_reviews_html.txt (from chat transcript) → lib JSON.
 * Run: node scripts/parse-reviews-html.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const input = path.join(root, "_user_reviews_html.txt");

if (!fs.existsSync(input)) {
  console.error("Missing _user_reviews_html.txt — paste transcript HTML into project root first.");
  process.exit(1);
}

let raw = fs.readFileSync(input, "utf8");
const start = raw.indexOf('<div id="reviews-list"');
if (start < 0) throw new Error("no reviews-list");
const html = raw.slice(start);

const blocks = html.split('<div class="border-b border-zinc-100 pb-12 last:border-0">').filter(Boolean);

function extract(block) {
  const authorM = block.match(/font-bold text-black">([^<]+)<\/span>/);
  const author = authorM ? authorM[1].trim() : "";

  const initialM = block.match(/rounded-full[^>]*>([^<]+)<\/div>\s*<div>/);
  let initial = initialM ? initialM[1].trim() : "";
  if (author && (!initial || initial === "?")) {
    initial = author.charAt(0).toUpperCase();
  }

  const locM = block.match(/text-zinc-400 capitalize">([^<]+)<\/span>/);
  const loc = locM ? locM[1].trim() : "";
  const parts = loc.split(/\s*•\s*/);
  const country = parts[0]?.trim() || "US";
  const date = parts.slice(1).join(" • ").trim() || "";

  const titleM = block.match(/<h3[^>]*>([^<]*)<\/h3>/);
  const title = titleM ? titleM[1].trim() : "";

  const bodyM = block.match(/whitespace-pre-wrap">([\s\S]*?)<\/p>/);
  let body = bodyM ? bodyM[1] : "";
  body = body
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");

  const upM = block.match(/lucide-thumbs-up[\s\S]*?<\/svg>\s*(\d+)/);
  const downM = block.match(/lucide-thumbs-down[\s\S]*?<\/svg>\s*(\d+)/);
  const helpfulUp = upM ? Number(upM[1]) : 0;
  const helpfulDown = downM ? Number(downM[1]) : 0;

  const imgs = [...block.matchAll(/<img[^>]+src="([^"]+)"/g)].map((m) => m[1]);

  return {
    author,
    initial,
    country,
    date,
    title,
    body,
    helpfulUp,
    helpfulDown,
    ...(imgs.length ? { images: imgs } : {}),
  };
}

const parsed = blocks.map(extract).filter((r) => r.author && r.title);

const key = (r) => JSON.stringify([r.author, r.date, r.title, r.body]);
const seen = new Set();
const reviews = [];
for (const r of parsed) {
  const k = key(r);
  if (seen.has(k)) continue;
  seen.add(k);
  reviews.push(r);
}

const outPath = path.join(root, "lib", "ek6-customer-reviews-data.json");
fs.writeFileSync(outPath, JSON.stringify(reviews, null, 2));
console.error("wrote", outPath, reviews.length, "(from", parsed.length, "parsed)");
