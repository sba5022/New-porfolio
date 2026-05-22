"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Magnetic from "./Magnetic";
import ScrambleText from "./ScrambleText";

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Stagger items rising on scroll entrance
      gsap.fromTo(
        ".contact-fade-item",
        { y: 55, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
    alert(`Thank you, ${formData.name || "there"}! Your message was submitted successfully.`);
  };

  return (
    <section
      ref={containerRef}
      className="py-[120px] px-offset-x relative overflow-hidden"
      id="contacts"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-[100px] items-center">
        {/* Left Section details */}
        <div className="space-y-margin">
          <div className="contact-fade-item relative inline-block pr-12 py-2">
            <div className="absolute left-0 top-0 w-8 h-[2px] bg-accent"></div>
            <span className="font-label-caps text-on-surface-variant">Contacts</span>
          </div>
          
          <h2 className="contact-fade-item font-headline-lg text-headline-lg leading-tight">
            Have a project?
            <br />
            Let's talk!
          </h2>
          
          <div className="contact-fade-item pt-4">
            <Magnetic>
              <button
                onClick={handleSubmit}
                className="bg-accent text-background px-margin py-base font-label-caps uppercase tracking-widest hover:scale-105 transition-transform cursor-pointer"
              >
                <ScrambleText text="Submit" triggerOnHover />
              </button>
            </Magnetic>
          </div>
        </div>

        {/* Right Section Form Card */}
        <div className="contact-fade-item bg-surface-container-low p-margin border border-outline-variant rounded-lg glass-card">
          <form className="space-y-margin" onSubmit={handleSubmit}>
            
            {/* Name Input */}
            <div className="relative group pt-4">
              <label
                className={`absolute left-0 transition-all duration-300 pointer-events-none font-label-caps tracking-wider ${
                  focusedField === "name" || formData.name
                    ? "text-accent text-[10px] top-0"
                    : "text-on-surface-variant text-[12px] top-4"
                }`}
              >
                Name
              </label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                onFocus={() => setFocusedField("name")}
                onBlur={() => setFocusedField(null)}
                className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-transparent focus:ring-0 transition-colors p-base font-body-lg text-on-background outline-none mt-2 relative z-10"
                type="text"
                required
              />
              {/* Highlight Line Draw animation on focus */}
              <div
                className={`absolute bottom-0 left-0 h-[2px] bg-accent transition-all duration-500 z-20 ${
                  focusedField === "name" ? "w-full" : "w-0"
                }`}
              ></div>
            </div>

            {/* Email Input */}
            <div className="relative group pt-4">
              <label
                className={`absolute left-0 transition-all duration-300 pointer-events-none font-label-caps tracking-wider ${
                  focusedField === "email" || formData.email
                    ? "text-accent text-[10px] top-0"
                    : "text-on-surface-variant text-[12px] top-4"
                }`}
              >
                Email
              </label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-transparent focus:ring-0 transition-colors p-base font-body-lg text-on-background outline-none mt-2 relative z-10"
                type="email"
                required
              />
              <div
                className={`absolute bottom-0 left-0 h-[2px] bg-accent transition-all duration-500 z-20 ${
                  focusedField === "email" ? "w-full" : "w-0"
                }`}
              ></div>
            </div>

            {/* Message Textarea */}
            <div className="relative group pt-4">
              <label
                className={`absolute left-0 transition-all duration-300 pointer-events-none font-label-caps tracking-wider ${
                  focusedField === "message" || formData.message
                    ? "text-accent text-[10px] top-0"
                    : "text-on-surface-variant text-[12px] top-4"
                }`}
              >
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                onFocus={() => setFocusedField("message")}
                onBlur={() => setFocusedField(null)}
                className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-transparent focus:ring-0 transition-colors p-base font-body-lg text-on-background outline-none mt-2 relative z-10"
                rows={4}
                required
              ></textarea>
              <div
                className={`absolute bottom-0 left-0 h-[2px] bg-accent transition-all duration-500 z-20 ${
                  focusedField === "message" ? "w-full" : "w-0"
                }`}
              ></div>
            </div>

          </form>
        </div>
      </div>

      <img
        alt="Contact aesthetic background"
        className="hidden"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0Ln4xL7ZY9dXBLvin9dW6_w4cECqLh3OWb9PskhbTWZZEbyhLvR0qbx8jKawyEpF7bL00dqesDCjE3QIYTpPXnoBY_mwbs85MBgd0iPmrZQcdgZqI6sUkeNafAdCAqzs8IQZVWayD2r738sa0aWcgoszsQXuVLWMUEn7wEo4rZwqpZ-kz6aTUgNZQvhK2DKre123kZeiGegQ2BUtvzqmXLMvZHqNbsUp-2zu0U8A5HQAQvxxoQvLm9nvloGIqtFQU831VAYACCQk"
      />
    </section>
  );
}
