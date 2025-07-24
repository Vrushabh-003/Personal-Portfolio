// src/controllers/contactController.ts
import { Request, Response } from 'express';

// @desc    Send contact message
// @route   POST /api/contact
// @access  Public
export const sendContactMessage = (req: Request, res: Response) => {
  const { name, email, message } = req.body;

  // In a real application, you would use a service like Nodemailer
  // to send an email here. For now, we'll just log it to the console.
  console.log('--- New Contact Form Submission ---');
  console.log(`Name: ${name}`);
  console.log(`Email: ${email}`);
  console.log(`Message: ${message}`);
  console.log('---------------------------------');

  res.status(200).json({ message: 'Message received successfully!' });
};