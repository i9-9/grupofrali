import React from 'react';

const SofitelLogo = ({ className }: { className?: string }) => (
  <svg 
    width="120" 
    height="80" 
    viewBox="0 0 247 125" 
    className={className}
    style={{ maxWidth: '120px', height: 'auto' }}
  >
    {/* Aquí pondrías el contenido SVG simplificado sin imágenes embebidas */}
    <rect width="247" height="125" fill="#000" />
    <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="16">
      SOFITEL
    </text>
  </svg>
);

const CardalesLogo = ({ className }: { className?: string }) => (
  <svg 
    width="120" 
    height="144" 
    viewBox="0 0 339 229" 
    className={className}
    style={{ maxWidth: '120px', height: 'auto' }}
  >
    <rect width="339" height="229" fill="#000" />
    <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="16">
      CARDALES
    </text>
  </svg>
);

const ReginaLogo = ({ className }: { className?: string }) => (
  <svg 
    width="120" 
    height="96" 
    viewBox="0 0 120 96" 
    className={className}
    style={{ maxWidth: '120px', height: 'auto' }}
  >
    <rect width="120" height="96" fill="#000" />
    <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="14">
      REGINA
    </text>
  </svg>
);

const SeptiembreLogo = ({ className }: { className?: string }) => (
  <svg 
    width="120" 
    height="80" 
    viewBox="0 0 120 80" 
    className={className}
    style={{ maxWidth: '120px', height: 'auto' }}
  >
    <rect width="120" height="80" fill="#000" />
    <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="12">
      SEPTIEMBRE
    </text>
  </svg>
);

export const LogoMarquee = () => {
  return (
    <section className="pb-40 overflow-hidden">
      <div className="w-full overflow-hidden">
        <div className="flex gap-32 w-max animate-marquee">
          {/* Primera iteración de logos */}
          <div className="flex items-center gap-32">
            <div className="shrink-0 flex items-center justify-center">
              <SofitelLogo className="h-20 w-auto" />
            </div>
            <div className="shrink-0 flex items-center justify-center">
              <CardalesLogo className="h-48 w-auto" />
            </div>
            <div className="shrink-0 flex items-center justify-center">
              <ReginaLogo className="h-32 w-auto" />
            </div>
            <div className="shrink-0 flex items-center justify-center">
              <SeptiembreLogo className="h-20 w-auto" />
            </div>
          </div>
          {/* Segunda iteración (duplicada para efecto infinito) */}
          <div className="flex items-center gap-32">
            <div className="shrink-0 flex items-center justify-center">
              <SofitelLogo className="h-20 w-auto" />
            </div>
            <div className="shrink-0 flex items-center justify-center">
              <CardalesLogo className="h-48 w-auto" />
            </div>
            <div className="shrink-0 flex items-center justify-center">
              <ReginaLogo className="h-32 w-auto" />
            </div>
            <div className="shrink-0 flex items-center justify-center">
              <SeptiembreLogo className="h-20 w-auto" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}; 