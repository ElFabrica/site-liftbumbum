import Link from 'next/link';

export interface NavbarProps {
  waHref?: string;
  waText?: string;
}

const LogoDra = () => (
  <svg viewBox="0 0 220 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <text x="0" y="20" fontFamily="var(--font-cormorant), serif" fontSize="18" fontWeight="300" fill="white" letterSpacing="1">Dra. Thaine</text>
    <text x="0" y="38" fontFamily="var(--font-cormorant), serif" fontSize="18" fontStyle="italic" fontWeight="400" fill="#C8A96E" letterSpacing="1">Malinowski</text>
    <line x1="0" y1="44" x2="148" y2="44" stroke="#C8A96E" strokeWidth="0.5" opacity="0.5"/>
  </svg>
);

const DEFAULTS: Required<Pick<NavbarProps, "waHref" | "waText">> = {
  waHref: "https://wa.me/559286062977",
  waText: "Quero Participar",
};

export default function Navbar(props: NavbarProps) {
  const waHref = props.waHref ?? DEFAULTS.waHref;
  const waText = props.waText ?? DEFAULTS.waText;

  return (
    <nav>
      <div className="nav-logo">
        <LogoDra />
      </div>
      <ul className="nav-links">
        <li><Link href="#mentoria">Mentoria</Link></li>
        <li><Link href="#planos">Planos</Link></li>
        <li><Link href="#sobre">Sobre</Link></li>
        <li><Link href="#depoimentos">Depoimentos</Link></li>
        <li><Link href="#contato">Contato</Link></li>
      </ul>
      <a href={waHref} className="nav-cta" target="_blank" rel="noopener noreferrer">
        {waText}
      </a>
    </nav>
  );
}
