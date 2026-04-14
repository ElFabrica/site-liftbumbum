"use client";

import { useState, useEffect, useCallback } from "react";

/* ------------------------------------------------------------------ */
/* TYPES                                                                */
/* ------------------------------------------------------------------ */
interface TrackingItem {
  id: number;
  type: "fb" | "google" | "gtm" | "custom";
  name: string;
  code: string;
}

interface PlanFeature {
  id: number;
  value: string;
}
interface Plan {
  name: string;
  price: string;
  priceNote: string;
  sub: string;
  features: PlanFeature[];
  bonus?: PlanFeature[];
  btn: string;
}

interface BonusItemAdmin {
  id: number;
  title: string;
  desc: string;
  originalPrice: string;
  note: string;
}
interface FAQItemAdmin {
  id: number;
  q: string;
  a: string;
}

interface AdminData {
  txtHeroTitle: string;
  txtHeroSub: string;
  heroSelo: string;
  heroChecklist: string[];
  heroBadges: string[];
  ctaPrimary: string;
  ctaSecondary: string;
  stat1Num: string;
  stat1Label: string;
  stat2Num: string;
  stat2Label: string;
  stat3Num: string;
  stat3Label: string;
  txtQuote: string;
  txtBio: string;
  dorTitle: string;
  dorSubtitle: string;
  dorItems: string[];
  viradaItems: string[];
  ecoTitle: string;
  ecoSub: string;
  ecoTestimony: string;
  ecoTestimonyAuthor: string;
  estruturaTitle: string;
  estruturaSub: string;
  bonusTitle: string;
  bonusSub: string;
  bonusItems: BonusItemAdmin[];
  faqTitle: string;
  faqSub: string;
  faqItems: FAQItemAdmin[];
  plans: Plan[];
  contactWa: string;
  contactWaMsg: string;
  contactIg: string;
  contactEmail: string;
  contactDomain: string;
  colorGold: string;
  colorBg: string;
  visGallery: boolean;
  visInstagram: boolean;
  visDeps: boolean;
  visCursor: boolean;
  visParticles: boolean;
}

