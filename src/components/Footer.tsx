"use client";

import { useEffect, useState } from "react";

const IgIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" />
  </svg>
);
const WaIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

export interface FooterProps {
  waHref?: string;
  igHref?: string;
  email?: string;
}

const DEFAULTS: Required<Pick<FooterProps, "waHref" | "igHref" | "email">> = {
  waHref: "https://wa.me/559286062977",
  igHref: "https://www.instagram.com/drathainemalinowski",
  email: "contato@drathainemalinowski.com",
};

export default function Footer(props: FooterProps) {
  const waHref = props.waHref ?? DEFAULTS.waHref;
  const igHref = props.igHref ?? DEFAULTS.igHref;
  const email = props.email ?? DEFAULTS.email;

  const [backVisible, setBackVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setBackVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <footer>
        <div className="container">
          {/* 4 colunas */}
          <div className="footer-grid">
            {/* Coluna 1: Identidade */}
            <div className="footer-brand">
              <svg viewBox="0 0 200 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <text x="0" y="22" fontFamily="var(--font-cormorant),serif" fontSize="20" fontWeight="300" fill="white" letterSpacing="1">Dra. Thaine</text>
                <text x="0" y="40" fontFamily="var(--font-cormorant),serif" fontSize="20" fontStyle="italic" fontWeight="400" fill="#C8A96E" letterSpacing="1">Malinowski</text>
                <line x1="0" y1="46" x2="160" y2="46" stroke="#C8A96E" strokeWidth="0.5" opacity="0.4" />
              </svg>
              <p>Especialista em harmonização corporal e criadora do Método LiftBumbum®. Transformando carreiras através da ciência e do posicionamento de luxo.</p>
              <div className="footer-social">
                <a href={igHref} className="footer-social-link" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><IgIcon /></a>
                <a href={waHref} className="footer-social-link" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Coluna 2: Navegação */}
            <div>
              <div className="footer-col-title">Navegação</div>
              <ul className="footer-links">
                {[
                  ["#sobre-metodo", "O Método"],
                  ["#cronograma", "Cronograma"],
                  ["#planos", "Planos e Preços"],
                  ["#resultados", "Depoimentos"],
                  ["#sobre", "Sobre a Dra."],
                  ["#faq", "Dúvidas"],
                ].map(([href, label]) => (
                  <li key={href}><a href={href}>{label}</a></li>
                ))}
              </ul>
            </div>

            {/* Coluna 3: Contato */}
            <div>
              <div className="footer-col-title">Contato</div>
              <ul className="footer-links">
                <li><a href={waHref} target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
                <li><a href={igHref} target="_blank" rel="noopener noreferrer">Instagram</a></li>
                <li><a href={`mailto:${email}`}>{email}</a></li>
                <li style={{ marginTop: "8px", color: "rgba(255,255,255,0.4)", fontSize: "12px" }}>
                  Manaus/AM — Clínica de referência nacional
                </li>
                <li><a href="/admin/" style={{ color: "rgba(255,255,255,.12)", fontSize: "11px" }}>Painel Admin</a></li>
              </ul>
            </div>

            {/* Coluna 4: Selos de Confiança */}
            <div>
              <div className="footer-col-title">Selos de Confiança</div>
              <div className="footer-seals">
                {[
                  "Método com Marca Registrada ®",
                  "Pagamento 100% Seguro",
                  "Certificado de Conclusão Incluso",
                  "Suporte Técnico por 180 Dias",
                ].map((seal) => (
                  <div className="footer-seal-item" key={seal}>{seal}</div>
                ))}
              </div>
            </div>
          </div>

          {/* Linha legal */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "22px" }}>
            <div className="footer-bottom" style={{ flexWrap: "wrap", gap: "12px" }}>
              <span>© 2026 Dra. Thaine Malinowski. Todos os direitos reservados.</span>
              <div className="footer-legal-links">
                <a href="#">Política de Privacidade</a>
                <a href="#">Termos de Uso</a>
              </div>
              <span>Método LiftBumbum® — Marca Registrada</span>
            </div>
            <div className="footer-disclaimer">
              Os resultados podem variar de profissional para profissional. Este site não faz parte do Facebook ou do Google. O Método LiftBumbum® é uma marca registrada. As informações contidas neste site têm caráter educacional e profissional.
            </div>
          </div>
        </div>
      </footer>

      {/* Botão flutuante WhatsApp */}
      <div className="wa-floating">
        <div className="wa-floating-balloon">
          Dúvidas sobre a próxima turma? Fale comigo agora!
        </div>
        <a
          href={waHref}
          className="wa-floating-btn"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
        >
          <WaIcon />
        </a>
      </div>

      {/* Botão voltar ao topo */}
      <a
        href="#mentoria"
        className={`back-to-top${backVisible ? " visible" : ""}`}
        aria-label="Voltar ao topo"
      >
        ↑
      </a>
    </>
  );
}
