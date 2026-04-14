const WA = 'https://wa.me/559286062977';

interface PlanFeature { id: number; value: string; }

interface PlanData {
  name: string;
  price: string;
  priceNote?: string;
  priceVista?: string;
  sub?: string;
  features: PlanFeature[] | string[];
  bonus?: PlanFeature[] | string[];
  btn?: string;
}

interface PlansProps {
  dbPlans?: PlanData[] | null;
  waLink?: string;
}

const DEFAULT_PLANS = [
  {
    emoji: '💎',
    name: 'Experience Silver',
    sub: 'A base sólida para dominar a técnica.',
    price: '5.500',
    priceNote: '12x de R$ 552,20',
    priceVista: 'R$ 5.500 à vista no PIX',
    features: [
      '3 dias de imersão presencial completa',
      'Apostila técnica detalhada',
      'Certificado de conclusão',
      'Acesso ao grupo de networking',
    ],
    btnText: 'Quero o Silver',
    btnClass: 'outline',
    featured: false,
    waMsg: 'Olá, tenho interesse no Plano Silver.',
  },
  {
    emoji: '👑',
    badge: 'Mais Escolhido',
    name: 'Experience Master',
    sub: 'Para quem quer dominar a técnica e o negócio.',
    price: '9.990',
    priceNote: '12x de R$ 999,00',
    priceVista: 'R$ 9.990 à vista no PIX',
    features: [
      'Tudo do Silver +',
      'Kit de Marketing Premium: 05 fotos e 02 vídeos profissionais seus em ação',
      'Atendimento na 1ª Maca: Protagonismo total na prática',
      'Aulas Extras Online: Marketing, Vendas e Gestão de Tráfego',
      'Suporte Prioritário: Canal direto por 6 meses',
    ],
    bonus: ['05 fotos profissionais editadas', '02 vídeos editados dos seus atendimentos'],
    btnText: 'Quero a Experiência Completa',
    btnClass: 'solid',
    featured: true,
    waMsg: 'Olá, tenho interesse no Plano Master.',
  },
  {
    emoji: '💎',
    name: 'Experience VIP',
    sub: 'Proximidade máxima e networking estratégico.',
    price: '11.000',
    priceNote: '12x de R$ 1.100,00',
    priceVista: 'R$ 11.000 à vista no PIX',
    features: [
      'Tudo do Master +',
      'Almoço de Negócios: 3 dias com a Dra. Thaine para networking direto',
      'Mentoria Individual: 01 encontro online de 1h após o curso para ajuste de rota',
      '50% de desconto em futuras mentorias individuais',
    ],
    btnText: 'Quero o VIP',
    btnClass: 'outline',
    featured: false,
    waMsg: 'Olá, tenho interesse no Plano VIP.',
  },
];

const COMPARISON_ROWS = [
  { label: "3 dias de imersão presencial", silver: true, master: true, vip: true },
  { label: "Apostila técnica e Certificado", silver: true, master: true, vip: true },
  { label: "Acesso ao grupo de networking", silver: true, master: true, vip: true },
  { label: "Kit de Marketing (fotos + vídeos)", silver: false, master: true, vip: true },
  { label: "Atendimento na 1ª Maca", silver: false, master: true, vip: true },
  { label: "Aulas extras (Marketing & Vendas)", silver: false, master: true, vip: true },
  { label: "Suporte prioritário 6 meses", silver: false, master: true, vip: true },
  { label: "Almoço de negócios com Dra. Thaine", silver: false, master: false, vip: true },
  { label: "Mentoria individual pós-curso (1h)", silver: false, master: false, vip: true },
  { label: "50% off em mentorias futuras", silver: false, master: false, vip: true },
];

function featureText(f: PlanFeature | string): string {
  return typeof f === 'string' ? f : f.value;
}

