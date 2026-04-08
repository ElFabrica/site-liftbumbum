import Image from 'next/image';

export interface SobreProps {
  quote?: string;
  bio?: string;
}

const DEFAULT_SOBRE: Required<SobreProps> = {
  quote:
    "Minha missão é empoderar profissionais da estética com conhecimento sólido e técnicas que realmente transformam vidas.",
  bio:
    "Especialista em harmonização corporal e criadora do revolucionário Método LiftBumbum®, a Dra. Thaine Malinowski é referência nacional em estética avançada. Com anos de prática clínica intensiva e mais de 500 profissionais formadas, ela desenvolveu uma abordagem única que une ciência de ponta com resultados visíveis e duradouros.",
};

export default function Sobre(props: SobreProps) {
  const quote = props.quote ?? DEFAULT_SOBRE.quote;
  const bio = props.bio ?? DEFAULT_SOBRE.bio;

  return (
    <section className="sobre-section" id="sobre">
      <div className="container">
        <div className="sobre-grid">
          <div className="sobre-image-stack reveal">
            <div className="sobre-main-img">
              <Image src="/images/elegant.jpg" alt="Dra. Thaine Malinowski" fill style={{ objectFit: 'cover' }} />
            </div>
            <div className="sobre-float">
              <div className="sobre-float-title">Especialidades</div>
              <div className="sobre-float-list">
                {['Harmonização Corporal','Protocolo LiftBumbum®','Estética Avançada','Mentora Clínica'].map(s => (
                  <div className="sobre-float-item" key={s}>{s}</div>
                ))}
              </div>
            </div>
          </div>
          <div className="reveal reveal-delay-2">
            <div className="section-tag">Quem é ela</div>
            <div className="gold-line" />
            <h2 className="section-title">Dra. Thaine <em>Malinowski</em></h2>
            <blockquote className="sobre-quote">
              &ldquo;{quote}&rdquo;
            </blockquote>
            <p className="section-lead">
              {bio}
            </p>
            <div className="sobre-credentials">
              {[
                { label: 'Atuação', value: 'São Luís, MA' },
                { label: 'Profissionais Formadas', value: '500+' },
                { label: 'Parceria Exclusiva', value: 'Rennova' },
                { label: 'Método Próprio', value: 'LiftBumbum®' },
              ].map(c => (
                <div className="cred" key={c.label}>
                  <div className="cred-label">{c.label}</div>
                  <div className="cred-value">{c.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
