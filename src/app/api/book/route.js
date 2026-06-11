import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { supabase } from '../../../lib/supabase';
import { generateEmailHTML } from '../../../lib/emailTemplate';

export async function POST(req) {
  try {
    const data = await req.json();
    const { name, email, phone, service, date, time } = data;

    // 1. Check for existing booking on same date
    if (supabase) {
      const { data: existingBookings } = await supabase
        .from('bookings')
        .select('id')
        .eq('email', email)
        .eq('booking_date', date);

      if (existingBookings && existingBookings.length > 0) {
        return NextResponse.json({ success: false, error: "You already have a meeting scheduled for this date." }, { status: 400 });
      }

      // 2. Save to Supabase
      const { error: dbError } = await supabase.from('bookings').insert([{ 
        name, email, phone, service, booking_date: date, booking_time: time 
      }]);
      
      if (dbError) {
        console.error("Supabase insert error:", dbError);
      }
    }

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
      
      // EMAIL 1: Notify the Admin (info@lumasofts.com)
      const adminHtml = generateEmailHTML(
        "New Meeting Booking",
        `
          <p style="margin-top: 0;">Hello Team,</p>
          <p>You have received a new meeting request from the website. Here are the details:</p>
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #eaeaea;">
            <p style="margin: 0 0 10px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 0 0 10px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #050505;">${email}</a></p>
            <p style="margin: 0 0 10px 0;"><strong>Phone:</strong> ${phone}</p>
            <p style="margin: 0 0 10px 0;"><strong>Service of Interest:</strong> ${service}</p>
            <p style="margin: 0 0 10px 0;"><strong>Requested Date:</strong> ${date}</p>
            <p style="margin: 0;"><strong>Requested Time:</strong> ${time}</p>
          </div>
          <p>Please log in to the admin dashboard to manage this booking.</p>
        `
      );

      try {
        await transporter.sendMail({
          from: `"Luma Softs Booking" <${process.env.SMTP_USER}>`, 
          replyTo: email,
          to: 'info@lumasofts.com', 
          subject: `📅 New Booking from ${name}`,
          html: adminHtml
        });

        await transporter.sendMail({
          from: `"Luma Softs" <${process.env.SMTP_USER}>`, 
          to: email, 
          subject: `Your meeting request with Luma Softs is received!`,
          html: clientHtml
        });
      } catch (emailError) {
        console.error("Email sending failed, but booking was saved:", emailError.message);
      }

    } else {
      console.warn("⚠️ SMTP credentials not found. Emails bypassed.");
    }

    return NextResponse.json({ success: true, message: "Booking confirmed" });
  } catch (error) {
    console.error("Error in booking API:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
