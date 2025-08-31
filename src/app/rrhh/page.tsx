"use client";

import { useTranslations } from "@/hooks/useTranslations";

export default function RRHH() {
  const { t } = useTranslations();

  return (
    <main className="bg-[#EFEFEF]">
      {/* Hero */}
      <div className="content-wrapper">
        <div className="grid pt-36 md:pt-24 pb-32">
          <div className="col-6 md:col-8">
            <h1 className="text-h1-baskerville text-black">
              {t("hr.title")}
            </h1>
          </div>
        </div>
      </div>

      {/* Join Our Team */}
      <section className="content-wrapper pb-16">
        <div className="grid pb-8">
          <div className="col-6 md:col-12">
            <h2 className="text-small-baskerville text-black">
              {t("hr.joinTeam.title")}
            </h2>
          </div>
        </div>

        <div className="grid">
          <div className="col-6 md:col-span-6 md:space-y-6 space-y-4">
            <p className="text-black text-base leading-none">
              {t("hr.description")}

            </p>
          </div>
          
          {/* Second paragraph in mobile - Full column */}
          <div className="md:hidden col-6">
            <p 
              className="text-black mb-8 text-base leading-none"
              dangerouslySetInnerHTML={{ __html: t("hr.joinTeam.description") }}
            />
            
            <div>
              <a 
                href="mailto:RRHH@GRUPOFRALI.COM" 
                className="font-archivo font-normal text-black text-base hover:opacity-70 transition-opacity"
              >
                RRHH@GRUPOFRALI.COM
              </a>
            </div>
          </div>

          {/* Second paragraph in desktop */}
          <div className="hidden md:block col-6 md:col-7-to-12 mb-20 md:mb-40">
            <p 
              className="text-black mb-8 text-base leading-none"
              dangerouslySetInnerHTML={{ __html: t("hr.joinTeam.description") }}
            />
            
            <div>
              <a 
                href="mailto:RRHH@GRUPOFRALI.COM" 
                className="font-archivo font-normal text-black text-base hover:opacity-70 transition-opacity"
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