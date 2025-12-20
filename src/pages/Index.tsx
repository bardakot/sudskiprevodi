import { useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
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

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-[72px] sm:pt-[80px]">
        <Hero />
        <Services />
        <Contact />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
