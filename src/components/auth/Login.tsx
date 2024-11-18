import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { Mail } from 'lucide-react';
import toast from 'react-hot-toast';

const provider = new GoogleAuthProvider();

export function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      // Sign in with Google account
      const result = await signInWithPopup(auth, provider);
      // Get user info from the result
      const user = result.user;
      console.log('User Info:', user);

      // Navigate to the home page after successful login
      navigate('/');
    } catch (error: any) {
      toast.error('Failed to log in with Google');
    } finally {
      setLoading(false);
    }
  };

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
