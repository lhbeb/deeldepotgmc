import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductBySlug } from '@/lib/data';
import Ek6ProductPage from '@/components/ek6/Ek6ProductPage';
import { EK6_PRODUCT_SLUG } from '@/lib/ek6-product';

export const metadata: Metadata = {
  title: 'CB VELO EK6 Folding Electric Bike | Deel Depot',
  description: 'Shop the CB VELO EK6 folding electric bike with configurable bundles, colors, accessories, and free US shipping.',
  alternates: { canonical: `https://deeldepot.com/products/${EK6_PRODUCT_SLUG}` },
};

export default async function Ek6ListingPage() {
  const product = await getProductBySlug(EK6_PRODUCT_SLUG);
  if (!product) notFound();

  return <Ek6ProductPage product={product} />;
}
