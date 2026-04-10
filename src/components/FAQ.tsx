"use client";

import { useState } from "react";

export interface FAQItem {
  id: number;
  q: string;
  a: string;
}

export interface FAQProps {
  title?: string;
  sub?: string;
  items?: FAQItem[];
  waHref?: string;
}

const DEFAULT_FAQ: FAQItem[] = [
  {
    id: 1,
    q: "Para quem é esta mentoria?",
    a: "A Mentoria LiftBumbum® é exclusiva para profissionais da área da saúde e estética (médicos, biomédicos, enfermeiros estetas, fisioterapeutas dermatofuncionais, farmacêuticos estetas e esteticistas graduados) que desejam dominar técnicas avançadas de harmonização de glúteos.",
  },
  {
    id: 2,
    q: "Preciso ter experiência prévia com injetáveis?",
    a: "Não é obrigatório ter experiência avançada, pois cobrimos desde a base anatômica até a prática hands-on. No entanto, é necessário ter a formação que permita legalmente a atuação na área.",
  },
  {
    id: 3,
    q: "Onde e quando acontece a próxima turma?",
    a: "Nossas imersões presenciais acontecem em Manaus/AM, em uma estrutura clínica de alto padrão. Para consultar as datas da próxima turma disponível, clique no botão de WhatsApp e fale com nossa consultora de vagas.",
  },
  {
    id: 4,
    q: "Como funciona o suporte pós-mentoria?",
    a: "Diferente de cursos comuns, você terá 180 dias (6 meses) de suporte técnico. Você poderá enviar seus casos clínicos, fotos e dúvidas diretamente para nossa equipe para receber orientações antes de realizar seus procedimentos.",
  },
  {
    id: 5,
    q: "O material de aplicação está incluso na prática?",
    a: "Sim! Durante os dias de imersão presencial, todo o material (bioestimuladores, preenchedores, cânulas e descartáveis) para a prática nas modelos está incluso. Você só precisa trazer seu jaleco e sua vontade de aprender.",
  },
  {
    id: 6,
    q: "Posso parcelar o valor da inscrição?",
    a: "Sim. Facilitamos o seu investimento com entrada no Pix e o restante em até 12x no cartão de crédito, sendo possível utilizar até dois cartões diferentes para compor todo o valor do investimento na mentoria.",
  },
];

function FAQItem({ item }: { item: FAQItem }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="faq-item">
      <button
        className="faq-question"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        {item.q}
        <span className="faq-icon">+</span>
      </button>
      <div className={`faq-answer${open ? " open" : ""}`}>
        <div className="faq-answer-inner">{item.a}</div>
      </div>
    </div>
  );
}

export default function FAQ(props: FAQProps) {
  const title = props.title ?? "Ainda tem alguma dúvida?";
  const sub = props.sub ?? "Respondemos às perguntas mais comuns para que você tome sua decisão com total segurança.";
  const items = (props.items && props.items.length > 0) ? props.items : DEFAULT_FAQ;
  const waHref = props.waHref ?? "https://wa.me/559286062977";

  return (
    <section className="faq-section" id="faq">
      <div className="container">
        <div className="faq-header reveal">
          <div className="section-tag">Dúvidas Frequentes</div>
          <div className="gold-line" />
          <h2 className="section-title">{title}</h2>
          <p className="section-lead" style={{ margin: "0 auto", textAlign: "center" }}>{sub}</p>
        </div>

        <div className="faq-accordion reveal">
          {items.map((item) => (
            <FAQItem key={item.id} item={item} />
          ))}
        </div>

        <div className="faq-cta reveal">
          <a
            href={waHref}
            className="btn-primary btn-primary-glow"
            target="_blank"
            rel="noopener noreferrer"
          >
            Quero a Minha Vaga Agora
          </a>
          <div className="faq-micro">
            Clique e fale com nossa equipe. Vagas limitadas por turma para garantir o suporte individualizado.
          </div>
        </div>
      </div>

      {/* Schema markup FAQ para SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: items.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.a,
              },
            })),
          }),
        }}
      />
    </section>
  );
}
