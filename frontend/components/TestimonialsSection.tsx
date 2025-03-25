
import React, { useEffect, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "Sarah Johnson",
    position: "Marketing Director, TechFlow Inc.",
    testimonial: "The SERP Scraper tool has revolutionized our lead generation process. We've seen a 45% increase in qualified leads since implementing this solution.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Michael Chen",
    position: "SEO Specialist, Growth Hackers",
    testimonial: "I've tried multiple scraping tools, but this one stands out for its accuracy and ease of use. The filtering capabilities are second to none.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Emily Rodriguez",
    position: "Lead Generation Manager, Sales Force Pro",
    testimonial: "The contact enrichment feature has saved us countless hours of manual research. Now we can focus on connecting with prospects instead of hunting for their information.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
  },
];

const TestimonialsSection = () => {
  const testimonialsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1, rootMargin: "-50px" }
    );
    
    const elements = testimonialsRef.current?.querySelectorAll('.reveal-on-scroll');
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
    <section id="testimonials" className="section-padding bg-gradient-to-b from-white to-secondary/50" ref={testimonialsRef}>
      <div className="container mx-auto">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 reveal-on-scroll">
            Client Success Stories
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 reveal-on-scroll">
            Trusted by Leading Companies
          </h2>
          <p className="text-muted-foreground reveal-on-scroll">
            Hear from our clients about how our SERP scraping technology has transformed their lead generation strategy.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="overflow-hidden border border-white/20 glass hover:shadow-xl transition-all reveal-on-scroll">
              <CardContent className="p-8">
                <div className="mb-6">
                  <svg className="h-8 w-8 text-primary/70" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                  </svg>
                </div>
                <p className="text-md mb-6 italic">{testimonial.testimonial}</p>
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                    <img src={testimonial.image} alt={testimonial.name} className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
