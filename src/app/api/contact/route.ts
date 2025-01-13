import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    // Create a test account if no SMTP credentials are provided
    const testAccount = await nodemailer.createTestAccount();

    // Create a transporter using environment variables or test account
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.ethereal.email',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER || testAccount.user,
        pass: process.env.SMTP_PASS || testAccount.pass,
      },
    });

    // Email content
    const mailOptions = {
      from: `"Website Contact" <${process.env.SMTP_USER || testAccount.user}>`,
      to: process.env.CONTACT_EMAIL || testAccount.user,
      subject: `Neue Kontaktanfrage: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nBetreff: ${subject}\n\nNachricht:\n${message}`,
      html: `
        <h2>Neue Kontaktanfrage</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Betreff:</strong> ${subject}</p>
        <p><strong>Nachricht:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);

    // For development: Log the test email URL
    if (!process.env.SMTP_HOST) {
      console.log('Test email URL:', nodemailer.getTestMessageUrl(info));
    }

    return NextResponse.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send email' },
      { status: 500 }
    );
  }
} 