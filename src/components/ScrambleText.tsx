"use client";

import React, { useEffect, useState, useRef } from "react";

interface ScrambleProps {
  text: string;
  duration?: number;
  scrambleSpeed?: number;
  triggerOnHover?: boolean;
  className?: string;
}

export default function ScrambleText({
  text,
  duration = 1.0,
  scrambleSpeed = 30,
  triggerOnHover = false,
  className = "",
}: ScrambleProps) {
  const [displayText, setDisplayText] = useState(text);
  const isAnimating = useRef(false);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*";

  const triggerAnimation = () => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    let frame = 0;
    const totalFrames = Math.floor((duration * 1000) / scrambleSpeed);
    const textLength = text.length;

    const interval = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;

      const scrambled = text
        .split("")
        .map((char, index) => {
          if (char === " ") return " ";
          
          if (index / textLength < progress) {
            return text[index];
          }
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join("");

      setDisplayText(scrambled);

      if (frame >= totalFrames) {
        clearInterval(interval);
        setDisplayText(text);
        isAnimating.current = false;
      }
    }, scrambleSpeed);
  };

  useEffect(() => {
    if (!triggerOnHover) {
      triggerAnimation();
    }
  }, [text]);

  return (
    <span
      className={className}
      onMouseEnter={() => {
        if (triggerOnHover) triggerAnimation();
      }}
    >
      {displayText}
    </span>
  );
}
