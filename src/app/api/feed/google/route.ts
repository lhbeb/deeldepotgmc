import { NextResponse } from 'next/server';
import { getAllProducts } from '@/lib/data';
import { formatValidSku, mapConditionToGmc } from '@/lib/conditions';

const BASE_URL = 'https://deeldepot.com';

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  try {
    let products: any[] = [];
    try {
      products = await getAllProducts();
    } catch (e) {
      console.error('Error fetching products for Google feed:', e);
    }

    const itemsXml = products
      .filter((product) => product.meta?.gmc_enabled === true)
      .map((p) => {
        const sku = formatValidSku(p);
        const title = escapeXml(p.title || 'Product');
        const description = escapeXml(p.description || p.title || '');
        const link = `${BASE_URL}/products/${p.slug}`;
        const currency = p.currency || 'USD';
        const priceStr = `${Number(p.price || 0).toFixed(2)} ${currency}`;
        const availability = p.inStock === false ? 'out_of_stock' : 'in_stock';
        const condition = mapConditionToGmc(p.condition); // Strictly 'new', 'refurbished', or 'used'
        const brand = escapeXml(p.brand || 'Deel Depot');
        const category = escapeXml(p.category || 'General Store');

        let imageLink = '';
        if (p.images && p.images.length > 0) {
          try {
            imageLink = new URL(p.images[0], BASE_URL).toString();
          } catch {
            imageLink = p.images[0];
          }
        }
        imageLink = escapeXml(imageLink);

        return `
    <item>
      <g:id>${sku}</g:id>
      <title>${title}</title>
      <description>${description}</description>
      <link>${link}</link>
      <g:image_link>${imageLink}</g:image_link>
      <g:price>${priceStr}</g:price>
      <g:availability>${availability}</g:availability>
      <g:condition>${condition}</g:condition>
      <g:brand>${brand}</g:brand>
      <g:product_type>${category}</g:product_type>
      <g:identifier_exists>no</g:identifier_exists>
      <g:shipping>
        <g:country>GB</g:country>
        <g:service>Standard Delivery</g:service>
        <g:price>0.00 GBP</g:price>
      </g:shipping>
      <g:shipping>
        <g:country>US</g:country>
        <g:service>Standard Shipping</g:service>
        <g:price>0.00 USD</g:price>
      </g:shipping>
    </item>`;
      })
      .join('');

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>Deel Depot Google Merchant Center Feed</title>
    <link>${BASE_URL}</link>
    <description>Product feed for Deel Depot online store</description>
    ${itemsXml}
  </channel>
</rss>`;

    return new NextResponse(xml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (error) {
    console.error('Error generating GMC feed:', error);
    return new NextResponse('Error generating feed', { status: 500 });
  }
}
