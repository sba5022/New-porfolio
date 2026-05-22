"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrambleText from "./ScrambleText";

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Stagger items rising on scroll entrance
      gsap.fromTo(
        ".about-fade-item",
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

  const services = [
    { icon: "computer", title: "Website Development" },
    { icon: "cloud_queue", title: "Website Hosting" },
  ];

  const stats = [
    { value: "20", suffix: "+", label: "Completed Projects" },
    { value: "95", suffix: "%", label: "Client satisfaction" },
    { value: "4", suffix: "+", label: "Months of experience" },
  ];

  return (
    <section
      ref={containerRef}
      className="py-[120px] px-offset-x relative overflow-hidden"
      id="about"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[100px] items-center">
        {/* Services List */}
        <div className="space-y-margin relative">
          <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-accent/20"></div>
          <div className="pl-gutter space-y-offset-y">
            {services.map((service, index) => (
              <div
                key={index}
                className="about-fade-item group flex items-center gap-gutter glass-card p-6 rounded-lg transition-all duration-300 hover:border-accent hover:shadow-[0_0_20px_rgba(255,107,84,0.1)] hover:scale-[1.03] cursor-pointer"
              >
                <div className="w-16 h-16 border border-outline flex items-center justify-center group-hover:border-accent group-hover:text-accent transition-colors">
                  <span className="material-symbols-outlined text-[32px]">
                    {service.icon}
                  </span>
                </div>
                <h3 className="font-headline-md text-headline-md group-hover:text-accent transition-colors">
                  {service.title}
                </h3>
              </div>
            ))}
          </div>
        </div>

        {/* Content & Stats */}
        <div className="space-y-margin">
          <div className="about-fade-item space-y-base">
            <p className="font-label-caps text-accent uppercase tracking-[0.3em]">
              Biography
            </p>
            <h2 className="font-headline-lg text-headline-lg">About me</h2>
          </div>
          <p className="about-fade-item font-body-lg text-on-surface-variant max-w-xl">
            I started my software journey from photography. Through that, I learned to love
            the process of creating from scratch. Since then, this has led me to software
            development as it fulfills my love for learning and building things.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-gutter pt-margin">
            {stats.map((stat, index) => (
              <div key={index} className="about-fade-item space-y-base">
                <h4 className="font-display-xl text-headline-md lg:text-headline-lg text-accent select-none">
                  <ScrambleText text={stat.value} duration={1.5} triggerOnHover />
                  <span className="text-on-background">{stat.suffix}</span>
                </h4>
                <p className="font-label-caps text-on-surface-variant uppercase text-[10px]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative Background Image */}
      <img
        alt="Developer background aesthetic"
        className="absolute -right-offset-x top-1/2 -translate-y-1/2 w-1/3 opacity-[0.03] pointer-events-none -z-10 grayscale"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJyyRQ0oA4pIrLf-GAuVDqfdGWhK97eOQrjfmOriPMaAgypys4-BrC9UqPtHLpKhtSg50_lPNGjuGFr6TyI2QxfA91Ofj6POCxV1SbvrezzVhOr8dhtDjHVslQ_H0mCr_W8TH0IDqSu6TUkYTlIcCANV-q8auKAlizjk9_cBXsPlmfCC4uxuBtR9IpCig7Eeo-TD7Wv6w8piOFoMz52uvGZoVHnCWPrZlF0hoTpSOXM-nA3NTHVmmv0MRpEyX58IyV31qyDJhMdN8"
      />
    </section>
  );
}
