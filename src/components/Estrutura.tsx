const dias = [
  {
    n: '01', tag: 'Dia 1', title: 'Fundamentos & Diagnóstico',
    items: ['Bases anatômicas do corpo feminino','Avaliação postural e corporal avançada','Protocolos de anamnese','Princípios do Método LiftBumbum®','Casos clínicos e discussões'],
  },
  {
    n: '02', tag: 'Dia 2', title: 'Técnica & Prática Supervisionada',
    items: ['Demonstração da técnica completa','Prática hands-on com modelos','Correção individual e feedback','Protocolos de segurança','Tirar dúvidas e reforço técnico'],
  },
  {
    n: '03', tag: 'Dia 3', title: 'Negócios & Alta Performance',
    items: ['Como montar sua agenda premium','Precificação e posicionamento','Marketing para estética avançada','Fidelização e captação de pacientes','Mentoria em grupo e networking'],
  },
];

export default function Estrutura() {
  return (
    <section className="estrutura">
      <div className="container">
        <div className="estrutura-header reveal">
          <div className="section-tag">Cronograma</div>
          <div className="gold-line" />
          <h2 className="section-title">3 dias que vão <em>mudar</em> tudo</h2>
          <p className="section-lead" style={{ margin: '0 auto', textAlign: 'center', maxWidth: '520px' }}>
            Uma jornada intensiva e transformadora, do diagnóstico à execução, com prática real e mentoria individualizada.
          </p>
        </div>
        <div className="dias-grid">
          {dias.map((dia, i) => (
            <div className={`dia-card reveal reveal-delay-${i + 1}`} key={dia.n}>
              <div className="dia-number">{dia.n}</div>
              <div className="dia-tag">{dia.tag}</div>
              <div className="dia-title">{dia.title}</div>
              <div className="dia-items">
                {dia.items.map(item => <div className="dia-item" key={item}>{item}</div>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
