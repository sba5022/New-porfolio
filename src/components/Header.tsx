
"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Magnetic from "./Magnetic";

export default function Header() {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
          rootMargin: "-20% 0px -60% 0px",
          threshold: 0.1,
        }
      );

      observer.observe(el);

      return { el, observer };
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);

      observers.forEach((obs) => {
        if (obs) {
          obs.observer.unobserve(obs.el);
        }
      });
    };
  }, []);

  const handleScrollTo = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();

    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
      });
    }

    setMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 flex justify-between items-center transition-all duration-500 max-w-full ${
        scrolled
          ? "glass-navbar py-4 px-offset-x shadow-2xl"
          : "bg-transparent py-margin px-offset-x"
      }`}
    >
      {/* Logo */}
      <a
        href="#home"
        onClick={(e) => handleScrollTo(e, "home")}
        className="font-bold text-xl text-primary"
      >
        Sumaia
      </a>

      {/* Desktop Navigation */}
      <div className="hidden md:flex gap-gutter items-center">
        {links.map((link) => {
          const isActive = activeSection === link.id;

          return (
            <Magnetic key={link.id} range={40} strength={0.25}>
              <a
                className={`relative font-body-sm text-body-sm px-3 py-2 transition-colors duration-300 scale-100 active:scale-95 cursor-pointer uppercase tracking-widest font-bold ${
                  isActive
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

      {/* Mobile Menu Button */}
      <button
        type="button"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden flex flex-col gap-1.5 p-2 text-primary"
        aria-label="Toggle menu"
      >
        <span
          className={`block w-6 h-0.5 bg-current transition-transform duration-300 ${
            mobileMenuOpen ? "rotate-45 translate-y-2" : ""
          }`}
        />

        <span
          className={`block w-6 h-0.5 bg-current transition-opacity duration-300 ${
            mobileMenuOpen ? "opacity-0" : ""
          }`}
        />

        <span
          className={`block w-6 h-0.5 bg-current transition-transform duration-300 ${
            mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
          }`}
        />
      </button>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="absolute top-full left-0 w-full md:hidden glass-navbar shadow-xl"
          >
            <div className="flex flex-col px-6 py-5 gap-2">
              {links.map((link) => {
                const isActive = activeSection === link.id;

                return (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={(e) => handleScrollTo(e, link.id)}
                    className={`py-3 px-4 rounded-md uppercase tracking-widest font-bold transition-colors ${
                      isActive
                        ? "text-primary bg-primary/10"
                        : "text-on-surface-variant hover:text-primary"
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

