import React, { Suspense } from 'react';
import Hero from '@/components/Hero';
import SameDayShipping from '@/components/SameDayShipping';
import HomeFeaturedSection from '@/components/HomeFeaturedSection';
import ProductGrid from '@/components/ProductGrid';
import HomeReviews from '@/components/HomeReviews';
import CategorySection from '@/components/CategorySection';
import { getFeaturedProducts } from '@/lib/data';
import { homeReviews, homeReviewsStats } from '@/lib/homeReviews';
import ScrollToTop from '@/components/ScrollToTop';

export default async function HomePage() {
  try {
    const featuredProducts = await getFeaturedProducts();

    const powerToolsProducts = featuredProducts.filter(p =>
      p.collections?.includes('power-tools')
    );
    const lawnGardenProducts = featuredProducts.filter(p =>
      p.collections?.includes('lawn-garden')
    );

  return (
    <>
      <Suspense fallback={null}>
        <ScrollToTop />
      </Suspense>
      <Hero />

      <HomeFeaturedSection products={featuredProducts} />
      
      <SameDayShipping />
      
      <CategorySection products={powerToolsProducts} shuffleForVisitor visitorShuffleKey="home-power-tools" />
      
      {lawnGardenProducts.length > 0 && (
        <Suspense fallback={null}>
          <ProductGrid 
            products={lawnGardenProducts} 
            title="Lawn & Garden Equipment"
            randomizeForVisitor
            visitorShuffleKey="home-lawn-garden"
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
    // Return a minimal error page that won't break
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
