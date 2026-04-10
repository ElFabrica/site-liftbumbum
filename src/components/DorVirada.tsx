export interface DorViradaProps {
  title?: string;
  subtitle?: string;
  dorItems?: string[];
  viradaItems?: string[];
}

const DEFAULT_DOR_ITEMS = [
  "Medo de intercorrências por falta de base anatômica.",
  "Dificuldade em cobrar caro e ser valorizada pelos pacientes.",
  "Resultados que desaparecem em poucos meses.",
  "Depende exclusivamente de indicação para conseguir novos clientes.",
  "Cursos rasos, técnicas que não entregam o que prometem e a eterna guerra de preços.",
];

const DEFAULT_VIRADA_ITEMS = [
  "Dominando o Método LiftBumbum® com segurança técnica total.",
  "Cobrando de R$ 3.000 a R$ 12.000 por protocolo com confiança.",
  "Resultados imediatos e duradouros que fidelizam pacientes.",
  "Atraindo pacientes de alto padrão pelo posicionamento, não pelo preço.",
  "Suporte contínuo e uma rede exclusiva de profissionais referências.",
];

export default function DorVirada(props: DorViradaProps) {
  const title = props.title ?? "Até quando você será \"apenas mais uma\" na estética enquanto seus concorrentes crescem e dominam sua região?";
  const subtitle = props.subtitle ?? "Cursos rasos, técnicas que não entregam o que prometem e a eterna guerra de preços por pacientes que não valorizam seu trabalho. Se você está cansada de agendas vazias e insegurança na aplicação, o problema não é você — é a sua metodologia.";
  const dorItems = (props.dorItems && props.dorItems.length > 0) ? props.dorItems : DEFAULT_DOR_ITEMS;
  const viradaItems = (props.viradaItems && props.viradaItems.length > 0) ? props.viradaItems : DEFAULT_VIRADA_ITEMS;

  return (
    <section className="dor-virada" id="problema">
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 52px' }} className="reveal">
          <div className="section-tag" style={{ justifyContent: 'center' }}>
            <span style={{ display: 'none' }} />
            Você se reconhece nisso?
          </div>
          <div className="gold-line" style={{ margin: '14px auto 22px' }} />
          <h2 className="section-title">{title}</h2>
          <p className="section-lead" style={{ margin: '16px auto 0', textAlign: 'center' }}>{subtitle}</p>
        </div>
        <div className="dor-virada-grid">
          <div className="dor-card reveal">
            <div className="section-tag" style={{ color: '#888' }}>
              <span style={{ display: 'none' }} />
              Você se sente assim?
            </div>
            <div className="gold-line" style={{ background: 'linear-gradient(90deg,#555,#888)' }} />
            <h3 className="section-title" style={{ fontSize: '26px', color: 'rgba(255,255,255,.72)' }}>
              Onde você <em style={{ color: '#888' }}>está</em> agora
            </h3>
            <div className="dor-items">
              {dorItems.map((item, i) => (
                <div className="dv-item" key={i}>
                  <span className="dor-icon">✗</span>{item}
                </div>
              ))}
            </div>
          </div>
          <div className="virada-card reveal reveal-delay-2">
            <div className="section-tag">
              <span style={{ display: 'none' }} />
              A mentoria é para você se…
            </div>
            <div className="gold-line" />
            <h3 className="section-title" style={{ fontSize: '26px' }}>
              Onde você <em>vai estar</em>
            </h3>
            <div className="virada-items">
              {viradaItems.map((item, i) => (
                <div className="dv-item" key={i}>
                  <span className="virada-icon">✓</span>{item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
