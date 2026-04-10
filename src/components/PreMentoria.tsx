export default function PreMentoria() {
  return (
    <section className="pre-mentoria" id="sobre-metodo">
      <div className="container">
        <div className="pre-mentoria-grid">
          <div className="pre-mentoria-images reveal">
            <div className="pre-img tall">
              <img
                src="/images/about1.jpg"
                alt="Dra. Thaine — Especialista"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div className="pre-img">
              <img
                src="/images/about2.jpg"
                alt="Procedimento estético avançado"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div className="pre-img">
              <img
                src="/images/products.jpg"
                alt="Produtos Rennova — parceria exclusiva"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          </div>
          <div className="pre-mentoria-text reveal reveal-delay-2">
            <div className="section-tag">O Método</div>
            <div className="gold-line" />
            <h2 className="section-title">
              Muito além de uma aplicação: Uma <em>Engenharia de Resultados</em>
            </h2>
            <p className="section-lead">
              O Método LiftBumbum® é fundamentado em três pilares que garantem a segurança
              da profissional e o encantamento da paciente desde a primeira sessão.
            </p>
            <div className="pilares-grid">
              {[
                {
                  n: "I",
                  title: "Mapeamento Anatômico Geométrico",
                  desc: "Não existe protocolo 'copia e cola'. Você aprenderá a realizar o mapeamento dos vetores de força e pontos de sustentação específicos de cada biotipo. Identificamos as zonas de depressão trocantérica e ptose para um planejamento individualizado.",
                  destaque: "Diagnóstico de precisão para evitar desperdício de produto.",
                },
                {
                  n: "II",
                  title: "A Trindade de Ativos (Sinergia de Produtos)",
                  desc: "O segredo do volume e da textura está na combinação estratégica. Ensinamos como utilizar a sinergia entre Bioestimuladores de Colágeno (sustentação e firmeza) e Ácido Hialurônico de alta reticulação (projeção e contorno), somados a protocolos para tratamento de celulite e qualidade de pele.",
                  destaque: "Resultados imediatos com durabilidade prolongada.",
                },
                {
                  n: "III",
                  title: "Vetorização e Planos de Aplicação",
                  desc: "A técnica correta no plano certo. Dominamos a aplicação em diferentes camadas teciduais, utilizando cânulas de precisão para minimizar o trauma e maximizar a segurança. É a arte de esculpir o glúteo respeitando a fisiologia do corpo feminino.",
                  destaque: "Segurança total contra intercorrências graves.",
                },
              ].map((item) => (
                <div className="pilar-card" key={item.n}>
                  <div className="pilar-number">{item.n}</div>
                  <div className="pilar-body">
                    <div className="pilar-title">{item.title}</div>
                    <div className="pilar-desc">{item.desc}</div>
                    <div className="pilar-destaque">◆ {item.destaque}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* O Que Nos Torna Únicos */}
        <div className="unicidade-section reveal">
          <div className="unicidade-title">O Que Nos Torna Únicos</div>
          <div className="unicidade-list">
            {[
              { label: "Ciência em Primeiro Lugar", text: "Baseado em estudos anatômicos recentes e parcerias com grandes marcas como a Rennova." },
              { label: "Protocolo High-Ticket", text: "Uma metodologia desenhada para que você possa cobrar de R$ 3.000 a R$ 12.000 por protocolo, elevando o nível da sua clínica." },
              { label: "Marca Registrada ®", text: "Você aprende um método oficial, com selo de qualidade reconhecido nacionalmente." },
            ].map((item) => (
              <div className="unicidade-item" key={item.label}>
                <span><strong>{item.label}:</strong> {item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
