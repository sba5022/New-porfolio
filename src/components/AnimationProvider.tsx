"use client";

import React, { useEffect, useState } from "react";
import { ReactLenis } from "lenis/react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import CustomCursor from "./CustomCursor";
import BackgroundEffects from "./BackgroundEffects";
import ScrambleText from "./ScrambleText";

export default function AnimationProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  // Scroll Progress indicator
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    // Hide loader after a short timeout (e.g. 2.2 seconds to let animations sink in)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ReactLenis root>
      {/* 1. Page Loader Screen */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            className="fixed inset-0 bg-background z-[99999] flex flex-col items-center justify-center text-center px-4"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="space-y-4">
              <h2 className="text-headline-lg font-black tracking-tight text-on-background">
                <ScrambleText text="Jensen Omega" duration={1.2} />
              </h2>
              <div className="flex items-center justify-center gap-2">
                <span className="w-1.5 h-1.5 bg-accent rounded-full animate-ping"></span>
                <p className="font-label-caps text-on-surface-variant tracking-[0.25em] text-[10px]">
                  SOFTWARE DEVELOPER
                </p>
              </div>
            </div>
            {/* Loading Progress bar visual */}
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-48 h-[1px] bg-outline-variant/30">
              <motion.div
                className="h-full bg-accent"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.8, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Layout with Animation Enhancements */}
      {!isLoading && (
        <>
          {/* Scroll progress bar indicator */}
          <motion.div className="scroll-progress" style={{ scaleX }} />

          {/* Core Interactive/Atmosphere Layer */}
          <BackgroundEffects />
          <CustomCursor />

          {/* Animated Route/Section Entrance Wrapper */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="relative z-10 flex flex-col flex-1"
          >
            {children}
          </motion.div>
        </>
      )}
    </ReactLenis>
  );
}
