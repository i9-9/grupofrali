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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://grupofrali.com';
const ogImageUrl = `${siteUrl}/images/seo/OGImage.png`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
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
    type: 'website',
    url: siteUrl,
    siteName: 'Grupo Frali',
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: 'Grupo Frali',
        type: 'image/png',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Grupo Frali',
    description: 'Con casi 30 años de trayectoria, en Grupo Frali desarrollamos inversiones estratégicas en real estate, agroindustria, hotelería y energías renovables.',
    images: [ogImageUrl],
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
        {/* Critical resource hints for faster loading */}
        <link rel="preconnect" href="https://images.ctfassets.net" />
        <link rel="dns-prefetch" href="https://images.ctfassets.net" />
        <link rel="preconnect" href="https://cdn.contentful.com" />
        <link rel="dns-prefetch" href="https://cdn.contentful.com" />
        
        {/* Adobe Fonts optimization - Non-blocking load */}
        <link rel="preconnect" href="https://use.typekit.net" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://use.typekit.net" />
        <link rel="preconnect" href="https://p.typekit.net" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://p.typekit.net" />

        {/* Load Adobe Fonts with preload to prevent render blocking
            Preload as style then apply with high priority but non-blocking */}
        <link
          rel="preload"
          href="https://use.typekit.net/mwm8rjz.css"
          as="style"
        />
        <link
          rel="stylesheet"
          href="https://use.typekit.net/mwm8rjz.css"
        />

        {/* Preload hero video poster images - these are the LCP elements */}
        {/* Mobile posters - one of these will be the LCP on mobile */}
        <link
          rel="preload"
          href="/videos/video_mobile1_poster.jpg"
          as="image"
          media="(max-width: 768px)"
        />
        <link
          rel="preload"
          href="/videos/video_mobile2_poster.jpg"
          as="image"
          media="(max-width: 768px)"
        />
        {/* Desktop posters - one of these will be the LCP on desktop */}
        <link
          rel="preload"
          href="/videos/video_desktop1_poster.jpg"
          as="image"
          media="(min-width: 769px)"
        />
        <link
          rel="preload"
          href="/videos/video_desktop3_poster.jpg"
          as="image"
          media="(min-width: 769px)"
        />
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