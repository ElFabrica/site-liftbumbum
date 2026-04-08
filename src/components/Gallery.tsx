import Image from 'next/image';

const images = [
  { src: '/images/model.jpg', alt: 'Dra. Thaine com modelo anatômico' },
  { src: '/images/gallery1.jpg', alt: 'Dra. Thaine em atendimento' },
  { src: '/images/gallery2.jpg', alt: 'Procedimento estético avançado' },
  { src: '/images/hands.jpg', alt: 'Técnica de harmonização corporal' },
];

export default function Gallery() {
  return (
    <section className="gallery-section">
      <div className="container">
        <div className="gallery-header reveal">
          <div className="section-tag">Galeria</div>
          <div className="gold-line" />
          <h2 className="section-title">A <em>essência</em> do trabalho</h2>
        </div>
        <div className="gallery-grid">
          {images.map((img, i) => (
            <div className={`gallery-item reveal reveal-delay-${i + 1}`} key={img.src}>
              <Image src={img.src} alt={img.alt} fill style={{ objectFit: 'cover' }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
