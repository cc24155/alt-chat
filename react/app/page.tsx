"use client";
import { JSX, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Navigation from "../app/components/Navigation";
import Button from "../app/components/Button";
import Contato from "../app/components/Contato";
import Footer from "../app/components/Footer";


//<Navigation />

const NavBar = () => {
  return(
    <div className="flex justify-center mt-10 fixed top-0 left-0 w-full z-50 transition-all duration-300">
      <div className="flex gap-8 bg-foreground/10 px-8 py-3 rounded-full">
        <a href="#biblioteca" className="text-preto font-medium">
          Biblioteca
        </a>
        <a href="#sobre" className="text-preto font-medium">
          Sobre
        </a>
        <a href="#contato" className="text-preto font-medium">
          Contato
        </a>
      </div>
    </div>
  )
}

const Botoes = () => {
  const router = useRouter();
  return (
    <div className="flex justify-end p-6 fixed top-0 left-0 w-full z-50 transition-all duration-300">
      <Button text="Login" onClick={() => router.push("/Login")}/>
      <Button text="Cadastro" onClick={() => router.push("/Cadastro")}/>
    </div>
  );
}

// 0 biblioteca
const BibliotecaSection = () => {
  return (
    <section
      id="biblioteca"
      className="relative w-full min-h-screen bg-off-white flex flex-col items-center justify-center overflow-hidden pt-[72px]"
      aria-label="Seção principal"
    >
      <div className="relative z-10 max-w-[1200px] mx-auto px-8 flex flex-col items-center text-center gap-8">
        {/* Título */}
        <h1 className="[font-family:'Victor_Mono',Helvetica] text-[clamp(48px,7vw,70px)] font-normal tracking-[-0.7px] leading-[80%] text-preto max-w-[900px]">
          ALT-CHAT
        </h1>

        {/* Subtítulo */}
        <p className="[font-family:'DM_Sans',Helvetica] text-[15px] font-normal tracking-[-0.075px] leading-[140%] text-[rgba(0,0,0,0.6)] max-w-[560px]">
          PESQUISE QUALQUER PICTOGRAMA
        </p>

        {/* Botões */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#servicos"
            className="flex items-center justify-center px-7 py-3.5 border border-[rgba(0,0,0,0.2)] rounded-full [font-family:'DM_Sans',Helvetica] text-[14px] font-bold tracking-[-0.35px] text-preto no-underline hover:border-[rgba(0,0,0,0.5)] transition-colors"
          >
            Nossos Serviços
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="[font-family:'Abel',Helvetica] text-[12px] tracking-[1.62px] text-[rgba(0,0,0,0.4)] uppercase">
          Scroll
        </span>
        <svg
          width="16"
          height="24"
          viewBox="0 0 16 24"
          fill="none"
          aria-hidden="true"
        >
          <rect
            x="1"
            y="1"
            width="14"
            height="22"
            rx="7"
            stroke="rgba(0,0,0,0.3)"
            strokeWidth="1.5"
          />
          <rect
            x="7"
            y="5"
            width="2"
            height="5"
            rx="1"
            fill="rgba(0,0,0,0.4)"
          />
        </svg>
      </div>
    </section>
  );
};

// 1 democratizando 
const processSteps = [
  {
    number: "01",
    title: "Inclusão Necessária",
    description:
      "O Brasil possui milhões de pessoas com deficiências que impactam a fala. Nosso foco é transformar o cenário de exclusão em participação ativa na sociedade.",
  },
  {
    number: "02",
    title: "Evolução da CAA",
    description:
      "Substituímos métodos físicos limitados e caros (como pranchas de papel) por uma solução digital de Comunicação Aumentativa e Alternativa (CAA) moderna.",
  },
  {
    number: "03",
    title: "IA e Acessibilidade",
    description:
      "Preenchemos a lacuna tecnológica atual integrando Inteligência Artificial para criar uma ferramenta personalizada, intuitiva e, acima de tudo, gratuita.",
  },
  {
    number: "04",
    title: "Impacto no Desenvolvimento",
    description:
      "Ferramentas eficazes de CAA potencializam a escolarização, a independência e a convivência familiar, transformando a qualidade de vida do usuário.",
  },
];
const ContextoSection = () => {
  return (
    <section
      id="sobre"
      className="w-full bg-rosinha py-[120px] px-8"
      aria-label="Nosso processo"
    >
      <div className="max-w-[1200px] mx-auto flex flex-col gap-16">
        {/* Header */}
        <div className="flex flex-col gap-4 items-center text-center">
          <div className="flex items-center gap-2">
            <span className="w-8 h-px bg-preto opacity-40 inline-block" />
            <span className="[font-family:'Abel',Helvetica] text-[18px] font-normal tracking-[1.62px] text-preto uppercase">
              Contexto
            </span>
            <span className="w-8 h-px bg-preto opacity-40 inline-block" />
          </div>
          <h2 className="[font-family:'Afacad',Helvetica] text-[40px] font-normal tracking-[-1.2px] leading-[90%] text-preto max-w-[560px]">
            Democratizando a Comunicação Assistiva.
          </h2>
          <p>O ALT-CHAT utiliza inteligência artificial para romper barreiras e oferecer dignidade a pessoas não-verbais.</p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {processSteps.map((step, index) => (
            <div key={step.number} className="flex flex-col gap-4 relative">
              {/* Connector line */}
              {index < processSteps.length - 1 && (
                <div className="hidden lg:block absolute top-6 left-[calc(100%+16px)] w-[calc(100%-32px)] h-px bg-[rgba(0,0,0,0.15)] z-0" />
              )}
              <div className="relative z-10 w-12 h-12 rounded-full bg-preto flex items-center justify-center">
                <span className="[font-family:'Victor_Mono',Helvetica] text-[14px] font-normal text-off-white">
                  {step.number}
                </span>
              </div>
              <h3 className="[font-family:'Afacad',Helvetica] text-[24px] font-normal tracking-[-1.2px] leading-[90%] text-preto">
                {step.title}
              </h3>
              <p className="[font-family:'DM_Sans',Helvetica] text-[14px] font-normal tracking-[-0.075px] leading-[140%] text-[rgba(0,0,0,0.6)]">
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
  return (
    <section
      className="w-full bg-off-white py-[120px] px-8"
      aria-label="Sobre nós"
    >
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left */}
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <span className="w-8 h-px bg-preto inline-block" />
          </div>

          <h2 className="[font-family:'Afacad',Helvetica] text-[40px] font-normal tracking-[-1.2px] leading-[90%] text-preto">
            O Futuro da Autonomia
          </h2>

          <p className="[font-family:'DM_Sans',Helvetica] text-[15px] font-normal tracking-[-0.075px] leading-[140%] text-[rgba(0,0,0,0.65)]">
            O ALT-CHAT combina IA preditiva e acessibilidade para transformar a comunicação de pessoas não-verbais em uma experiência ágil e digna.
          </p>

          <p className="[font-family:'DM_Sans',Helvetica] text-[15px] font-normal tracking-[-0.075px] leading-[140%] text-[rgba(0,0,0,0.65)]">
            Oferecer uma biblioteca completa de pictogramas digitais 100% gratuita, eliminando o custo como obstáculo à inclusão.
          </p>

          <p className="[font-family:'DM_Sans',Helvetica] text-[15px] font-normal tracking-[-0.075px] leading-[140%] text-[rgba(0,0,0,0.65)]">
            Reduzir em pelo menos 30% o tempo de construção de mensagens através de um sistema inteligente de sugestões.
          </p>

          <p className="[font-family:'DM_Sans',Helvetica] text-[15px] font-normal tracking-[-0.075px] leading-[140%] text-[rgba(0,0,0,0.65)]">
            Fornecer suporte tecnológico para que alunos não-verbais superem barreiras em ambientes estruturados para pessoas típicas.
          </p>

          <p className="[font-family:'DM_Sans',Helvetica] text-[15px] font-normal tracking-[-0.075px] leading-[140%] text-[rgba(0,0,0,0.65)]">
            Estabelecer a base para geração de relatórios de evolução, conectando usuários, pais e terapeutas em uma só rede.
          </p>

        </div>

        {/* Right - Visual */}
        <div className="relative">
          <div className="w-full aspect-square max-w-[480px] mx-auto relative">
            {/* Main card */}
            <div className="absolute inset-0 bg-azul-claro rounded-3xl overflow-hidden">
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-10">
                <div className="w-96 h-20 rounded-full bg-[rgba(255,255,255,0.4)] flex items-center justify-center">
                  <span className="[font-family:'Victor_Mono',Helvetica] text-[32px] text-preto">
                    <img src="/Archery-bro.png" alt="Arquery-bro.png" className="w-96 h-auto"/>
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
const services = [
  {
    id: 1,
    icon: "✦",
    title: "ALT-CHAT",
    description:
      "Criamos experiências digitais centradas no usuário, com foco em usabilidade, estética e resultados mensuráveis para o seu negócio.",
    tag: "UX/UI",
  },
  {
    id: 2,
    icon: "◈",
    title: "Soluções Digitais Comuns",
    description:
      "Desenvolvemos aplicações web modernas, performáticas e escaláveis utilizando as tecnologias mais avançadas do mercado.",
    tag: "DEV",
  },
  {
    id: 3,
    icon: "⬡",
    title: "Pranchas Físicas",
    description:
      "Construímos marcas memoráveis que comunicam os valores da sua empresa e criam conexões emocionais com o público.",
    tag: "BRAND",
  }
];
const FuncionalidadesSection = () => {
  return (
    <section
      className="w-full bg-preto py-[120px] px-8"
      aria-label="Serviços"
    >
      <div className="max-w-[1200px] mx-auto flex flex-col gap-16">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="w-8 h-px bg-off-white opacity-40 inline-block" />
              <span className="[font-family:'Abel',Helvetica] text-[18px] font-normal tracking-[1.62px] text-off-white opacity-60 uppercase">
                Funcionalidades
              </span>
            </div>
            <h2 className="[font-family:'Afacad',Helvetica] text-[40px] font-normal tracking-[-1.2px] leading-[90%] text-off-white max-w-[480px]">
              Por que escolher o ALT-CHAT?
            </h2>
          </div>
          <p className="[font-family:'DM_Sans',Helvetica] text-[15px] font-normal tracking-[-0.075px] leading-[140%] text-[rgba(248,244,235,0.55)] max-w-[360px]">
            Unimos um ecossistema tecnológico robusto (Python, React, Node) a uma interface humana para criar a ferramenta de CAA mais completa do mercado.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[rgba(255,255,255,0.08)] rounded-2xl overflow-hidden">
          {services.map((service) => (
            <article
              key={service.id}
              className="bg-preto p-10 flex flex-col gap-6 group hover:bg-[rgba(255,255,255,0.03)] transition-colors cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <span className="text-[32px] text-azul-claro">
                  {service.icon}
                </span>
                <span className="[font-family:'Abel',Helvetica] text-[12px] font-normal tracking-[1.62px] text-[rgba(248,244,235,0.3)] uppercase border border-[rgba(255,255,255,0.1)] rounded-full px-3 py-1">
                  {service.tag}
                </span>
              </div>
              <h3 className="[font-family:'Afacad',Helvetica] text-[28px] font-normal tracking-[-1.2px] leading-[90%] text-off-white">
                {service.title}
              </h3>
              <p className="[font-family:'DM_Sans',Helvetica] text-[15px] font-normal tracking-[-0.075px] leading-[140%] text-[rgba(248,244,235,0.55)]">
                {service.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

// 4 mary pat
const CitacaoSection = () => {
  const [activeFilter, setActiveFilter] = useState("Todos");
  const filters = ["Todos", "Design", "Dev", "Branding"];

  return (
    <section
      className="w-full bg-off-white py-[120px] px-8"
      aria-label="Portfólio"
    >
      <div className="max-w-[1200px] mx-auto flex flex-col gap-12">
        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <img src="/Mary Pat.png" alt="Mary Pat.png" />
          <div>
            <h2 className="[font-family:'Afacad',Helvetica] text-[40px] font-normal tracking-[-1.2px] leading-[90%] text-preto">
              "Para a maioria das pessoas, a tecnologia torna as coisas mais fáceis. Para as pessoas com deficiência, a tecnologia torna as coisas possíveis."
            </h2>
            <p>Mary Pat Radabaugh</p>
            <p>Pioneira em tecnologia assistiva da IBM</p>
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
    <div className="w-full min-h-screen bg-off-white">
      <Navigation/>
      <NavBar/>
      <Botoes/>
      <main>
        <BibliotecaSection />
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
