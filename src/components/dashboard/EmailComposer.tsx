import { useState } from 'react';
import { Send } from 'lucide-react';

export function EmailComposer() {
  const [template, setTemplate] = useState('');
  const [subject, setSubject] = useState('');
  const [variables, setVariables] = useState<string[]>([]);

  const handleTemplateChange = (value: string) => {
    setTemplate(value);
    // Extract variables from template (matching pattern: {variable})
    const matches = value.match(/\{([^}]+)\}/g) || [];
    const extractedVars = matches.map(match => match.slice(1, -1));
    setVariables([...new Set(extractedVars)]);
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
          <label htmlFor="template" className="block text-sm font-medium text-gray-700">
            Email Template
          </label>
          <div className="mt-1">
            <textarea
              id="template"
              rows={8}
              value={template}
              onChange={(e) => handleTemplateChange(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Write your email template here. Use {variable} for dynamic content."
            />
          </div>
          <p className="mt-2 text-sm text-gray-500">
            Use {'{variable}'} syntax for dynamic content (e.g., {'{Company}'}, {'{Name}'})
          </p>
        </div>

        {variables.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Detected Variables:</h3>
            <div className="flex flex-wrap gap-2">
              {variables.map((variable) => (
                <span
                  key={variable}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                >
                  {variable}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Send className="h-4 w-4 mr-2" />
            Save Template
          </button>
        </div>
      </div>
    </div>
  );
}