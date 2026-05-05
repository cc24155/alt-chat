"use client";
import Link from "next/link";

interface FooterProps {
}

export default function Footer({ }: FooterProps) {
  return (
    <footer className="w-full bg-background py-5 px-8" role="contentinfo">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-3">

        {/* Divider */}
        <div className="w-full h-px bg-foreground" />

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <Link href="/">
            <img className="theme-image w-20" alt="logotipo" />
          </Link>
          <span className="font-body font-normal tracking-[-0.075px] text-foreground">
            &copy; {new Date().getFullYear()} ALT-CHAT. Todos os direitos reservados.
            <br />
            Créditos à ARASAAC por fornecer os pictogramas utilizados neste projeto.
          </span>
        </div>
      </div>
    </footer>
  );
}
