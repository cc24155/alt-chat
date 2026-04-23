"use client";
import { JSX, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import Navigation from "./Navigation";
import Button from "./Button";


export default function NavBar() {
  const router = useRouter();
  const links = ["Biblioteca", "Sobre", "Contato"];

  return (
    <nav className="fixed top-4 left-0 w-full z-[100] px-4 flex items-center justify-between pointer-events-none transition-all">
      {/* Lado Esquerdo: Logo */}
      <div className="pointer-events-auto">
        <Navigation />
      </div>

      {/* Centro: Links */}
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-4 sm:gap-8 bg-foreground/10 backdrop-blur-md px-6 py-2 rounded-full border border-foreground/5 pointer-events-auto">
        {links.map((link) =>
          link === "Biblioteca" ? (
            <button
              key={link}
              onClick={() => router.push("/Biblioteca")}
              className="text-foreground font-body font-semibold hover:opacity-50 transition-all tracking-wider"
            >
              {link}
            </button>
          ) : (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-foreground font-body font-semibold hover:opacity-50 transition-all tracking-wider"
            >
              {link}
            </a>
          )
        )}
      </div>

      {/* Lado Direito: Botões */}
      <div className="flex gap-1 sm:gap-2 md:gap-3 pointer-events-auto">
        <Button
          text="Login"
          onClick={() => router.push("/Login")}
          className="
                px-2 sm:px-3 md:px-5
                py-1 sm:py-1.5 md:py-2
                h-7 sm:h-8 md:h-9
              "
        />
        <Button
          text="Cadastro"
          onClick={() => router.push("/Cadastro")}
          className="
                px-2 sm:px-3 md:px-5
                py-1 sm:py-1.5 md:py-2
                h-7 sm:h-8 md:h-9
              "
        />
      </div>
    </nav>
  );
}
