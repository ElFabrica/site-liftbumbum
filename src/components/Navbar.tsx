import Link from "next/link";

export interface NavbarProps {
  waHref?: string;
  waText?: string;
}

const LogoDra = () => (
  <div className="nav-logo-inner">
    <img src="/logo-navbar.png" alt="Logo LiftBumbum" className="logo-img" />
  </div>
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
        <li>
          <Link href="#mentoria">Mentoria</Link>
        </li>
        <li>
          <Link href="#planos">Planos</Link>
        </li>
        <li>
          <Link href="#sobre">Sobre</Link>
        </li>
        <li>
          <Link href="#depoimentos">Depoimentos</Link>
        </li>
        <li>
          <Link href="#contato">Contato</Link>
        </li>
      </ul>
      <a
        href={waHref}
        className="nav-cta"
        target="_blank"
        rel="noopener noreferrer"
      >
        {waText}
      </a>
    </nav>
  );
}
