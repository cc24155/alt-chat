import { useState } from "react";

interface ContatoProps {
}

export default function Contato({ }: ContatoProps) {
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
}
