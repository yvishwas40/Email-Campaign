import { useState } from 'react';
import toast from 'react-hot-toast';

const sendGeneratedEmail = async (emailData) => {
  try {
    const response = await fetch('http://localhost:5000/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData),
    });

    const data = await response.json();
    if (data.message === 'Email sent successfully!') {
      toast.success('Email sent successfully!');
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    toast.error('Error generating or sending email');
    console.error('Error:', error);
  }
};

const EmailGenerator = () => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  const handleGenerateEmail = async () => {
    setLoading(true);
    setStatus('Generating email...');

    // Replace {CompanyName} and {Location} with actual dynamic values
    const emailData = {
      recipients: ['yvishwas40@gmail.com'],  // Replace with your recipients list
      subject: 'Your Custom Email Subject',
      template: 'Hello {CompanyName}, we have a special offer for you at {Location}.', // Template with dynamic placeholders
    };

    try {
      await sendGeneratedEmail(emailData);
      setStatus('Email generated and sent successfully!');
    } catch (error) {
      setStatus('Failed to generate email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Email Generator</h2>
      <button
        onClick={handleGenerateEmail}
        disabled={loading}
        className="btn btn-primary"
      >
        {loading ? 'Generating...' : 'Generate and Send Email'}
      </button>
      <p>{status}</p>
    </div>
  );
};

export default EmailGenerator;
