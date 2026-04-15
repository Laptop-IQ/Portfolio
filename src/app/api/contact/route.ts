import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    // ✅ Frontend se data receive
    const {
      firstName,
      lastName,
      email,
      phone,
      service,
      message,
    } = await req.json();

    // ✅ Validation
    if (!firstName || !email || !service || !message) {
      return NextResponse.json(
        { error: "All required fields must be filled" },
        { status: 400 }
      );
    }

    // ✅ ENV check
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      return NextResponse.json(
        { error: "Email configuration missing" },
        { status: 500 }
      );
    }

    // ✅ Gmail SMTP (stable config)
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Gmail App Password
      },
    });

    // ✅ Verify SMTP (debug-safe)
    await transporter.verify();

    // 📩 1️⃣ Email to ADMIN
    await transporter.sendMail({
      from: `"Website Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: "📩 New Contact Form Message",
      html: `
        <h2>New Contact Message</h2>
        <p><b>Name:</b> ${firstName} ${lastName || ""}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone || "N/A"}</p>
        <p><b>Service:</b> ${service}</p>
        <p><b>Message:</b></p>
        <p>${message}</p>
      `,
    });

    // 📤 2️⃣ Auto-reply to USER
    await transporter.sendMail({
      from: `"Website Team" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "✅ We received your message",
      html: `
        <p>Hi <b>${firstName}</b>,</p>
        <p>Thank you for contacting us regarding <b>${service}</b>.</p>
        <p>We have received your message and will get back to you soon.</p>
        <br/>
        <p>Regards,<br/>Website Team</p>
      `,
    });

    // ✅ Success response
    return NextResponse.json(
      { success: true, message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("❌ EMAIL ERROR:", error);

    return NextResponse.json(
      {
        error: "Email sending failed",
        details: error?.message,
      },
      { status: 500 }
    );
  }
}
