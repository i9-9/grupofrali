"use client"

import { useState } from 'react';
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useTranslations } from "@/hooks/useTranslations";

export default function Contacto() {
  const { t } = useTranslations();

  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    asunto: '',
    mensaje: ''
  });

  // Intersection Observer para el formulario
  const { ref: formRef, isVisible: isFormVisible } = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px',
    triggerOnce: true
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el formulario
    console.log('Formulario enviado:', formData);
  };

  return (
    <main className="bg-[#EFEFEF]">
      <div className="content-wrapper pb-20">
        <div className="grid pt-36 md:pt-24 pb-20">
          {/* Título primero siempre - Columnas 1-6 */}
          <div className="col-6 md:col-span-6 order-1">
            <h1 className="text-h1-baskerville text-black pb-24">
              {t('contact.title')}
            </h1>
          </div>

          {/* Formulario - Columnas 1-6 en mobile, 7-12 en desktop */}
          <div className="col-6 md:col-span-6 md:col-start-7 order-2" ref={formRef}>
            <div className="space-y-8 mt-0 md:mt-36">
              {/* Nombre y Apellido - separados en mobile, juntos en desktop */}
              <div className="flex flex-col md:flex-row md:space-x-6 space-y-8 md:space-y-0">
                <div className="flex-1">
                  <div className={`form-field form-field-delay-1 ${isFormVisible ? 'animate' : ''}`}>
                    <input
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleInputChange}
                      className="w-full bg-transparent pb-2 text-black font-archivo text-base tracking-wider focus:outline-none border-0"
                    />
                  </div>
                  <label className="block mt-2 font-archivo text-black tracking-wider text-base">
                    {t('contact.form.firstName')}
                  </label>
                </div>
                <div className="flex-1">
                  <div className={`form-field form-field-delay-1b ${isFormVisible ? 'animate' : ''}`}>
                    <input
                      type="text"
                      name="apellido"
                      value={formData.apellido}
                      onChange={handleInputChange}
                      className="w-full bg-transparent pb-2 text-black font-archivo text-base tracking-wider focus:outline-none border-0"
                    />
                  </div>
                  <label className="block mt-2 font-archivo text-black tracking-wider text-base">
                    {t('contact.form.lastName')}
                  </label>
                </div>
              </div>

              {/* Email */}
              <div>
                <div className={`form-field form-field-delay-2 ${isFormVisible ? 'animate' : ''}`}>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-transparent pb-2 text-black font-archivo text-base tracking-wider focus:outline-none border-0"
                  />
                </div>
                <label className="block mt-2 font-archivo text-black tracking-wider text-base">
                  {t('contact.form.email')}
                </label>
              </div>

              {/* Asunto */}
              <div>
                <div className={`form-field form-field-delay-3 ${isFormVisible ? 'animate' : ''}`}>
                  <input
                    type="text"
                    name="asunto"
                    value={formData.asunto}
                    onChange={handleInputChange}
                    className="w-full bg-transparent pb-2 text-black font-archivo text-base tracking-wider focus:outline-none border-0"
                  />
                </div>
                <label className="block mt-2 font-archivo text-black tracking-wider text-base">
                  {t('contact.form.subject')}
                </label>
              </div>

              {/* Mensaje */}
              <div>
                <div className={`form-field form-field-delay-4 ${isFormVisible ? 'animate' : ''}`}>
                  <textarea
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full bg-transparent pb-2 text-black font-archivo text-base tracking-wider resize-none focus:outline-none border-0"
                  />
                </div>
                <label className="block mt-2 font-archivo text-black tracking-wider text-base">
                  {t('contact.form.message')}
                </label>
                
                {/* Botón Enviar en el flujo normal */}
                <div className="flex justify-end mt-6">
                  <button
                    onClick={handleSubmit}
                    className="font-archivo text-black/30 tracking-wider hover:opacity-70 transition-opacity text-base cursor-pointer"
                  >
                    {t('contact.form.send')}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Información de contacto - Columnas 1-6 en desktop, después del formulario en mobile */}
          <div className="col-6 md:col-span-6 order-3">
            <div className="space-y-0 mb-20 mt-32 md:-mt-64">
              <div>
                <a 
                  href="mailto:INFO@GRUPOFRALI.COM" 
                  className="font-archivo text-black hover:opacity-70 transition-opacity leading-tight text-base"
                >
                  {t('contact.contactInfo.generalInfo')}
                </a>
              </div>
              
              <div>
                <a 
                  href="mailto:PRENSA@GRUPOFRALI.COM" 
                  className="font-archivo text-black hover:opacity-70 transition-opacity leading-tight text-base"
                >
                  {t('contact.contactInfo.pressComms')}
                </a>
              </div>
              
              <div>
                <a 
                  href="tel:+543489466110" 
                  className="font-archivo text-black hover:opacity-70 transition-opacity leading-tight text-base"
                >
                  {t('contact.contactInfo.phone')}
                </a>
              </div>
            </div>

            <div className="space-y-0">
              <p className="font-archivo text-black leading-tight text-base">
                {t('contact.contactInfo.address')}
              </p>
              <p className="font-archivo text-black leading-tight text-base">
                {t('contact.contactInfo.city')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}