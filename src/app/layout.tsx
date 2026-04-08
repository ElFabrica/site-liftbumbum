import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";
import TrackingProvider from "@/components/TrackingProvider";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mentoria LiftBumbum® — Dra. Thaine Malinowski",
  description:
    "A mentoria que une ciência, estética avançada e resultados reais. Aprenda o Método LiftBumbum® com a Dra. Thaine Malinowski.",
  keywords:
    "LiftBumbum, mentoria estética, harmonização corporal, Dra. Thaine Malinowski",
  openGraph: {
    title: "Mentoria LiftBumbum® — Dra. Thaine Malinowski",
    description:
      "Transforme seu corpo e sua carreira com o Método LiftBumbum®.",
    url: "https://www.drathainemalinowski.com",
    siteName: "Dra. Thaine Malinowski",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${cormorant.variable} ${montserrat.variable}`}
    >
      <body>
        <TrackingProvider />
        {children}
      </body>
    </html>
  );
}
