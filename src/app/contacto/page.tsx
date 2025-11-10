"use client"

import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useTranslations } from "@/hooks/useTranslations";

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export default function Contacto() {
  const { t } = useTranslations();

  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    asunto: '',
    mensaje: ''
  });

  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

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
    // Limpiar mensaje de error cuando el usuario empieza a escribir
    if (status === 'error') {
      setStatus('idle');
      setErrorMessage('');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    // Validación básica
    if (!formData.nombre || !formData.apellido || !formData.email || !formData.asunto || !formData.mensaje) {
      setStatus('error');
      setErrorMessage('Por favor completa todos los campos');
      return;
    }

    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus('error');
      setErrorMessage('Por favor ingresa un email válido');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      // EmailJS requiere estas variables de entorno:
      // NEXT_PUBLIC_EMAILJS_SERVICE_ID
      // NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
      // NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error('Configuración de email incompleta. Por favor contacta al administrador.');
      }

      // Enviar email usando EmailJS
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: `${formData.nombre} ${formData.apellido}`,
          from_email: formData.email,
          subject: formData.asunto, // También se puede usar como 'title' en el template
          title: formData.asunto, // Variable estándar de EmailJS
          message: formData.mensaje,
          to_email: 'info@grupofrali.com',
        },
        publicKey
      );

      // Éxito
      setStatus('success');
      // Limpiar formulario
      setFormData({
        nombre: '',
        apellido: '',
        email: '',
        asunto: '',
        mensaje: ''
      });

      // Resetear estado después de 5 segundos
      setTimeout(() => {
        setStatus('idle');
      }, 5000);
    } catch (error) {
      console.error('Error enviando email:', error);
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Error al enviar el mensaje. Por favor intenta nuevamente.');
    }
  };

  return (
    <main className="bg-[#EFEFEF]">
      <div className="w-full mx-auto pb-20" style={{ paddingLeft: 'clamp(1rem, 0.4vw, 1.5rem)', paddingRight: 'clamp(1rem, 0.4vw, 1.5rem)' }}>
        <div className="grid pt-36 md:pt-24 pb-20">
          {/* Título primero siempre - Columnas 1-6 */}
          <div className="col-6 md:col-span-6 order-1">
            {/* Mobile: especificaciones exactas del diseño en w393 */}
            <h1 
              className="md:hidden font-baskerville text-black font-normal tracking-[0%] pb-8"
              style={{ 
                fontSize: 'clamp(40px, 10.2vw, 40px)', 
                lineHeight: 'clamp(40px, 10.2vw, 40px)',
                maxWidth: 'clamp(300px, 80vw, 400px)',
                whiteSpace: 'pre-line'
              }}
            >
              {t('contact.title')}
            </h1>
            {/* Desktop: especificaciones exactas del diseño en w1512 */}
            <h1 
              className="hidden md:block font-baskerville text-black font-normal tracking-[0%] pb-24"
              style={{ 
                fontSize: 'clamp(40px, 3.7vw, 56px)', 
                lineHeight: 'clamp(40px, 4.7vw, 70.89px)',
                maxWidth: 'clamp(400px, 35vw, 600px)',
                whiteSpace: 'pre-line'
              }}
            >
              {t('contact.title')}
            </h1>
          </div>

          {/* Formulario - Columnas 1-6 en mobile, 7-12 en desktop */}
          <div className="col-6 md:col-span-6 md:col-start-7 order-2" ref={formRef}>
            <form onSubmit={handleSubmit} className="space-y-8 mt-0 md:mt-36">
              {/* Nombre y Apellido - separados en mobile, juntos en desktop */}
              <div className="flex flex-col md:flex-row md:space-x-6 space-y-8 md:space-y-0">
                <div className="flex-1">
                  <div className={`form-field form-field-delay-1 ${isFormVisible ? 'animate' : ''}`}>
                    <input
                      type="text"
                      name="nombre"
                      id="nombre"
                      value={formData.nombre}
                      onChange={handleInputChange}
                      className="w-full bg-transparent pb-2 text-black font-archivo text-base tracking-wider focus:outline-none border-0"
                      aria-label={t('contact.form.firstName')}
                      required
                    />
                  </div>
                  <label htmlFor="nombre" className="block mt-2 font-archivo text-black uppercase contact-label-mobile md:hidden">
                    {t('contact.form.firstName')}
                  </label>
                  <label htmlFor="nombre" className="hidden md:block mt-2 font-archivo text-black uppercase contact-label-desktop">
                    {t('contact.form.firstName')}
                  </label>
                </div>
                <div className="flex-1">
                  <div className={`form-field form-field-delay-1b ${isFormVisible ? 'animate' : ''}`}>
                    <input
                      type="text"
                      name="apellido"
                      id="apellido"
                      value={formData.apellido}
                      onChange={handleInputChange}
                      className="w-full bg-transparent pb-2 text-black font-archivo text-base tracking-wider focus:outline-none border-0"
                      aria-label={t('contact.form.lastName')}
                      required
                    />
                  </div>
                  <label htmlFor="apellido" className="block mt-2 font-archivo text-black uppercase contact-label-mobile md:hidden">
                    {t('contact.form.lastName')}
                  </label>
                  <label htmlFor="apellido" className="hidden md:block mt-2 font-archivo text-black uppercase contact-label-desktop">
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
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-transparent pb-2 text-black font-archivo text-base tracking-wider focus:outline-none border-0"
                    aria-label={t('contact.form.email')}
                    required
                  />
                </div>
                <label htmlFor="email" className="block mt-2 font-archivo text-black uppercase contact-label-mobile md:hidden">
                  {t('contact.form.email')}
                </label>
                <label htmlFor="email" className="hidden md:block mt-2 font-archivo text-black uppercase contact-label-desktop">
                  {t('contact.form.email')}
                </label>
              </div>

              {/* Asunto */}
              <div>
                <div className={`form-field form-field-delay-3 ${isFormVisible ? 'animate' : ''}`}>
                  <input
                    type="text"
                    name="asunto"
                    id="asunto"
                    value={formData.asunto}
                    onChange={handleInputChange}
                    className="w-full bg-transparent pb-2 text-black font-archivo text-base tracking-wider focus:outline-none border-0"
                    aria-label={t('contact.form.subject')}
                    required
                  />
                </div>
                <label 
                  htmlFor="asunto"
                  className="block mt-2 font-archivo text-black uppercase"
                  style={{ 
                    fontSize: 'clamp(16px, 1.02vw, 15.36px)', 
                    lineHeight: '100%',
                    letterSpacing: '0%',
                    fontWeight: '400'
                  }}
                >
                  {t('contact.form.subject')}
                </label>
              </div>

              {/* Mensaje */}
              <div>
                <div className={`form-field form-field-delay-4 ${isFormVisible ? 'animate' : ''}`}>
                  <textarea
                    name="mensaje"
                    id="mensaje"
                    value={formData.mensaje}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full bg-transparent pb-2 text-black font-archivo text-base tracking-wider resize-none focus:outline-none border-0"
                    aria-label={t('contact.form.message')}
                    required
                  />
                </div>
                <label 
                  htmlFor="mensaje"
                  className="block mt-2 font-archivo text-black uppercase"
                  style={{ 
                    fontSize: 'clamp(16px, 1.02vw, 15.36px)', 
                    lineHeight: '100%',
                    letterSpacing: '0%',
                    fontWeight: '400'
                  }}
                >
                  {t('contact.form.message')}
                </label>
                
                {/* Mensajes de estado */}
                {status === 'success' && (
                  <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded">
                    <p className="font-archivo text-green-800 text-sm">
                      Mensaje enviado correctamente. Nos pondremos en contacto contigo pronto.
                    </p>
                  </div>
                )}

                {status === 'error' && errorMessage && (
                  <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded">
                    <p className="font-archivo text-red-800 text-sm">
                      {errorMessage}
                    </p>
                  </div>
                )}

                {/* Botón Enviar en el flujo normal */}
                <div className="flex justify-end mt-6">
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className={`font-archivo tracking-wider transition-opacity text-base cursor-pointer min-h-12 px-4 ${
                      status === 'loading' 
                        ? 'text-black/20 cursor-not-allowed' 
                        : 'text-black/30 hover:opacity-70'
                    }`}
                    aria-label="Enviar formulario de contacto"
                  >
                    {status === 'loading' ? 'ENVIANDO...' : t('contact.form.send')}
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Información de contacto - Columnas 1-6 en desktop, después del formulario en mobile */}
          <div className="col-6 md:col-span-6 order-3">
            <div className="md:mb-20 mt-32 md:-mt-80">
              <div>
                <a 
                  href="mailto:INFO@GRUPOFRALI.COM" 
                  className="font-archivo text-black hover:opacity-70 transition-opacity uppercase"
                  style={{
                    fontSize: 'clamp(13.75px, 1.1vw, 16.54px)',
                    lineHeight: '100%',
                    letterSpacing: '0%',
                    fontWeight: '400'
                  }}
                >
                  {t('contact.contactInfo.generalInfo')}
                </a>
              </div>
              
              <div className="-mt-1">
                <a 
                  href="mailto:PRENSA@GRUPOFRALI.COM" 
                  className="font-archivo text-black hover:opacity-70 transition-opacity uppercase"
                  style={{
                    fontSize: 'clamp(13.75px, 1.1vw, 16.54px)',
                    lineHeight: '100%',
                    letterSpacing: '0%',
                    fontWeight: '400'
                  }}
                >
                  {t('contact.contactInfo.pressComms')}
                </a>
              </div>
              
              <div className="-mt-1 py-2 md:py-0">
                <a 
                  href="tel:+543489466110" 
                  className="font-archivo text-black hover:opacity-70 transition-opacity uppercase"
                  style={{
                    fontSize: 'clamp(13.75px, 1.1vw, 16.54px)',
                    lineHeight: '100%',
                    letterSpacing: '0%',
                    fontWeight: '400'
                  }}
                >
                  {t('contact.contactInfo.phone')}
                </a>
              </div>
            </div>

            <div className="space-y-1 md:mt-40 ">
              <p 
                className="font-archivo text-black uppercase"
                style={{
                  fontSize: 'clamp(13.75px, 1.1vw, 16.54px)',
                  lineHeight: '100%',
                  letterSpacing: '0%',
                  fontWeight: '400'
                }}
              >
                {t('contact.contactInfo.address')}
              </p>
              <p 
                className="font-archivo text-black uppercase"
                style={{
                  fontSize: 'clamp(13.75px, 1.1vw, 16.54px)',
                  lineHeight: '100%',
                  letterSpacing: '0%',
                  fontWeight: '400'
                }}
              >
                {t('contact.contactInfo.city')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}