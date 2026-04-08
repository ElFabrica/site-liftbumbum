const depoimentos = [
  { initial: 'A', name: 'Ana Rodrigues', role: 'Fisioterapeuta Estética • São Paulo', text: 'A mentoria da Dra. Thaine foi um divisor de águas na minha carreira. Em dois meses já recuperei o investimento e hoje tenho uma agenda cheia de pacientes encantadas.' },
  { initial: 'C', name: 'Camila Santos', role: 'Biomédica Estética • Brasília', text: 'Nunca imaginei que 3 dias pudessem mudar tanto minha forma de trabalhar. O método é poderoso, a Dra. Thaine é incrível e o suporte pós-mentoria é excepcional.' },
  { initial: 'M', name: 'Mariana Lima', role: 'Enfermeira Estética • Fortaleza', text: 'Profissionalismo e resultado acima de qualquer expectativa. Aprendi mais em 3 dias do que em 2 anos de cursos avulsos. Vale cada centavo do investimento!' },
];

export default function Depoimentos() {
  return (
    <section className="depoimentos" id="depoimentos">
      <div className="container">
        <div className="depoimentos-header reveal">
          <div className="section-tag">Depoimentos</div>
          <div className="gold-line" />
          <h2 className="section-title">O que dizem as <em>alunas</em></h2>
        </div>
        <div className="depoimentos-grid">
          {depoimentos.map((dep, i) => (
            <div className={`depoimento-card reveal reveal-delay-${i + 1}`} key={dep.name}>
              <span className="dep-quote">&ldquo;</span>
              <div className="dep-stars">★★★★★</div>
              <p className="dep-text">{dep.text}</p>
              <div className="dep-author">
                <div className="dep-avatar">{dep.initial}</div>
                <div>
                  <div className="dep-name">{dep.name}</div>
                  <div className="dep-role">{dep.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
