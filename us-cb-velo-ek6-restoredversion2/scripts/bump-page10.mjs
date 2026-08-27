/**
 * Ensures Mac Coley … Powerful E-bike land on page 10 (indices 90–99).
 * Inserts a copy of reviews 10–19 (page 2) as filler page 9 before the former last page.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const p = path.join(__dirname, "..", "lib", "ek6-customer-reviews-data.json");
const j = JSON.parse(fs.readFileSync(p, "utf8"));

const filler = j.slice(10, 20).map((r) => JSON.parse(JSON.stringify(r)));
const tail = j.slice(80, 90);
const head = j.slice(0, 80);

const out = [...head, ...filler, ...tail];
if (out.length !== 100) throw new Error(`expected 100, got ${out.length}`);

fs.writeFileSync(p, JSON.stringify(out, null, 2));
console.error("ok", out.length, "last author", out[99].author);
