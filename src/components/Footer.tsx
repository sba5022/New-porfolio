import React from "react";

export default function Footer() {
  return (
    <footer className="bg-surface-container-lowest border-t border-outline-variant py-margin w-full flex flex-col items-center gap-gutter text-center">
      <div className="text-headline-md font-headline-md text-on-background">Sumaia Binta Asad</div>
      <p className="font-body-sm text-body-sm text-on-surface-variant">
        Designed with love, all rights reserved for Jensen Omega.
      </p>
      <div className="flex gap-gutter items-center pt-base">
        <a
          className="w-12 h-12 rounded-full border border-outline-variant flex items-center justify-center hover:bg-accent hover:text-background hover:border-accent transition-all duration-300"
          href="mailto:sumaiaofficial02@gmail.com"
        >
          <span className="material-symbols-outlined">mail</span>
        </a>
        <a
          className="w-12 h-12 rounded-full border border-outline-variant flex items-center justify-center hover:bg-accent hover:text-background hover:border-accent transition-all duration-300"
          href="#"
        >
          <span className="material-symbols-outlined">terminal</span>
        </a>
        <a
          className="w-12 h-12 rounded-full border border-outline-variant flex items-center justify-center hover:bg-accent hover:text-background hover:border-accent transition-all duration-300"
          href="#"
        >
          <span className="material-symbols-outlined">group</span>
        </a>
      </div>
    </footer>
  );
}
