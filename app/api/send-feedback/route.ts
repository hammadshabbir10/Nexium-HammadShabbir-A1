import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const { to, from, subject, message } = await req.json();
    if (!to || !from || !subject || !message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    // Configure transporter using environment variables
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Create email with proper from field
    const mailOptions = {
      from: {
        name: `Feedback from ${from.split('@')[0]}`,
        address: process.env.SMTP_USER || from // Use authenticated user as fallback
      },
      replyTo: from, // Set reply-to as the user's email
      to,
      subject,
      text: message,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Feedback Message</h2>
          <p><strong>From:</strong> ${from}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <hr style="margin: 20px 0;">
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px;">
            ${message.replace(/\n/g, '<br/>')}
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Email sending error:', err);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
} 