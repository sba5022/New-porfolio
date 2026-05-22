"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Magnetic from "./Magnetic";

export default function Header() {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  const links = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "contacts", label: "Contacts" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    // Track intersection of page sections to update active link
    const observers = links.map((link) => {
      const el = document.getElementById(link.id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(link.id);
          }
        },
        {
          rootMargin: "-20% 0px -60% 0px", // Trigger when section occupies mid viewport
          threshold: 0.1,
        }
      );
      observer.observe(el);
      return { el, observer };
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observers.forEach((obs) => {
        if (obs) obs.observer.unobserve(obs.el);
      });
    };
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 flex justify-between items-center transition-all duration-500 max-w-full ${scrolled
          ? "glass-navbar py-4 px-offset-x shadow-2xl"
          : "bg-transparent py-margin px-offset-x"
        }`}
    >
      <div className="text-headline-md font-headline-md font-black text-on-background select-none">
        Sumaia
      </div>

      <div className="hidden md:flex gap-gutter items-center">
        {links.map((link) => {
          const isActive = activeSection === link.id;
          return (
            <Magnetic key={link.id} range={40} strength={0.25}>
              <a
                className={`relative font-body-sm text-body-sm px-3 py-2 transition-colors duration-300 scale-100 active:scale-95 cursor-pointer uppercase tracking-widest font-bold ${isActive
                    ? "text-primary"
                    : "text-on-surface-variant hover:text-primary"
                  }`}
                onClick={(e) => handleScrollTo(e, link.id)}
                href={`#${link.id}`}
              >
                <span className="relative z-10">{link.label}</span>
                {isActive && (
                  <motion.span
                    layoutId="activeUnderline"
                    className="absolute bottom-0 left-3 right-3 h-[2px] bg-accent"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}
              </a>
            </Magnetic>
          );
        })}
      </div>
    </nav>
  );
}
