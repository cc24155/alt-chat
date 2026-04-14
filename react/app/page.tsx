"use client";
import { JSX, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import Navigation from "../app/components/Navigation";
import HeroSection from "../app/components/HeroSection";
import Button from "../app/components/Button";
import Contato from "../app/components/Contato";
import Footer from "../app/components/Footer";
import Link from "next/link";


const NavBar = () => {
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
};

// 0 biblioteca

// 1 democratizando
const ContextoSection = () => {
  const processSteps = [
    {
      icon: "/heart hands.png",
      title: "Inclusão Necessária",
      description:
        "O Brasil possui milhões de pessoas com deficiências que impactam a fala. Nosso foco é transformar o cenário de exclusão em participação ativa na sociedade.",
    },
    {
      icon: "/Growth Chart.png",
      title: "Evolução da CAA",
      description:
        "Substituímos métodos físicos limitados e caros (como pranchas de papel) por uma solução digital de Comunicação Aumentativa e Alternativa (CAA) moderna.",
    },
    {
      icon: "/Artificial Intelligence.png",
      title: "IA e Acessibilidade",
      description:
        "Preenchemos a lacuna tecnológica atual integrando Inteligência Artificial para criar uma ferramenta personalizada, intuitiva e, acima de tudo, gratuita.",
    },
    {
      icon: "/Account.png",
      title: "Impacto no Desenvolvimento",
      description:
        "Ferramentas eficazes de CAA potencializam a escolarização, a independência e a convivência familiar, transformando a qualidade de vida do usuário.",
    },
  ];

  return (
    <section
      id="sobre"
      className="w-full bg-background py-[120px] px-8"
      aria-label="Contexto"
    >
      <div className="max-w-[1200px] mx-auto flex flex-col gap-16">
        {/* Header */}
        <div className="flex flex-col gap-4 items-start text-left">
          <div className="flex items-center gap-2">
              <span className="w-8 h-px bg-foreground opacity-40 inline-block" />
              <span className="font-body font-normal tracking-[1.62px] text-foreground opacity-60 uppercase">
                Contexto
              </span>
              <span className="w-8 h-px bg-foreground opacity-40 inline-block" />
            </div>
          <h2 className="font-subtitle font-normal tracking-[-1.2px] leading-[90%] text-foreground max-w-[560px]">
            Democratizando a Comunicação Assistiva.
          </h2>
          <p className="font-body">O ALT-CHAT utiliza inteligência artificial para romper barreiras e oferecer dignidade a pessoas não-verbais.</p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {processSteps.map((step, index) => (
            <div key={step.icon} className="flex flex-col gap-4 relative">
              
              <div className="relative z-10 w-12 h-12 rounded-full bg-foreground flex items-center justify-center">
                <span className="font-normal text-background">
                  <img src={step.icon} alt={step.icon} className="icon-adaptive"/>
                </span>
              </div>
              <h3 className="font-body font-normal tracking-[-1.2px] leading-[90%] text-foreground">
                {step.title}
              </h3>
              <p className="font-body font-normal tracking-[-0.075px] leading-[140%] text-neutral">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// 2 o futuro
const ObjetivosSection = () => {
  const objetivos = [
    {
      id: "01",
      texto:
        "Oferecer uma biblioteca completa de pictogramas digitais 100% gratuita, eliminando o custo como obstáculo à inclusão.",
    },
    {
      id: "02",
      texto:
        "Reduzir em pelo menos 30% o tempo de construção de mensagens através de um sistema inteligente de sugestões.",
    },
    {
      id: "03",
      texto:
        "Fornecer suporte tecnológico para que alunos não-verbais superem barreiras em ambientes estruturados para pessoas típicas.",
    },
    {
      id: "04",
      texto:
        "Estabelecer a base para geração de relatórios de evolução, conectando usuários, pais e terapeutas em uma só rede.",
    },
  ];

  return (
    <section
      className="w-full bg-background py-[120px] px-8"
      aria-label="Objetivos"
    >
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left */}
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <span className="w-8 h-px bg-foreground opacity-40 inline-block" />
            <span className="font-body font-normal tracking-[1.62px] text-foreground opacity-60 uppercase">
              Objetivos
            </span>
            <span className="w-8 h-px bg-foreground opacity-40 inline-block" />
          </div>

          <h2 className="font-subtitle font-normal tracking-[-1.2px] leading-[90%] text-foreground">
            O Futuro da Autonomia
          </h2>

          <p className="font-body font-normal tracking-[-0.075px] leading-[140%] text-neutral">
            O ALT-CHAT combina IA preditiva e acessibilidade para transformar a comunicação de pessoas não-verbais em uma experiência ágil e digna.
          </p>

          {/* Lista de Objetivos */}
          <div className="flex flex-col w-full border-t border-foreground/5"> {/* Linha superior da lista */}
            {objetivos.map((obj) => (
              <div
                key={obj.id}
                className="grid grid-cols-[50px_1fr] items-start gap-6 py-8 border-b border-foreground/5" // Linhas divisórias sutis
              >
                {/* Número (01, 02...) à esquerda */}
                <span className="font-body font-normal text-neutral mt-1">
                  {obj.id}
                </span>

                {/* Texto do objetivo */}
                <p className="font-body font-normal leading-[160%] text-foreground">
                  {obj.texto}
                </p>
              </div>
            ))}
          </div>

        </div>

        {/* Right - Visual */}
        <div className="relative">
          <div className="w-full aspect-square max-w-[480px] mx-auto relative">
            {/* Main card */}
            <div className="absolute inset-0 bg-background rounded-3xl overflow-hidden">
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-10">
                <div className="w-96 h-20 rounded-full bg-foreground flex items-center justify-center">
                  <span className="text-foreground">
                    <Link
                      href="https://storyset.com/online"
                      target="_blank" // Abre em nova aba (opcional)
                    >
                      <img src="/Archery-bro.png" alt="Arquery-bro.png" className="w-96 h-auto"/>
                    </Link>
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

// 3 por que escolher
const FuncionalidadesSection = () => {
  const services = [
    {
      label: "IA Preditiva (Redução de 30% no tempo)",
      altChat: true,
      digital: "Sem sugestões inteligentes",
      fisica: "Totalmente manual",
    },
    {
      label: "100% Gratuito e Acessível",
      altChat: true,
      digital: "Assinaturas caras/limitadas",
      fisica: "Custo alto de impressão e material",
    },
    {
      label: "Temas visuais e pictogramas próprios",
      altChat: true,
      digital: "Customização restrita",
      fisica: "Estética e difícil de adaptar",
    },
    {
      label: "Modo Aprendizado com conquistas",
      altChat: true,
      digital: "Focado apenas em comunicação",
      fisica: "Sem feedback de aprendizado",
    },
    {
      label: "Evolução clínica e de uso",
      altChat: true,
      digital: "Sem análise de dados",
      fisica: "Registro manual e impreciso",
    },
    {
      label: "Construção de frases inteligente",
      altChat: true,
      digital: "Busca manual por categorias",
      fisica: "Lentidão por volume físico",
    },
  ];

  return (
    <section
      className="w-full bg-background py-[120px] px-8"
      aria-label="Funcionalidades"
    >
      <div className="max-w-[1200px] mx-auto flex flex-col gap-16">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="w-8 h-px bg-foreground opacity-40 inline-block" />
              <span className="font-body font-normal tracking-[1.62px] text-foreground opacity-60 uppercase">
                Funcionalidades
              </span>
              <span className="w-8 h-px bg-foreground opacity-40 inline-block" />
            </div>
            <h2 className="font-subtitle font-normal tracking-[-1.2px] leading-[90%] text-foreground max-w-[480px]">
              Por que escolher o ALT-CHAT?
            </h2>
          </div>
          <p className="font-body font-normal tracking-[-0.075px] leading-[140%] text-foreground max-w-[360px]">
            Unimos um ecossistema tecnológico robusto (Python, React, Node) a uma interface humana para criar a ferramenta de CAA mais completa do mercado.
          </p>
        </div>

        {/* Services Grid */}
        <div className="w-full overflow-x-auto py-10">
          <table className="w-full border-collapse min-w-[800px]">
            <thead>
              <tr className="text-[12px] uppercase tracking-widest text-neutral-400">
                <th className="pb-8 px-6 text-center w-[35%]">
                  <span className="text-[24px] text-foreground font-normal normal-case tracking-normal">ALT-CHAT</span>
                </th>
                <th className="pb-8 px-6 font-normal">Soluções Digitais Comuns</th>
                <th className="pb-8 px-6 font-normal">Pranchas Físicas</th>
              </tr>
            </thead>
            <tbody>
              {services.map((row, index) => (
                <tr key={index} className="border-t border-neutral/5">
                  {/* Coluna ALT-CHAT com destaque */}
                  <td className="relative px-6 py-6">
                    <div className={`absolute inset-y-0 inset-x-2 bg-primary z-0
                      /* Se for a primeira linha (índice 0), arredonda o topo */
                      ${index === 0 ? 'rounded-t-2xl' : ''}
                      /* Se for a ultima, arredonda*/
                      ${index === services.length - 1 ? 'rounded-b-2xl shadow-sm' : ''}
                    `}></div>
                    <div className="relative z-10 flex items-center gap-3 text-[14px] font-medium text-background">
                      <span className="text-green-700">✓</span>
                      {row.label}
                    </div>
                  </td>

                  {/* Coluna Digital */}
                  <td className="px-8 py-6 text-[13px] text-neutral-600">
                    <div className="flex items-center gap-3">
                      <span className="opacity-40">×</span>
                      {row.digital}
                    </div>
                  </td>

                  {/* Coluna Física */}
                  <td className="px-8 py-6 text-[13px] text-neutral-600">
                    <div className="flex items-center gap-3">
                      <span className="opacity-40">×</span>
                      {row.fisica}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

// 4 mary pat
const CitacaoSection = () => {
  return (
    <section
      className="w-full bg-background py-[120px] px-8"
      aria-label="Citacao"
    >
      <div className="max-w-[1200px] mx-auto flex flex-col gap-12">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6">
          <img src="/Mary Pat.png" alt="Mary Pat.png" className="rounded-2xl w-full h-auto object-cover"/>
          <div>
            <h2 className="font-subtitle font-normal tracking-[-1.2px] leading-[90%] text-foreground">
              "Para a maioria das pessoas, a tecnologia torna as coisas mais fáceis. Para as pessoas com deficiência, a tecnologia torna as coisas possíveis."
            </h2>
            <br />
            <p>Mary Pat Radabaugh</p>
            <p className="font-body text-neutral">
              Pioneira em tecnologia assistiva da IBM
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// <Contato/>
// <Footer/>


export const Box = (): JSX.Element => {
  return (
    <div className="w-full min-h-screen bg-background">
      <NavBar/>
      <main>
        <HeroSection />
        <ContextoSection />
        <ObjetivosSection />
        <FuncionalidadesSection />
        <CitacaoSection />
        <Contato/>
      </main>
      <Footer />
    </div>
  );
};

export default Box;
