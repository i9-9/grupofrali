import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
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
      console.error('Error enviando email:', error);
      return NextResponse.json(
        { error: 'Error al enviar el mensaje. Por favor intenta nuevamente.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Mensaje enviado correctamente', id: data?.id },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error en API de contacto:', error);
    return NextResponse.json(
      { error: 'Error al procesar la solicitud' },
      { status: 500 }
    );
  }
}

