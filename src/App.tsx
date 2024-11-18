import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './components/auth/AuthProvider'; // Use useAuth correctly
import { Dashboard } from './components/dashboard/Dashboard';
import { Login } from './components/auth/Login';

const queryClient = new QueryClient();

// PrivateRoute component to protect routes that require authentication
function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth(); // Access auth state from context

  if (loading) {
    return <div>Loading...</div>; // Loading state while auth data is being fetched
  }

  if (!user) {
    return <Navigate to="/login" />; // Redirect to login page if no user is authenticated
  }

  return <>{children}</>; // Render children (Dashboard or other protected pages)
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Protected Route for Dashboard */}
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            {/* Login Route */}
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
        <Toaster position="top-right" />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
