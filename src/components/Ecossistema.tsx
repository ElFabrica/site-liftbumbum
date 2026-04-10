export interface EcossistemaProps {
  title?: string;
  sub?: string;
  testimony?: string;
  testimonyAuthor?: string;
  waHref?: string;
}

const DEFAULT_PILARES = [
  {
    icon: "🤝",
    foco: "Conexões que geram lucro",
    title: "Comunidade Elite de Networking",
    text: "Acesso vitalício ao nosso grupo exclusivo de alunas licenciadas. Um espaço para trocar experiências, compartilhar fornecedores com preços diferenciados e discutir casos complexos com profissionais que buscam o mesmo nível de excelência que você. O networking que você constrói aqui é o seu maior ativo.",
    destaque: "Onde as melhores se encontram.",
  },
  {
    icon: "🛡️",
    foco: "Segurança total para suas primeiras aplicações",
    title: "Mentoria e Suporte Pós-Curso (6 meses)",
    text: "Surgiram dúvidas no primeiro paciente pós-mentoria? Nós estamos aqui. Você terá um canal direto de suporte por 180 dias para análise de casos clínicos, auxílio em intercorrências e revisão de protocolos. É a Dra. Thaine e sua equipe técnica pegando na sua mão até você atingir a maestria.",
    destaque: "Segurança clínica do seu lado 24/7.",
  },
  {
    icon: "📚",
    foco: "Seu posicionamento como autoridade nacional",
    title: "O Cofre de Aulas Extras (Marketing & Vendas)",
    text: "Além dos 3 dias presenciais, você recebe acesso à nossa plataforma online com aulas complementares de marketing digital, gestão de tráfego para clínicas de estética e técnicas avançadas de fechamento. Aprenda a se posicionar no Instagram para que o preço nunca mais seja um obstáculo para suas pacientes.",
    destaque: "O manual do negócio lucrativo.",
  },
];

export default function Ecossistema(props: EcossistemaProps) {
  const title = props.title ?? "Você nunca estará sozinha na sua jornada.";
  const sub = props.sub ?? "A Mentoria LiftBumbum® não termina quando o terceiro dia acaba. Você entra para um ecossistema desenhado para garantir sua evolução contínua e resultado.";
  const testimony = props.testimony ?? "O diferencial da Thaine é que ela não some. Quando tive minha primeira dúvida no consultório, a equipe me respondeu em minutos. Isso não tem preço.";
  const testimonyAuthor = props.testimonyAuthor ?? "Dra. Juliana — Aluna Master";
  const waHref = props.waHref ?? "https://wa.me/559286062977";

  return (
    <section className="ecossistema" id="ecossistema">
      <div className="container">
        <div className="ecossistema-header reveal">
          <div className="section-tag">Suporte & Comunidade</div>
          <div className="gold-line" />
          <h2 className="section-title">{title}</h2>
          <p className="section-lead" style={{ margin: "0 auto", textAlign: "center" }}>
            {sub}
          </p>
        </div>

        <div className="eco-grid">
          {DEFAULT_PILARES.map((pilar, i) => (
            <div className={`eco-pilar-card reveal reveal-delay-${i + 1}`} key={pilar.title}>
              <div className="eco-pilar-icon">{pilar.icon}</div>
              <div className="eco-pilar-foco">{pilar.foco}</div>
              <div className="eco-pilar-title">{pilar.title}</div>
              <div className="eco-pilar-text">{pilar.text}</div>
              <div className="eco-pilar-destaque">◆ {pilar.destaque}</div>
            </div>
          ))}
        </div>

        {/* Depoimento de suporte */}
        <div className="eco-testimony reveal">
          <div className="eco-testimony-text">&ldquo;{testimony}&rdquo;</div>
          <div className="eco-testimony-author">— {testimonyAuthor}</div>
        </div>

        <div style={{ textAlign: "center" }} className="reveal">
          <div className="eco-seal">180 DIAS DE SUPORTE TÉCNICO GARANTIDO</div>
        </div>

        <div className="eco-cta reveal">
          <a
            href={waHref}
            className="btn-primary btn-primary-glow"
            target="_blank"
            rel="noopener noreferrer"
          >
            Quero Fazer Parte Desse Ecossistema
          </a>
          <div className="eco-micro">Restam poucas vagas para a próxima turma com suporte individualizado.</div>
        </div>
      </div>
    </section>
  );
}
