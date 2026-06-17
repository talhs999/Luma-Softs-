import { NextResponse } from "next/server";
import { getDbConnection } from "../../../lib/db";
import nodemailer from "nodemailer";
import { generateEmailHTML } from "../../../lib/emailTemplate";

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }

    const pool = await getDbConnection();

    // Insert email into DB. If it already exists, ignore to prevent errors.
    const query = `
      INSERT IGNORE INTO email_subscribers (email, is_subscribed)
      VALUES (?, true)
    `;
    const [result] = await pool.query(query, [email]);

    // If result.affectedRows === 0, the email already exists.
    // We can still send them an email or just return success so the frontend moves on.
    
    // Set up Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: "mail.lumasofts.com",
      port: 465,
      secure: true,
      auth: {
        user: "info@lumasofts.com",
        pass: "pak12345!@#$%",
      },
      tls: {
        // Do not fail on invalid certs internally in cPanel
        rejectUnauthorized: false
      }
    });

    const unsubscribeLink = `https://lumasofts.com/api/unsubscribe?email=${encodeURIComponent(email)}`;
    
    const emailContent = `
      <p style="font-size: 18px; font-weight: bold; color: #000;">Assalam o Alaikum! 👋</p>
      <p>Thank you for showing interest in Luma Softs. We are excited to have you here!</p>
      <p>As promised, here is your <strong>10% Off</strong> discount for your first custom software, website, or marketing project with us.</p>
      <div style="background-color: #f4f4f4; padding: 15px; border-left: 4px solid #c2ff05; font-family: monospace; font-size: 20px; font-weight: bold; margin: 20px 0;">
        PROMO CODE: LUMA10
      </div>
      <p>Just mention this code when you book a meeting or contact us on WhatsApp.</p>
      <p>
        <a href="https://lumasofts.com" style="display: inline-block; background-color: #c2ff05; color: #000; font-weight: bold; padding: 12px 24px; text-decoration: none; border-radius: 8px;">Explore Our Services</a>
      </p>
      <hr style="border: none; border-top: 1px solid #eaeaea; margin: 30px 0;" />
      <p style="font-size: 12px; color: #888;">If you no longer wish to receive these emails, you can <a href="${unsubscribeLink}" style="color: #888; text-decoration: underline;">unsubscribe here</a>.</p>
    `;

    const html = generateEmailHTML("Welcome to Luma Softs!", emailContent);

    // Send Welcome Email
    await transporter.sendMail({
      from: `"Luma Softs" <${process.env.SMTP_USER || "info@lumasofts.com"}>`,
      to: email,
      subject: "Your 10% Discount inside! Welcome to Luma Softs 🚀",
      html: html,
    });

    return NextResponse.json({ success: true, message: "Subscribed successfully" });

  } catch (error) {
    console.error("Subscription Error:", error);
    // Return detailed error for debugging
    return NextResponse.json({ error: "Failed: " + (error.message || "Unknown Error") }, { status: 500 });
  }
}
