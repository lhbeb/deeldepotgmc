import React, { Suspense } from 'react';
import Hero from '@/components/Hero';
import SameDayShipping from '@/components/SameDayShipping';
import ProductGrid from '@/components/ProductGrid';
import HomeReviews from '@/components/HomeReviews';
import CategorySection from '@/components/CategorySection';
import PopularCategories from '@/components/PopularCategories';
import { getFeaturedProducts, getProducts } from '@/lib/data';
import { homeReviews, homeReviewsStats } from '@/lib/homeReviews';
import ScrollToTop from '@/components/ScrollToTop';
import { FEATURED_PRODUCT_LIMIT } from '@/config/products';

export default async function HomePage() {
  try {
    const [featuredProducts, products] = await Promise.all([
      getFeaturedProducts(),
      getProducts(),
    ]);

    const lawnGardenProducts = featuredProducts.filter(p =>
      p.collections?.includes('lawn-garden')
    );

    const smallToolProducts = products.filter((product) =>
      product.collections?.includes('power-tools') &&
      product.category.trim().toLowerCase() === 'hardware'
    );

  return (
    <>
      <Suspense fallback={null}>
        <ScrollToTop />
      </Suspense>
      <Hero />

      <PopularCategories products={products} />

      <CategorySection
        products={featuredProducts}
        title="Featured Products"
        subtitle="Standout picks from across the marketplace, selected for you."
        maxDisplay={FEATURED_PRODUCT_LIMIT}
        shuffleForVisitor
        visitorShuffleKey="home-featured"
      />

      <SameDayShipping />

      {lawnGardenProducts.length > 0 && (
        <Suspense fallback={null}>
          <ProductGrid
            products={lawnGardenProducts}
            sectionId="lawn-garden-equipment"
            title=""
            editorialCard={{
              title: 'Deals Worth Discovering',
              description:
                'From everyday essentials to standout finds, Deel Depot brings together products worth discovering at prices worth checking. Explore fresh arrivals, compare your options, and find the right deal for you.',
            }}
            randomizeForVisitor
            visitorShuffleKey="home-lawn-garden"
          />
        </Suspense>
      )}

      {smallToolProducts.length > 0 && (
        <Suspense fallback={null}>
          <ProductGrid
            products={smallToolProducts}
            sectionId="durable-tools"
            title="More Deals to Explore"
            randomizeForVisitor
            visitorShuffleKey="home-durable-tools"
          />
        </Suspense>
      )}

      <HomeReviews
        reviews={homeReviews}
        averageRating={homeReviewsStats.averageRating}
        totalReviews={homeReviewsStats.totalReviews}
      />
    </>
  );
  } catch (error) {
    console.error('Error loading homepage:', error);
    return (
      <>
        <Hero />
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold text-[#262626] mb-4">Unable to load products</h2>
          <p className="text-gray-600">Please refresh the page or try again later.</p>
        </div>
      </>
    );
  }
}
