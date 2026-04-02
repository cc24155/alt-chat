"use client";
import { JSX, useEffect, useState } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────

const navLinks = [
  { label: "Início", href: "#inicio" },
  { label: "Sobre", href: "#sobre" },
  { label: "Serviços", href: "#servicos" },
  { label: "Portfólio", href: "#portfolio" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "Contato", href: "#contato" },
];

const services = [
  {
    id: 1,
    icon: "✦",
    title: "Design de Produto",
    description:
      "Criamos experiências digitais centradas no usuário, com foco em usabilidade, estética e resultados mensuráveis para o seu negócio.",
    tag: "UX/UI",
  },
  {
    id: 2,
    icon: "◈",
    title: "Desenvolvimento Web",
    description:
      "Desenvolvemos aplicações web modernas, performáticas e escaláveis utilizando as tecnologias mais avançadas do mercado.",
    tag: "DEV",
  },
  {
    id: 3,
    icon: "⬡",
    title: "Branding & Identidade",
    description:
      "Construímos marcas memoráveis que comunicam os valores da sua empresa e criam conexões emocionais com o público.",
    tag: "BRAND",
  },
  {
    id: 4,
    icon: "◎",
    title: "Estratégia Digital",
    description:
      "Desenvolvemos estratégias digitais completas para posicionar sua marca no mercado e alcançar seus objetivos de negócio.",
    tag: "STRATEGY",
  },
];

const portfolioItems = [
  {
    id: 1,
    title: "Plataforma Financeira",
    category: "Design + Dev",
    year: "2024",
    color: "bg-azul-claro",
    size: "large",
  },
  {
    id: 2,
    title: "App de Saúde",
    category: "UX/UI Design",
    year: "2024",
    color: "bg-rosinha",
    size: "small",
  },
  {
    id: 3,
    title: "E-commerce Premium",
    category: "Branding + Dev",
    year: "2023",
    color: "bg-[rgba(241,141,4,0.2)]",
    size: "small",
  },
  {
    id: 4,
    title: "Sistema de Gestão",
    category: "Design + Dev",
    year: "2023",
    color: "bg-[rgba(63,142,155,0.2)]",
    size: "large",
  },
];

const testimonials = [
  {
    id: 1,
    name: "Ana Rodrigues",
    role: "CEO, TechStart",
    text: "A equipe superou todas as nossas expectativas. O produto final foi entregue no prazo, dentro do orçamento e com uma qualidade excepcional. Recomendo fortemente.",
    avatar: "AR",
    color: "bg-azul-claro",
  },
  {
    id: 2,
    name: "Carlos Mendes",
    role: "Diretor de Marketing, Grupo Alfa",
    text: "Trabalhar com essa equipe foi transformador para nossa marca. A identidade visual criada capturou perfeitamente nossa essência e elevou nossa presença no mercado.",
    avatar: "CM",
    color: "bg-rosinha",
  },
  {
    id: 3,
    name: "Fernanda Lima",
    role: "Fundadora, EduTech",
    text: "Profissionalismo, criatividade e comprometimento. Nossa plataforma educacional ficou incrível e os usuários adoraram a nova experiência. Parceria de longo prazo garantida.",
    avatar: "FL",
    color: "bg-[rgba(241,141,4,0.3)]",
  },
];

const stats = [
  { value: "150+", label: "Projetos Entregues" },
  { value: "98%", label: "Clientes Satisfeitos" },
  { value: "8+", label: "Anos de Experiência" },
  { value: "40+", label: "Especialistas" },
];

const processSteps = [
  {
    number: "01",
    title: "Descoberta",
    description:
      "Entendemos profundamente seu negócio, seus objetivos e seu público-alvo para criar soluções verdadeiramente eficazes.",
  },
  {
    number: "02",
    title: "Estratégia",
    description:
      "Desenvolvemos um plano detalhado com metas claras, cronograma definido e metodologia comprovada.",
  },
  {
    number: "03",
    title: "Criação",
    description:
      "Nossa equipe multidisciplinar trabalha em conjunto para criar soluções inovadoras e de alta qualidade.",
  },
  {
    number: "04",
    title: "Entrega",
    description:
      "Lançamos o projeto com suporte completo, garantindo uma transição suave e resultados imediatos.",
  },
];

