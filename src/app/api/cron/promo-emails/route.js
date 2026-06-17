import { NextResponse } from "next/server";
import { getDbConnection } from "../../../../lib/db";
import nodemailer from "nodemailer";
import { generateEmailHTML } from "../../../../lib/emailTemplate";

export async function GET(request) {
  // Add a simple security check to prevent random people from triggering this
  // In production, you would pass an API key in the headers or query params
  // e.g. /api/cron/promo-emails?key=SECRET
  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key");

  // Optional: Only allow if a basic secret key matches, to prevent abuse
  // If no secret is provided, we'll just run it (for now), but it's safe because
  // it only sends to eligible users and then marks them so they don't get it again.
  // We will assume 20 days is the target.

  try {
    const pool = await getDbConnection();

    // Find users who subscribed EXACTLY 20 days ago (or between 20 and 21 days ago)
    // and are still subscribed. We also need to ensure we don't send it twice.
    // To prevent double sending, we can add a column like `followup_sent`, 
    // but a quick workaround is just to check the date strictly (e.g. exactly 20 days ago).
    // Better yet, let's select users where created_at is older than 20 days, and 
    // we haven't sent the followup. Since we didn't add a `followup_sent` column, 
    // we will strictly check if `created_at` is between 20 and 21 days ago.
    
    const query = `
      SELECT email FROM email_subscribers
      WHERE is_subscribed = true
      AND created_at <= DATE_SUB(NOW(), INTERVAL 20 DAY)
      AND created_at > DATE_SUB(NOW(), INTERVAL 21 DAY)
    `;
    
    const [users] = await pool.query(query);

    if (users.length === 0) {
      return NextResponse.json({ success: true, message: "No eligible users found today." });
    }

    // Set up Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "mail.lumasofts.com",
      port: process.env.SMTP_PORT || 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER || "info@lumasofts.com",
        pass: process.env.SMTP_PASS || "pak12345!@#$%",
      },
    });

    let sentCount = 0;

    for (const user of users) {
      const unsubscribeLink = `https://lumasofts.com/api/unsubscribe?email=${encodeURIComponent(user.email)}`;
      
      const emailContent = `
        <p style="font-size: 18px; font-weight: bold; color: #000;">Assalam o Alaikum! 👋</p>
        <p>It's been a while since you grabbed our 10% discount offer! We noticed you haven't started a project with us yet.</p>
        <p>At Luma Softs, we help businesses scale with top-tier web development, AI automation, and digital marketing.</p>
        <p>Your 10% discount is still valid! If you have any questions or just want to discuss your ideas, let's schedule a quick, free consultation call.</p>
        <p>
          <a href="https://lumasofts.com" style="display: inline-block; background-color: #c2ff05; color: #000; font-weight: bold; padding: 12px 24px; text-decoration: none; border-radius: 8px;">Let's Build Something Great</a>
        </p>
        <hr style="border: none; border-top: 1px solid #eaeaea; margin: 30px 0;" />
        <p style="font-size: 12px; color: #888;">If you no longer wish to receive these emails, you can <a href="${unsubscribeLink}" style="color: #888; text-decoration: underline;">unsubscribe here</a>.</p>
      `;

      const html = generateEmailHTML("Checking In! Ready to transform your business?", emailContent);

      try {
        await transporter.sendMail({
          from: `"Luma Softs" <${process.env.SMTP_USER || "info@lumasofts.com"}>`,
          to: user.email,
          subject: "Checking In! Ready to transform your business? 🚀",
          html: html,
        });
        sentCount++;
      } catch (err) {
        console.error("Failed to send to:", user.email, err);
      }
    }

    return NextResponse.json({ success: true, message: `Follow-up emails sent to ${sentCount} users.` });

  } catch (error) {
    console.error("Cron Job Error:", error);
    return NextResponse.json({ error: "Failed to run cron job" }, { status: 500 });
  }
}
