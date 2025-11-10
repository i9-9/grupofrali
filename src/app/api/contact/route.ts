import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: NextRequest) {
  try {
    // Validar que la API key esté configurada
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('RESEND_API_KEY no está configurada');
      return NextResponse.json(
        { error: 'Configuración del servidor incompleta. Por favor contacta al administrador.' },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);
    const body = await request.json();
    const { nombre, apellido, email, asunto, mensaje } = body;

    // Validación básica
    if (!nombre || !apellido || !email || !asunto || !mensaje) {
      return NextResponse.json(
        { error: 'Todos los campos son requeridos' },
        { status: 400 }
      );
    }

    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      );
    }

    // Función para escapar HTML y prevenir XSS
    const escapeHtml = (text: string): string => {
      const map: Record<string, string> = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;',
      };
      return text.replace(/[&<>"']/g, (m) => map[m]);
    };

    // Escapar datos del usuario para prevenir XSS
    const safeNombre = escapeHtml(nombre);
    const safeApellido = escapeHtml(apellido);
    const safeEmail = escapeHtml(email);
    const safeAsunto = escapeHtml(asunto);
    const safeMensaje = escapeHtml(mensaje).replace(/\n/g, '<br>');

    // Enviar email usando Resend
    // Usando dominio de prueba de Resend que no requiere verificación DNS
    // Para producción, puedes cambiar a tu dominio verificado cuando esté listo
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
    
    const { data, error } = await resend.emails.send({
      from: `Contacto Grupo Frali <${fromEmail}>`,
      to: ['info@grupofrali.com'],
      replyTo: email,
      subject: `Contacto: ${safeAsunto}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #333; padding-bottom: 10px;">
            Nuevo mensaje de contacto
          </h2>
          
          <div style="margin-top: 20px;">
            <p><strong>Nombre:</strong> ${safeNombre} ${safeApellido}</p>
            <p><strong>Email:</strong> ${safeEmail}</p>
            <p><strong>Asunto:</strong> ${safeAsunto}</p>
          </div>
          
          <div style="margin-top: 30px;">
            <h3 style="color: #333;">Mensaje:</h3>
            <p style="white-space: pre-wrap; background-color: #f5f5f5; padding: 15px; border-radius: 5px;">
              ${safeMensaje}
            </p>
          </div>
        </div>
      `,
      text: `
Nuevo mensaje de contacto

Nombre: ${nombre} ${apellido}
Email: ${email}
Asunto: ${asunto}

Mensaje:
${mensaje}
      `,
    });

    if (error) {
      console.error('Error enviando email desde Resend:', JSON.stringify(error, null, 2));
      
      // Mensajes de error más específicos
      let errorMessage = 'Error al enviar el mensaje. Por favor intenta nuevamente.';
      if (error.message) {
        if (error.message.includes('API key')) {
          errorMessage = 'Error de configuración del servidor. Por favor contacta al administrador.';
        } else if (error.message.includes('domain')) {
          errorMessage = 'Error de configuración del dominio. Por favor contacta al administrador.';
        }
      }
      
      return NextResponse.json(
        { error: errorMessage },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Mensaje enviado correctamente', id: data?.id },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error en API de contacto:', error);
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    console.error('Detalles del error:', errorMessage);
    
    return NextResponse.json(
      { 
        error: 'Error al procesar la solicitud',
        details: process.env.NODE_ENV === 'development' ? errorMessage : undefined
      },
      { status: 500 }
    );
  }
}