const techStack = [
  "React",
  "TypeScript",
  "Node.js",
  "Figma",
  "Next.js",
  "Tailwind",
  "GraphQL",
  "AWS",
  "React",
  "TypeScript",
  "Node.js",
  "Figma",
  "Next.js",
  "Tailwind",
  "GraphQL",
  "AWS",
];

// ─── Components ──────────────────────────────────────────────────────────────

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[rgba(248,244,235,0.95)] backdrop-blur-sm shadow-sombra"
          : "bg-transparent"
      }`}
      role="navigation"
      aria-label="Navegação principal"
    >
      <div className="max-w-[1440px] mx-auto px-8 h-[72px] flex items-center justify-between">
        {/* Logo */}
        <a
          href="#inicio"
          className="flex items-center gap-2 no-underline"
          aria-label="Ir para o início"
        >
          <div className="w-8 h-8 bg-preto rounded-sm flex items-center justify-center">
            <span className="text-off-white text-xs font-bold [font-family:'Victor_Mono',Helvetica]">
              A
            </span>
          </div>
          <span className="[font-family:'Victor_Mono',Helvetica] text-[18px] font-normal tracking-[-0.5px] text-preto">
            anima.
          </span>
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

        {/* CTA */}
        <a
          href="#contato"
          className="hidden md:flex items-center justify-center px-5 py-2.5 bg-preto rounded-full [font-family:'DM_Sans',Helvetica] text-[14px] font-bold tracking-[-0.35px] text-off-white no-underline hover:bg-[rgba(0,0,0,0.8)] transition-colors"
        >
          Fale Conosco
        </a>

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
          <a
            href="#contato"
            className="mt-2 flex items-center justify-center px-5 py-3 bg-preto rounded-full [font-family:'DM_Sans',Helvetica] text-[14px] font-bold tracking-[-0.35px] text-off-white no-underline"
            onClick={() => setMenuOpen(false)}
          >
            Fale Conosco
          </a>
        </div>
      )}
    </nav>
  );
};

const HeroSection = () => {
  return (
    <section
      id="inicio"
      className="relative w-full min-h-screen bg-off-white flex flex-col items-center justify-center overflow-hidden pt-[72px]"
      aria-label="Seção principal"
    >
      {/* Background decorative elements */}
      <div className="absolute top-[15%] right-[8%] w-[320px] h-[320px] rounded-full bg-azul-claro opacity-30 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[5%] w-[280px] h-[280px] rounded-full bg-rosinha opacity-40 blur-[60px] pointer-events-none" />
      <div className="absolute top-[40%] left-[50%] w-[200px] h-[200px] rounded-full bg-[rgba(241,141,4,0.15)] blur-[50px] pointer-events-none" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-8 flex flex-col items-center text-center gap-8">
        {/* Tag */}
        <div className="flex items-center gap-2 px-4 py-2 bg-[rgba(0,0,0,0.05)] rounded-full">
          <span className="w-2 h-2 rounded-full bg-azul-escuro inline-block" />
          <span className="[font-family:'Abel',Helvetica] text-[14px] font-normal tracking-[1.62px] text-preto uppercase">
            Estúdio de Design & Tecnologia
          </span>
        </div>

        {/* Headline */}
        <h1 className="[font-family:'Victor_Mono',Helvetica] text-[clamp(48px,7vw,70px)] font-normal tracking-[-0.7px] leading-[80%] text-preto max-w-[900px]">
          Criamos produtos
          <br />
          <em className="not-italic text-azul-escuro">digitais</em> que
          <br />
          transformam negócios.
        </h1>

        {/* Subheadline */}
        <p className="[font-family:'DM_Sans',Helvetica] text-[15px] font-normal tracking-[-0.075px] leading-[140%] text-[rgba(0,0,0,0.6)] max-w-[560px]">
          Somos um estúdio especializado em design de produto e desenvolvimento
          web. Transformamos ideias complexas em experiências digitais simples,
          belas e eficazes.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#portfolio"
            className="flex items-center justify-center px-7 py-3.5 bg-preto rounded-full [font-family:'DM_Sans',Helvetica] text-[14px] font-bold tracking-[-0.35px] text-off-white no-underline hover:bg-[rgba(0,0,0,0.8)] transition-colors"
          >
            Ver Portfólio
          </a>
          <a
            href="#servicos"
            className="flex items-center justify-center px-7 py-3.5 border border-[rgba(0,0,0,0.2)] rounded-full [font-family:'DM_Sans',Helvetica] text-[14px] font-bold tracking-[-0.35px] text-preto no-underline hover:border-[rgba(0,0,0,0.5)] transition-colors"
          >
            Nossos Serviços
          </a>
        </div>

        {/* Stats row */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-12">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1">
              <span className="[font-family:'Afacad',Helvetica] text-[40px] font-normal tracking-[-1.2px] leading-[90%] text-preto">
                {stat.value}
              </span>
              <span className="[font-family:'DM_Sans',Helvetica] text-[13px] font-normal tracking-[-0.075px] text-[rgba(0,0,0,0.5)]">
                {stat.label}
              </span>
            </div>
          ))}
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

const MarqueeSection = () => {
  return (
    <section
      className="w-full bg-preto py-5 overflow-hidden"
      aria-label="Tecnologias"
    >
      <div
        className="flex gap-12 animate-marquee whitespace-nowrap"
        style={{ "--duration": "20s", "--gap": "3rem" } as React.CSSProperties}
      >
        {techStack.map((tech, i) => (
          <span
            key={i}
            className="[font-family:'Abel',Helvetica] text-[18px] font-normal tracking-[1.62px] text-off-white opacity-70 uppercase shrink-0"
          >
            {tech}
            <span className="ml-12 text-azul-claro opacity-50">✦</span>
          </span>
        ))}
      </div>
    </section>
  );
};

const AboutSection = () => {
  return (
    <section
      id="sobre"
      className="w-full bg-off-white py-[120px] px-8"
      aria-label="Sobre nós"
    >
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left */}
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <span className="w-8 h-px bg-preto inline-block" />
            <span className="[font-family:'Abel',Helvetica] text-[18px] font-normal tracking-[1.62px] text-preto uppercase">
              Sobre Nós
            </span>
          </div>

          <h2 className="[font-family:'Afacad',Helvetica] text-[40px] font-normal tracking-[-1.2px] leading-[90%] text-preto">
            Uma equipe apaixonada por criar o extraordinário.
          </h2>

          <p className="[font-family:'DM_Sans',Helvetica] text-[15px] font-normal tracking-[-0.075px] leading-[140%] text-[rgba(0,0,0,0.65)]">
            Fundada em 2016, somos um estúdio boutique que combina design
            estratégico com engenharia de ponta. Nossa abordagem é simples:
            entender profundamente o problema antes de criar qualquer solução.
          </p>

          <p className="[font-family:'DM_Sans',Helvetica] text-[15px] font-normal tracking-[-0.075px] leading-[140%] text-[rgba(0,0,0,0.65)]">
            Acreditamos que o melhor design é aquele que você não percebe — ele
            simplesmente funciona, guia e encanta. Cada pixel, cada interação,
            cada linha de código é pensada para criar valor real.
          </p>

          <a
            href="#contato"
            className="self-start flex items-center gap-2 [font-family:'DM_Sans',Helvetica] text-[14px] font-bold tracking-[-0.35px] text-preto no-underline group"
          >
            Conheça nossa história
            <span className="inline-block transition-transform group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>

        {/* Right - Visual */}
        <div className="relative">
          <div className="w-full aspect-square max-w-[480px] mx-auto relative">
            {/* Main card */}
            <div className="absolute inset-0 bg-azul-claro rounded-3xl overflow-hidden">
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-10">
                <div className="w-20 h-20 rounded-full bg-[rgba(255,255,255,0.4)] flex items-center justify-center">
                  <span className="[font-family:'Victor_Mono',Helvetica] text-[32px] text-preto">
                    ✦
                  </span>
                </div>
                <span className="[font-family:'Afacad',Helvetica] text-[28px] font-normal tracking-[-1.2px] leading-[90%] text-preto text-center">
                  Design com propósito, código com precisão.
                </span>
              </div>
            </div>

            {/* Floating badge 1 */}
            <div className="absolute -top-4 -right-4 bg-preto text-off-white rounded-2xl px-4 py-3 shadow-sombra">
              <span className="[font-family:'DM_Sans',Helvetica] text-[13px] font-bold tracking-[-0.35px]">
                150+ Projetos
              </span>
            </div>

            {/* Floating badge 2 */}
            <div className="absolute -bottom-4 -left-4 bg-off-white rounded-2xl px-4 py-3 shadow-sombra border border-[rgba(0,0,0,0.06)]">
              <span className="[font-family:'DM_Sans',Helvetica] text-[13px] font-bold tracking-[-0.35px] text-preto">
                ⭐ 4.9 / 5.0
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ServicesSection = () => {
  return (
    <section
      id="servicos"
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
                Serviços
              </span>
            </div>
            <h2 className="[font-family:'Afacad',Helvetica] text-[40px] font-normal tracking-[-1.2px] leading-[90%] text-off-white max-w-[480px]">
              Tudo que você precisa para crescer no digital.
            </h2>
          </div>
          <p className="[font-family:'DM_Sans',Helvetica] text-[15px] font-normal tracking-[-0.075px] leading-[140%] text-[rgba(248,244,235,0.55)] max-w-[360px]">
            Oferecemos soluções completas de design e tecnologia para empresas
            que querem se destacar no mercado digital.
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
              <div className="flex items-center gap-2 text-azul-claro [font-family:'DM_Sans',Helvetica] text-[14px] font-bold tracking-[-0.35px] group-hover:gap-3 transition-all">
                Saiba mais <span>→</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProcessSection = () => {
  return (
    <section
      className="w-full bg-rosinha py-[120px] px-8"
      aria-label="Nosso processo"
    >
      <div className="max-w-[1200px] mx-auto flex flex-col gap-16">
        {/* Header */}
        <div className="flex flex-col gap-4 items-center text-center">
          <div className="flex items-center gap-2">
            <span className="w-8 h-px bg-preto opacity-40 inline-block" />
            <span className="[font-family:'Abel',Helvetica] text-[18px] font-normal tracking-[1.62px] text-preto uppercase">
              Processo
            </span>
            <span className="w-8 h-px bg-preto opacity-40 inline-block" />
          </div>
          <h2 className="[font-family:'Afacad',Helvetica] text-[40px] font-normal tracking-[-1.2px] leading-[90%] text-preto max-w-[560px]">
            Como transformamos sua ideia em realidade.
          </h2>
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

const PortfolioSection = () => {
  const [activeFilter, setActiveFilter] = useState("Todos");
  const filters = ["Todos", "Design", "Dev", "Branding"];

  return (
    <section
      id="portfolio"
      className="w-full bg-off-white py-[120px] px-8"
      aria-label="Portfólio"
    >
      <div className="max-w-[1200px] mx-auto flex flex-col gap-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="w-8 h-px bg-preto inline-block" />
              <span className="[font-family:'Abel',Helvetica] text-[18px] font-normal tracking-[1.62px] text-preto uppercase">
                Portfólio
              </span>
            </div>
            <h2 className="[font-family:'Afacad',Helvetica] text-[40px] font-normal tracking-[-1.2px] leading-[90%] text-preto">
              Trabalhos que falam por si.
            </h2>
          </div>

          {/* Filters */}
          <div
            className="flex items-center gap-2 flex-wrap"
            role="group"
            aria-label="Filtros de portfólio"
          >
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full [font-family:'DM_Sans',Helvetica] text-[13px] font-bold tracking-[-0.35px] transition-colors ${
                  activeFilter === filter
                    ? "bg-preto text-off-white"
                    : "bg-[rgba(0,0,0,0.06)] text-preto hover:bg-[rgba(0,0,0,0.1)]"
                }`}
                aria-pressed={activeFilter === filter}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioItems.map((item) => (
            <article
              key={item.id}
              className={`group relative rounded-2xl overflow-hidden cursor-pointer ${item.color} ${
                item.size === "large" ? "md:col-span-2 lg:col-span-1" : ""
              }`}
              style={{ aspectRatio: item.size === "large" ? "4/3" : "1/1" }}
            >
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="[font-family:'Abel',Helvetica] text-[12px] font-normal tracking-[1.62px] text-[rgba(0,0,0,0.5)] uppercase">
                      {item.category}
                    </span>
                    <span className="text-[rgba(0,0,0,0.3)]">·</span>
                    <span className="[font-family:'Abel',Helvetica] text-[12px] font-normal tracking-[1.62px] text-[rgba(0,0,0,0.5)] uppercase">
                      {item.year}
                    </span>
                  </div>
                  <h3 className="[font-family:'Afacad',Helvetica] text-[24px] font-normal tracking-[-1.2px] leading-[90%] text-preto">
                    {item.title}
                  </h3>
                </div>

                {/* Hover arrow */}
                <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-preto flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-y-2 group-hover:translate-y-0">
                  <span className="text-off-white text-sm">↗</span>
                </div>
              </div>

              {/* Decorative pattern */}
              <div className="absolute top-6 left-6 opacity-20">
                <div className="w-16 h-16 border border-preto rounded-full" />
                <div className="w-8 h-8 border border-preto rounded-full absolute top-4 left-4" />
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center">
          <a
            href="#contato"
            className="flex items-center gap-2 px-7 py-3.5 border border-[rgba(0,0,0,0.2)] rounded-full [font-family:'DM_Sans',Helvetica] text-[14px] font-bold tracking-[-0.35px] text-preto no-underline hover:border-[rgba(0,0,0,0.5)] transition-colors"
          >
            Ver todos os projetos →
          </a>
        </div>
      </div>
    </section>
  );
};

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section
      id="depoimentos"
      className="w-full bg-azul-claro py-[120px] px-8"
      aria-label="Depoimentos"
    >
      <div className="max-w-[1200px] mx-auto flex flex-col gap-16">
        {/* Header */}
        <div className="flex flex-col gap-4 items-center text-center">
          <div className="flex items-center gap-2">
            <span className="w-8 h-px bg-preto opacity-40 inline-block" />
            <span className="[font-family:'Abel',Helvetica] text-[18px] font-normal tracking-[1.62px] text-preto uppercase">
              Depoimentos
            </span>
            <span className="w-8 h-px bg-preto opacity-40 inline-block" />
          </div>
          <h2 className="[font-family:'Afacad',Helvetica] text-[40px] font-normal tracking-[-1.2px] leading-[90%] text-preto max-w-[480px]">
            O que nossos clientes dizem.
          </h2>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <article
              key={testimonial.id}
              className={`bg-off-white rounded-2xl p-8 flex flex-col gap-6 cursor-pointer transition-all duration-300 ${
                activeIndex === index
                  ? "shadow-sombra scale-[1.02]"
                  : "hover:shadow-sombra"
              }`}
              onClick={() => setActiveIndex(index)}
              aria-selected={activeIndex === index}
            >
              {/* Quote */}
              <span className="[font-family:'Victor_Mono',Helvetica] text-[48px] text-azul-escuro leading-none">
                "
              </span>

              <p className="[font-family:'DM_Sans',Helvetica] text-[15px] font-normal tracking-[-0.075px] leading-[140%] text-[rgba(0,0,0,0.7)] flex-1">
                {testimonial.text}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full ${testimonial.color} flex items-center justify-center`}
                >
                  <span className="[font-family:'DM_Sans',Helvetica] text-[12px] font-bold text-preto">
                    {testimonial.avatar}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="[font-family:'DM_Sans',Helvetica] text-[14px] font-bold tracking-[-0.35px] text-preto">
                    {testimonial.name}
                  </span>
                  <span className="[font-family:'DM_Sans',Helvetica] text-[12px] font-normal tracking-[-0.075px] text-[rgba(0,0,0,0.5)]">
                    {testimonial.role}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Dots */}
        <div
          className="flex items-center justify-center gap-2"
          role="tablist"
          aria-label="Navegar depoimentos"
        >
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`rounded-full transition-all duration-300 ${
                activeIndex === index
                  ? "w-6 h-2 bg-preto"
                  : "w-2 h-2 bg-[rgba(0,0,0,0.3)] hover:bg-[rgba(0,0,0,0.5)]"
              }`}
              role="tab"
              aria-selected={activeIndex === index}
              aria-label={`Depoimento ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
    service: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Nome é obrigatório";
    if (!formData.email.trim()) {
      newErrors.email = "E-mail é obrigatório";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "E-mail inválido";
    }
    if (!formData.message.trim()) newErrors.message = "Mensagem é obrigatória";
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <section
      id="contato"
      className="w-full bg-preto py-[120px] px-8"
      aria-label="Contato"
    >
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left */}
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <span className="w-8 h-px bg-off-white opacity-40 inline-block" />
            <span className="[font-family:'Abel',Helvetica] text-[18px] font-normal tracking-[1.62px] text-off-white opacity-60 uppercase">
              Contato
            </span>
          </div>

          <h2 className="[font-family:'Afacad',Helvetica] text-[40px] font-normal tracking-[-1.2px] leading-[90%] text-off-white">
            Vamos criar algo incrível juntos?
          </h2>

          <p className="[font-family:'DM_Sans',Helvetica] text-[15px] font-normal tracking-[-0.075px] leading-[140%] text-[rgba(248,244,235,0.55)]">
            Estamos sempre abertos a novos projetos e parcerias. Conte-nos sobre
            sua ideia e vamos descobrir como podemos ajudar.
          </p>

          {/* Contact info */}
          <div className="flex flex-col gap-4">
            {[
              { label: "E-mail", value: "oi@anima.studio" },
              { label: "Telefone", value: "+55 (11) 9 9999-9999" },
              { label: "Localização", value: "São Paulo, Brasil" },
            ].map((info) => (
              <div key={info.label} className="flex flex-col gap-1">
                <span className="[font-family:'Abel',Helvetica] text-[12px] font-normal tracking-[1.62px] text-[rgba(248,244,235,0.4)] uppercase">
                  {info.label}
                </span>
                <span className="[font-family:'DM_Sans',Helvetica] text-[15px] font-normal tracking-[-0.075px] text-off-white">
                  {info.value}
                </span>
              </div>
            ))}
          </div>

          {/* Social links */}
          <div className="flex items-center gap-4">
            {["Instagram", "LinkedIn", "Behance", "GitHub"].map((social) => (
              <a
                key={social}
                href="#"
                className="[font-family:'DM_Sans',Helvetica] text-[13px] font-bold tracking-[-0.35px] text-[rgba(248,244,235,0.5)] no-underline hover:text-off-white transition-colors"
                aria-label={`Visitar ${social}`}
              >
                {social}
              </a>
            ))}
          </div>
        </div>

        {/* Right - Form */}
        <div className="bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] rounded-2xl p-8">
          {submitted ? (
            <div className="flex flex-col items-center justify-center gap-6 py-12 text-center">
              <div className="w-16 h-16 rounded-full bg-azul-claro flex items-center justify-center">
                <span className="text-2xl">✓</span>
              </div>
              <h3 className="[font-family:'Afacad',Helvetica] text-[28px] font-normal tracking-[-1.2px] leading-[90%] text-off-white">
                Mensagem enviada!
              </h3>
              <p className="[font-family:'DM_Sans',Helvetica] text-[15px] font-normal tracking-[-0.075px] leading-[140%] text-[rgba(248,244,235,0.55)]">
                Obrigado pelo contato. Retornaremos em até 24 horas.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    name: "",
                    email: "",
                    company: "",
                    message: "",
                    service: "",
                  });
                }}
                className="px-6 py-3 bg-azul-claro rounded-full [font-family:'DM_Sans',Helvetica] text-[14px] font-bold tracking-[-0.35px] text-preto hover:bg-azul-escuro hover:text-off-white transition-colors"
              >
                Enviar outra mensagem
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-5"
              noValidate
              aria-label="Formulário de contato"
            >
              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="name"
                  className="[font-family:'DM_Sans',Helvetica] text-[13px] font-bold tracking-[-0.35px] text-[rgba(248,244,235,0.7)]"
                >
                  Nome *
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Seu nome completo"
                  className={`w-full px-4 py-3 bg-[rgba(255,255,255,0.06)] border rounded-xl [font-family:'DM_Sans',Helvetica] text-[15px] font-normal tracking-[-0.075px] text-off-white placeholder:text-[rgba(248,244,235,0.3)] focus:outline-none focus:border-azul-claro transition-colors ${
                    errors.name
                      ? "border-[rgba(241,141,4,0.8)]"
                      : "border-[rgba(255,255,255,0.1)]"
                  }`}
                  aria-required="true"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name && (
                  <span
                    id="name-error"
                    className="[font-family:'DM_Sans',Helvetica] text-[12px] text-laranja"
                    role="alert"
                  >
                    {errors.name}
                  </span>
                )}
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="email"
                  className="[font-family:'DM_Sans',Helvetica] text-[13px] font-bold tracking-[-0.35px] text-[rgba(248,244,235,0.7)]"
                >
                  E-mail *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="seu@email.com"
                  className={`w-full px-4 py-3 bg-[rgba(255,255,255,0.06)] border rounded-xl [font-family:'DM_Sans',Helvetica] text-[15px] font-normal tracking-[-0.075px] text-off-white placeholder:text-[rgba(248,244,235,0.3)] focus:outline-none focus:border-azul-claro transition-colors ${
                    errors.email
                      ? "border-[rgba(241,141,4,0.8)]"
                      : "border-[rgba(255,255,255,0.1)]"
                  }`}
                  aria-required="true"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <span
                    id="email-error"
                    className="[font-family:'DM_Sans',Helvetica] text-[12px] text-laranja"
                    role="alert"
                  >
                    {errors.email}
                  </span>
                )}
              </div>

              {/* Company */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="company"
                  className="[font-family:'DM_Sans',Helvetica] text-[13px] font-bold tracking-[-0.35px] text-[rgba(248,244,235,0.7)]"
                >
                  Empresa
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Nome da sua empresa"
                  className="w-full px-4 py-3 bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.1)] rounded-xl [font-family:'DM_Sans',Helvetica] text-[15px] font-normal tracking-[-0.075px] text-off-white placeholder:text-[rgba(248,244,235,0.3)] focus:outline-none focus:border-azul-claro transition-colors"
                />
              </div>

              {/* Service */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="service"
                  className="[font-family:'DM_Sans',Helvetica] text-[13px] font-bold tracking-[-0.35px] text-[rgba(248,244,235,0.7)]"
                >
                  Serviço de interesse
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.1)] rounded-xl [font-family:'DM_Sans',Helvetica] text-[15px] font-normal tracking-[-0.075px] text-off-white focus:outline-none focus:border-azul-claro transition-colors cursor-pointer"
                >
                  <option value="" className="bg-preto text-off-white">
                    Selecione um serviço
                  </option>
                  {services.map((s) => (
                    <option
                      key={s.id}
                      value={s.title}
                      className="bg-preto text-off-white"
                    >
                      {s.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="message"
                  className="[font-family:'DM_Sans',Helvetica] text-[13px] font-bold tracking-[-0.35px] text-[rgba(248,244,235,0.7)]"
                >
                  Mensagem *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Conte-nos sobre seu projeto..."
                  rows={4}
                  className={`w-full px-4 py-3 bg-[rgba(255,255,255,0.06)] border rounded-xl [font-family:'DM_Sans',Helvetica] text-[15px] font-normal tracking-[-0.075px] text-off-white placeholder:text-[rgba(248,244,235,0.3)] focus:outline-none focus:border-azul-claro transition-colors resize-none ${
                    errors.message
                      ? "border-[rgba(241,141,4,0.8)]"
                      : "border-[rgba(255,255,255,0.1)]"
                  }`}
                  aria-required="true"
                  aria-invalid={!!errors.message}
                  aria-describedby={
                    errors.message ? "message-error" : undefined
                  }
                />
                {errors.message && (
                  <span
                    id="message-error"
                    className="[font-family:'DM_Sans',Helvetica] text-[12px] text-laranja"
                    role="alert"
                  >
                    {errors.message}
                  </span>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-4 bg-off-white rounded-xl [font-family:'DM_Sans',Helvetica] text-[14px] font-bold tracking-[-0.35px] text-preto hover:bg-azul-claro transition-colors mt-2"
              >
                Enviar Mensagem
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer
      className="w-full bg-preto border-t border-[rgba(255,255,255,0.06)] py-12 px-8"
      role="contentinfo"
    >
      <div className="max-w-[1200px] mx-auto flex flex-col gap-10">
        {/* Top row */}
        <div className="flex flex-col lg:flex-row justify-between gap-10">
          {/* Brand */}
          <div className="flex flex-col gap-4 max-w-[280px]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-off-white rounded-sm flex items-center justify-center">
                <span className="text-preto text-xs font-bold [font-family:'Victor_Mono',Helvetica]">
                  A
                </span>
              </div>
              <span className="[font-family:'Victor_Mono',Helvetica] text-[18px] font-normal tracking-[-0.5px] text-off-white">
                anima.
              </span>
            </div>
            <p className="[font-family:'DM_Sans',Helvetica] text-[14px] font-normal tracking-[-0.075px] leading-[140%] text-[rgba(248,244,235,0.45)]">
              Estúdio de design e tecnologia criando produtos digitais que
              transformam negócios.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {[
              {
                title: "Empresa",
                links: ["Sobre", "Processo", "Carreiras", "Blog"],
              },
              {
                title: "Serviços",
                links: [
                  "Design de Produto",
                  "Desenvolvimento",
                  "Branding",
                  "Estratégia",
                ],
              },
              {
                title: "Contato",
                links: ["oi@anima.studio", "Instagram", "LinkedIn", "Behance"],
              },
            ].map((col) => (
              <div key={col.title} className="flex flex-col gap-4">
                <span className="[font-family:'Abel',Helvetica] text-[12px] font-normal tracking-[1.62px] text-[rgba(248,244,235,0.4)] uppercase">
                  {col.title}
                </span>
                <ul className="flex flex-col gap-2 list-none m-0 p-0">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="[font-family:'DM_Sans',Helvetica] text-[14px] font-normal tracking-[-0.075px] text-[rgba(248,244,235,0.55)] no-underline hover:text-off-white transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-[rgba(255,255,255,0.06)]" />

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="[font-family:'DM_Sans',Helvetica] text-[13px] font-normal tracking-[-0.075px] text-[rgba(248,244,235,0.35)]">
            © 2024 Anima Studio. Todos os direitos reservados.
          </span>
          <div className="flex items-center gap-6">
            {["Privacidade", "Termos", "Cookies"].map((item) => (
              <a
                key={item}
                href="#"
                className="[font-family:'DM_Sans',Helvetica] text-[13px] font-normal tracking-[-0.075px] text-[rgba(248,244,235,0.35)] no-underline hover:text-off-white transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

// ─── Main Export ─────────────────────────────────────────────────────────────

export const Box = (): JSX.Element => {
  return (
    <div className="w-full min-h-screen bg-off-white">
      <Navbar />
      <main>
        <HeroSection />
        <MarqueeSection />
        <AboutSection />
        <ServicesSection />
        <ProcessSection />
        <PortfolioSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Box;
