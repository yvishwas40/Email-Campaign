import { useState } from 'react';
import toast from 'react-hot-toast';
import { generateEmailContent } from '../api/groq';
import { sendEmail } from '../api/sendgrid';

interface RowData {
  email: string;
  [key: string]: any; // Other dynamic fields (e.g., CompanyName, Location)
}

interface EmailSenderProps {
  dataset: RowData[]; // Array of row data for sending emails
}

const EmailSender: React.FC<EmailSenderProps> = ({ dataset }) => {
  const [emailPrompt, setEmailPrompt] = useState<string>(''); // User input for prompt
  const [loading, setLoading] = useState<boolean>(false);

  const handleSendEmails = async () => {
    setLoading(true);
    try {
      for (const row of dataset) {
        const generatedContent = await generateEmailContent(emailPrompt, row); // Get generated content
        await sendEmail(row.email, 'Customized Subject', generatedContent); // Send email
        toast.success(`Email sent to ${row.email}`);
      }
    } catch (error) {
      toast.error('Error sending emails');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="email-sender">
      <h2>Email Customization and Sending</h2>
      <textarea
        placeholder="Enter your email prompt here (e.g., Hello {CompanyName}, welcome to {Location})"
        value={emailPrompt}
        onChange={(e) => setEmailPrompt(e.target.value)}
        className="w-full p-2 border"
      />
      <button
        onClick={handleSendEmails}
        disabled={loading}
        className="mt-4 p-2 bg-blue-500 text-white"
      >
        {loading ? 'Sending Emails...' : 'Send Customized Emails'}
      </button>
    </div>
  );
};

export default EmailSender;
