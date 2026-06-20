import nodemailer from 'nodemailer';

async function testSMTP() {
  console.log("Testing SMTP connection...");

  const transporter = nodemailer.createTransport({
    host: "mail.lumasofts.com",
    port: 465,
    secure: true,
    auth: {
      user: "info@lumasofts.com",
      pass: "pak12345!@#$%",
    },
  });

  try {
    const success = await transporter.verify();
    console.log("Server is ready to take our messages. Success: ", success);
  } catch (error) {
    console.error("SMTP Error Details: ", error);
  }
}

testSMTP();