const DEFAULT_DATA: AdminData = {
  txtHeroTitle: "Domine o Método LiftBumbum®: A Técnica de Harmonização de Glúteos que une Ciência, Segurança e Alta Lucratividade",
  txtHeroSub:
    "Imersão VIP Presencial com modelos reais — aprenda tudo que faço para faturar +1MM/ano em apenas 3 dias.",
  heroSelo: "MÉTODO REGISTRADO ® | VAGAS LIMITADAS PARA PROFISSIONAIS DE ELITE",
  heroChecklist: [
    "Domínio Técnico Avançado: Protocolos exclusivos com Bioestimuladores e Ácido Hialurônico para resultados imediatos e duradouros.",
    "Hands-On com Modelos Reais: Prática supervisionada individualmente sob o olhar da Dra. Thaine, com segurança total.",
    "Aceleração de Negócio & Marketing: O 'Dia 3' focado em Business — Instagram, scripts de vendas e captação de pacientes de alto padrão.",
    "Networking e Comunidade VIP: Faça parte de um ecossistema de profissionais referências no Brasil.",
    "Mentoria e Suporte por 6 Meses: Canal direto para análise de casos clínicos e suporte técnico por 180 dias.",
    "Bônus Exclusivo: Kit de Marketing (fotos e vídeos profissionais) + Certificado de Especialista Licenciada.",
  ],
  heroBadges: [
    "+500 Alunas Formadas",
    "Método com Marca Registrada",
    "Fature +5 dígitos em 30 dias",
  ],
  ctaPrimary: "Quero Garantir Minha Vaga",
  ctaSecondary: "Ver Planos",
  stat1Num: "500+",
  stat1Label: "Alunas Formadas",
  stat2Num: "R$3k–12k",
  stat2Label: "Por Protocolo",
  stat3Num: "3 Dias",
  stat3Label: "Imersão Completa",
  txtQuote:
    "Meu objetivo não é apenas te ensinar a aplicar um produto, é te ensinar a construir um império na estética através da segurança e do resultado impecável.",
  txtBio:
    "Especialista em harmonização corporal e criadora do revolucionário Método LiftBumbum®, a Dra. Thaine Malinowski é referência nacional em estética avançada. Com anos de prática clínica intensa e milhares de procedimentos realizados, ela desenvolveu uma metodologia que une o rigor científico à estética de alto padrão.",
  dorTitle: "Até quando você será \"apenas mais uma\" na estética enquanto seus concorrentes crescem e dominam sua região?",
  dorSubtitle: "Cursos rasos, técnicas que não entregam o que prometem e a eterna guerra de preços por pacientes que não valorizam seu trabalho. Se você está cansada de agendas vazias e insegurança na aplicação, o problema não é você — é a sua metodologia.",
  dorItems: [
    "Medo de intercorrências por falta de base anatômica.",
    "Dificuldade em cobrar caro e ser valorizada pelos pacientes.",
    "Resultados que desaparecem em poucos meses.",
    "Depende exclusivamente de indicação para conseguir novos clientes.",
    "Cursos rasos, técnicas que não entregam o que prometem e a eterna guerra de preços.",
  ],
  viradaItems: [
    "Dominando o Método LiftBumbum® com segurança técnica total.",
    "Cobrando de R$ 3.000 a R$ 12.000 por protocolo com confiança.",
    "Resultados imediatos e duradouros que fidelizam pacientes.",
    "Atraindo pacientes de alto padrão pelo posicionamento, não pelo preço.",
    "Suporte contínuo e uma rede exclusiva de profissionais referências.",
  ],
  ecoTitle: "Você nunca estará sozinha na sua jornada.",
  ecoSub: "A Mentoria LiftBumbum® não termina quando o terceiro dia acaba. Você entra para um ecossistema desenhado para garantir sua evolução contínua e resultado.",
  ecoTestimony: "O diferencial da Thaine é que ela não some. Quando tive minha primeira dúvida no consultório, a equipe me respondeu em minutos. Isso não tem preço.",
  ecoTestimonyAuthor: "Dra. Juliana — Aluna Master",
  estruturaTitle: "3 dias que vão mudar o patamar do seu faturamento, conhecimento e posicionamento.",
  estruturaSub: "Uma jornada intensiva que vai do diagnóstico de luxo ao fechamento de contratos de alto ticket.",
  bonusTitle: "O seu sucesso não pode esperar.",
  bonusSub: "Além de toda a imersão presencial, você receberá um pacote de ferramentas prontas para acelerar o retorno do seu investimento.",
  bonusItems: [
    { id: 1, title: 'Kit de Marketing "Ready-to-Post"', desc: "05 fotos em alta resolução e 02 vídeos (Reels) de você em ação durante a mentoria.", originalPrice: "R$ 1.200,00", note: "Incluído nos planos Master/VIP" },
    { id: 2, title: 'Script de Vendas "Fechamento de Luxo"', desc: "O passo a passo exato de como abordar e converter o lead que chega perguntando o preço.", originalPrice: "R$ 497,00", note: "Incluído em todos os planos" },
    { id: 3, title: "Pack de Artes e Identidade Visual", desc: "Modelos de posts e stories editáveis no Canva com a estética do LiftBumbum®.", originalPrice: "R$ 350,00", note: "Incluído em todos os planos" },
    { id: 4, title: "Guia de Fornecedores e Descontos Exclusivos", desc: "Lista VIP de fornecedores parceiros com condições e descontos exclusivos na compra de injetáveis.", originalPrice: "Inestimável", note: "Incluído em todos os planos" },
  ],
  faqTitle: "Ainda tem alguma dúvida?",
  faqSub: "Respondemos às perguntas mais comuns para que você tome sua decisão com total segurança.",
  faqItems: [
    { id: 1, q: "Para quem é esta mentoria?", a: "A Mentoria LiftBumbum® é exclusiva para profissionais da área da saúde e estética (médicos, biomédicos, enfermeiros estetas, fisioterapeutas, farmacêuticos estetas e esteticistas graduados) que desejam dominar técnicas avançadas de harmonização de glúteos." },
    { id: 2, q: "Preciso ter experiência prévia com injetáveis?", a: "Não é obrigatório ter experiência avançada, pois cobrimos desde a base anatômica até a prática hands-on. No entanto, é necessário ter a formação que permita legalmente a atuação na área." },
    { id: 3, q: "Onde e quando acontece a próxima turma?", a: "Nossas imersões presenciais acontecem em Manaus/AM, em uma estrutura clínica de alto padrão. Para consultar as datas da próxima turma disponível, clique no botão de WhatsApp e fale com nossa consultora de vagas." },
    { id: 4, q: "Como funciona o suporte pós-mentoria?", a: "Diferente de cursos comuns, você terá 180 dias (6 meses) de suporte técnico para enviar casos clínicos, fotos e dúvidas diretamente para nossa equipe." },
    { id: 5, q: "O material de aplicação está incluso na prática?", a: "Sim! Todo o material (bioestimuladores, preenchedores, cânulas e descartáveis) para a prática nas modelos está incluso. Você só precisa trazer seu jaleco e sua vontade de aprender." },
    { id: 6, q: "Posso parcelar o valor da inscrição?", a: "Sim. Facilitamos o seu investimento com entrada no Pix e o restante em até 12x no cartão de crédito, sendo possível utilizar até dois cartões diferentes." },
  ],
  plans: [
    {
      name: "Experience Silver",
      price: "5.500",
      priceNote: "12x de R$ 552,20",
      sub: "Para quem deseja entrar no método com base sólida e prática real.",
      btn: "Quero o Silver",
      features: [
        { id: 1, value: "03 dias de mentoria VIP presencial" },
        { id: 2, value: "Suporte online por 6 meses" },
        { id: 3, value: "Cupons de desconto e material incluso" },
        { id: 4, value: "Certificado" },
      ],
    },
    {
      name: "Experience VIP",
      price: "8.888",
      priceNote: "12x de R$ 888,80",
      sub: "Para quem quer ir além da técnica e viver proximidade, estratégia e crescimento.",
      btn: "Quero o VIP",
      features: [
        { id: 1, value: "03 dias de mentoria VIP presencial" },
        { id: 2, value: "03 dias de almoço com a Dra. Thaine" },
        { id: 3, value: "Atendimento na 2ª maca" },
        { id: 4, value: "Suporte online por 6 meses" },
        { id: 5, value: "Treinamento de vendas e posicionamento" },
        { id: 6, value: "Cupons de desconto e material incluso" },
        { id: 7, value: "Certificado" },
      ],
    },
    {
      name: "Experience Master",
      price: "9.990",
      priceNote: "12x de R$ 999,00",
      sub: "Para quem quer viver o nível mais alto da experiência.",
      btn: "Quero o Master",
      features: [
        { id: 1, value: "03 dias de mentoria VIP presencial" },
        { id: 2, value: "03 dias de almoço com a Dra. Thaine" },
        { id: 3, value: "Atendimento na 1ª maca (protagonismo total)" },
        { id: 4, value: "Suporte online por 6 meses" },
        { id: 5, value: "Treinamento de vendas e posicionamento" },
        { id: 6, value: "50% de desconto na mentoria individual" },
        { id: 7, value: "Cupons de desconto e material incluso" },
      ],
      bonus: [
        { id: 1, value: "05 fotos profissionais editadas" },
        { id: 2, value: "02 vídeos editados dos seus atendimentos" },
      ],
    },
  ],
  contactWa: "559286062977",
  contactWaMsg: "",
  contactIg: "https://www.instagram.com/drathainemalinowski",
  contactEmail: "contato@drathainemalinowski.com",
  contactDomain: "https://www.drathainemalinowski.com",
  colorGold: "#C8A96E",
  colorBg: "#070707",
  visGallery: true,
  visInstagram: true,
  visDeps: true,
  visCursor: true,
  visParticles: true,
};

