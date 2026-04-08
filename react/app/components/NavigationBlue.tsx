"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

interface NavigationBlueProps {

}

export default function NavigationBlue({ }: NavigationBlueProps) {
  const navLinks = [
    { label: "Biblioteca", href: "/Biblioteca" },
    { label: "Modo Aprendizado", href: "/ModoAprendizado" },
    { label: "Conta", href: "/Conta" },
  ];

  const [scrolled, setScrolled] = useState(false); //controla se a navbar mudou de aparência
  const [menuOpen, setMenuOpen] = useState(false); //controla se o menu mobile tá aberto

  // se voce scrolla e passa de 40px, ele re-renderiza
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 `}
      role="navigation"
      aria-label="Navegação principal"
    >
      {/* Menu fechado */}
      <div className={`w-full mx-auto px-8 h-[72px] flex items-center justify-between ${
        scrolled
          // antes de rolar é trnsparente, dps tem cor
          ? "bg-primary backdrop-blur-sm shadow-figma text-background"
          : "bg-transparent text-foreground"
      }`}>

        {/* Logo */}
        <a
          href="#biblioteca"
          className="flex items-center gap-2 no-underline"
          aria-label="Ir para o início"
        >
          <div className="w-18 h-18 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-transparent rounded-sm flex items-center justify-center">
            <img className="imagem-tema w-full h-full object-contain" alt="Logotipo.png" />
          </div>
        </a>

        {/* Se for Desktop -> Nav */}
        <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="font-body font-normal tracking-[-0.075px] opacity-70 hover:opacity-100 transition-opacity no-underline"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Se for Mobile */}
        {/* Mobile Menu Button (fechar/abrir) */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
        >
          <span
            className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </div>

      {/* Mobile Menu ABERTO */}
      {menuOpen && (
        <div className={`md:hidden border-t border-foreground px-8 py-6 flex flex-col gap-4 rounded-b-2xl overflow-hidden ${
          scrolled
            ? "bg-info backdrop-blur-sm shadow-figma text-background"
            : "bg-neutral text-foreground"
        }`}>
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="font-body font-normal no-underline border-b border-foreground/20 pb-4 last:border-none"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
