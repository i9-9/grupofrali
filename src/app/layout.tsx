import type { Metadata } from "next";
import "./globals.css";
import ConditionalLayout from "@/components/layout/ConditionalLayout";
import { LanguageProvider } from "@/contexts/LanguageContext";

export const metadata: Metadata = {
  title: "Grupo Frali",
  description: "Con casi 30 años de trayectoria, en Grupo Frali desarrollamos inversiones estratégicas en real estate, agroindustria, hotelería y energías renovables. Apostamos a proyectos que combinan crecimiento económico, compromiso con el entorno y generación de valor en Argentina, EE. UU. y Uruguay.",
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  }, 
  openGraph: {
    title: "Grupo Frali",
    description: "Con casi 30 años de trayectoria, en Grupo Frali desarrollamos inversiones estratégicas en real estate, agroindustria, hotelería y energías renovables.",
    images: [
      {
        url: '/images/seo/OGImage.png',
        alt: 'Grupo Frali',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Grupo Frali',
    description: 'Con casi 30 años de trayectoria, en Grupo Frali desarrollamos inversiones estratégicas en real estate, agroindustria, hotelería y energías renovables.',
    images: ['/images/seo/OGImage.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <LanguageProvider>
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
        </LanguageProvider>
      </body>
    </html>
  );
}