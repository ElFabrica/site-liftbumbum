const WA = 'https://wa.me/559286062977';

interface PlanFeature { id: number; value: string; }

interface PlanData {
  name: string;
  price: string;
  priceNote?: string;
  sub?: string;
  features: PlanFeature[] | string[];
  bonus?: PlanFeature[] | string[];
  btn?: string;
}

interface PlansProps {
  /** Dados dinâmicos vindos do banco — se não fornecidos, usa os padrões abaixo */
  dbPlans?: PlanData[] | null;
  waLink?: string;
}

const DEFAULT_PLANS = [
  {
    emoji: '💎',
    name: 'Experience Silver',
    sub: 'Para quem deseja entrar no método com base sólida e prática real.',
    price: '5.500',
    priceNote: 'Investimento único — à vista no PIX',
    features: [
      '03 dias de mentoria VIP presencial',
      'Suporte online por 6 meses',
      'Cupons de desconto e material incluso',
      'Certificado',
    ],
    btnText: 'Quero o Silver',
    btnClass: 'outline',
    featured: false,
  },
  {
    emoji: '💎',
    badge: 'Mais Escolhida',
    name: 'Experience VIP',
    sub: 'Para quem quer ir além da técnica e viver proximidade, estratégia e crescimento.',
    price: '8.888',
    priceNote: 'Investimento único — à vista no PIX',
    features: [
      '03 dias de mentoria VIP presencial',
      '03 dias de almoço com a Dra. Thaine (networking e troca estratégica)',
      'Atendimento na 2ª maca',
      'Suporte online por 6 meses',
      'Acesso ao treinamento de vendas e posicionamento na estética',
      'Cupons de desconto e material incluso',
      'Certificado',
    ],
    btnText: 'Quero o VIP',
    btnClass: 'solid',
    featured: true,
  },
  {
    emoji: '👑',
    name: 'Experience Master',
    sub: 'Para quem quer viver o nível mais alto da experiência, com posicionamento e autoridade.',
    price: '9.990',
    priceNote: 'Investimento único — à vista no PIX',
    features: [
      '03 dias de mentoria VIP presencial',
      '03 dias de almoço com a Dra. Thaine',
      'Atendimento na 1ª maca (protagonismo total)',
      'Suporte online por 6 meses',
      'Acesso ao treinamento de vendas e posicionamento',
      '50% de desconto na mentoria individual',
      'Cupons de desconto e material incluso',
    ],
    bonus: ['05 fotos profissionais editadas', '02 vídeos editados dos seus atendimentos'],
    btnText: 'Quero o Master',
    btnClass: 'outline',
    featured: false,
  },
];

// Normaliza item de feature (pode vir como string ou como { id, value })
function featureText(f: PlanFeature | string): string {
  return typeof f === 'string' ? f : f.value;
}

export default function Plans({ dbPlans, waLink }: PlansProps) {
  const wa = waLink || WA;

  // Se há dados do banco, monta a estrutura dinâmica; caso contrário usa os padrões
  const plans = dbPlans && dbPlans.length > 0
    ? dbPlans.map((p, i) => ({
        emoji:    DEFAULT_PLANS[i]?.emoji    ?? '💎',
        badge:    DEFAULT_PLANS[i]?.badge,
        name:     p.name,
        sub:      p.sub   ?? DEFAULT_PLANS[i]?.sub ?? '',
        price:    p.price,
        priceNote: p.priceNote ?? DEFAULT_PLANS[i]?.priceNote ?? '',
        features: (p.features ?? []).map(featureText),
        bonus:    p.bonus  ? (p.bonus as (PlanFeature | string)[]).map(featureText) : DEFAULT_PLANS[i]?.bonus,
        btnText:  p.btn    ?? DEFAULT_PLANS[i]?.btnText ?? 'Saiba Mais',
        btnClass: DEFAULT_PLANS[i]?.btnClass ?? 'outline',
        featured: DEFAULT_PLANS[i]?.featured ?? false,
      }))
    : DEFAULT_PLANS;

  return (
    <section className="plans-section" id="planos">
      <div className="container">
        <div className="plans-header reveal">
          <div className="section-tag" style={{ justifyContent: 'center', display: 'flex' }}>Escolha sua Jornada</div>
          <div className="gold-line" />
          <h2 className="section-title">Sua <em>experiência</em>, seu ritmo</h2>
          <p className="section-lead" style={{ margin: '0 auto', textAlign: 'center' }}>
            Três formatos pensados para diferentes momentos da sua vida profissional.
          </p>
        </div>
        <div className="plans-grid">
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              className={`plan-card reveal reveal-delay-${i + 1}${plan.featured ? ' featured' : ''}`}
            >
              {plan.badge && <div className="plan-badge">{plan.badge}</div>}
              <div className="plan-emoji">{plan.emoji}</div>
              <div className="plan-name">{plan.name}</div>
              <div className="plan-sub">{plan.sub}</div>
              <div className="plan-price"><sub>R$</sub>{plan.price}</div>
              <div className="plan-price-note">{plan.priceNote}</div>
              <div className="plan-divider" />
              <ul className="plan-features">
                {plan.features.map((f, fi) => <li key={fi}>{f}</li>)}
              </ul>
              {plan.bonus && plan.bonus.length > 0 && (
                <div className="plan-bonus">
                  <div className="plan-bonus-title">🎁 Bônus Exclusivos</div>
                  <div className="plan-bonus-items">
                    {plan.bonus.map((b, bi) => <div className="plan-bonus-item" key={bi}>{b}</div>)}
                  </div>
                </div>
              )}
              <a href={wa} className={`plan-btn ${plan.btnClass}`} target="_blank" rel="noopener noreferrer">
                {plan.btnText}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
