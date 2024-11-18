import { useState } from 'react';
import { Send } from 'lucide-react';

export function EmailComposer() {
  const [template, setTemplate] = useState('');
  const [subject, setSubject] = useState('');
  const [recipients, setRecipients] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const handleSendEmail = async () => {
    try {
      const response = await fetch('http://localhost:5000/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipients: recipients.split(','), // Split recipients by comma
          subject,
          template,
        }),
      });
  
      // Try to parse the response as JSON
      const data = await response.json().catch(() => {
        return { error: 'Invalid response from the server' }; // Fallback in case of invalid JSON
      });
  
      if (response.ok) {
        setStatusMessage('Email sent successfully!');
      } else {
        setStatusMessage(data.error || 'Failed to send email');
      }
    } catch (error) {
      console.error('Error:', error);
      setStatusMessage('An error occurred while sending the email');
    }
  };
  
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Email Composer</h2>

      <div className="space-y-6">
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
            Subject Line
          </label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Enter email subject"
          />
        </div>

        <div>
          <label htmlFor="recipients" className="block text-sm font-medium text-gray-700">
            Recipients (comma separated)
          </label>
          <input
            type="text"
            id="recipients"
            value={recipients}
            onChange={(e) => setRecipients(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Enter recipients (comma separated)"
          />
        </div>

        <div>
          <label htmlFor="template" className="block text-sm font-medium text-gray-700">
            Email Template
          </label>
          <div className="mt-1">
            <textarea
              id="template"
              rows={8}
              value={template}
              onChange={(e) => setTemplate(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Write your email template here. Use {variable} for dynamic content."
            />
          </div>
          <p className="mt-2 text-sm text-gray-500">
            Use {'{variable}'} syntax for dynamic content (e.g., {'{Company}'}, {'{Name}'}).
          </p>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleSendEmail}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Send className="h-4 w-4 mr-2" />
            Send Email
          </button>
        </div>

        {statusMessage && (
          <div className="mt-4 text-sm text-gray-700">
            {statusMessage}
          </div>
        )}
      </div>
    </div>
  );
}
