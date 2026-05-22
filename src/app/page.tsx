import React from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TechTicker from "@/components/TechTicker";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <TechTicker />
        <About />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
