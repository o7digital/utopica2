import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY || '';
const resend = resendApiKey ? new Resend(resendApiKey) : null;

interface SendAuditResultEmailProps {
  to: string;
  websiteUrl?: string;
  analysisResult: string;
}

interface SendEmailProps {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: SendEmailProps) {
  if (!resend) {
    console.warn('Email service is not configured. Email would be sent to:', to);
    console.log('Subject:', subject);
    return { success: true, data: { id: 'mock-email-id' } };
  }

  const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
  
  try {
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [to],
      subject,
      html,
    });

    if (error) {
      console.error('Resend API error:', error);
      throw error;
    }

    console.log('Email sent successfully:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

export async function sendAuditResultEmail({
  to,
  websiteUrl,
  analysisResult
}: SendAuditResultEmailProps) {
  const subject = websiteUrl 
    ? `Tu Auditoría de Claridad Web para ${new URL(websiteUrl).hostname}`
    : 'Tu Auditoría de Claridad Web está lista';

  const html = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f5f5f5;
    }
    .container {
      background-color: white;
      border-radius: 8px;
      padding: 40px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .header {
      text-align: center;
      margin-bottom: 40px;
    }
    .logo {
      max-width: 180px;
      margin-bottom: 20px;
    }
    h1 {
      color: #0066cc;
      font-size: 28px;
      margin-bottom: 10px;
    }
    h2 {
      color: #333;
      font-size: 24px;
      margin-top: 30px;
      margin-bottom: 15px;
    }
    h3 {
      color: #0066cc;
      font-size: 20px;
      margin-top: 25px;
      margin-bottom: 10px;
    }
    .score {
      display: inline-block;
      background: #0066cc;
      color: white;
      padding: 5px 15px;
      border-radius: 20px;
      font-weight: bold;
      margin-left: 10px;
    }
    .cta-button {
      display: inline-block;
      background: #0066cc;
      color: white;
      padding: 15px 30px;
      text-decoration: none;
      border-radius: 5px;
      margin: 20px 0;
      font-weight: bold;
    }
    .cta-button:hover {
      background: #0052a3;
    }
    .footer {
      text-align: center;
      margin-top: 40px;
      padding-top: 20px;
      border-top: 1px solid #eee;
      color: #666;
      font-size: 14px;
    }
    ul {
      padding-left: 20px;
    }
    li {
      margin-bottom: 10px;
    }
    .highlight {
      background: #fffacd;
      padding: 2px 4px;
      border-radius: 3px;
    }
    .question-box {
      background: #f0f8ff;
      border-left: 4px solid #0066cc;
      padding: 15px;
      margin: 15px 0;
      font-style: italic;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="https://utopica.io/images/Utopica Logo.svg" alt="Utópica" class="logo">
      <h1>Tu Auditoría de Claridad Web está Lista</h1>
      <p>Descubre cómo optimizar tu mensaje para atraer más clientes ideales</p>
    </div>

    ${analysisResult}

    <div class="footer">
      <p>© ${new Date().getFullYear()} Utópica. Todos los derechos reservados.</p>
      <p>
        <a href="https://utopica.io" style="color: #0066cc;">utopica.io</a> | 
        <a href="mailto:hola@utopica.io" style="color: #0066cc;">hola@utopica.io</a>
      </p>
      <p style="font-size: 12px; color: #999;">
        Recibiste este email porque solicitaste una auditoría de claridad web en utopica.io
      </p>
    </div>
  </div>
</body>
</html>
  `;

  return sendEmail({ to, subject, html });
}