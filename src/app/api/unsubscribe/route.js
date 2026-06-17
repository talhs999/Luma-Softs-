import { NextResponse } from "next/server";
import { getDbConnection } from "../../../lib/db";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
      return new NextResponse(
        "<html><body><h2>Invalid request. No email provided.</h2></body></html>", 
        { status: 400, headers: { "Content-Type": "text/html" } }
      );
    }

    const pool = await getDbConnection();

    // Update DB to set is_subscribed to false
    const query = `
      UPDATE email_subscribers
      SET is_subscribed = false
      WHERE email = ?
    `;
    await pool.query(query, [email]);

    return new NextResponse(
      `
      <html>
        <head>
          <title>Unsubscribed - Luma Softs</title>
          <style>
            body { font-family: 'Arial', sans-serif; background: #f8f9fa; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; color: #333; }
            .container { background: #fff; padding: 40px; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); text-align: center; max-width: 400px; }
            h2 { color: #000; margin-bottom: 10px; }
            p { color: #666; line-height: 1.5; }
            .btn { display: inline-block; margin-top: 20px; padding: 10px 20px; background: #000; color: #fff; text-decoration: none; border-radius: 6px; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="container">
            <h2>Successfully Unsubscribed</h2>
            <p>You have been removed from our promotional mailing list. You will no longer receive automated promotional emails from us.</p>
            <p><strong>${email}</strong></p>
            <a href="https://lumasofts.com" class="btn">Return to Website</a>
          </div>
        </body>
      </html>
      `,
      { status: 200, headers: { "Content-Type": "text/html" } }
    );

  } catch (error) {
    console.error("Unsubscribe Error:", error);
    return new NextResponse(
      "<html><body><h2>Something went wrong. Please contact support.</h2></body></html>", 
      { status: 500, headers: { "Content-Type": "text/html" } }
    );
  }
}
