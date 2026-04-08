import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import PreMentoria from "@/components/PreMentoria";
import Plans from "@/components/Plans";
import Sobre from "@/components/Sobre";
import Gallery from "@/components/Gallery";
import DorVirada from "@/components/DorVirada";
import Estrutura from "@/components/Estrutura";
import ParaQuem from "@/components/ParaQuem";
import Depoimentos from "@/components/Depoimentos";
import CTAFinal from "@/components/CTAFinal";
import Footer from "@/components/Footer";
import AnimationsProvider from "@/components/AnimationsProvider";
import prisma from "@/lib/db";

export const revalidate = 60;

// Busca dados do banco a cada requisição (ISR pode ser adicionado com revalidate)
async function getSiteData() {
  try {
    const record = await prisma.siteData.findUnique({ where: { id: 1 } });
    return (record?.data as Record<string, unknown>) ?? null;
  } catch {
    // Banco indisponível — usa dados padrão dos componentes
    return null;
  }
}

function normalizeString(v: unknown): string | undefined {
  return typeof v === "string" && v.trim() ? v : undefined;
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
        bonus?: { id: number; value: string }[];
        btn?: string;
      }[]
    | null;
  const waNumber = normalizeString(siteData?.contactWa);
  const waMsg = normalizeString(siteData?.contactWaMsg);
  const waLink = buildWaLink(waNumber, waMsg);
  const igLink = normalizeString(siteData?.contactIg);
  const contactEmail = normalizeString(siteData?.contactEmail);

  const heroTitle = normalizeString(siteData?.txtHeroTitle);
  const heroSub = normalizeString(siteData?.txtHeroSub);
  const ctaPrimary = normalizeString(siteData?.ctaPrimary);
  const ctaSecondary = normalizeString(siteData?.ctaSecondary);
  const aboutQuote = normalizeString(siteData?.txtQuote);
  const aboutBio = normalizeString(siteData?.txtBio);

  const visGallery = Boolean(siteData?.visGallery ?? true);
  const visDeps = Boolean(siteData?.visDeps ?? true);
  const visCursor = Boolean(siteData?.visCursor ?? true);
  const visParticles = Boolean(siteData?.visParticles ?? true);

  const stats = [
    {
      num: normalizeString(siteData?.stat1Num),
      label: normalizeString(siteData?.stat1Label),
    },
    {
      num: normalizeString(siteData?.stat2Num),
      label: normalizeString(siteData?.stat2Label),
    },
    {
      num: normalizeString(siteData?.stat3Num),
      label: normalizeString(siteData?.stat3Label),
    },
  ].filter((s): s is { num: string; label: string } => Boolean(s.num && s.label));

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

      <Navbar waHref={waLink} waText={ctaPrimary} />
      <Hero
        title={heroTitle}
        sub={heroSub}
        ctaPrimaryText={ctaPrimary}
        ctaSecondaryText={ctaSecondary}
        waHref={waLink}
        stats={stats}
      />
      <Marquee />
      <PreMentoria />
      {/* Plans recebe dados dinâmicos do banco — fallback automático para defaults */}
      <Plans dbPlans={plans} waLink={waLink} />
      <Sobre quote={aboutQuote} bio={aboutBio} />
      {visGallery ? <Gallery /> : null}
      <DorVirada />
      <Estrutura />
      <ParaQuem />
      {visDeps ? <Depoimentos /> : null}
      <CTAFinal waHref={waLink} />
      <Footer waHref={waLink} igHref={igLink} email={contactEmail} />

      {/* Client-side: cursor, partículas, scroll reveal, contadores */}
      <AnimationsProvider />
    </>
  );
}
