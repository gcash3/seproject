// src/lib/email-service.ts
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false, // Set to false for TLS
  tls: {
    // Do not fail on invalid certs
    rejectUnauthorized: false
  },
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendVerificationEmail(email: string, code: string) {
  const mailOptions = {
    from: process.env.SMTP_FROM,
    to: email,
    subject: 'AI Academy - Email Verification Code',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #4F46E5;">Welcome to AI Academy!</h2>
        <p>Please use the following verification code to complete your registration:</p>
        <div style="background-color: #F3F4F6; padding: 20px; text-align: center; border-radius: 8px;">
          <h1 style="color: #374151; letter-spacing: 4px;">${code}</h1>
        </div>
        <p style="color: #6B7280; font-size: 14px; margin-top: 20px;">
          This code will expire in 10 minutes. If you didn't request this verification, please ignore this email.
        </p>
      </div>
    `
  };

  try {
    await transporter.verify();
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Email sending error:', error);
    throw new Error('Failed to send verification email');
  }
}

export async function send2FACode(email: string, code: string) {
  const mailOptions = {
    from: process.env.SMTP_FROM,
    to: email,
    subject: 'AI Academy - Login Verification Code',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #4F46E5;">AI Academy Security Verification</h2>
        <p>Your login verification code is:</p>
        <div style="background-color: #F3F4F6; padding: 20px; text-align: center; border-radius: 8px;">
          <h1 style="color: #374151; letter-spacing: 4px;">${code}</h1>
        </div>
        <p style="color: #6B7280; font-size: 14px; margin-top: 20px;">
          This code will expire in 5 minutes. If you didn't attempt to log in, please secure your account.
        </p>
      </div>
    `
  };

  try {
    await transporter.verify();
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Email sending error:', error);
    throw new Error('Failed to send verification code');
  }
}