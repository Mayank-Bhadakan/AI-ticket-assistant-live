import nodemailer from "nodemailer";

export const sendMail = async (to, subject, text, fromemail = null) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAILTRAP_SMTP_HOST,
      port: Number(process.env.MAILTRAP_SMTP_PORT) || 2525,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.MAILTRAP_SMTP_USER,
        pass: process.env.MAILTRAP_SMTP_PASS,
      },
    });

    console.log("sending mail to:", to);

    const info = await transporter.sendMail({
      from: fromemail ? `${fromemail}` : '"Inngest TMS" <no-reply@example.com>',
      to,
      subject,
      text,
    });

    console.log("Message sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("❌ Mail error", error.message);
    throw error;
  }
};
