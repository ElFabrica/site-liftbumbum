import Image from "next/image";

export interface SobreProps {
  quote?: string;
  bio?: string;
  waHref?: string;
}

const DEFAULT_SOBRE: Required<Omit<SobreProps, "waHref">> = {
  quote: "Meu objetivo não é apenas te ensinar a aplicar um produto, é te ensinar a construir um império na estética através da segurança e do resultado impecável.",
  bio: "Especialista em harmonização corporal e criadora do revolucionário Método LiftBumbum®, a Dra. Thaine Malinowski é referência nacional em estética avançada. Com anos de prática clínica intensa e milhares de procedimentos realizados, ela desenvolveu uma metodologia que une o rigor científico à estética de alto padrão.",
};

const STORY_BLOCKS = [
  {
    label: "A Busca pela Excelência",
    text: "A Dra. Thaine Malinowski não aceitou o 'comum'. Após anos de prática clínica intensa e milhares de procedimentos realizados, ela percebeu que o mercado de estética entregava resultados rasos e inseguros. Foi essa inconformidade que a levou a desenvolver uma metodologia que une o rigor científico à estética de alto padrão.",
  },
  {
    label: "Referência Nacional",
    text: "Criadora do Método LiftBumbum®, marca registrada que se tornou sinônimo de glúteos perfeitos no Brasil, Thaine já transformou a carreira de mais de 500 profissionais. Sua clínica em Manaus/AM é hoje um centro de referência, atraindo pacientes e alunas de todos os estados brasileiros e do exterior.",
  },
  {
    label: "Sua Próxima Mentora",
    text: "Hoje, sua missão é clara: empoderar outras profissionais de saúde e estética para que elas também alcancem a independência financeira e o reconhecimento profissional, através de técnicas seguras e um posicionamento de mercado inabalável.",
  },
];

const AUTHORITY_NUMBERS = [
  { num: "500+", label: "Alunas formadas e faturando" },
  { num: "15k+", label: "Procedimentos realizados" },
  { num: "100%", label: "Compromisso com sua evolução" },
  { num: "Rennova", label: "Parceria exclusiva" },
];

export default function Sobre(props: SobreProps) {
  const quote = props.quote ?? DEFAULT_SOBRE.quote;
  const bio = props.bio ?? DEFAULT_SOBRE.bio;
  const waHref = props.waHref ?? "https://wa.me/559286062977";

  return (
    <section className="sobre-section" id="sobre">
      <div className="container">
        <div className="sobre-grid">
          <div className="sobre-image-stack reveal">
            <div className="sobre-main-img">
              <Image src="/images/elegant.jpg" alt="Dra. Thaine Malinowski" fill style={{ objectFit: "cover" }} />
            </div>
            <div className="sobre-float">
              <div className="sobre-float-title">Especialidades</div>
              <div className="sobre-float-list">
                {["Harmonização Corporal", "Protocolo LiftBumbum®", "Estética Avançada", "Mentora Clínica"].map((s) => (
                  <div className="sobre-float-item" key={s}>{s}</div>
                ))}
              </div>
            </div>
          </div>
          <div className="reveal reveal-delay-2">
            <div className="section-tag">A Sua Mentora</div>
            <div className="gold-line" />
            <h2 className="section-title">
              Muito além de uma técnica, uma <em>missão de vida</em>
            </h2>
            <p className="section-lead" style={{ color: "rgba(255,255,255,0.55)", fontSize: "12px", marginBottom: "4px" }}>
              Conheça a mente por trás do Método LiftBumbum®
            </p>

            {/* Storytelling blocks */}
            <div className="sobre-story-blocks">
              {STORY_BLOCKS.map((block) => (
                <div className="sobre-story-block" key={block.label}>
                  <div className="sobre-story-label">{block.label}</div>
                  <div className="sobre-story-text">{block.text}</div>
                </div>
              ))}
            </div>

            {/* Authority numbers */}
            <div className="authority-bar">
              {AUTHORITY_NUMBERS.map((item) => (
                <div className="auth-item" key={item.num}>
                  <span className="auth-number">{item.num}</span>
                  <span className="auth-label">{item.label}</span>
                </div>
              ))}
            </div>

            {/* Impact quote */}
            <blockquote className="sobre-impact-quote">
              &ldquo;{quote}&rdquo;
            </blockquote>

            {/* Bio */}
            <p className="section-lead" style={{ fontSize: "13px", marginBottom: "24px" }}>
              {bio}
            </p>

            <div className="sobre-cta">
              <a
                href={waHref}
                className="btn-primary btn-primary-glow"
                target="_blank"
                rel="noopener noreferrer"
              >
                Quero Garantir Agora a Minha Vaga
              </a>
              <p style={{ marginTop: "10px", fontSize: "12px", color: "rgba(255,255,255,0.4)", fontWeight: 300 }}>
                Vagas limitadas para garantir a qualidade da entrega individualizada.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
