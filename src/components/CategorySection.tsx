"use client";

import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import type { Product } from '@/types/product';
import { createVisitorRotationSeed, selectRotatedProducts } from '@/utils/visitorProductRotation';

interface CategorySectionProps {
  products: Product[];
  shuffleForVisitor?: boolean;
  visitorShuffleKey?: string;
}

const SECTION_PRODUCT_COUNT = 8;

const CategorySection: React.FC<CategorySectionProps> = ({
  products,
  shuffleForVisitor = false,
  visitorShuffleKey = 'home-power-tools',
}) => {
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>(() =>
    products.slice(0, SECTION_PRODUCT_COUNT),
  );

  useEffect(() => {
    if (!products || products.length === 0) {
      setDisplayedProducts([]);
      return;
    }

    if (!shuffleForVisitor) {
      setDisplayedProducts(products.slice(0, SECTION_PRODUCT_COUNT));
      return;
    }

    const seed = createVisitorRotationSeed(visitorShuffleKey);
    setDisplayedProducts(selectRotatedProducts(products, seed, SECTION_PRODUCT_COUNT));
  }, [products, shuffleForVisitor, visitorShuffleKey]);

  if (!displayedProducts || displayedProducts.length === 0) {
    return null;
  }

  return (
    <section id="power-tools" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="w-full max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#262626] mb-4">
              Power Tools & Generators
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Reliable equipment to get the job done.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {displayedProducts.map((product) => (
              <ProductCard key={product.id} product={product} cardBackground="bg-gray-100" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
