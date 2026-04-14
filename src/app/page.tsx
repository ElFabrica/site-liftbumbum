import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import DorVirada from "@/components/DorVirada";
import PreMentoria from "@/components/PreMentoria";
import Estrutura from "@/components/Estrutura";
import Ecossistema from "@/components/Ecossistema";
import Sobre from "@/components/Sobre";
import Gallery from "@/components/Gallery";
import Depoimentos from "@/components/Depoimentos";
import Plans from "@/components/Plans";
import Bonus from "@/components/Bonus";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import AnimationsProvider from "@/components/AnimationsProvider";
import ParaQuem from "@/components/ParaQuem";
import prisma from "@/lib/db";

export const revalidate = 60;

async function getSiteData() {
  try {
    const record = await prisma.siteData.findUnique({ where: { id: 1 } });
    return (record?.data as Record<string, unknown>) ?? null;
  } catch {
    return null;
  }
}

function normalizeString(v: unknown): string | undefined {
  return typeof v === "string" && v.trim() ? v : undefined;
}

function normalizeStringArray(v: unknown): string[] | undefined {
  if (!Array.isArray(v)) return undefined;
  const arr = v.filter((i) => typeof i === "string" && i.trim());
  return arr.length > 0 ? arr : undefined;
}

function buildWaLink(waNumber?: string, waMsg?: string) {
  if (!waNumber) return undefined;
  const base = `https://wa.me/${waNumber}`;
  const msg = waMsg?.trim();
  if (!msg) return base;
  return `${base}?text=${encodeURIComponent(msg)}`;
}

export default async function Home() {
  const siteData = await getSiteData();

  const plans = siteData?.plans as
    | {
      name: string;
      price: string;
      priceNote?: string;
      sub?: string;
      features: { id: number; value: string }[];
      priceVista?: string;
      bonus?: { id: number; value: string }[];
      btn?: string;
    }[]
    | null;

  const waNumber = normalizeString(siteData?.contactWa);
  const waMsg = normalizeString(siteData?.contactWaMsg);
  const waLink = buildWaLink(waNumber, waMsg);
  const igLink = normalizeString(siteData?.contactIg);
  const contactEmail = normalizeString(siteData?.contactEmail);

  // Hero
  const heroTitle = normalizeString(siteData?.txtHeroTitle);
  const heroSub = normalizeString(siteData?.txtHeroSub);
  const heroSelo = normalizeString(siteData?.heroSelo);
  const heroChecklist = normalizeStringArray(siteData?.heroChecklist);
  const heroBadges = normalizeStringArray(siteData?.heroBadges);
  const ctaPrimary = normalizeString(siteData?.ctaPrimary);
  const ctaSecondary = normalizeString(siteData?.ctaSecondary);

  const stats = [
    { num: normalizeString(siteData?.stat1Num), label: normalizeString(siteData?.stat1Label) },
    { num: normalizeString(siteData?.stat2Num), label: normalizeString(siteData?.stat2Label) },
    { num: normalizeString(siteData?.stat3Num), label: normalizeString(siteData?.stat3Label) },
  ].filter((s): s is { num: string; label: string } => Boolean(s.num && s.label));

  // Sobre
  const aboutQuote = normalizeString(siteData?.txtQuote);
  const aboutBio = normalizeString(siteData?.txtBio);

  // DorVirada
  const dorTitle = normalizeString(siteData?.dorTitle);
  const dorSubtitle = normalizeString(siteData?.dorSubtitle);
  const dorItems = normalizeStringArray(siteData?.dorItems);
  const viradaItems = normalizeStringArray(siteData?.viradaItems);

  // Ecossistema
  const ecoTitle = normalizeString(siteData?.ecoTitle);
  const ecoSub = normalizeString(siteData?.ecoSub);
  const ecoTestimony = normalizeString(siteData?.ecoTestimony);
  const ecoTestimonyAuthor = normalizeString(siteData?.ecoTestimonyAuthor);

  // Estrutura
  const estruturaTitle = normalizeString(siteData?.estruturaTitle);
  const estruturaSub = normalizeString(siteData?.estruturaSub);

  // Bonus
  const bonusTitle = normalizeString(siteData?.bonusTitle);
  const bonusSub = normalizeString(siteData?.bonusSub);
  const bonusItems = Array.isArray(siteData?.bonusItems) && (siteData?.bonusItems as unknown[]).length > 0
    ? (siteData?.bonusItems as { id: number; title: string; desc: string; originalPrice: string; note: string }[])
    : undefined;

  // FAQ
  const faqTitle = normalizeString(siteData?.faqTitle);
  const faqSub = normalizeString(siteData?.faqSub);
  const faqItems = Array.isArray(siteData?.faqItems) && (siteData?.faqItems as unknown[]).length > 0
    ? (siteData?.faqItems as { id: number; q: string; a: string }[])
    : undefined;

  // Visibility
  const visGallery = Boolean(siteData?.visGallery ?? true);
  const visDeps = Boolean(siteData?.visDeps ?? true);
  const visCursor = Boolean(siteData?.visCursor ?? true);
  const visParticles = Boolean(siteData?.visParticles ?? true);

  return (
    <>
      {visParticles ? <canvas id="particles" /> : null}
      {visCursor ? (
        <>
          <div className="cursor" id="cursor" />
          <div className="cursor-ring" id="cursorRing" />
          <div className="glow-overlay" id="glowOverlay" />
        </>
      ) : null}

      {/* 1ª DOBRA: Topo */}
      <Navbar waHref={waLink} waText={ctaPrimary} />

      {/* 2ª DOBRA: Hero */}
      <Hero
        title={heroTitle}
        sub={heroSub}
        ctaPrimaryText={ctaPrimary}
        ctaSecondaryText={ctaSecondary}
        waHref={waLink}
        stats={stats}
        heroSelo={heroSelo}
        heroChecklist={heroChecklist}
        heroBadges={heroBadges}
      />

      <Marquee />

      {/* 3ª DOBRA: Problema & Agitação */}
      <DorVirada
        title={dorTitle}
        subtitle={dorSubtitle}
        dorItems={dorItems}
        viradaItems={viradaItems}
      />

      <ParaQuem />

      {/* 4ª DOBRA: A Metodologia */}
      <PreMentoria />

      {/* 5ª DOBRA: A Experiência */}
      <Estrutura
        title={estruturaTitle}
        subtitle={estruturaSub}
        waHref={waLink}
      />

      {/* 6ª DOBRA: Ecossistema */}
      <Ecossistema
        title={ecoTitle}
        sub={ecoSub}
        testimony={ecoTestimony}
        testimonyAuthor={ecoTestimonyAuthor}
        waHref={waLink}
      />

      {/* 7ª DOBRA: A Mentora */}
      <Sobre quote={aboutQuote} bio={aboutBio} waHref={waLink} />

      {/* 7ª DOBRA: Resultados */}
      <section id="resultados">
        {visGallery ? <Gallery /> : null}
        {visDeps ? <Depoimentos /> : null}
      </section>

      {/* 8ª DOBRA: Planos */}
      <Plans dbPlans={plans} waLink={waLink} />

      {/* 8ª DOBRA: Bônus */}
      <Bonus
        title={bonusTitle}
        sub={bonusSub}
        items={bonusItems}
        waHref={waLink}
      />

      {/* 9ª DOBRA: FAQ */}
      <FAQ
        title={faqTitle}
        sub={faqSub}
        items={faqItems}
        waHref={waLink}
      />

      {/* 10ª DOBRA: Rodapé */}
      <Footer waHref={waLink} igHref={igLink} email={contactEmail} />

      <AnimationsProvider />
    </>
  );
}
