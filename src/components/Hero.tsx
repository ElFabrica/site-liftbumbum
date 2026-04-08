import Image from 'next/image';

const WaIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

type HeroStat = { num: string; label: string };

export interface HeroProps {
  title?: string;
  sub?: string;
  ctaPrimaryText?: string;
  ctaSecondaryText?: string;
  waHref?: string;
  stats?: HeroStat[];
}

const LogoLift = () => (
  <svg viewBox="0 0 300 70" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="gG" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#9A7A45"/>
        <stop offset="50%" stopColor="#E2C98F"/>
        <stop offset="100%" stopColor="#9A7A45"/>
      </linearGradient>
    </defs>
    <line x1="0" y1="17" x2="54" y2="17" stroke="url(#gG)" strokeWidth="0.8" opacity="0.7"/>
    <line x1="246" y1="17" x2="300" y2="17" stroke="url(#gG)" strokeWidth="0.8" opacity="0.7"/>
    <polygon points="62,13 66,17 62,21 58,17" fill="#C8A96E" opacity="0.55"/>
    <polygon points="238,13 242,17 238,21 234,17" fill="#C8A96E" opacity="0.55"/>
    <text x="150" y="13" fontFamily="var(--font-montserrat),sans-serif" fontSize="7.5" fontWeight="600" fill="#C8A96E" letterSpacing="5" textAnchor="middle" opacity="0.8">MÉTODO</text>
    <text x="150" y="44" fontFamily="var(--font-cormorant),serif" fontSize="36" fontWeight="300" fill="white" letterSpacing="6" textAnchor="middle">LIFT</text>
    <text x="150" y="63" fontFamily="var(--font-montserrat),sans-serif" fontSize="12" fontWeight="700" fill="url(#gG)" letterSpacing="8" textAnchor="middle">BUMBUM</text>
    <line x1="36" y1="67" x2="264" y2="67" stroke="url(#gG)" strokeWidth="0.5" opacity="0.35"/>
  </svg>
);

const DEFAULT_HERO: Required<Pick<
  HeroProps,
  "title" | "sub" | "ctaPrimaryText" | "ctaSecondaryText" | "waHref" | "stats"
>> = {
  title: "Escolha sua experiência.\nTransforme seu corpo\ne sua carreira.",
  sub:
    "A mentoria que une ciência, estética avançada e resultados reais. Aprenda com a Dra. Thaine Malinowski os segredos do Método LiftBumbum® — técnica exclusiva que está revolucionando a harmonização corporal no Brasil.",
  ctaPrimaryText: "Quero Participar",
  ctaSecondaryText: "Ver Planos",
  waHref: "https://wa.me/559286062977",
  stats: [
    { num: "500+", label: "Alunas Formadas" },
    { num: "98%", label: "Satisfação" },
    { num: "3 Dias", label: "Imersão Completa" },
  ],
};

export default function Hero(props: HeroProps) {
  const title = props.title ?? DEFAULT_HERO.title;
  const sub = props.sub ?? DEFAULT_HERO.sub;
  const ctaPrimaryText = props.ctaPrimaryText ?? DEFAULT_HERO.ctaPrimaryText;
  const ctaSecondaryText =
    props.ctaSecondaryText ?? DEFAULT_HERO.ctaSecondaryText;
  const waHref = props.waHref ?? DEFAULT_HERO.waHref;
  const stats = (props.stats && props.stats.length > 0
    ? props.stats
    : DEFAULT_HERO.stats) as HeroStat[];

  return (
    <section className="hero" id="mentoria">
      {/* Coluna esquerda — conteúdo */}
      <div className="hero-content">
        <div className="hero-badge">Mentoria Exclusiva</div>

        <div className="hero-logo">
          <LogoLift />
        </div>

        <h1 className="hero-headline">
          {title.split("\n").map((line, idx, arr) => (
            // eslint-disable-next-line react/no-array-index-key
            <span key={idx}>
              {line}
              {idx < arr.length - 1 ? <br /> : null}
            </span>
          ))}
        </h1>

        <p className="hero-sub">
          {sub}
        </p>

        <div className="hero-pills">
          <span className="pill">Harmonização Corporal</span>
          <span className="pill">Método Exclusivo</span>
          <span className="pill">Resultados Comprovados</span>
        </div>

        <div className="hero-actions">
          <a
            href={waHref}
            className="btn-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            <WaIcon /> {ctaPrimaryText}
          </a>
          <a href="#planos" className="btn-ghost">
            {ctaSecondaryText}
          </a>
        </div>

        <div className="hero-stats">
          {stats.slice(0, 3).map((s) => (
            <div className="stat" key={`${s.num}-${s.label}`}>
              <span className="stat-number">{s.num}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Coluna direita — foto */}
      <div className="hero-image-col">
        <Image
          src="/images/hero.jpg"
          alt="Dra. Thaine Malinowski — Especialista em Harmonização Corporal"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center top' }}
          priority
        />
        <div className="hero-float-card">
          <div className="float-card-label">Técnica Exclusiva</div>
          <div className="float-card-value">LiftBumbum®</div>
        </div>
      </div>
    </section>
  );
}
