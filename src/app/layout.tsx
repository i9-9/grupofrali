import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "Grupo Frali",
  description: "Con casi 30 años de trayectoria, en Grupo Frali desarrollamos inversiones estratégicas en real estate, agroindustria, hotelería y energías renovables. Apostamos a proyectos que combinan crecimiento económico, compromiso con el entorno y generación de valor en Argentina, EE. UU. y Uruguay.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SmoothScroll />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
