
import React, { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import Link from 'next/link';
const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const elements = heroRef.current?.querySelectorAll('.reveal-on-scroll');
    elements?.forEach((el) => {
      observer.observe(el);
    });
    
    return () => {
      elements?.forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b pt-16" ref={heroRef}>
      <div className="container mx-auto px-6 md:px-12 lg:px-24 py-24">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="lg:w-1/2 space-y-8">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium reveal-on-scroll">
              Google SERP Scraping Service
            </span>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight reveal-on-scroll">
              Generate Quality Leads from <span className="text-primary">Search Results</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-lg reveal-on-scroll">
              Our advanced SERP scraping technology extracts valuable data from Google search results in real-time, helping you identify and connect with potential customers.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 reveal-on-scroll">
              <Button size="lg" className="rounded-full transition-all hover:scale-105">
                <Link href="/login">Get Started</Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full border-primary/20 hover:bg-primary/5">
                Schedule Demo
              </Button>
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-muted-foreground reveal-on-scroll">
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                No credit card required
              </span>
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Cancel anytime
              </span>
            </div>
          </div>
          
          <div className="lg:w-1/2">
            <div className="glass rounded-2xl p-1.5 shadow-xl reveal-on-scroll">
              <div className="rounded-xl bg-secondary/50 overflow-hidden">
                <div className="h-8 bg-primary/5 flex items-center px-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                </div>
                <div className="p-6">
                  {/* <Image src={hero_img} alt="Hero Image" width={800} height={600} layout="responsive" /> */}
                  <div className="animate-pulse-slow">
                    <div className="h-4 bg-primary/10 rounded mb-4 w-3/4"></div>
                    <div className="h-8 bg-primary/20 rounded mb-6 w-2/3"></div>
                    <div className="space-y-3">
                      <div className="h-4 bg-primary/10 rounded w-full"></div>
                      <div className="h-4 bg-primary/10 rounded w-5/6"></div>
                      <div className="h-4 bg-primary/10 rounded w-4/6"></div>
                      <div className="h-4 bg-primary/10 rounded w-5/6"></div>
                    </div>
                    <div className="mt-6 space-y-3">
                      <div className="h-10 bg-primary/20 rounded w-full"></div>
                      <div className="h-10 bg-primary/10 rounded w-full"></div>
                      <div className="h-10 bg-primary/10 rounded w-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
