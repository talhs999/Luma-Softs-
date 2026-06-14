import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { query } from '../../../../lib/db';
import { generateEmailHTML } from '../../../../lib/emailTemplate';

export async function POST(req) {
  try {
    const { booking, newStatus } = await req.json();

    // 1. Update in local MySQL
    await query('UPDATE bookings SET status = ? WHERE id = ?', [newStatus, booking.id]);

    // 2. Setup NodeMailer Transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: process.env.SMTP_PORT || 587,
      secure: process.env.SMTP_PORT === '465', 
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      const statusMessage = newStatus === 'Confirmed' ? 'We are pleased to inform you that your meeting has been confirmed and we are looking forward to speaking with you.' 
        : newStatus === 'Completed' ? 'Your meeting has been marked as completed. Thank you for choosing Luma Softs!'
        : newStatus === 'Cancelled' ? 'Your meeting has been cancelled. If you have any questions or wish to reschedule, please contact us.'
        : 'The status of your meeting has been updated to Pending.';

      const clientHtml = generateEmailHTML(
        `Meeting Status Update: ${newStatus}`,
        `
          <p style="margin-top: 0; font-size: 18px; font-weight: 600;">Hi ${booking.name},</p>
          <p>${statusMessage}</p>
          <p>Here are the details of your meeting:</p>
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #eaeaea;">
            <p style="margin: 0 0 10px 0;"><strong>Service:</strong> ${booking.service}</p>
            <p style="margin: 0 0 10px 0;"><strong>Date:</strong> ${booking.booking_date}</p>
            <p style="margin: 0;"><strong>Time:</strong> ${booking.booking_time}</p>
          </div>
          <p>If you need to get in touch with us, feel free to reply directly to this email.</p>
          <br/>
          <p style="margin: 0;">Best regards,</p>
          <p style="margin: 5px 0 0 0; font-weight: 600;">The Luma Softs Team</p>
        `
      );

      try {
        await transporter.sendMail({
          from: `"Luma Softs" <${process.env.SMTP_USER}>`, 
          to: booking.email, 
          subject: `Meeting Status Update: ${newStatus}`,
          html: clientHtml
        });
      } catch (emailError) {
        console.error("Email sending failed:", emailError.message);
      }
    }

    return NextResponse.json({ success: true, message: "Status updated and email sent" });
  } catch (error) {
    console.error("Error updating status:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
