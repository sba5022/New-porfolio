"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import Magnetic from "./Magnetic";
import ScrambleText from "./ScrambleText";

export default function Hero() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Stagger word reveals on mount
    gsap.fromTo(
      ".hero-stagger-word",
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.08,
        duration: 1.1,
        ease: "power4.out",
        delay: 0.3,
      }
    );
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - (left + width / 2)) / 22; // Tilt sensitivity
    const y = (e.clientY - (top + height / 2)) / 22;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  // Splits string into separate stagger-ready words
  const renderStaggerText = (phrase: string) => {
    return phrase.split(" ").map((word, i) => (
      <span key={i} className="inline-block overflow-hidden mr-3">
        <span className="hero-stagger-word inline-block will-change-transform opacity-0">
          {word}
        </span>
      </span>
    ));
  };

  return (
    <section
      className="relative min-h-screen flex items-center pt-offset-y px-offset-x overflow-hidden"
      id="home"
    >
      <div className="absolute inset-0 hero-gradient -z-10"></div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter items-center w-full">
        {/* Left column text details */}
        <div className="z-10 space-y-gutter">
          <div className="flex items-center gap-base">
            <h1 className="font-headline-lg text-headline-lg uppercase tracking-tight">
              {renderStaggerText("Hello")}
              <span className="text-accent inline-block animate-pulse">.</span>
            </h1>
          </div>

          <div className="relative pl-12 flex items-center h-12">
            {/* Drawing orange line */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "32px" }}
              transition={{ duration: 1, delay: 0.9, ease: "easeOut" }}
              className="absolute left-0 h-[2px] bg-accent"
            />
            <p className="font-headline-md text-headline-md leading-none">
              {renderStaggerText("I'm Sumaia")}
            </p>
          </div>

          <h2 className="font-display-xl text-headline-lg lg:text-display-xl leading-none transition-all duration-300 hover:text-shadow-[0_0_20px_rgba(255,107,84,0.3)] hover:text-accent">
            {renderStaggerText("Website Developer")}
          </h2>

          <div className="flex flex-wrap gap-gutter pt-offset-y">
            <Magnetic>
              <button className="bg-accent text-background px-margin py-base font-label-caps uppercase tracking-widest hover:invert transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
                <ScrambleText text="Got a project?" triggerOnHover />
              </button>
            </Magnetic>
            <Magnetic>
              <button className="border-2 border-accent text-on-background px-margin py-base font-label-caps uppercase tracking-widest hover:bg-accent hover:text-background transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
                <ScrambleText text="My resume" triggerOnHover />
              </button>
            </Magnetic>
          </div>
        </div>

        {/* Right column: 3D parallax photo container */}
        <div className="relative flex justify-center items-center">
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] cursor-pointer transition-transform duration-300 ease-out"
            style={{
              transform: `perspective(1000px) rotateX(${-tilt.y}deg) rotateY(${tilt.x}deg)`,
            }}
          >
            {/* Spinning decorative ring with accent drop shadow */}
            <div className="absolute inset-0 rounded-full border-[3px] border-accent opacity-50 animate-[spin_20s_linear_infinite] shadow-[0_0_20px_rgba(255,107,84,0.25)]"></div>

            {/* Parallax Image floating slowly */}
            <motion.div
              animate={{
                y: [0, -15, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-4 rounded-full overflow-hidden border-2 border-outline-variant shadow-[0_15px_35px_rgba(0,0,0,0.5)] will-change-transform"
            >
              {/* Load-in scale and blur transition */}
              <motion.img
                initial={{ scale: 1.2, filter: "blur(12px)", opacity: 0 }}
                animate={{ scale: 1, filter: "blur(0px)", opacity: 1 }}
                transition={{ duration: 1.3, delay: 0.6, ease: "easeOut" }}
                alt="Sumaia"
                className="w-full h-full object-cover select-none"
                src="https://i.ibb.co.com/ZzqXn3RY/Screenshot-2026-05-22-at-9-32-38-PM.png"
              />
            </motion.div>

            {/* Decorative Chevrons */}
            <div className="absolute -left-12 top-1/4 text-accent/30 text-[80px] font-black select-none pointer-events-none">&lt;</div>
            <div className="absolute -right-12 bottom-1/4 text-accent/30 text-[80px] font-black select-none pointer-events-none">&gt;</div>
          </div>
        </div>
      </div>
    </section>
  );
}
