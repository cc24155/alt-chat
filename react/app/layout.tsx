import "./globals.css";

// importando e criando as variaveis de fontes de texto
import { Victor_Mono } from "next/font/google";
const victorMono = Victor_Mono({
  variable: "--font-victor-mono-title",
  subsets: ["latin"],
});
import { Afacad } from "next/font/google";
const afacad = Afacad({
  variable: "--font-afacad-subtitle",
  subsets: ["latin"],
});
import { DM_Sans } from "next/font/google";
const dmSans = DM_Sans({
  variable: "--font-dm-sans-body",
  subsets: ["latin"],
});

// tipo TypeScript que descreve os metadados (info) da página
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "ALT-CHAT",
  description: "Comunicação Alternativa",
  icons: {
    icon: '/Logo Claro.png',
  },
};

// define o esqueleto da página/layout principal da aplicação
export default function RootLayout({
  children, // todo o conteúdo da página será colocado dentro do <body>
}: Readonly<{
  children: React.ReactNode;  // children não será modificado
}>) {
  return (
    <html
      lang="pt"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      // classes globais que afetam toto o site
      className={`${victorMono.variable} ${afacad.variable} ${dmSans.variable} h-full antialiased`}
    >
      <head>
        <script
          id="check-theme"
          dangerouslySetInnerHTML={{
            __html: `
            const tema = localStorage.getItem('tema-extra');
            if (tema) document.documentElement.classList.add(tema);
          `}} />
      </head>
      {/* garante que o corpo ocupe pelo menos a altura da tela/layout flex vertical */}
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
};
