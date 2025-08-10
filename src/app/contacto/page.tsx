"use client"

import { useState } from 'react';

export default function Contacto() {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    asunto: '',
    mensaje: ''
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
            <h1 className="font-baskerville text-black pb-24" style={{ fontSize: 'clamp(36px, 4.5vw, 72px)', lineHeight: 'clamp(40px, 5vw, 80px)' }}>
              ENVIANOS<br />
              TU CONSULTA
            </h1>
          </div>

          {/* Formulario - Columnas 1-6 en mobile, 7-12 en desktop */}
          <div className="col-6 md:col-span-6 md:col-start-7 order-2">
            <div className="space-y-8 mt-0 md:mt-36">
              {/* Nombre y Apellido - separados en mobile, juntos en desktop */}
              <div className="flex flex-col md:flex-row md:space-x-6 space-y-8 md:space-y-0">
                <div className="flex-1">
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    className="w-full bg-transparent border-b border-black pb-2 text-black font-archivo text-sm tracking-wider focus:outline-none focus:border-black"
                    style={{ fontSize: 'clamp(12px, 1vw, 14px)' }}
                  />
                  <label className="block mt-2 font-archivo text-black tracking-wider" style={{ fontSize: 'clamp(12px, 1vw, 14px)' }}>
                    NOMBRE
                  </label>
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    name="apellido"
                    value={formData.apellido}
                    onChange={handleInputChange}
                    className="w-full bg-transparent border-b border-black pb-2 text-black font-archivo text-sm tracking-wider focus:outline-none focus:border-black"
                    style={{ fontSize: 'clamp(12px, 1vw, 14px)' }}
                  />
                  <label className="block mt-2 font-archivo text-black tracking-wider" style={{ fontSize: 'clamp(12px, 1vw, 14px)' }}>
                    APELLIDO
                  </label>
                </div>
              </div>

              {/* Email */}
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-transparent border-b border-black pb-2 text-black font-archivo text-sm tracking-wider focus:outline-none focus:border-black"
                  style={{ fontSize: 'clamp(12px, 1vw, 14px)' }}
                />
                <label className="block mt-2 font-archivo text-black tracking-wider" style={{ fontSize: 'clamp(12px, 1vw, 14px)' }}>
                  E-MAIL
                </label>
              </div>

              {/* Asunto */}
              <div>
                <input
                  type="text"
                  name="asunto"
                  value={formData.asunto}
                  onChange={handleInputChange}
                  className="w-full bg-transparent border-b border-black pb-2 text-black font-archivo text-sm tracking-wider focus:outline-none focus:border-black"
                  style={{ fontSize: 'clamp(12px, 1vw, 14px)' }}
                />
                <label className="block mt-2 font-archivo text-black tracking-wider" style={{ fontSize: 'clamp(12px, 1vw, 14px)' }}>
                  ASUNTO
                </label>
              </div>

              {/* Mensaje */}
              <div>
                <textarea
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full bg-transparent border-b border-black pb-2 text-black font-archivo text-sm tracking-wider resize-none focus:outline-none focus:border-black"
                  style={{ fontSize: 'clamp(12px, 1vw, 14px)' }}
                />
                <label className="block mt-2 font-archivo text-black tracking-wider" style={{ fontSize: 'clamp(12px, 1vw, 14px)' }}>
                  MENSAJE
                </label>
                
                {/* Botón Enviar en el flujo normal */}
                <div className="flex justify-end mt-6">
                  <button
                    onClick={handleSubmit}
                    className="font-archivo text-black/30 tracking-wider hover:opacity-70 transition-opacity"
                    style={{ fontSize: 'clamp(12px, 1vw, 14px)' }}
                  >
                    ENVIAR
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
                  className="font-archivo text-black hover:opacity-70 transition-opacity leading-tight"
                  style={{ fontSize: 'clamp(14px, 1.2vw, 16px)' }}
                >
                  INFO@GRUPOFRALI.COM
                </a>
              </div>
              
              <div>
                <a 
                  href="mailto:PRENSA@GRUPOFRALI.COM" 
                  className="font-archivo text-black hover:opacity-70 transition-opacity leading-tight"
                  style={{ fontSize: 'clamp(14px, 1.2vw, 16px)' }}
                >
                  PRENSA@GRUPOFRALI.COM
                </a>
              </div>
              
              <div>
                <a 
                  href="tel:+543489466110" 
                  className="font-archivo text-black hover:opacity-70 transition-opacity leading-tight"
                  style={{ fontSize: 'clamp(14px, 1.2vw, 16px)' }}
                >
                  +54 3489 466110
                </a>
              </div>
            </div>

            <div className="space-y-0">
              <p className="font-archivo text-black leading-tight" style={{ fontSize: 'clamp(14px, 1.2vw, 16px)' }}>
                RUTA PANAMERICANA N°9, KM 61
              </p>
              <p className="font-archivo text-black leading-tight" style={{ fontSize: 'clamp(14px, 1.2vw, 16px)' }}>
                (2804) CAMPANA, BS AS, ARGENTINA
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}