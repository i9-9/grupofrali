// layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import ConditionalLayout from "@/components/layout/ConditionalLayout";

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
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
      </body>
    </html>
  );
}