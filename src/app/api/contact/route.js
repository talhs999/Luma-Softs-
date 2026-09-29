import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { query } from '../../../lib/db';
import { generateEmailHTML } from '../../../lib/emailTemplate';
export async function POST(req) {
  try {
    const data = await req.json();
    const { name, email, phone, subject, message } = data;

    // 1. Save to local MySQL database
    try {
      await query(
        'INSERT INTO messages (name, email, phone, subject, message) VALUES (?, ?, ?, ?, ?)',
        [name, email, phone || null, subject || null, message]
      );
    } catch (dbError) {
      console.error("MySQL insert error:", dbError);
    }

    // 2. Send Email to info@lumasofts.com
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT) || 587,
      secure: Number(process.env.SMTP_PORT) === 465, 
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: `"${name}" <${process.env.SMTP_USER || 'no-reply@lumasofts.com'}>`, 
      replyTo: email,
      to: 'info@lumasofts.com', 
      subject: `New Contact Form Submission: ${subject || 'No Subject'}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\nSubject: ${subject || 'N/A'}\n\nMessage:\n${message}`,
    };

    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      
      // EMAIL 1: Notify Admin
      const adminHtml = generateEmailHTML(
        "New Contact Form Submission",
        `
          <p style="margin-top: 0;">Hello Team,</p>
          <p>You have received a new message from the contact form.</p>
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #eaeaea;">
            <p style="margin: 0 0 10px 0;"><strong>From:</strong> ${name} (<a href="mailto:${email}" style="color: #050505;">${email}</a>)</p>
            <p style="margin: 0 0 10px 0;"><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            <p style="margin: 0;"><strong>Subject:</strong> ${subject || 'Not provided'}</p>
          </div>
          <h3 style="font-size: 16px; margin-bottom: 10px;">Message:</h3>
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; border: 1px solid #eaeaea; white-space: pre-wrap;">${message}</div>
        `
      );



      try {
        await transporter.sendMail({
          from: `"Luma Softs Contact" <${process.env.SMTP_USER}>`, 
          replyTo: email,
          to: 'info@lumasofts.com', 
          subject: `New Message: ${subject || 'No Subject'}`,
          html: adminHtml
        });
      } catch (emailError) {
        console.error("Email sending failed, but contact message was saved:", emailError.message);
      }

    } else {
      console.warn("⚠️ SMTP credentials not found in .env.local. Email bypassed, but message saved to database.");
    }

    return NextResponse.json({ success: true, message: "Message sent successfully" });
  } catch (error) {
    console.error("Error in contact API:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
