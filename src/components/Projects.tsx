"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Magnetic from "./Magnetic";
import ScrambleText from "./ScrambleText";

interface ConsoleLine {
  text: string;
  color: string;
}

export default function Projects() {
  const [visibleLines, setVisibleLines] = useState<ConsoleLine[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const consoleLines: ConsoleLine[] = [
    { text: "Hit!", color: "text-accent font-bold" },
    { text: "Enter location to strike i.e., 'A2' (A-J, 0-9): F2", color: "text-on-surface-variant/80" },
    { text: "Miss!", color: "text-on-surface/40" },
    { text: "Enter location to strike i.e., 'A2' (A-J, 0-9): F1", color: "text-on-surface-variant/80" },
    { text: "Miss!", color: "text-on-surface/40" },
    { text: "Enter location to strike i.e., 'A2' (A-J, 0-9): E3", color: "text-on-surface-variant/80" },
    { text: "Hit!", color: "text-accent font-bold" },
    { text: "Enter location to strike i.e., 'A2' (A-J, 0-9): D3", color: "text-on-surface-variant/80" },
    { text: "Hit!", color: "text-accent font-bold" },
    { text: "You sunk a Cruiser. There are 4 ships left!", color: "text-accent font-extrabold tracking-wide" },
  ];

  const tags = ["HTML", "CSS", "JAVA", "NODE.JS", "REACT.JS"];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Stagger items rising on scroll entrance
      gsap.fromTo(
        ".project-fade-item",
        { y: 60, opacity: 0 },
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

      // Terminal print animation trigger
      ScrollTrigger.create({
        trigger: ".terminal-box",
        start: "top 85%",
        onEnter: () => {
          setVisibleLines([]);
          consoleLines.forEach((line, index) => {
            setTimeout(() => {
              setVisibleLines((prev) => [...prev, line]);
            }, 350 * (index + 1));
          });
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="py-[120px] px-offset-x bg-surface-container-lowest relative overflow-hidden"
      id="projects"
    >
      <div className="project-fade-item text-center space-y-base mb-margin">
        <h2 className="font-headline-lg text-headline-lg">Projects</h2>
        <div className="w-1 h-12 bg-accent mx-auto mt-4"></div>
        <div className="accent-dot animate-ping"></div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-[80px] items-center">
        {/* Project Text Content */}
        <div className="space-y-gutter order-2 lg:order-1">
          <h3 className="project-fade-item font-headline-lg text-headline-md">
            Battleship
          </h3>

          <div className="project-fade-item flex flex-wrap gap-base">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="px-gutter py-1 border border-outline rounded-full font-label-caps text-[10px] select-none hover:border-accent hover:text-accent transition-colors duration-300"
              >
                {tag}
              </span>
            ))}
          </div>

          <p className="project-fade-item font-body-lg text-on-surface-variant leading-relaxed">
            Used components of Javascript to implement basic data structures through the game of
            Battleship. Used a terminal to display ships and tracked where ships are hit or
            missed.
          </p>

          <div className="project-fade-item flex gap-gutter pt-base">
            <Magnetic>
              <a
                className="bg-accent text-background px-margin py-base font-label-caps uppercase tracking-widest hover:invert transition-all cursor-pointer block"
                href="https://github.com/sba5022"
              >
                <ScrambleText text="View Github" triggerOnHover />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                className="flex items-center gap-base border-b border-accent py-base font-label-caps uppercase tracking-widest hover:text-accent transition-all cursor-pointer"
                href="#"
              >
                View project{" "}
                <span className="material-symbols-outlined text-sm animate-bounce">
                  north_east
                </span>
              </a>
            </Magnetic>
          </div>
        </div>

        {/* Code/Visual Terminal */}
        <div className="project-fade-item relative order-1 lg:order-2 group cursor-none">
          {/* Glowing neon green/orange shadow behind terminal */}
          <div className="absolute -inset-2 rounded-lg bg-gradient-to-r from-accent/10 to-transparent blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute -inset-4 border-2 border-accent/10 transition-all duration-300 group-hover:inset-0"></div>

          <div className="terminal-box bg-surface-dim p-gutter border border-outline-variant brutalist-shadow transition-all duration-500 group-hover:shadow-[8px_8px_30px_rgba(255,107,84,0.3)]">
            <div className="flex gap-2 mb-gutter border-b border-outline-variant/30 pb-3">
              <div className="w-3 h-3 rounded-full bg-error/60"></div>
              <div className="w-3 h-3 rounded-full bg-primary/60"></div>
              <div className="w-3 h-3 rounded-full bg-accent/60"></div>
              <span className="font-mono text-[10px] text-on-surface-variant/40 ml-4">
                bash - battleship.js
              </span>
            </div>

            <div className="font-mono text-on-surface-variant text-body-sm leading-relaxed min-h-[220px]">
              {visibleLines.map((line, index) => (
                <p key={index} className={`${line.color} transition-all duration-300 opacity-100 translate-y-0`}>
                  {line.text}
                </p>
              ))}
              {/* Typewriter cursor */}
              <span className="inline-block w-2 h-4 bg-accent/70 animate-pulse ml-1 align-middle"></span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative bg image */}
      <img
        alt="Abstract digital architecture with futuristic lighting"
        className="hidden"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhoj0nDZ8nk7SH0X7LFM11WC3nQeoSv4Hw_unBbZVkVAcF4CrjBFn5thNpma-zXGtgnQ7zdZWu-EGDlf2HBN1OQYq2gx1Y5z8HmtdG0BJEK23abvTrJngQeQG3smo4xMcK0cjfzHYiceQJPPeFLq7u1xAxZwOxUsEvDBPFBE1eAdLGrT7ANTzJhDZnkfrtnVNdzgtFhp4loDfnJhs25tj5hVmh1ng88SWypYiBGH4mSm0pqACqPIeaZZ894cZgfVWlMcLtRxXI3Os"
      />
    </section>
  );
}
