/**
 * One-time: downloads remote storefront assets into public/images/ek6.
 * Run: node scripts/download-images.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const pub = path.join(root, "public", "images", "ek6");

const F = "https://cbvelo.com/cdn/shop/files";
const S = "https://cdn.shopify.com/s/files/1/0874/0644/4837/files";
const D = "https://files.dadaowl.cn";

/** @type { { url: string; out: string }[] } */
const jobs = [
  { url: `${F}/a3fc6683d01cc17e349e4103e8c0018_6fc0100c-e73e-4d27-b07e-646bb7e43128.png?v=1747376670&width=400`, out: "logo.png" },
  { url: `${F}/7f670d3679bb8e6678b045c8eb955f69.jpg?v=1766479567`, out: "gallery/01.jpg" },
  { url: `${F}/EK6_460e191a-9872-407f-a54b-842f0587dba9.jpg?v=1766479567`, out: "gallery/02.jpg" },
  { url: `${F}/EK6_4d5ccc5b-7423-4742-870d-4f4416ad83d6.jpg?v=1766479567`, out: "gallery/03.jpg" },
  { url: `${F}/A6_d7112979-a832-41b3-8da6-a5d467a4a1ae.jpg?v=1766479567`, out: "gallery/04.jpg" },
  { url: `${F}/A2.jpg?v=1766479567`, out: "gallery/05.jpg" },
  { url: `${F}/1600-9.jpg?v=1769584766`, out: "gallery/06.jpg" },
  { url: `${F}/2_361cdb80-43d4-4f18-ba7e-b5304cc24310.png?v=1769584766`, out: "gallery/07.png" },
  { url: `${F}/A4.jpg?v=1769584766`, out: "gallery/08.jpg" },
  { url: `${F}/A1_64b09574-87dd-4a6e-bf77-c9c6ec0a916b.jpg?v=1769584766`, out: "gallery/09.jpg" },
  { url: `${F}/preview_images/1d2fb4da4afa40d28ae16e098b7454c9.thumbnail.0000000000.jpg?v=1724133149`, out: "gallery/10.jpg" },
  { url: `${F}/preview_images/043dd61f3f6c4adcb23bd272ab87e09f.thumbnail.0000000000.jpg?v=1756174293`, out: "gallery/11.jpg" },
  { url: `${F}/EK6_87008a04-4ab9-46d1-a85d-64802e1a2b76.jpg?v=1769584766`, out: "gallery/12.jpg" },
  { url: `${F}/1.14.jpg?v=1769584766`, out: "gallery/13.jpg" },
  { url: `${S}/1k.png?v=1764498746`, out: "warranty/1k.png" },
  { url: `${S}/ul.png?v=1764498781`, out: "warranty/ul.png" },
  { url: `${S}/265462ebd25593be3567c2a67ce40457.jpg?v=1754124259`, out: "accessories/rear-basket.jpg" },
  { url: `${S}/32aa42eb33e77bbf9abf8c3c86d88a09.png?v=1762926177`, out: "accessories/rack-bag.png" },
  { url: `${S}/3a7410348a9730e43c87212e6d78d897.jpg?v=1751608906`, out: "accessories/chain-lock.jpg" },
  { url: `${S}/6336242db1e89abb27264c06b4d8b60a.webp?v=1769151021`, out: "accessories/child-seat.webp" },
  { url: `${S}/0e029b55c68e7e59aae61049790391fb_206d220b-9f8b-4232-9bf7-2470cc4662f7.webp?v=1769150949`, out: "accessories/phone-holder.webp" },
  { url: `${F}/EK6_1.jpg?v=1769591468`, out: "ride/01.jpg" },
  { url: `${F}/EK6USR_9ec2bdbc-fcae-4867-a446-f41a0575ae60.jpg?v=1769591567`, out: "ride/02.jpg" },
  { url: `${F}/EK6_669b2f67-ce91-4749-91a9-e284f3343b60.jpg?v=1769591618`, out: "ride/03.jpg" },
  { url: `${F}/1600-2_7949b153-8607-4eee-a201-c67119d1037c.jpg?v=1769585973`, out: "ride/04.jpg" },
  { url: `${F}/1_8341720d-c70a-4fda-a0c4-7838fb45cb74.png?v=1767670988`, out: "comfort/01.png" },
  { url: `${F}/2_2996081b-9bd5-4430-965c-8d3a646a2b55.png?v=1757389470`, out: "comfort/02.png" },
  { url: `${F}/3_b64823ee-7b5a-40d2-92b3-fb3a168466fc.png?v=1757389470`, out: "comfort/03.png" },
  { url: `${F}/4_d066f5fb-7f03-4dfe-b073-69f160b99979.png?v=1757389470`, out: "comfort/04.png" },
  { url: `${F}/5_bb6b76e8-a5cc-45c4-bdcd-0a1334600cb4.png?v=1757389469`, out: "comfort/05.png" },
  { url: `${F}/6_bbe235b7-0bd8-4e04-917a-0977aac27f98.png?v=1757389469`, out: "comfort/06.png" },
  { url: `${F}/7_71890295-7ead-4671-b5cc-1e3aff5ff5d3.png?v=1757389470`, out: "comfort/07.png" },
  { url: `${F}/8_97724c32-e5e3-4f6a-a5dd-74d86ea5c848.png?v=1757389470`, out: "comfort/08.png" },
  { url: `${F}/9.png?v=1757389470`, out: "comfort/09.png" },
  { url: `${S}/inthebox-m1-pro-2025.webp?v=1766408473`, out: "box/01-ebike.webp" },
  { url: `${S}/m1pro-user-manual_1.webp?v=1766408472`, out: "box/02-manual.webp" },
  { url: `${S}/m1pro-charger.webp?v=1766408472`, out: "box/03-charger.webp" },
  { url: `${S}/m1pro-rear-reflector.webp?v=1766408472`, out: "box/04-reflector.webp" },
  { url: `${S}/m1pro-open-spanner.webp?v=1766408472`, out: "box/05-spanner.webp" },
  { url: `${S}/m1pro-Kickstand.webp?v=1766408472`, out: "box/06-kickstand.webp" },
  { url: `${S}/m1pro-front-wheel-quick-release.webp?v=1766408472`, out: "box/07-quick-release.webp" },
  { url: `${S}/m1pro-headlight.webp?v=1766408472`, out: "box/08-headlight.webp" },
  { url: `${S}/m1pro-fender.webp?v=1766408472`, out: "box/09-fender.webp" },
  { url: `${S}/m1pro-hex-wench.webp?v=1766408472`, out: "box/10-hex-wrench.webp" },
  { url: `${S}/m1pro-keys.webp?v=1766408472`, out: "box/11-keys.webp" },
  { url: `${S}/EK6_43a61668-2f5d-4e1e-ad9f-438eefa8f98f.jpg?v=1757383783`, out: "geometry/diagram.jpg" },
  { url: `${S}/EK6_c9cae561-cb99-400f-92ae-9c9480be35bc.jpg?v=1757383805`, out: "size-fit/01.jpg" },
  { url: `${S}/EK6_496b2157-405b-4870-bcc1-7214e1edd574.jpg?v=1757383805`, out: "size-fit/02.jpg" },
  { url: `${D}/20250706/a99007ee88c44fea9b0dac5c81171ebf_compress_.jpg`, out: "reviews/dadaowl/a99007ee88c44fea9b0dac5c81171ebf.jpg" },
  { url: `${D}/20250706/0dbc5689ea9041dd8064e4bfd35c65d2_compress_.jpg`, out: "reviews/dadaowl/0dbc5689ea9041dd8064e4bfd35c65d2.jpg" },
  { url: `${D}/20250706/0e42c690117345c2a8d170e058187171_compress_.jpg`, out: "reviews/dadaowl/0e42c690117345c2a8d170e058187171.jpg" },
  { url: `${D}/20250706/f697e5b6601647f7af4d1ef666aeddeb_compress_.jpg`, out: "reviews/dadaowl/f697e5b6601647f7af4d1ef666aeddeb.jpg" },
  { url: `${D}/20250706/fc903c9cb574441dac32ca08b1343624_compress_.jpg`, out: "reviews/dadaowl/fc903c9cb574441dac32ca08b1343624.jpg" },
  { url: `${D}/20250706/6b69ff8c36854ce7b076ea1320e61fc8_compress_.jpg`, out: "reviews/dadaowl/6b69ff8c36854ce7b076ea1320e61fc8.jpg" },
  { url: `${D}/20250706/8cf2db97d1f24607b84940a6b176cad9_compress_.jpg`, out: "reviews/dadaowl/8cf2db97d1f24607b84940a6b176cad9.jpg" },
  { url: `${D}/20250706/54210e498fb94701bd95e82f188f9e2d_compress_.jpg`, out: "reviews/dadaowl/54210e498fb94701bd95e82f188f9e2d.jpg" },
  { url: `${D}/20250706/4e3f706004bb47899a1307c5ad819f34_compress_.jpg`, out: "reviews/dadaowl/4e3f706004bb47899a1307c5ad819f34.jpg" },
  { url: `${D}/20250714/3c219a83d30c44ac897eb56503467d24_compress_.jpg`, out: "reviews/dadaowl/3c219a83d30c44ac897eb56503467d24.jpg" },
  { url: `${D}/20250706/bd4f040c145a4880b4223cb1dc3d32a6_compress_.jpg`, out: "reviews/dadaowl/bd4f040c145a4880b4223cb1dc3d32a6.jpg" },
  { url: `${D}/20250706/2d741f21fc674924aed5d5fe3e8fcd1a_compress_.jpg`, out: "reviews/dadaowl/2d741f21fc674924aed5d5fe3e8fcd1a.jpg" },
  {
    url: "https://m.media-amazon.com/images/I/61kWnKAmFxL._SY1000.jpg",
    out: "reviews/amazon/61kWnKAmFxL.jpg",
  },
  {
    url: "https://m.media-amazon.com/images/I/710M1KenWyL._SY1000.jpg",
    out: "reviews/amazon/710M1KenWyL.jpg",
  },
  {
    url: "https://m.media-amazon.com/images/I/71h5sdeL6gL._SY1000.jpg",
    out: "reviews/amazon/71h5sdeL6gL.jpg",
  },
  {
    url: "https://m.media-amazon.com/images/I/81TmmQbXGML._SY1000.jpg",
    out: "reviews/amazon/81TmmQbXGML.jpg",
  },
  {
    url: "https://m.media-amazon.com/images/I/91gO0CmOD5L._SY1000.jpg",
    out: "reviews/amazon/91gO0CmOD5L.jpg",
  },
  {
    url: "https://cbvelo.com/cdn/shop/files/preview_images/58001bd55d03453a9b01c519c1c0c551.thumbnail.0000000000_small.jpg?v=1769583695",
    out: "media/product-video-poster.jpg",
  },
  {
    url: "https://cbvelo.com/cdn/shop/videos/c/vp/58001bd55d03453a9b01c519c1c0c551/58001bd55d03453a9b01c519c1c0c551.HD-1080p-7.2Mbps-68285279.mp4?v=0",
    out: "media/product-video.mp4",
  },
];

async function main() {
  for (const { url, out: rel } of jobs) {
    const dest = path.join(pub, rel);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    const res = await fetch(url, { redirect: "follow" });
    if (!res.ok) throw new Error(`${res.status} ${url}`);
    const buf = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(dest, buf);
    console.log("ok", rel, buf.length);
  }
  console.log("done", jobs.length, "files");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
