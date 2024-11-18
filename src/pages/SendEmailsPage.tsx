import React, { useState } from 'react';
import EmailSender from '../components/EmailSender';

const SendEmailsPage: React.FC = () => {
  const [dataset, setDataset] = useState([
    {
      email: 'user1@example.com',
      CompanyName: 'ABC Corp',
      Location: 'New York',
    },
    {
      email: 'user2@example.com',
      CompanyName: 'XYZ Ltd',
      Location: 'Los Angeles',
    },
    // Add more dataset rows here
  ]);

  return (
    <div className="send-emails-page">
      <h1>Send Customized Emails</h1>
      <EmailSender dataset={dataset} />
    </div>
  );
};

export default SendEmailsPage;
