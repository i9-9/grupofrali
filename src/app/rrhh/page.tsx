"use client";

import { useTranslations } from "@/hooks/useTranslations";

export default function RRHH() {
  const { t } = useTranslations();

  return (
    <main className="bg-[#EFEFEF]">
      {/* Hero */}
      <div className="w-full mx-auto" style={{ paddingLeft: 'clamp(1rem, 0.4vw, 1.5rem)', paddingRight: 'clamp(1rem, 0.4vw, 1.5rem)' }}>
        <div className="grid pt-36 md:pt-24 pb-48">
          <div className="col-6 md:col-8">
            {/* Mobile: especificaciones exactas del diseño en w393 */}
            <h1 
              className="md:hidden font-baskerville text-black font-normal tracking-[0%]"
              style={{ 
                fontSize: 'clamp(40px, 10.2vw, 40px)', 
                lineHeight: 'clamp(40px, 10.2vw, 40px)',
                maxWidth: 'clamp(300px, 80vw, 400px)'
              }}
            >
              {t("hr.title")}
            </h1>
            {/* Desktop: especificaciones exactas del diseño en w1512 */}
            <h1 
              className="hidden md:block font-baskerville text-black font-normal tracking-[0%]"
              style={{ 
                fontSize: 'clamp(40px, 3.7vw, 56px)', 
                lineHeight: 'clamp(40px, 4.7vw, 70.89px)',
                maxWidth: 'clamp(400px, 35vw, 600px)'
              }}
            >
              {t("hr.title")}
            </h1>
          </div>
        </div>
      </div>

      {/* Join Our Team */}
      <section className="w-full mx-auto pb-52" style={{ paddingLeft: 'clamp(1rem, 0.4vw, 1.5rem)', paddingRight: 'clamp(1rem, 0.4vw, 1.5rem)' }}>
        <div className="grid pb-2 md:pb-8">
          <div className="col-6 md:col-12">
            {/* Mobile: especificaciones exactas del diseño en w393 */}
            <h2 
              className="md:hidden font-baskerville text-black font-normal tracking-[0%]"
              style={{
                fontSize: 'clamp(20px, 6.4vw, 25.04px)', /* Mobile: escala desde 20px hasta 25.04px (w393 base) */
                lineHeight: 'clamp(34px, 10.9vw, 42.94px)', /* Mobile: escala desde 34px hasta 42.94px (w393 base) */
                letterSpacing: '0%',
                fontWeight: '400'
              }}
            >
              {t("hr.joinTeam.title")}
            </h2>
            {/* Desktop: especificaciones exactas del diseño en w1512 */}
            <h2 
              className="hidden md:block font-baskerville text-black font-normal tracking-[0%]"
              style={{
                fontSize: 'clamp(25.04px, 1.88vw, 28.35px)', /* Desktop: escala desde 25.04px hasta 28.35px (w1512 base) */
                lineHeight: 'clamp(42.94px, 3.22vw, 48.62px)', /* Desktop: escala desde 42.94px hasta 48.62px (w1512 base) */
                letterSpacing: '0%',
                fontWeight: '400'
              }}
            >
              {t("hr.joinTeam.title")}
            </h2>
          </div>
        </div>

        <div className="grid">
          <div className="col-6 md:col-span-5">
            {/* Mobile: especificaciones exactas del diseño en w393 */}
            <p 
              className="md:hidden font-archivo text-black font-normal tracking-[0%]"
              style={{ 
                fontSize: 'clamp(16px, 4.1vw, 16px)', 
                lineHeight: '100%' 
              }}
            >
              {t("hr.description")}
            </p>
            {/* Desktop: especificaciones exactas del diseño en w1512 */}
            <p 
              className="hidden md:block font-archivo text-black font-normal tracking-[0%]"
              style={{ 
                fontSize: 'clamp(16px, 1.5vw, 22.44px)', 
                lineHeight: '100%' 
              }}
            >
              {t("hr.description")}
            </p>
          </div>
          
          {/* Second paragraph in mobile - Full column */}
          <div className="md:hidden col-6">
            {/* Mobile: especificaciones exactas del diseño en w393 */}
            <p 
              className="font-archivo text-black font-normal tracking-[0%] mb-8"
              style={{ 
                fontSize: 'clamp(16px, 4.1vw, 16px)', 
                lineHeight: '100%' 
              }}
              dangerouslySetInnerHTML={{ __html: t("hr.joinTeam.description") }}
            />
            
            <div className="mt-8">
              <a 
                href="mailto:RRHH@GRUPOFRALI.COM" 
                className="font-archivo font-normal text-black hover:opacity-70 transition-opacity"
                style={{ 
                  fontSize: 'clamp(13.98px, 3.6vw, 13.98px)', 
                  lineHeight: '100%',
                  letterSpacing: '0%',
                  fontWeight: 'normal'
                }}
              >
                RRHH@GRUPOFRALI.COM
              </a>
            </div>
          </div>

          {/* Second paragraph in desktop */}
          <div className="hidden md:block col-6 md:col-start-7 md:col-span-3 mb-20 md:mb-40">
            {/* Desktop: especificaciones exactas del diseño en w1512 */}
            <p 
              className="font-archivo text-black font-normal tracking-[0%] mb-8"
              style={{ 
                fontSize: 'clamp(16px, 1.5vw, 22.44px)', 
                lineHeight: '100%' 
              }}
              dangerouslySetInnerHTML={{ __html: t("hr.joinTeam.description") }}
            />
            
            <div className="mt-16">
              <a 
                href="mailto:RRHH@GRUPOFRALI.COM" 
                className="font-archivo font-normal text-black hover:opacity-70 transition-opacity"
                style={{ 
                  fontSize: 'clamp(16px, 1.5vw, 22.44px)', 
                  lineHeight: '100%',
                  letterSpacing: '0%' 
                }}
              >
                RRHH@GRUPOFRALI.COM
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}