"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { ShoppingCart, Menu, X, Search, ChevronLeft, ChevronRight, Info } from 'lucide-react';
import { getCartCount } from '@/utils/cart';
import type { Product } from '@/types/product';
import ClientOnly from './ClientOnly';
import SearchBar from './SearchBar';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isSticky, setIsSticky] = useState(false);
  const [currentAnnouncement, setCurrentAnnouncement] = useState(0);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const announcementIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Check if we're on the checkout page
  const isCheckoutPage = pathname === '/checkout';

  const announcements = [
    <span key="nav-1">🚚 <span className="font-bold">Free Shipping</span> for North America and UK 🇬🇧</span>,
    <span key="nav-2">📦 <span className="font-bold">Free Returns</span> Within <span className="font-bold">30 days</span></span>,
    "whatsapp-contact" // Special marker for WhatsApp announcement
  ];

  // Announcement bar animation - PRESERVED EXACTLY
  useEffect(() => {
    const startAnnouncementRotation = () => {
      announcementIntervalRef.current = setInterval(() => {
        setCurrentAnnouncement(prev => (prev + 1) % announcements.length);
      }, 2000);
    };

    startAnnouncementRotation();

    return () => {
      if (announcementIntervalRef.current) {
        clearInterval(announcementIntervalRef.current);
      }
    };
  }, [announcements.length]);

  // PRESERVED EXACTLY
  const handleAnnouncementNavigation = (direction: 'prev' | 'next') => {
    if (announcementIntervalRef.current) {
      clearInterval(announcementIntervalRef.current);
    }

    setCurrentAnnouncement(prev => {
      if (direction === 'prev') {
        return prev === 0 ? announcements.length - 1 : prev - 1;
      } else {
        return (prev + 1) % announcements.length;
      }
    });

    // Restart auto-rotation after manual navigation
    setTimeout(() => {
      announcementIntervalRef.current = setInterval(() => {
        setCurrentAnnouncement(prev => (prev + 1) % announcements.length);
      }, 2000);
    }, 100);
  };

  // PRESERVED EXACTLY
  useEffect(() => {
    const updateCartCount = () => {
      if (typeof window !== 'undefined') {
        setCartCount(getCartCount());
      }
    };
    updateCartCount();
    window.addEventListener('cartUpdated', updateCartCount);
    return () => {
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);

  // PRESERVED EXACTLY
  useEffect(() => {
    const handleScroll = () => {
      // Don't make header sticky on checkout page
      if (pathname === '/checkout') {
        setIsSticky(false);
        return;
      }

      if (typeof window !== 'undefined') {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const promotionalBarHeight = 40;

        if (scrollTop > promotionalBarHeight) {
          setIsSticky(true);
        } else {
          setIsSticky(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pathname]);

  // PRESERVED EXACTLY
  const handleCartClick = () => {
    if (cartCount > 0) {
      router.push('/checkout');
    }
  };

  // PRESERVED EXACTLY
  const handleMobileMenuClose = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Announcement bar - Deep Blue background with white text */}
      <div suppressHydrationWarning={true} className="bg-[#f5970c] text-[#030B19] py-2 relative overflow-hidden h-[40px] flex items-center">
        <div suppressHydrationWarning={true} className="container mx-auto px-4 flex items-center justify-center relative w-full h-full">
          {/* Announcement Text - PRESERVED */}
          <div suppressHydrationWarning={true} className="text-center font-medium px-4 sm:px-16 transition-all duration-500 ease-in-out h-full flex items-center justify-center min-h-[24px]">
            {announcements[currentAnnouncement] === "whatsapp-contact" ? (
              <div key={currentAnnouncement} className="flex items-center justify-center animate-fade-in text-xs sm:text-sm md:text-base h-full w-full">
                <a
                  href="https://wa.me/13186574299"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 sm:gap-1.5 hover:opacity-80 transition-opacity flex-wrap justify-center"
                  aria-label="Contact us on WhatsApp"
                >
                  <Image
                    src="/whatsapp-svgrepo-com.svg"
                    alt="WhatsApp"
                    width={20}
                    height={20}
                    className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0"
                    style={{ filter: 'brightness(0) saturate(100%)' }}
                  />
                  <span className="whitespace-nowrap">Questions? <span className="font-bold">WhatsApp us</span></span>
                  <span className="underline whitespace-nowrap font-bold">+1 (318) 657-4299</span>
                </a>
              </div>
            ) : (
              <span key={currentAnnouncement} className="inline-block animate-fade-in whitespace-nowrap text-sm sm:text-base h-full flex items-center">
                {announcements[currentAnnouncement]}
              </span>
            )}
          </div>

          {/* Desktop Arrows */}
          <button
            onClick={() => handleAnnouncementNavigation('prev')}
            className="hidden sm:block absolute left-1/2 transform -translate-x-56 p-1 hover:bg-black/10 rounded-full transition-colors duration-200 z-10 text-[#090A28]"
            aria-label="Previous announcement"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <button
            onClick={() => handleAnnouncementNavigation('next')}
            className="hidden sm:block absolute left-1/2 transform translate-x-52 p-1 hover:bg-black/10 rounded-full transition-colors duration-200 z-10 text-[#090A28]"
            aria-label="Next announcement"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Main Header - Two-tier layout */}
      <header
        ref={headerRef}
        suppressHydrationWarning={true}
        className={`transition-all duration-300 ${isSticky
          ? 'fixed top-0 left-0 right-0 z-50'
          : 'relative'
          }`}
      >
        {/* Top Row: Logo, Search, Actions */}
        <div suppressHydrationWarning={true} className="bg-[#030B19] text-[#F0F6FF]">
          <div suppressHydrationWarning={true} className="container mx-auto px-4 py-3">
            <div suppressHydrationWarning={true} className="flex items-center justify-between gap-4">
            {/* Logo - PRESERVED */}
            <Link href="/" className="flex items-center space-x-2 flex-shrink-0">
              <Image
                src="/logosvg.svg"
                alt="Deel Depot Logo"
                width={160}
                height={36}
                priority
                className="w-36 sm:w-40 h-auto"
              />
            </Link>

            {/* Desktop Search Bar - NEW */}
            <div suppressHydrationWarning={true} className="hidden lg:flex flex-1 max-w-xl mx-8">
              <div
                suppressHydrationWarning={true}
                onClick={() => setIsSearchOpen(true)}
                className="w-full flex items-center bg-gray-100 rounded-lg px-4 py-2.5 cursor-pointer hover:bg-gray-200 transition-colors"
              >
                <input
                  type="text"
                  placeholder="Search..."
                  className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-500 cursor-pointer"
                  readOnly
                />
                <Search className="h-5 w-5 text-gray-500" />
              </div>
            </div>

            {/* Right side actions */}
            <div suppressHydrationWarning={true} className="flex items-center gap-3">
              {/* Mobile Search Icon - Only visible when scrolling (isSticky) */}
              {isSticky && (
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="lg:hidden text-[#F0F6FF] hover:text-white transition-colors duration-300"
                  aria-label="Search products"
                >
                  <Search className="h-5 w-5" />
                </button>
              )}

              {/* Help Center Icon - Desktop */}
              <Link
                href="/contact"
                className="hidden sm:flex text-[#F0F6FF] hover:text-white transition-colors duration-300"
                aria-label="Help Center"
              >
                <Info className="h-5 w-5" />
              </Link>

              {/* Cart - PRESERVED with color update */}
              <button
                onClick={handleCartClick}
                className="relative text-[#F0F6FF] hover:text-white transition-colors duration-300"
                aria-label={`Shopping cart ${cartCount > 0 ? `with ${cartCount} items` : '(empty)'}`}
              >
                <ShoppingCart className="h-5 w-5" />
                <ClientOnly>
                  <span className={`absolute -top-2 -right-2 bg-[#f5970c] text-[#030B19] text-xs rounded-full h-5 min-w-[1.25rem] px-1 flex items-center justify-center font-semibold transition-opacity duration-300 ${cartCount > 0 ? 'opacity-100' : 'opacity-0'}`}>
                    {cartCount}
                  </span>
                </ClientOnly>
              </button>

              {/* Mobile menu button - Updated for dark background */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden text-[#F0F6FF] hover:text-white transition-colors duration-300"
                aria-label="Toggle mobile menu"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
        </div>

        {/* Mobile Search Bar - Below header on mobile (hidden when scrolling or on checkout page) */}
        {!isSticky && !isCheckoutPage && (
          <div suppressHydrationWarning={true} className="lg:hidden bg-[#030B19] border-t border-b border-[#F0F6FF]/15">
            <div suppressHydrationWarning={true} className="container mx-auto px-4 py-3">
              <div
                suppressHydrationWarning={true}
                onClick={() => setIsSearchOpen(true)}
                className="w-full flex items-center bg-[#F0F6FF] rounded-lg px-4 py-2.5 cursor-pointer hover:bg-[#F0F6FF]/95 transition-colors"
              >
                <input
                  type="text"
                  placeholder="Search..."
                  className="flex-1 bg-transparent outline-none text-sm text-[#030B19] placeholder-[#030B19]/60 cursor-pointer"
                  readOnly
                />
                <Search className="h-5 w-5 text-[#030B19]" />
              </div>
            </div>
          </div>
        )}

        {/* Navigation Bar - White background with gray text */}
        <div suppressHydrationWarning={true} className="hidden lg:block bg-[#030B19] border-t border-[#F0F6FF]/15">
          <div suppressHydrationWarning={true} className="container mx-auto px-4">
            <nav className="flex items-center gap-8 py-3 font-heading">
              <Link href="/#products" className="text-[#F0F6FF] hover:text-white font-medium text-sm transition-colors duration-300">
                All
              </Link>
              <Link href="/electronics" className="text-[#F0F6FF] hover:text-white font-medium text-sm transition-colors duration-300">
                Electronics
              </Link>
              <Link href="/fashion" className="text-[#F0F6FF] hover:text-white font-medium text-sm transition-colors duration-300">
                Fashion
              </Link>
              <Link href="/entertainment" className="text-[#F0F6FF] hover:text-white font-medium text-sm transition-colors duration-300">
                Entertainment
              </Link>
              <Link href="/hobbies-collectibles" className="text-[#F0F6FF] hover:text-white font-medium text-sm transition-colors duration-300">
                Hobbies & Collectibles
              </Link>
              <Link href="/#featured" className="text-[#F0F6FF] hover:text-white font-medium text-sm transition-colors duration-300">
                Featured
              </Link>
              <Link href="/track" className="text-[#F0F6FF] hover:text-white font-medium text-sm transition-colors duration-300">
                Track Order
              </Link>
              <Link href="/contact" className="text-[#F0F6FF] hover:text-white font-medium text-sm transition-colors duration-300">
                Contact us
              </Link>
            </nav>
          </div>
        </div>

        {/* Mobile menu - Only Track Order, Contact Us, and Sell Now */}
        {isMenuOpen && (
          <div className="lg:hidden bg-[#030B19] border-t border-[#F0F6FF]/15">
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col font-heading">
                <Link href="/track" className="text-center text-[#F0F6FF] hover:text-white font-medium transition-colors duration-300 pb-4 border-b border-[#F0F6FF]/15" onClick={handleMobileMenuClose}>
                  Track Order
                </Link>
                <Link href="/contact" className="text-center text-[#F0F6FF] hover:text-white font-medium transition-colors duration-300 py-4 border-b border-[#F0F6FF]/15" onClick={handleMobileMenuClose}>
                  Contact Us
                </Link>
              </nav>
            </div>
          </div>
        )}

        {/* SearchBar overlay - PRESERVED */}
        <SearchBar open={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      </header>

      {/* Mobile Swipeable Menu - Outside header, stays at top of page (hidden on checkout page) */}
      {!isCheckoutPage && (
        <div suppressHydrationWarning={true} className="lg:hidden bg-[#030B19] border-t border-[#F0F6FF]/15">
          <div suppressHydrationWarning={true} className="overflow-x-auto scrollbar-hide" style={{ WebkitOverflowScrolling: 'touch' }}>
            <nav className="flex items-center gap-3 px-4 py-3 min-w-max">
              <Link
                href="/#products"
                className="flex-shrink-0 px-4 py-2 border border-[#F0F6FF]/30 rounded-full text-sm font-medium text-[#F0F6FF] hover:border-[#F0F6FF]/50 hover:bg-[#F0F6FF]/10 transition-colors duration-300 whitespace-nowrap"
              >
                All
              </Link>
              <Link
                href="/electronics"
                className="flex-shrink-0 px-4 py-2 border border-[#F0F6FF]/30 rounded-full text-sm font-medium text-[#F0F6FF] hover:border-[#F0F6FF]/50 hover:bg-[#F0F6FF]/10 transition-colors duration-300 whitespace-nowrap"
              >
                Electronics
              </Link>
              <Link
                href="/fashion"
                className="flex-shrink-0 px-4 py-2 border border-[#F0F6FF]/30 rounded-full text-sm font-medium text-[#F0F6FF] hover:border-[#F0F6FF]/50 hover:bg-[#F0F6FF]/10 transition-colors duration-300 whitespace-nowrap"
              >
                Fashion
              </Link>
              <Link
                href="/entertainment"
                className="flex-shrink-0 px-4 py-2 border border-[#F0F6FF]/30 rounded-full text-sm font-medium text-[#F0F6FF] hover:border-[#F0F6FF]/50 hover:bg-[#F0F6FF]/10 transition-colors duration-300 whitespace-nowrap"
              >
                Entertainment
              </Link>
              <Link
                href="/hobbies-collectibles"
                className="flex-shrink-0 px-4 py-2 border border-[#F0F6FF]/30 rounded-full text-sm font-medium text-[#F0F6FF] hover:border-[#F0F6FF]/50 hover:bg-[#F0F6FF]/10 transition-colors duration-300 whitespace-nowrap"
              >
                Hobbies & Collectibles
              </Link>
              <Link
                href="/#featured"
                className="flex-shrink-0 px-4 py-2 border border-[#F0F6FF]/30 rounded-full text-sm font-medium text-[#F0F6FF] hover:border-[#F0F6FF]/50 hover:bg-[#F0F6FF]/10 transition-colors duration-300 whitespace-nowrap"
              >
                Featured
              </Link>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
