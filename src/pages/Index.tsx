import { useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Locations from '@/components/Locations';
import Contact from '@/components/Contact';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import '@/i18n/config';

const Index = () => {
  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Enhanced smooth scrolling for mobile browsers
    if ('scrollBehavior' in document.documentElement.style === false) {
      // Fallback for browsers that don't support smooth scrolling
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js';
      script.onload = () => {
        // @ts-ignore
        window.__forceSmoothScrollPolyfill__ = true;
        // @ts-ignore
        window.smoothscroll.polyfill();
      };
      document.head.appendChild(script);
    }
  }, []);

  // Scroll to the section in the URL hash (e.g. /#contact from the blog pages).
  // The browser's native anchor jump fires before React renders the sections.
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;

    const scrollToHash = () => {
      const element = document.querySelector(hash);
      if (!element) return;
      const headerHeight = window.innerWidth >= 768 ? 80 : 72;
      const top = element.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      window.scrollTo({ top, behavior: 'auto' });
    };

    // Run once after render, and again once images/fonts have loaded and shifted the layout.
    const timer = window.setTimeout(scrollToHash, 100);
    window.addEventListener('load', scrollToHash, { once: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('load', scrollToHash);
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-[72px] sm:pt-[80px]">
        <Hero />
        <Services />
        <Contact />
        <FAQ />
        <Locations />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
