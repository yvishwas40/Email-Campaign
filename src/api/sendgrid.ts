import sgMail from '@sendgrid/mail';

sgMail.setApiKey(import.meta.env.VITE_SENDGRID_API_KEY); // SendGrid API Key

export const sendEmail = async (email: string, subject: string, content: string) => {
  const msg = {
    to: email,
    from: 'your-email@example.com', // Your sending email address
    subject: subject,
    text: content,
  };

  try {
    await sgMail.send(msg);
    console.log('Email sent to', email);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
};
