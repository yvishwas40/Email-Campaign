import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../lib/firebase'; // Ensure this is the correct path
import { Mail } from 'lucide-react';
import toast from 'react-hot-toast';

const provider = new GoogleAuthProvider();

export function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [columns, setColumns] = useState<string[]>([]); // State to hold columns for dynamic use

  // Example dataset (this should come from the actual data you're working with)
  const dataset = [
    { companyName: 'Company A', location: 'New York', email: 'contact@companya.com' },
    { companyName: 'Company B', location: 'San Francisco', email: 'contact@companyb.com' },
  ];

  // Detect and store column names from the dataset
  const detectColumns = () => {
    const columnNames = Object.keys(dataset[0] || {});
    setColumns(columnNames);
  };

  // Function to replace placeholders in the email template (if needed in future components)
  const replacePlaceholders = (text: string, data: any) => {
    let updatedText = text;
    columns.forEach((column) => {
      updatedText = updatedText.replace(new RegExp(`{${column}}`, 'g'), data[column] || '');
    });
    return updatedText;
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      // Sign in with Google account
      const result = await signInWithPopup(auth, provider);

      // Get user info from the result
      const user = result.user;
      console.log('User Info:', user);

      // Optionally, save user info in your app's state/context

      // Navigate to the home page after successful login
      navigate('/');
    } catch (error: any) {
      console.error('Google login error:', error); // Log error to console for debugging
      toast.error('Failed to log in with Google');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    detectColumns();  // This is where the columns get detected
  }, []);
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Mail className="h-12 w-12 text-indigo-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>
  
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {/* Display Detected Columns */}
          <div className="columns-section">
            <h3>Detected Columns</h3>
            <ul>
              {columns.length > 0 ? (
                columns.map((column, index) => <li key={index}>{column}</li>)
              ) : (
                <li>No columns detected</li>
              )}
            </ul>
          </div>
  
          {/* Your existing form */}
          <form className="space-y-6">
            <div>
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {loading ? (
                  <span className="flex items-center">
                    <span className="spinner-border animate-spin w-4 h-4 border-2 border-white rounded-full mr-2"></span>
                    Signing in with Google...
                  </span>
                ) : (
                  'Sign in with Google'
                )}
              </button>
            </div>
          </form>
  
          <div className="mt-6 flex justify-between">
            <button
              onClick={() => navigate('/signup')}
              className="text-indigo-600 hover:text-indigo-500 text-sm font-medium"
            >
              Don’t have an account? Sign up
            </button>
            <button
              onClick={() => navigate('/reset-password')}
              className="text-indigo-600 hover:text-indigo-500 text-sm font-medium"
            >
              Forgot password?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
