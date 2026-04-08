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
              A ciência por trás da <em>transformação</em>
            </h2>
            <p className="section-lead">
              O Método LiftBumbum® não é apenas uma técnica — é uma filosofia
              completa de harmonização corporal que combina protocolos clínicos
              avançados com uma abordagem humanizada e personalizada para cada
              paciente.
            </p>
            <div className="timeline-items">
              {[
                {
                  n: "1",
                  title: "Avaliação Personalizada",
                  desc: "Cada corpo é único. Aprenda a mapear e identificar as necessidades específicas de cada paciente.",
                },
                {
                  n: "2",
                  title: "Protocolo Exclusivo",
                  desc: "Técnica desenvolvida e aperfeiçoada pela Dra. Thaine ao longo de anos de prática clínica intensiva.",
                },
                {
                  n: "3",
                  title: "Resultados Duradouros",
                  desc: "Foco em resultados reais, seguros e que se mantêm no tempo — com pacientes encantadas e fiéis.",
                },
              ].map((item) => (
                <div className="timeline-item" key={item.n}>
                  <div className="timeline-dot">{item.n}</div>
                  <div className="timeline-text">
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