export default function Plans({ dbPlans, waLink }: PlansProps) {
  const wa = waLink || WA;

  const plans = dbPlans && dbPlans.length > 0
    ? dbPlans.map((p, i) => ({
      emoji: DEFAULT_PLANS[i]?.emoji ?? '💎',
      badge: DEFAULT_PLANS[i]?.badge,
      name: p.name,
      sub: p.sub ?? DEFAULT_PLANS[i]?.sub ?? '',
      price: p.price,
      priceNote: p.priceNote ?? DEFAULT_PLANS[i]?.priceNote ?? '',
      priceVista: p.priceVista || `R$ ${p.price} à vista no PIX`,
      features: (p.features ?? []).map(featureText),
      bonus: p.bonus ? (p.bonus as (PlanFeature | string)[]).map(featureText) : DEFAULT_PLANS[i]?.bonus,
      btnText: p.btn ?? DEFAULT_PLANS[i]?.btnText ?? 'Saiba Mais',
      btnClass: DEFAULT_PLANS[i]?.btnClass ?? 'outline',
      featured: DEFAULT_PLANS[i]?.featured ?? false,
      waMsg: DEFAULT_PLANS[i]?.waMsg ?? '',
    }))
    : DEFAULT_PLANS;

  return (
    <section className="plans-section" id="planos">
      <div className="container">
        <div className="plans-header reveal">
          <div className="section-tag" style={{ justifyContent: 'center', display: 'flex' }}>Escolha sua Experiência</div>
          <div className="gold-line" />
          <h2 className="section-title">Invista no próximo nível da sua <em>carreira</em></h2>
          <p className="section-lead" style={{ margin: '0 auto', textAlign: 'center' }}>
            Três formatos exclusivos para diferentes momentos da sua jornada profissional. Escolha o que melhor se adapta ao seu objetivo.
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
              {/* Preço: parcela em destaque 3x maior, à vista menor */}
              <div className="plan-price"><sub>12x de R$</sub></div>
              <div style={{ fontFamily: 'var(--font-cormorant),serif', fontSize: '46px', fontWeight: 600, color: 'var(--gold)', lineHeight: 1 }}>
                {plan.priceNote?.replace('12x de R$ ', '').replace('12x de R$', '') || plan.price}
              </div>
              <div className="plan-price-note">{plan.priceVista || `R$ ${plan.price} à vista no PIX`}</div>
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
              <a
                href={`${wa}?text=${encodeURIComponent(plan.waMsg || `Olá, tenho interesse no ${plan.name}.`)}`}
                className={`plan-btn ${plan.btnClass}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {plan.btnText}
              </a>
            </div>
          ))}
        </div>

        {/* Tabela Comparativa */}
        <div className="comparison-table-wrapper reveal">
          <h3 className="comparison-title">A <em>escolha óbvia</em> está aqui</h3>
          <div style={{ overflowX: 'auto' }}>
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>O que está incluso</th>
                  <th>Silver</th>
                  <th>Master</th>
                  <th>VIP</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row) => (
                  <tr key={row.label}>
                    <td>{row.label}</td>
                    <td>{row.silver ? <span className="check-yes">✓</span> : <span className="check-no">✗</span>}</td>
                    <td>{row.master ? <span className="check-yes">✓</span> : <span className="check-no">✗</span>}</td>
                    <td>{row.vip ? <span className="check-yes">✓</span> : <span className="check-no">✗</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Gatilhos de fechamento */}
        <div className="plan-closing-triggers reveal">
          <div className="closing-item">
            <span className="closing-item-icon">🛡️</span>
            <div>
              <strong>Garantia de Satisfação</strong>
              Sua segurança em primeiro lugar. Devolvemos seu investimento se a entrega não condizer com o prometido.
            </div>
          </div>
          <div className="closing-item">
            <span className="closing-item-icon">🔒</span>
            <div>
              <strong>Ambiente 100% Seguro</strong>
              Pagamento processado com segurança. Seus dados estão protegidos em todo o processo.
            </div>
          </div>
          <div className="closing-item">
            <span className="closing-item-icon">💳</span>
            <div>
              <strong>Até 2 Cartões</strong>
              Aceitamos até dois cartões de crédito diferentes para facilitar o seu investimento na mentoria.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
