import { useEffect, useState } from "react";

interface NavigationBlueProps {

}

export default function NavigationBlue({ }: NavigationBlueProps) {
  const navLinks = [
    { label: "Biblioteca", href: "#biblioteca" },
    { label: "Sobre", href: "#sobre" },
    { label: "Contato", href: "#contato" },
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
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          // antes de rolar é trnsparente, dps tem cor
          ? "bg-[rgba(248,244,235,0.95)] backdrop-blur-sm shadow-sombra"
          : "bg-transparent"
      }`}
      role="navigation"
      aria-label="Navegação principal"
    >
      <div className="max-w-[1440px] mx-auto px-8 h-[72px] flex items-center justify-between">
        {/* Logo */}
        <a
          href="#biblioteca"
          className="flex items-center gap-2 no-underline"
          aria-label="Ir para o início"
        >
          <div className="w-20 h-20 bg-preto rounded-sm flex items-center justify-center">
            <span>
              <img src="/Logotipo Claro.png" alt="Logotipo Claro.png" />
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="[font-family:'DM_Sans',Helvetica] text-[14px] font-normal tracking-[-0.075px] text-preto opacity-70 hover:opacity-100 transition-opacity no-underline"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
        >
          <span
            className={`block w-6 h-0.5 bg-preto transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 bg-preto transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 bg-preto transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-off-white border-t border-[rgba(0,0,0,0.08)] px-8 py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="[font-family:'DM_Sans',Helvetica] text-[16px] font-normal text-preto no-underline"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
