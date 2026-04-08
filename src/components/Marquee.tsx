const items = [
  'Harmonização Corporal','Método LiftBumbum®','Dra. Thaine Malinowski',
  'Resultados Reais','Mentoria Exclusiva','Transformação Completa',
  'Harmonização Corporal','Método LiftBumbum®','Dra. Thaine Malinowski',
  'Resultados Reais','Mentoria Exclusiva','Transformação Completa',
];

export default function Marquee() {
  return (
    <div className="marquee-section">
      <div className="marquee-track">
        {items.map((item, i) => (
          <div className="marquee-item" key={i}>{item}</div>
        ))}
      </div>
    </div>
  );
}
