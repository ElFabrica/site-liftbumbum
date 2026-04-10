export interface BonusItem {
  id: number;
  title: string;
  desc: string;
  originalPrice: string;
  note: string;
}

export interface BonusProps {
  title?: string;
  sub?: string;
  items?: BonusItem[];
  waHref?: string;
}

const DEFAULT_ITEMS: BonusItem[] = [
  {
    id: 1,
    title: 'Kit de Marketing "Ready-to-Post"',
    desc: "Durante a mentoria, uma equipe profissional irá captar 05 fotos em alta resolução e 02 vídeos (Reels) de você em ação (aplicando a técnica, analisando paciente). Você sai do curso com conteúdo de altíssimo nível para postar no mesmo dia e já atrair suas primeiras pacientes.",
    originalPrice: "R$ 1.200,00",
    note: "Incluído nos planos Master/VIP",
  },
  {
    id: 2,
    title: 'Script de Vendas "Fechamento de Luxo"',
    desc: "O passo a passo exato (PDF e Aula) de como abordar e converter o lead que chega perguntando o preço no Direct ou WhatsApp. Chega de perder pacientes para a concorrência por não saber explicar o valor do Método LiftBumbum®.",
    originalPrice: "R$ 497,00",
    note: "Incluído em todos os planos",
  },
  {
    id: 3,
    title: "Pack de Artes e Identidade Visual",
    desc: "Modelos de posts e stories editáveis no Canva com a estética do LiftBumbum® para você manter o padrão de luxo nas suas redes sociais. Economize tempo e dinheiro com designers e mantenha um feed profissional desde o primeiro dia.",
    originalPrice: "R$ 350,00",
    note: "Incluído em todos os planos",
  },
  {
    id: 4,
    title: "Guia de Fornecedores e Descontos Exclusivos",
    desc: "Acesso à lista VIP de fornecedores parceiros da Dra. Thaine, com condições e descontos exclusivos na compra de injetáveis (Rennova e outros). Reduza seu custo operacional e aumente sua margem de lucro por procedimento.",
    originalPrice: "Inestimável",
    note: "Incluído em todos os planos",
  },
];

export default function Bonus(props: BonusProps) {
  const title = props.title ?? "O seu sucesso não pode esperar.";
  const sub = props.sub ?? "Além de toda a imersão presencial, você receberá um pacote de ferramentas prontas para acelerar o retorno do seu investimento.";
  const items = (props.items && props.items.length > 0) ? props.items : DEFAULT_ITEMS;
  const waHref = props.waHref ?? "https://wa.me/559286062977";

  return (
    <section className="bonus-section" id="bonus">
      <div className="container">
        <div className="bonus-header reveal">
          <div className="section-tag">Bônus Exclusivos</div>
          <div className="gold-line" />
          <h2 className="section-title">{title}</h2>
          <p className="section-lead" style={{ margin: "0 auto", textAlign: "center" }}>{sub}</p>
        </div>

        <div className="bonus-grid">
          {items.map((item, i) => (
            <div className={`bonus-item-card reveal reveal-delay-${(i % 2) + 1}`} key={item.id}>
              <div className="bonus-seal-card">Bônus {String(item.id).padStart(2, "0")}</div>
              <div className="bonus-item-num">BÔNUS {String(item.id).padStart(2, "0")}</div>
              <div className="bonus-item-title">{item.title}</div>
              <div className="bonus-item-desc">{item.desc}</div>
              <div className="bonus-item-price">
                <span className="bonus-original-price">{item.originalPrice}</span>
                <span className="bonus-free">→ GRÁTIS</span>
              </div>
              <div style={{ marginTop: "8px", fontSize: "11px", color: "rgba(200,169,110,0.7)", fontWeight: 400 }}>
                {item.note}
              </div>
            </div>
          ))}
        </div>

        {/* Total box */}
        <div className="bonus-total-box reveal">
          <div className="bonus-total-text">
            🎁 Você leva mais de R$ 2.000,00 em bônus totalmente gratuitos.
          </div>
          <div className="bonus-total-sub">
            Os bônus de marketing são exclusivos para as primeiras inscritas da turma.
          </div>
        </div>

        <div className="bonus-cta reveal">
          <a
            href={waHref}
            className="btn-primary btn-primary-glow"
            target="_blank"
            rel="noopener noreferrer"
          >
            Quero Minha Mentoria com Todos os Bônus
          </a>
          <div className="bonus-micro">Vagas limitadas — garantia de entrega individualizada por turma.</div>
        </div>
      </div>
    </section>
  );
}
