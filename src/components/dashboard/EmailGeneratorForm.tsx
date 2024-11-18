import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import './EmailGeneratorForm.css';  // Import custom CSS file

export function EmailGeneratorForm() {
  const [recipients, setRecipients] = useState('');
  const [subject, setSubject] = useState('');
  const [prompt, setPrompt] = useState('Hi {name} this is Vishwas from {company}');
  const [data, setData] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerateContent = async () => {
    setLoading(true);
    setError('');
    try {
      const parsedData = JSON.parse(data);
      const response = await axios.post('http://localhost:5000/generate-email-content', {
        prompt: prompt,
        data: parsedData,
      });
      setGeneratedContent(response.data.generatedContent);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const axiosErr = err as AxiosError;
        if (axiosErr.response) {
          setError(`Error generating email content: ${axiosErr.response.data.message || axiosErr.response.statusText}`);
        } else if (axiosErr.request) {
          setError('No response received from server');
        } else {
          setError(`Error generating email content: ${axiosErr.message}`);
        }
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSendEmail = async () => {
    if (!generatedContent) {
      setError('No email content generated');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await axios.post('http://localhost:5000/send-email', {
        recipients: recipients.split(','),
        subject: subject,
        content: generatedContent,
      });
      alert('Email sent successfully');
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const axiosErr = err as AxiosError;
        if (axiosErr.response) {
          setError(`Error sending email: ${axiosErr.response.data.message || axiosErr.response.statusText}`);
        } else if (axiosErr.request) {
          setError('No response received from server');
        } else {
          setError(`Error sending email: ${axiosErr.message}`);
        }
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="email-generator-container">
      <h1 className="form-title">Email Generator</h1>
      <div className="form-group">
        <input
          type="text"
          className="form-input"
          placeholder="Recipients (comma-separated)"
          value={recipients}
          onChange={(e) => setRecipients(e.target.value)}
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          className="form-input"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </div>
      <div className="form-group">
        <textarea
          className="form-textarea"
          placeholder="Enter email prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
      </div>
      <div className="form-group">
        <textarea
          className="form-textarea"
          placeholder="Enter row data in JSON format"
          value={data}
          onChange={(e) => setData(e.target.value)}
        />
      </div>
      <button
        className="form-button"
        onClick={handleGenerateContent}
        disabled={loading}
      >
        {loading ? 'Generating Content...' : 'Generate Content'}
      </button>
      {generatedContent && (
        <div className="generated-content">
          <h3>Generated Content:</h3>
          <p>{generatedContent}</p>
        </div>
      )}
      <button
        className="form-button"
        onClick={handleSendEmail}
        disabled={loading}
      >
        {loading ? 'Sending Email...' : 'Send Email'}
      </button>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}
