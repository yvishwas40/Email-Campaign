import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();

// Enable CORS for all origins (can be customized for specific domains)
app.use(cors());

app.use(express.json());  // For parsing application/json

// Set up the mail transporter using Gmail's service
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.VITE_EMAIL_USER,  // Gmail address from .env file
    pass: process.env.VITE_EMAIL_PASS,  // Gmail password or App password from .env file
  },
});

app.post('/send-email', async (req, res) => {
  const { recipients, subject, template } = req.body;

  // Check if all fields are provided
  if (!recipients || !subject || !template) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Prepare the email options
  const mailOptions = {
    from: process.env.VITE_EMAIL_USER,  // Sender's email address
    to: recipients.join(','),  // Join the array of recipients as a comma-separated string
    subject: subject,  // Email subject
    text: template,  // Email body (template)
  };

  // Send the email
  try {
    const info = await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: 'Email sent successfully!', info });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ error: 'Failed to send email: ' + error.message });
  }
});

app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
