export const generateEmailContent = async (prompt: string, rowData: any) => {
    try {
      const response = await fetch('https://api.groq.ai/v1/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.GROQ_API_KEY}`, // Your Groq API Key
        },
        body: JSON.stringify({
          prompt: generatePromptFromRowData(prompt, rowData),
        }),
      });
  
      const data = await response.json();
      if (data?.message) {
        return data.message; // Assuming Groq returns the email content as 'message'
      } else {
        throw new Error('Error generating email content');
      }
    } catch (error) {
      console.error('Error generating email content:', error);
      throw new Error('Failed to generate email content');
    }
  };
  
  // Helper to replace placeholders with dataset values
  const generatePromptFromRowData = (prompt: string, rowData: any) => {
    return prompt.replace(/{(\w+)}/g, (_, key) => rowData[key] || `{${key}}`);
  };
  