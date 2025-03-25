import React, { useEffect, useRef } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does the SERP scraping tool work?",
    answer: "Our tool uses advanced algorithms to extract data from Google search results pages based on your specified keywords and criteria. It captures relevant information such as company names, contact details, and website URLs, then organizes this data into actionable leads for your business."
  },
  {
    question: "Is this service compliant with Google's terms of service?",
    answer: "We've designed our scraping technology to be respectful of Google's systems. Our service uses a responsible approach with proper rate limiting, rotating IP addresses, and adherence to robots.txt files to ensure compliance with web scraping best practices."
  },
  {
    question: "What types of data can I extract?",
    answer: "Our platform can extract various data points including company names, website URLs, phone numbers, email addresses, social media profiles, business categories, and physical addresses. We can also capture specific data points based on your custom requirements."
  },
  {
    question: "How accurate is the extracted data?",
    answer: "We pride ourselves on delivering high-accuracy data, typically above 95% accuracy for most fields. Our system uses multiple validation techniques to verify extracted information, and we continuously refine our algorithms to improve data quality."
  },
  {
    question: "Can I export the scraped data?",
    answer: "Yes, we offer multiple export options including CSV, Excel, JSON, and direct integration with popular CRM systems like Salesforce, HubSpot, and Zoho. This makes it easy to incorporate the leads into your existing workflows."
  },
  {
    question: "Is there a limit to how many searches I can run?",
    answer: "Different subscription plans offer varying amounts of searches and data points. Our basic plan includes 1,000 search queries per month, while our premium and enterprise plans offer significantly higher limits with additional features."
  }
];

const FAQSection = () => {
  const faqRef = useRef<HTMLDivElement>(null);
  
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
    
    const elements = faqRef.current?.querySelectorAll('.reveal-on-scroll');
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
    <section id="faq" className="section-padding bg-white" ref={faqRef}>
      <div className="container mx-auto">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 reveal-on-scroll">
            Frequently Asked Questions
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 reveal-on-scroll">
            Common Questions About Our Service
          </h2>
          <p className="text-muted-foreground reveal-on-scroll">
            Find answers to the most common questions about our SERP scraping and lead generation service.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto reveal-on-scroll">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-muted">
                <AccordionTrigger className="text-left text-lg font-medium py-4 hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
