import type { Metadata, Viewport } from "next";
import "./globals.css";
import ConditionalLayout from "@/components/layout/ConditionalLayout";
import { LanguageProvider } from "@/contexts/LanguageContext";

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#EFEFEF',
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: "Grupo Frali",
  description: "Con casi 30 años de trayectoria, en Grupo Frali desarrollamos inversiones estratégicas en real estate, agroindustria, hotelería y energías renovables. Apostamos a proyectos que combinan crecimiento económico, compromiso con el entorno y generación de valor en Argentina, EE. UU. y Uruguay.",
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  manifest: '/site.webmanifest',
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
      <head>
        {/* Mobile-specific resource hints for faster loading */}
        <link rel="preconnect" href="https://images.ctfassets.net" />
        <link rel="dns-prefetch" href="https://images.ctfassets.net" />
        <link rel="preconnect" href="https://cdn.contentful.com" />
        <link rel="dns-prefetch" href="https://cdn.contentful.com" />
      </head>
      <body className="bg-[#EFEFEF]">
        <LanguageProvider>
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
        </LanguageProvider>
      </body>
    </html>
  );
}