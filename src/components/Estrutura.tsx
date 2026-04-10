export interface EstruturaProps {
  title?: string;
  subtitle?: string;
  waHref?: string;
}

const dias = [
  {
    n: "01",
    tag: "Dia 1",
    title: "A Ciência e o Planejamento",
    subtitle: "Fundamentos de Luxo",
    foco: "\"Não é sobre aplicar, é sobre planejar para não errar.\"",
    items: [
      "Anatomia 360º: Estudo profundo dos compartimentos de gordura, músculos e vasos.",
      "Engenharia de Produtos: Sinergia entre Bioestimuladores, PDRN e Ácido Hialurônico.",
      "Avaliação Geométrica: Como mapear o glúteo e prever o resultado final.",
      "Manejo de Intercorrências: Protocolos de segurança para você dormir tranquila.",
    ],
    resultado: "Você terá o olhar clínico de uma especialista licenciada.",
  },
  {
    n: "02",
    tag: "Dia 2",
    title: "A Prática Hands-On",
    subtitle: "Mão na Massa Supervisionada",
    foco: "\"Transforme a teoria em resultado real com segurança total.\"",
    items: [
      "Demonstração VIP: Acompanhe a Dra. Thaine realizando o Método LiftBumbum® passo a passo.",
      "Prática Supervisionada: Você aplica a técnica em modelos reais (pré-selecionadas) com correção imediata.",
      "Domínio de Cânulas: Refinamento de vetores de tração e planos de aplicação.",
      "Protocolo Pós-Procedimento: Orientações para garantir a durabilidade do resultado.",
    ],
    resultado: "Você terá a segurança prática que nenhum curso online pode entregar.",
  },
  {
    n: "03",
    tag: "Dia 3",
    title: "O Business da Estética",
    subtitle: "Marketing, Vendas e Escala",
    foco: "\"A melhor técnica do mundo não se vende sozinha.\"",
    items: [
      "Posicionamento de Autoridade: Como ser vista como a 'Dra. Referência' e não como uma 'aplicadora'.",
      "Instagram Magnético: O método para atrair pacientes de alto padrão sem precisar fazer dancinhas.",
      "Script de Fechamento de R$ 10k: Como transformar uma avaliação simples em protocolo completo.",
      "Networking e Mentalidade: Como gerir sua clínica para ter liberdade geográfica e financeira.",
    ],
    resultado: "Você sairá com o mapa exato para recuperar o investimento da mentoria em poucas semanas.",
  },
];

export default function Estrutura(props: EstruturaProps) {
  const title = props.title ?? "3 dias que vão mudar o patamar do seu faturamento, conhecimento e posicionamento.";
  const subtitle = props.subtitle ?? "Uma jornada intensiva que vai do diagnóstico de luxo ao fechamento de contratos de alto ticket.";
  const waHref = props.waHref ?? "https://wa.me/559286062977";

  return (
    <section className="estrutura" id="cronograma">
      <div className="container">
        <div className="estrutura-header reveal">
          <div className="section-tag">Cronograma</div>
          <div className="gold-line" />
          <h2 className="section-title">{title}</h2>
          <p className="section-lead" style={{ margin: "0 auto", textAlign: "center", maxWidth: "560px" }}>
            {subtitle}
          </p>
        </div>
        <div className="dias-grid">
          {dias.map((dia, i) => (
            <div className={`dia-card reveal reveal-delay-${i + 1}`} key={dia.n}>
              <div className="dia-number">{dia.n}</div>
              <div className="dia-tag">{dia.tag}</div>
              <div className="dia-title">{dia.title}</div>
              <div style={{ fontSize: "11px", color: "rgba(200,169,110,0.7)", fontWeight: 500, letterSpacing: "0.5px", marginBottom: "10px" }}>{dia.subtitle}</div>
              <div className="dia-foco">{dia.foco}</div>
              <div className="dia-items">
                {dia.items.map((item) => (
                  <div className="dia-item" key={item}>{item}</div>
                ))}
              </div>
              <div className="dia-resultado">✓ {dia.resultado}</div>
            </div>
          ))}
        </div>

        {/* Elemento de Fechamento */}
        <div className="estrutura-closing reveal">
          <div className="estrutura-closing-text">
            Diferencial Exclusivo: Enquanto outros cursos terminam na técnica, nós terminamos na sua{" "}
            <em>primeira venda de alto ticket</em>. Você não sai apenas sabendo{" "}
            <em>&quot;como fazer&quot;</em>, você sai sabendo <em>&quot;como vender&quot;</em>.
          </div>
          <a
            href={waHref}
            className="btn-primary btn-primary-glow"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
          >
            Quero Ver o Cronograma Completo no WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
