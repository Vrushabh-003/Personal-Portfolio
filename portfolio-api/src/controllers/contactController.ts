// src/controllers/contactController.ts
import { Request, Response } from 'express';
import nodemailer from 'nodemailer';

export const sendContactMessage = async (req: Request, res: Response) => {
  const { name, email, message } = req.body;

  // 1. Create a "transporter" - an object that can send email
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Use Gmail as the service
    auth: {
      user: process.env.EMAIL_USER, // Your Gmail address from .env
      pass: process.env.EMAIL_PASS, // Your App Password from .env
    },
  });

  // 2. Define the email options
  const mailOptions = {
    from: `"${name}" <${email}>`, // Sender's name and email
    to: process.env.EMAIL_USER, // The email address you want to receive the message at
    subject: `New Message from Portfolio Contact Form`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `,
  };

  // 3. Send the email
  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send message.' });
  }
};