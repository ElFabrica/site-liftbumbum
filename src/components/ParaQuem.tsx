import Image from 'next/image';

const items = [
  { n: '01', title: 'Você é profissional de estética ou saúde', desc: 'Fisioterapeuta, biomédica, enfermeira, esteticista ou médica que quer se especializar em harmonização corporal.' },
  { n: '02', title: 'Quer resultados que realmente impressionam', desc: 'Cansada de técnicas superficiais que não entregam o que prometem.' },
  { n: '03', title: 'Deseja escalar seu negócio na estética', desc: 'Quer cobrar mais, atrair pacientes de alto valor e se tornar referência na sua cidade.' },
  { n: '04', title: 'Busca uma mentora que já chegou lá', desc: 'Você quer aprender com quem faz, não só com quem fala.' },
];

export default function ParaQuem() {
  return (
    <section className="para-quem">
      <div className="container">
        <div className="para-quem-inner">
          <div className="para-quem-image reveal">
            <Image src="/images/model.jpg" alt="Profissional de estética" width={500} height={480} style={{ objectFit: 'cover', width: '100%', height: '480px', borderRadius: '18px' }} />
          </div>
          <div className="reveal reveal-delay-2">
            <div className="section-tag">Para Quem É</div>
            <div className="gold-line" />
            <h2 className="section-title">Esta mentoria é <em>para você</em> se…</h2>
            <div className="para-quem-list">
              {items.map(item => (
                <div className="pq-item" key={item.n}>
                  <div className="pq-num">{item.n}</div>
                  <div className="pq-text">
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