/* ------------------------------------------------------------------ */
/* ADMIN PAGE                                                           */
/* ------------------------------------------------------------------ */
export default function AdminPage() {
  const [authed, setAuthed] = useState<boolean | null>(null); // null = verificando
  const [loginPass, setLoginPass] = useState("");
  const [loginErr, setLoginErr] = useState("");
  const [activeTab, setActiveTab] = useState("textos");
  const [saveMsg, setSaveMsg] = useState("");
  const [saveMsgType, setSaveMsgType] = useState<"ok" | "err">("ok");
  const [data, setData] = useState<AdminData>(DEFAULT_DATA);
  const [tracking, setTracking] = useState<TrackingItem[]>([]);
  const [loading, setLoading] = useState(false);

  /* ---- verificar auth e carregar dados ao montar ---- */
  useEffect(() => {
    const init = async () => {
      try {
        const authRes = await fetch("/api/admin/auth");
        const { authed: isAuth } = await authRes.json();
        setAuthed(isAuth);

        if (isAuth) {
          const [dataRes, trackRes] = await Promise.all([
            fetch("/api/admin/data"),
            fetch("/api/admin/tracking"),
          ]);
          const dbData = await dataRes.json();
          const dbTracking = await trackRes.json();

          if (dbData && Object.keys(dbData).length > 0) {
            setData((prev) => ({ ...prev, ...dbData }));
          }
          if (Array.isArray(dbTracking)) {
            setTracking(dbTracking);
          }
        }
      } catch {
        setAuthed(false);
      }
    };
    init();
  }, []);

  /* ---- LOGIN ---- */
  const doLogin = async () => {
    setLoginErr("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: loginPass }),
      });
      if (!res.ok) {
        const err = await res.json();
        setLoginErr(err.error ?? "Senha incorreta.");
        return;
      }
      // Carregar dados após login
      const [dataRes, trackRes] = await Promise.all([
        fetch("/api/admin/data"),
        fetch("/api/admin/tracking"),
      ]);
      const dbData = await dataRes.json();
      const dbTracking = await trackRes.json();
      if (dbData && Object.keys(dbData).length > 0) {
        setData((prev) => ({ ...prev, ...dbData }));
      }
      if (Array.isArray(dbTracking)) setTracking(dbTracking);
      setAuthed(true);
    } catch {
      setLoginErr("Erro de conexão. Tente novamente.");
    }
  };

  /* ---- LOGOUT ---- */
  const doLogout = async () => {
    await fetch("/api/admin/login", { method: "DELETE" });
    setAuthed(false);
    setLoginPass("");
  };

  /* ---- SALVAR TUDO ---- */
  const saveAll = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Erro ao salvar");
      setSaveMsg("✓ Salvo com sucesso!");
      setSaveMsgType("ok");
    } catch {
      setSaveMsg("✗ Erro ao salvar.");
      setSaveMsgType("err");
    } finally {
      setLoading(false);
      setTimeout(() => setSaveMsg(""), 3000);
    }
  };

  /* ---- HELPERS DE DATA ---- */
  const setField = (key: keyof AdminData, val: unknown) =>
    setData((d) => ({ ...d, [key]: val }));

  const updatePlan = (idx: number, field: keyof Plan, val: unknown) =>
    setData((d) => {
      const plans = [...d.plans];
      plans[idx] = { ...plans[idx], [field]: val };
      return { ...d, plans };
    });

  const addFeature = (planIdx: number, isBonus = false) =>
    setData((d) => {
      const plans = [...d.plans];
      const list: PlanFeature[] = [
        ...(isBonus ? (plans[planIdx].bonus ?? []) : plans[planIdx].features),
        { id: Date.now(), value: "" },
      ];
      plans[planIdx] = {
        ...plans[planIdx],
        [isBonus ? "bonus" : "features"]: list,
      };
      return { ...d, plans };
    });

  const removeFeature = (planIdx: number, featId: number, isBonus = false) =>
    setData((d) => {
      const plans = [...d.plans];
      const list = (
        isBonus ? (plans[planIdx].bonus ?? []) : plans[planIdx].features
      ).filter((f) => f.id !== featId);
      plans[planIdx] = {
        ...plans[planIdx],
        [isBonus ? "bonus" : "features"]: list,
      };
      return { ...d, plans };
    });

  const updateFeature = (
    planIdx: number,
    featId: number,
    val: string,
    isBonus = false,
  ) =>
    setData((d) => {
      const plans = [...d.plans];
      const list = (
        isBonus ? (plans[planIdx].bonus ?? []) : plans[planIdx].features
      ).map((f) => (f.id === featId ? { ...f, value: val } : f));
      plans[planIdx] = {
        ...plans[planIdx],
        [isBonus ? "bonus" : "features"]: list,
      };
      return { ...d, plans };
    });

  /* ---- TRACKING (via API individual) ---- */
  const addTracking = async (type: TrackingItem["type"]) => {
    try {
      const res = await fetch("/api/admin/tracking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, name: "", code: "" }),
      });
      const item = await res.json();
      setTracking((t) => [...t, item]);
    } catch {
      setSaveMsg("✗ Erro ao adicionar rastreador.");
      setSaveMsgType("err");
      setTimeout(() => setSaveMsg(""), 3000);
    }
  };

  const removeTracking = async (id: number) => {
    try {
      await fetch(`/api/admin/tracking/${id}`, { method: "DELETE" });
      setTracking((t) => t.filter((i) => i.id !== id));
    } catch {
      setSaveMsg("✗ Erro ao remover rastreador.");
      setSaveMsgType("err");
      setTimeout(() => setSaveMsg(""), 3000);
    }
  };

  const updateTracking = useCallback(
    async (id: number, key: "name" | "code" | "type", val: string) => {
      setTracking((t) =>
        t.map((i) => (i.id === id ? { ...i, [key]: val } : i)),
      );
    },
    [],
  );

  const saveTracking = async (item: TrackingItem) => {
    try {
      await fetch(`/api/admin/tracking/${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: item.type,
          name: item.name,
          code: item.code,
        }),
      });
    } catch {
      setSaveMsg("✗ Erro ao salvar rastreador.");
      setSaveMsgType("err");
      setTimeout(() => setSaveMsg(""), 3000);
    }
  };

  /* ---------------------------------------------------------------- */
  /* TABS CONFIG                                                        */
  /* ---------------------------------------------------------------- */
  const TABS = [
    { id: "textos", icon: "✏️", label: "Textos" },
    { id: "secoes", icon: "📄", label: "Seções" },
    { id: "planos", icon: "💎", label: "Planos" },
    { id: "rastreamento", icon: "📡", label: "Rastreamento" },
    { id: "contato", icon: "📞", label: "Contato" },
    { id: "aparencia", icon: "🎨", label: "Aparência" },
  ];

  /* ---- Helpers for array fields ---- */
  const updateStringArray = (key: keyof AdminData, idx: number, val: string) =>
    setData((d) => {
      const arr = [...(d[key] as string[])];
      arr[idx] = val;
      return { ...d, [key]: arr };
    });

  const addStringItem = (key: keyof AdminData) =>
    setData((d) => ({ ...d, [key]: [...(d[key] as string[]), ""] }));

  const removeStringItem = (key: keyof AdminData, idx: number) =>
    setData((d) => {
      const arr = (d[key] as string[]).filter((_, i) => i !== idx);
      return { ...d, [key]: arr };
    });

  const addFaqItem = () =>
    setData((d) => ({
      ...d,
      faqItems: [...d.faqItems, { id: Date.now(), q: "", a: "" }],
    }));

  const removeFaqItem = (id: number) =>
    setData((d) => ({ ...d, faqItems: d.faqItems.filter((f) => f.id !== id) }));

  const updateFaqItem = (id: number, field: "q" | "a", val: string) =>
    setData((d) => ({
      ...d,
      faqItems: d.faqItems.map((f) => (f.id === id ? { ...f, [field]: val } : f)),
    }));

  const updateBonusItem = (id: number, field: keyof BonusItemAdmin, val: string) =>
    setData((d) => ({
      ...d,
      bonusItems: d.bonusItems.map((b) => (b.id === id ? { ...b, [field]: val } : b)),
    }));

  const TRACKING_CFG: Record<
    string,
    { label: string; placeholder: string; hint: string; badgeClass: string }
  > = {
    fb: {
      label: "Facebook Pixel",
      placeholder: "ID do Pixel (ex: 1234567890123456)",
      hint: "Insira apenas o ID numérico do Pixel do Facebook/Meta.",
      badgeClass: "fb",
    },
    google: {
      label: "Google Analytics 4",
      placeholder: "Measurement ID (ex: G-XXXXXXXXXX)",
      hint: "GA4 → Admin → Data Streams → Measurement ID.",
      badgeClass: "google",
    },
    gtm: {
      label: "Google Tag Manager",
      placeholder: "Container ID (ex: GTM-XXXXXXX)",
      hint: "GTM → Seu container → ID do container.",
      badgeClass: "gtm",
    },
    custom: {
      label: "Script Personalizado",
      placeholder: "Nome / descrição (ex: TikTok Pixel)",
      hint: "Cole o código HTML completo abaixo.",
      badgeClass: "custom",
    },
  };

  const planEmojis = ["💎", "💎", "👑"];

  /* ---------------------------------------------------------------- */
  /* LOADING SCREEN                                                     */
  /* ---------------------------------------------------------------- */
  if (authed === null) {
    return (
      <div style={{ ...styles.loginWrap, flexDirection: "column", gap: 16 }}>
        <div
          style={{
            width: 36,
            height: 36,
            border: "3px solid #C8A96E33",
            borderTopColor: "#C8A96E",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
          }}
        />
        <div style={{ color: "#888", fontSize: 13 }}>Verificando sessão…</div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  /* ---------------------------------------------------------------- */
  /* LOGIN SCREEN                                                       */
  /* ---------------------------------------------------------------- */
  if (!authed) {
    return (
      <div style={styles.loginWrap}>
        <div style={styles.loginBox}>
          <svg
            viewBox="0 0 200 48"
            fill="none"
            style={{ width: 160, marginBottom: 28 }}
          >
            <text
              x="0"
              y="20"
              fontFamily="serif"
              fontSize="18"
              fontWeight="300"
              fill="white"
              letterSpacing="1"
            >
              Dra. Thaine
            </text>
            <text
              x="0"
              y="38"
              fontFamily="serif"
              fontSize="18"
              fontStyle="italic"
              fontWeight="400"
              fill="#C8A96E"
              letterSpacing="1"
            >
              Malinowski
            </text>
            <line
              x1="0"
              y1="44"
              x2="148"
              y2="44"
              stroke="#C8A96E"
              strokeWidth="0.5"
              opacity="0.5"
            />
          </svg>
          <div style={styles.loginTitle}>Painel Administrativo</div>
          <div style={styles.loginSub}>LiftBumbum® — Área Restrita</div>
          <input
            style={{ ...styles.input, marginTop: 20 }}
            type="password"
            placeholder="Senha"
            value={loginPass}
            onChange={(e) => setLoginPass(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && doLogin()}
            autoFocus
          />
          {loginErr && (
            <div style={{ color: "#e05555", fontSize: 12, marginTop: 8 }}>
              {loginErr}
            </div>
          )}
          <button style={styles.loginBtn} onClick={doLogin}>
            Entrar
          </button>
        </div>
      </div>
    );
  }

  /* ---------------------------------------------------------------- */
  /* ADMIN PANEL                                                        */
  /* ---------------------------------------------------------------- */
  return (
    <div style={styles.layout}>
      {/* SIDEBAR */}
      <aside style={styles.sidebar}>
        <div style={styles.sidebarBrand}>
          <svg viewBox="0 0 160 36" fill="none" style={{ width: 130 }}>
            <text
              x="0"
              y="16"
              fontFamily="serif"
              fontSize="14"
              fontWeight="300"
              fill="white"
              letterSpacing="1"
            >
              Dra. Thaine
            </text>
            <text
              x="0"
              y="30"
              fontFamily="serif"
              fontSize="14"
              fontStyle="italic"
              fill="#C8A96E"
              letterSpacing="1"
            >
              Malinowski
            </text>
          </svg>
        </div>
        <div style={{ padding: "8px 12px", flex: 1 }}>
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                ...styles.navItem,
                ...(activeTab === tab.id ? styles.navItemActive : {}),
              }}
            >
              <span style={{ marginRight: 10 }}>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
        <div style={styles.sidebarFooter}>
          <a
            href="/"
            target="_blank"
            style={{
              color: "#888",
              fontSize: 12,
              textDecoration: "none",
              display: "flex",
              gap: 6,
              alignItems: "center",
            }}
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
            </svg>
            Ver site
          </a>
          <button
            onClick={doLogout}
            style={{
              background: "none",
              border: "none",
              color: "#666",
              fontSize: 11,
              cursor: "pointer",
              marginTop: 8,
              padding: "4px 0",
            }}
          >
            Sair
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <div style={styles.main}>
        {/* TOPBAR */}
        <div style={styles.topbar}>
          <div style={{ fontSize: 14, fontWeight: 600 }}>
            {TABS.find((t) => t.id === activeTab)?.label}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            {saveMsg && (
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: saveMsgType === "ok" ? "#5ec77a" : "#e05555",
                }}
              >
                {saveMsg}
              </span>
            )}
            <button
              style={{ ...styles.saveBtn, opacity: loading ? 0.6 : 1 }}
              onClick={saveAll}
              disabled={loading}
            >
              {loading ? "⏳ Salvando…" : "💾 Salvar Alterações"}
            </button>
          </div>
        </div>

        <div style={styles.content}>
          {/* ── TEXTOS ── */}
          {activeTab === "textos" && (
            <div>
              <div style={styles.card}>
                <div style={styles.cardTitle}>Hero — Seção Principal</div>
                <Field label="Título Principal">
                  <textarea
                    style={styles.textarea}
                    rows={2}
                    value={data.txtHeroTitle}
                    onChange={(e) => setField("txtHeroTitle", e.target.value)}
                  />
                </Field>
                <Field label="Subtítulo">
                  <textarea
                    style={styles.textarea}
                    rows={3}
                    value={data.txtHeroSub}
                    onChange={(e) => setField("txtHeroSub", e.target.value)}
                  />
                </Field>
                <div style={styles.twoCol}>
                  <Field label="Botão Principal">
                    <input
                      style={styles.input}
                      value={data.ctaPrimary}
                      onChange={(e) => setField("ctaPrimary", e.target.value)}
                    />
                  </Field>
                  <Field label="Botão Secundário">
                    <input
                      style={styles.input}
                      value={data.ctaSecondary}
                      onChange={(e) => setField("ctaSecondary", e.target.value)}
                    />
                  </Field>
                </div>
              </div>
              <div style={styles.card}>
                <div style={styles.cardTitle}>Estatísticas</div>
                <div style={styles.twoCol}>
                  {(
                    [
                      "stat1Num",
                      "stat1Label",
                      "stat2Num",
                      "stat2Label",
                      "stat3Num",
                      "stat3Label",
                    ] as const
                  ).map((k) => (
                    <Field
                      key={k}
                      label={k
                        .replace(/([A-Z])/g, " $1")
                        .replace("stat", "Stat ")}
                    >
                      <input
                        style={styles.input}
                        value={data[k] as string}
                        onChange={(e) => setField(k, e.target.value)}
                      />
                    </Field>
                  ))}
                </div>
              </div>
              <div style={styles.card}>
                <div style={styles.cardTitle}>Sobre a Dra. Thaine</div>
                <Field label="Citação">
                  <textarea
                    style={styles.textarea}
                    rows={2}
                    value={data.txtQuote}
                    onChange={(e) => setField("txtQuote", e.target.value)}
                  />
                </Field>
                <Field label="Bio">
                  <textarea
                    style={styles.textarea}
                    rows={3}
                    value={data.txtBio}
                    onChange={(e) => setField("txtBio", e.target.value)}
                  />
                </Field>
              </div>
            </div>
          )}

          {/* ── SEÇÕES ── */}
          {activeTab === "secoes" && (
            <div>
              {/* Hero — Selo e Checklist */}
              <div style={styles.card}>
                <div style={styles.cardTitle}>Hero — Selo de Exclusividade</div>
                <Field label="Texto do Selo">
                  <input
                    style={styles.input}
                    value={(data as AdminData).heroSelo}
                    onChange={(e) => setField("heroSelo", e.target.value)}
                  />
                </Field>
              </div>
              <div style={styles.card}>
                <div style={styles.cardTitle}>Hero — Checklist (✅ itens)</div>
                {(data as AdminData).heroChecklist.map((item, idx) => (
                  <div key={idx} style={styles.featureRow}>
                    <input
                      style={{ ...styles.input, flex: 1 }}
                      value={item}
                      onChange={(e) => updateStringArray("heroChecklist", idx, e.target.value)}
                    />
                    <button style={styles.btnDanger} onClick={() => removeStringItem("heroChecklist", idx)}>✕</button>
                  </div>
                ))}
                <button style={styles.btnAdd} onClick={() => addStringItem("heroChecklist")}>+ Adicionar item</button>
              </div>
              <div style={styles.card}>
                <div style={styles.cardTitle}>Hero — Prova Social (badges)</div>
                {(data as AdminData).heroBadges.map((item, idx) => (
                  <div key={idx} style={styles.featureRow}>
                    <input
                      style={{ ...styles.input, flex: 1 }}
                      value={item}
                      onChange={(e) => updateStringArray("heroBadges", idx, e.target.value)}
                    />
                    <button style={styles.btnDanger} onClick={() => removeStringItem("heroBadges", idx)}>✕</button>
                  </div>
                ))}
                <button style={styles.btnAdd} onClick={() => addStringItem("heroBadges")}>+ Adicionar badge</button>
              </div>

              {/* Problema & Agitação */}
              <div style={styles.card}>
                <div style={styles.cardTitle}>Problema & Agitação (3ª Dobra)</div>
                <Field label="Título">
                  <textarea style={styles.textarea} rows={2} value={(data as AdminData).dorTitle} onChange={(e) => setField("dorTitle", e.target.value)} />
                </Field>
                <Field label="Subtítulo">
                  <textarea style={styles.textarea} rows={3} value={(data as AdminData).dorSubtitle} onChange={(e) => setField("dorSubtitle", e.target.value)} />
                </Field>
                <Field label="Itens — Dor (✗)">
                  {(data as AdminData).dorItems.map((item, idx) => (
                    <div key={idx} style={styles.featureRow}>
                      <input style={{ ...styles.input, flex: 1 }} value={item} onChange={(e) => updateStringArray("dorItems", idx, e.target.value)} />
                      <button style={styles.btnDanger} onClick={() => removeStringItem("dorItems", idx)}>✕</button>
                    </div>
                  ))}
                  <button style={styles.btnAdd} onClick={() => addStringItem("dorItems")}>+ Adicionar dor</button>
                </Field>
                <Field label="Itens — Virada (✓)">
                  {(data as AdminData).viradaItems.map((item, idx) => (
                    <div key={idx} style={styles.featureRow}>
                      <input style={{ ...styles.input, flex: 1 }} value={item} onChange={(e) => updateStringArray("viradaItems", idx, e.target.value)} />
                      <button style={styles.btnDanger} onClick={() => removeStringItem("viradaItems", idx)}>✕</button>
                    </div>
                  ))}
                  <button style={styles.btnAdd} onClick={() => addStringItem("viradaItems")}>+ Adicionar virada</button>
                </Field>
              </div>

              {/* Estrutura */}
              <div style={styles.card}>
                <div style={styles.cardTitle}>Cronograma — A Experiência (5ª Dobra)</div>
                <Field label="Título">
                  <textarea style={styles.textarea} rows={2} value={(data as AdminData).estruturaTitle} onChange={(e) => setField("estruturaTitle", e.target.value)} />
                </Field>
                <Field label="Subtítulo">
                  <input style={styles.input} value={(data as AdminData).estruturaSub} onChange={(e) => setField("estruturaSub", e.target.value)} />
                </Field>
              </div>

              {/* Ecossistema */}
              <div style={styles.card}>
                <div style={styles.cardTitle}>Ecossistema & Suporte (6ª Dobra)</div>
                <Field label="Título">
                  <input style={styles.input} value={(data as AdminData).ecoTitle} onChange={(e) => setField("ecoTitle", e.target.value)} />
                </Field>
                <Field label="Subtítulo">
                  <textarea style={styles.textarea} rows={2} value={(data as AdminData).ecoSub} onChange={(e) => setField("ecoSub", e.target.value)} />
                </Field>
                <Field label="Depoimento de Suporte (texto)">
                  <textarea style={styles.textarea} rows={2} value={(data as AdminData).ecoTestimony} onChange={(e) => setField("ecoTestimony", e.target.value)} />
                </Field>
                <Field label="Autora do Depoimento">
                  <input style={styles.input} value={(data as AdminData).ecoTestimonyAuthor} onChange={(e) => setField("ecoTestimonyAuthor", e.target.value)} />
                </Field>
              </div>

              {/* Bônus */}
              <div style={styles.card}>
                <div style={styles.cardTitle}>Bônus Exclusivos (8ª Dobra)</div>
                <Field label="Título">
                  <input style={styles.input} value={(data as AdminData).bonusTitle} onChange={(e) => setField("bonusTitle", e.target.value)} />
                </Field>
                <Field label="Subtítulo">
                  <textarea style={styles.textarea} rows={2} value={(data as AdminData).bonusSub} onChange={(e) => setField("bonusSub", e.target.value)} />
                </Field>
                {(data as AdminData).bonusItems.map((item) => (
                  <div key={item.id} style={{ ...styles.card, border: "1px solid rgba(200,169,110,0.1)", marginTop: 12 }}>
                    <div style={{ fontSize: 12, color: "#C8A96E", fontWeight: 700, marginBottom: 10 }}>Bônus {item.id.toString().padStart(2, "0")}</div>
                    <Field label="Título do Bônus">
                      <input style={styles.input} value={item.title} onChange={(e) => updateBonusItem(item.id, "title", e.target.value)} />
                    </Field>
                    <Field label="Descrição">
                      <textarea style={styles.textarea} rows={2} value={item.desc} onChange={(e) => updateBonusItem(item.id, "desc", e.target.value)} />
                    </Field>
                    <div style={styles.twoCol}>
                      <Field label="Preço Original (riscado)">
                        <input style={styles.input} value={item.originalPrice} onChange={(e) => updateBonusItem(item.id, "originalPrice", e.target.value)} />
                      </Field>
                      <Field label="Nota (ex: Incluso nos planos...)">
                        <input style={styles.input} value={item.note} onChange={(e) => updateBonusItem(item.id, "note", e.target.value)} />
                      </Field>
                    </div>
                  </div>
                ))}
              </div>

              {/* FAQ */}
              <div style={styles.card}>
                <div style={styles.cardTitle}>FAQ — Perguntas Frequentes (9ª Dobra)</div>
                <Field label="Título da Seção">
                  <input style={styles.input} value={(data as AdminData).faqTitle} onChange={(e) => setField("faqTitle", e.target.value)} />
                </Field>
                <Field label="Subtítulo">
                  <input style={styles.input} value={(data as AdminData).faqSub} onChange={(e) => setField("faqSub", e.target.value)} />
                </Field>
                {(data as AdminData).faqItems.map((item) => (
                  <div key={item.id} style={{ ...styles.card, border: "1px solid rgba(200,169,110,0.1)", marginTop: 12 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                      <span style={{ fontSize: 12, color: "#C8A96E", fontWeight: 700 }}>Pergunta {(data as AdminData).faqItems.indexOf(item) + 1}</span>
                      <button style={styles.btnDanger} onClick={() => removeFaqItem(item.id)}>✕ Remover</button>
                    </div>
                    <Field label="Pergunta">
                      <input style={styles.input} value={item.q} onChange={(e) => updateFaqItem(item.id, "q", e.target.value)} />
                    </Field>
                    <Field label="Resposta">
                      <textarea style={styles.textarea} rows={3} value={item.a} onChange={(e) => updateFaqItem(item.id, "a", e.target.value)} />
                    </Field>
                  </div>
                ))}
                <button style={{ ...styles.btnAdd, marginTop: 12 }} onClick={addFaqItem}>+ Adicionar pergunta</button>
              </div>
            </div>
          )}

          {/* ── PLANOS ── */}
          {activeTab === "planos" && (
            <div>
              {data.plans.map((plan, pi) => (
                <div
                  key={pi}
                  style={{
                    ...styles.card,
                    borderColor:
                      pi === 1
                        ? "rgba(200,169,110,0.3)"
                        : "rgba(200,169,110,0.12)",
                  }}
                >
                  <div style={styles.cardTitle}>
                    {planEmojis[pi]} {plan.name}
                    {pi === 1 && (
                      <span style={styles.featuredBadge}>DESTAQUE</span>
                    )}
                  </div>
                  <div style={styles.twoCol}>
                    <Field label="Nome">
                      <input
                        style={styles.input}
                        value={plan.name}
                        onChange={(e) => updatePlan(pi, "name", e.target.value)}
                      />
                    </Field>
                    <Field label="Preço (R$)">
                      <input
                        style={styles.input}
                        value={plan.price}
                        onChange={(e) =>
                          updatePlan(pi, "price", e.target.value)
                        }
                      />
                    </Field>
                  </div>
                  <Field label="Nota de Preço">
                    <input
                      style={styles.input}
                      value={plan.priceNote}
                      onChange={(e) =>
                        updatePlan(pi, "priceNote", e.target.value)
                      }
                    />
                  </Field>
                  <Field label="Descrição">
                    <input
                      style={styles.input}
                      value={plan.sub}
                      onChange={(e) => updatePlan(pi, "sub", e.target.value)}
                    />
                  </Field>
                  <Field label="Itens Inclusos">
                    {plan.features.map((f) => (
                      <div key={f.id} style={styles.featureRow}>
                        <input
                          style={{ ...styles.input, flex: 1 }}
                          value={f.value}
                          onChange={(e) =>
                            updateFeature(pi, f.id, e.target.value)
                          }
                        />
                        <button
                          style={styles.btnDanger}
                          onClick={() => removeFeature(pi, f.id)}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                    <button
                      style={styles.btnAdd}
                      onClick={() => addFeature(pi)}
                    >
                      + Adicionar item
                    </button>
                  </Field>
                  {pi === 2 && (
                    <Field label="🎁 Bônus Exclusivos">
                      {(plan.bonus ?? []).map((f) => (
                        <div key={f.id} style={styles.featureRow}>
                          <input
                            style={{ ...styles.input, flex: 1 }}
                            value={f.value}
                            onChange={(e) =>
                              updateFeature(pi, f.id, e.target.value, true)
                            }
                          />
                          <button
                            style={styles.btnDanger}
                            onClick={() => removeFeature(pi, f.id, true)}
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                      <button
                        style={styles.btnAdd}
                        onClick={() => addFeature(pi, true)}
                      >
                        + Adicionar bônus
                      </button>
                    </Field>
                  )}
                  <Field label="Texto do Botão">
                    <input
                      style={styles.input}
                      value={plan.btn}
                      onChange={(e) => updatePlan(pi, "btn", e.target.value)}
                    />
                  </Field>
                </div>
              ))}
            </div>
          )}

          {/* ── RASTREAMENTO ── */}
          {activeTab === "rastreamento" && (
            <div>
              {/* Status bar */}
              <div style={styles.card}>
                <div style={styles.cardTitle}>Status dos Rastreadores</div>
                <div
                  style={{
                    display: "flex",
                    gap: 10,
                    flexWrap: "wrap" as const,
                    marginTop: 10,
                  }}
                >
                  {(["fb", "google", "gtm", "custom"] as const).map((t) => {
                    const count = tracking.filter((i) => i.type === t).length;
                    const labels: Record<string, string> = {
                      fb: "Facebook Pixel",
                      google: "Google Analytics",
                      gtm: "Google Tag Manager",
                      custom: "Scripts Personalizados",
                    };
                    return (
                      <span
                        key={t}
                        style={{
                          ...styles.statusBadge,
                          ...(count > 0
                            ? styles.statusActive
                            : styles.statusInactive),
                        }}
                      >
                        {labels[t]}
                        {count > 1 ? ` (${count})` : ""}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Botões adicionar */}
              <div style={styles.card}>
                <div style={styles.cardTitle}>Adicionar Rastreador</div>
                <div
                  style={{
                    display: "flex",
                    gap: 10,
                    flexWrap: "wrap" as const,
                    marginTop: 10,
                  }}
                >
                  {(["fb", "google", "gtm", "custom"] as const).map((t) => (
                    <button
                      key={t}
                      style={styles.addTrackingBtn}
                      onClick={() => addTracking(t)}
                    >
                      + {TRACKING_CFG[t].label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Lista de rastreadores */}
              {tracking.length === 0 && (
                <div
                  style={{
                    ...styles.card,
                    textAlign: "center" as const,
                    color: "#555",
                    padding: "32px 20px",
                  }}
                >
                  Nenhum rastreador configurado. Use os botões acima para
                  adicionar.
                </div>
              )}
              {tracking.map((item) => {
                const cfg = TRACKING_CFG[item.type];
                return (
                  <div key={item.id} style={styles.card}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 14,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                        }}
                      >
                        <span
                          style={{
                            ...styles.typeBadge,
                            ...(styles[
                              `badge_${item.type}` as keyof typeof styles
                            ] as object),
                          }}
                        >
                          {cfg.label}
                        </span>
                      </div>
                      <button
                        style={styles.btnDanger}
                        onClick={() => removeTracking(item.id)}
                      >
                        ✕ Remover
                      </button>
                    </div>
                    <Field
                      label={
                        item.type === "custom" ? "Nome / Descrição" : cfg.label
                      }
                    >
                      <input
                        style={styles.input}
                        placeholder={cfg.placeholder}
                        value={item.name}
                        onChange={(e) =>
                          updateTracking(item.id, "name", e.target.value)
                        }
                        onBlur={() => saveTracking(item)}
                      />
                    </Field>
                    <div
                      style={{ fontSize: 11, color: "#666", marginBottom: 10 }}
                    >
                      {cfg.hint}
                    </div>
                    {item.type === "custom" && (
                      <Field label="Código HTML Completo">
                        <textarea
                          style={{
                            ...styles.textarea,
                            fontFamily: "monospace",
                            fontSize: 12,
                          }}
                          rows={6}
                          placeholder="<script>...</script>"
                          value={item.code}
                          onChange={(e) =>
                            updateTracking(item.id, "code", e.target.value)
                          }
                          onBlur={() => saveTracking(item)}
                        />
                      </Field>
                    )}
                    {item.type !== "custom" && item.name && (
                      <div style={styles.codePreview}>
                        {item.type === "fb" && `fbq('init', '${item.name}');`}
                        {item.type === "google" &&
                          `gtag('config', '${item.name}');`}
                        {item.type === "gtm" && `GTM-ID: ${item.name}`}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* ── CONTATO ── */}
          {activeTab === "contato" && (
            <div style={styles.card}>
              <div style={styles.cardTitle}>Links e Contato</div>
              <Field label="WhatsApp (apenas números)">
                <input
                  style={styles.input}
                  value={data.contactWa}
                  onChange={(e) => setField("contactWa", e.target.value)}
                />
              </Field>
              <Field label="Mensagem padrão WhatsApp">
                <input
                  style={styles.input}
                  value={data.contactWaMsg}
                  onChange={(e) => setField("contactWaMsg", e.target.value)}
                />
              </Field>
              <Field label="Instagram (URL completa)">
                <input
                  style={styles.input}
                  value={data.contactIg}
                  onChange={(e) => setField("contactIg", e.target.value)}
                />
              </Field>
              <Field label="E-mail">
                <input
                  style={styles.input}
                  value={data.contactEmail}
                  onChange={(e) => setField("contactEmail", e.target.value)}
                />
              </Field>
              <Field label="Domínio do Site">
                <input
                  style={styles.input}
                  value={data.contactDomain}
                  onChange={(e) => setField("contactDomain", e.target.value)}
                />
              </Field>
            </div>
          )}

          {/* ── APARÊNCIA ── */}
          {activeTab === "aparencia" && (
            <div>
              <div style={styles.card}>
                <div style={styles.cardTitle}>Cores</div>
                <div style={styles.twoCol}>
                  <Field label="Cor Dourada (destaque)">
                    <div
                      style={{ display: "flex", gap: 10, alignItems: "center" }}
                    >
                      <input
                        type="color"
                        value={data.colorGold}
                        onChange={(e) => setField("colorGold", e.target.value)}
                        style={{
                          width: 42,
                          height: 36,
                          border: "none",
                          background: "none",
                          cursor: "pointer",
                        }}
                      />
                      <input
                        style={{ ...styles.input, flex: 1 }}
                        value={data.colorGold}
                        onChange={(e) => setField("colorGold", e.target.value)}
                      />
                    </div>
                  </Field>
                  <Field label="Cor de Fundo">
                    <div
                      style={{ display: "flex", gap: 10, alignItems: "center" }}
                    >
                      <input
                        type="color"
                        value={data.colorBg}
                        onChange={(e) => setField("colorBg", e.target.value)}
                        style={{
                          width: 42,
                          height: 36,
                          border: "none",
                          background: "none",
                          cursor: "pointer",
                        }}
                      />
                      <input
                        style={{ ...styles.input, flex: 1 }}
                        value={data.colorBg}
                        onChange={(e) => setField("colorBg", e.target.value)}
                      />
                    </div>
                  </Field>
                </div>
              </div>
              <div style={styles.card}>
                <div style={styles.cardTitle}>Visibilidade de Seções</div>
                {(
                  [
                    ["visGallery", "Galeria de Fotos"],
                    ["visInstagram", "Feed do Instagram"],
                    ["visDeps", "Depoimentos"],
                    ["visCursor", "Cursor Personalizado"],
                    ["visParticles", "Partículas Animadas"],
                  ] as const
                ).map(([k, label]) => (
                  <label
                    key={k}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      marginBottom: 14,
                      cursor: "pointer",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={data[k]}
                      onChange={(e) => setField(k, e.target.checked)}
                      style={{ width: 16, height: 16, accentColor: "#C8A96E" }}
                    />
                    <span style={{ color: "#ccc", fontSize: 14 }}>{label}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* FIELD WRAPPER                                                        */
/* ------------------------------------------------------------------ */
function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label
        style={{
          display: "block",
          fontSize: 11,
          fontWeight: 600,
          color: "#888",
          textTransform: "uppercase" as const,
          letterSpacing: "0.06em",
          marginBottom: 6,
        }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* STYLES                                                               */
/* ------------------------------------------------------------------ */
const styles = {
  loginWrap: {
    minHeight: "100vh",
    background: "#070707",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  } as React.CSSProperties,
  loginBox: {
    background: "#111",
    border: "1px solid rgba(200,169,110,0.2)",
    borderRadius: 16,
    padding: "48px 40px",
    width: 360,
    display: "flex",
    flexDirection: "column" as const,
  } as React.CSSProperties,
  loginTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: 600,
    marginBottom: 4,
  } as React.CSSProperties,
  loginSub: {
    color: "#666",
    fontSize: 12,
    marginBottom: 8,
  } as React.CSSProperties,
  loginBtn: {
    marginTop: 18,
    padding: "12px 0",
    background: "linear-gradient(135deg,#C8A96E,#a8893e)",
    border: "none",
    borderRadius: 8,
    color: "#070707",
    fontWeight: 700,
    fontSize: 14,
    cursor: "pointer",
    letterSpacing: "0.04em",
  } as React.CSSProperties,

  layout: {
    display: "flex",
    minHeight: "100vh",
    background: "#0a0a0a",
    color: "#ccc",
    fontFamily: "system-ui, sans-serif",
  } as React.CSSProperties,
  sidebar: {
    width: 220,
    background: "#111",
    borderRight: "1px solid rgba(200,169,110,0.1)",
    display: "flex",
    flexDirection: "column" as const,
    flexShrink: 0,
  } as React.CSSProperties,
  sidebarBrand: {
    padding: "24px 20px 16px",
    borderBottom: "1px solid rgba(200,169,110,0.1)",
  } as React.CSSProperties,
  sidebarFooter: {
    padding: "16px 20px",
    borderTop: "1px solid rgba(200,169,110,0.1)",
    display: "flex",
    flexDirection: "column" as const,
  } as React.CSSProperties,
  navItem: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    padding: "10px 14px",
    background: "none",
    border: "none",
    color: "#888",
    fontSize: 13,
    cursor: "pointer",
    borderRadius: 8,
    marginBottom: 2,
    textAlign: "left" as const,
    transition: "all .15s",
  } as React.CSSProperties,
  navItemActive: {
    background: "rgba(200,169,110,0.12)",
    color: "#C8A96E",
  } as React.CSSProperties,

  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column" as const,
    overflow: "hidden",
  } as React.CSSProperties,
  topbar: {
    height: 56,
    background: "#111",
    borderBottom: "1px solid rgba(200,169,110,0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 24px",
    flexShrink: 0,
  } as React.CSSProperties,
  content: { flex: 1, overflow: "auto", padding: 24 } as React.CSSProperties,

  saveBtn: {
    padding: "8px 18px",
    background: "linear-gradient(135deg,#C8A96E,#a8893e)",
    border: "none",
    borderRadius: 8,
    color: "#070707",
    fontWeight: 700,
    fontSize: 12,
    cursor: "pointer",
  } as React.CSSProperties,

  card: {
    background: "#111",
    border: "1px solid rgba(200,169,110,0.12)",
    borderRadius: 12,
    padding: "20px 22px",
    marginBottom: 20,
  } as React.CSSProperties,
  cardTitle: {
    color: "#C8A96E",
    fontSize: 13,
    fontWeight: 700,
    letterSpacing: "0.06em",
    textTransform: "uppercase" as const,
    marginBottom: 18,
  } as React.CSSProperties,

  input: {
    width: "100%",
    background: "#1a1a1a",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 8,
    padding: "9px 12px",
    color: "#ddd",
    fontSize: 13,
    outline: "none",
    boxSizing: "border-box" as const,
  } as React.CSSProperties,
  textarea: {
    width: "100%",
    background: "#1a1a1a",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 8,
    padding: "9px 12px",
    color: "#ddd",
    fontSize: 13,
    outline: "none",
    resize: "vertical" as const,
    boxSizing: "border-box" as const,
  } as React.CSSProperties,
  twoCol: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 16,
  } as React.CSSProperties,
  featureRow: {
    display: "flex",
    gap: 8,
    marginBottom: 8,
  } as React.CSSProperties,
  btnAdd: {
    padding: "7px 14px",
    background: "rgba(200,169,110,0.1)",
    border: "1px solid rgba(200,169,110,0.3)",
    borderRadius: 6,
    color: "#C8A96E",
    fontSize: 12,
    cursor: "pointer",
    marginTop: 4,
  } as React.CSSProperties,
  btnDanger: {
    padding: "7px 12px",
    background: "rgba(224,85,85,0.1)",
    border: "1px solid rgba(224,85,85,0.3)",
    borderRadius: 6,
    color: "#e05555",
    fontSize: 12,
    cursor: "pointer",
  } as React.CSSProperties,

  addTrackingBtn: {
    padding: "9px 16px",
    background: "rgba(200,169,110,0.08)",
    border: "1px solid rgba(200,169,110,0.25)",
    borderRadius: 8,
    color: "#C8A96E",
    fontSize: 12,
    cursor: "pointer",
  } as React.CSSProperties,
  typeBadge: {
    padding: "4px 10px",
    borderRadius: 20,
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "0.04em",
  } as React.CSSProperties,
  badge_fb: {
    background: "rgba(24,119,242,0.15)",
    color: "#5b9bf8",
  } as React.CSSProperties,
  badge_google: {
    background: "rgba(234,67,53,0.15)",
    color: "#f28b82",
  } as React.CSSProperties,
  badge_gtm: {
    background: "rgba(52,168,83,0.15)",
    color: "#81c995",
  } as React.CSSProperties,
  badge_custom: {
    background: "rgba(200,169,110,0.15)",
    color: "#C8A96E",
  } as React.CSSProperties,
  statusBadge: {
    padding: "5px 12px",
    borderRadius: 20,
    fontSize: 11,
    fontWeight: 600,
  } as React.CSSProperties,
  statusActive: {
    background: "rgba(94,199,122,0.15)",
    color: "#5ec77a",
  } as React.CSSProperties,
  statusInactive: {
    background: "rgba(255,255,255,0.05)",
    color: "#555",
  } as React.CSSProperties,
  codePreview: {
    background: "#0d0d0d",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: 6,
    padding: "8px 12px",
    fontFamily: "monospace",
    fontSize: 12,
    color: "#C8A96E",
    marginTop: 8,
  } as React.CSSProperties,
  featuredBadge: {
    marginLeft: 10,
    background: "rgba(200,169,110,0.15)",
    color: "#C8A96E",
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: "0.08em",
    padding: "2px 8px",
    borderRadius: 20,
  } as React.CSSProperties,
};
