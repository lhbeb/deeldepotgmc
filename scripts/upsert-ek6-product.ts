import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import reviewData from '../src/lib/ek6-customer-reviews-data.json';

config({ path: '.env.local' });

const slug = 'cb-velo-ek6-folding-electric-bike';
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error('NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required.');
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

async function main() {
  let checkoutLink = process.env.EK6_CHECKOUT_LINK?.trim();

  if (!checkoutLink) {
    const { data: existingCheckout, error: checkoutError } = await supabase
      .from('products')
      .select('checkout_link')
      .eq('checkout_flow', 'buymeacoffee')
      .not('checkout_link', 'is', null)
      .neq('checkout_link', '#')
      .limit(1)
      .maybeSingle();

    if (checkoutError) throw checkoutError;
    checkoutLink = existingCheckout?.checkout_link;
  }

  if (!checkoutLink) {
    throw new Error('Set EK6_CHECKOUT_LINK to the DeelDepot BuyMeACoffee payment URL.');
  }

  const reviews = reviewData.map((review, index) => ({
    id: `ek6-review-${index + 1}`,
    author: review.author,
    rating: 5,
    date: review.date,
    title: review.title,
    content: review.body,
    helpful: review.helpfulUp,
    verified: true,
    location: review.country,
    images: review.images ?? [],
  }));

  const product = {
    id: slug,
    slug,
    title: 'CB VELO EK6 Folding Electric Bike',
    description:
      'A step-through folding electric bike with a removable 48V 25Ah battery, hydraulic brakes, fat tires, rear rack, and an included rear basket. Configure one, two, or three bikes and choose each bike color on the product page.',
    price: 199,
    original_price: 599,
    images: Array.from({ length: 13 }, (_, index) =>
      `/images/ek6/gallery/${String(index + 1).padStart(2, '0')}${index === 6 ? '.png' : '.jpg'}`,
    ),
    condition: 'New',
    category: 'E-Bikes',
    brand: 'CB VELO',
    payee_email: 'contact@deeldepot.com',
    currency: 'USD',
    checkout_link: checkoutLink,
    checkout_flow: 'buymeacoffee',
    rating: 5,
    review_count: reviews.length,
    reviews,
    in_stock: true,
    is_featured: true,
    collections: ['electronics', 'featured'],
    meta: {
      published: true,
      original_price: 599,
      title: 'CB VELO EK6 Folding Electric Bike | Deel Depot',
      description: 'Shop the CB VELO EK6 folding electric bike with configurable bundles, colors, accessories, and free US shipping.',
      keywords: 'CB VELO EK6, folding electric bike, fat tire e-bike, step-through e-bike',
      targetMarket: 'us',
      checkout_links: [checkoutLink],
    },
  };

  const { data, error } = await supabase
    .from('products')
    .upsert(product, { onConflict: 'slug' })
    .select('slug,title,price,checkout_flow,in_stock,meta')
    .single();

  if (error) throw error;
  console.log(JSON.stringify({
    slug: data.slug,
    title: data.title,
    price: data.price,
    checkoutFlow: data.checkout_flow,
    inStock: data.in_stock,
    published: data.meta?.published !== false,
  }, null, 2));
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
