"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  // Outer ring coordinates (has damping spring for trailing delay)
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Inner snappier dot coordinates
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  const springConfig = { damping: 30, stiffness: 220, mass: 0.6 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const checkPointer = () => {
      // Check if the device has a fine pointer (like a mouse)
      const finePointer = window.matchMedia("(pointer: fine)").matches;
      setIsMobile(!finePointer);
    };

    checkPointer();
    window.addEventListener("resize", checkPointer);

    if (isMobile) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      
      dotX.set(e.clientX - 4);
      dotY.set(e.clientY - 4);
      
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      
      const isClickable =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.classList.contains("cursor-pointer") ||
        target.getAttribute("role") === "button";

      setIsHovered(!!isClickable);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    document.documentElement.classList.add("custom-cursor-active");

    return () => {
      window.removeEventListener("resize", checkPointer);
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, [isMobile, isVisible]);

  if (isMobile || !isVisible) return null;

  return (
    <>
      {/* Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-accent pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={{
          scale: isHovered ? 1.6 : 1,
          backgroundColor: isHovered ? "rgba(255, 107, 84, 0.15)" : "rgba(255, 107, 84, 0)",
          borderColor: isHovered ? "rgba(255, 107, 84, 1)" : "rgba(255, 107, 84, 0.5)",
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.15 }}
      />
      {/* snappier Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-accent rounded-full pointer-events-none z-[9999]"
        style={{
          x: dotX,
          y: dotY,
        }}
        animate={{
          scale: isHovered ? 0.4 : 1,
          backgroundColor: isHovered ? "#ffffff" : "#ff6b54",
        }}
        transition={{ duration: 0.1 }}
      />
    </>
  );
}
