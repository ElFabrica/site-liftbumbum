const dorItems = [
  'Técnicas que não entregam os resultados prometidos',
  'Dificuldade em precificar e valorizar seu trabalho',
  'Pacientes que não retornam ou indicam',
  'Formações genéricas sem suporte real',
  'Insegurança na hora de executar os procedimentos',
];

const viradaItems = [
  'Dominando o Método LiftBumbum® com total segurança',
  'Cobrando o valor justo pelo seu expertise',
  'Agenda cheia de pacientes fidelizadas',
  'Suporte contínuo de uma mentora referência',
  'Confiança e segurança em cada procedimento',
];

export default function DorVirada() {
  return (
    <section className="dor-virada">
      <div className="container">
        <div className="dor-virada-grid">
          <div className="dor-card reveal">
            <div className="section-tag" style={{ color: '#888' }}>Reconhece isso?</div>
            <div className="gold-line" style={{ background: 'linear-gradient(90deg,#555,#888)' }} />
            <h3 className="section-title" style={{ fontSize: '30px', color: 'rgba(255,255,255,.72)' }}>
              Onde você <em style={{ color: '#888' }}>está</em> agora
            </h3>
            <div className="dor-items">
              {dorItems.map(item => (
                <div className="dv-item" key={item}>
                  <span className="dor-icon">✗</span>{item}
                </div>
              ))}
            </div>
          </div>
          <div className="virada-card reveal reveal-delay-2">
            <div className="section-tag">Após a Mentoria</div>
            <div className="gold-line" />
            <h3 className="section-title" style={{ fontSize: '30px' }}>
              Onde você <em>vai estar</em>
            </h3>
            <div className="virada-items">
              {viradaItems.map(item => (
                <div className="dv-item" key={item}>
                  <span className="virada-icon">✓</span>{item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
