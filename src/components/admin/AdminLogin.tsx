import React, { useState } from 'react';
import { Crown, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error } = isSignUp 
        ? await signUp(email, password)
        : await signIn(email, password);

      if (error) {
        setError(error.message);
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-gray-900 rounded-lg p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Crown className="h-8 w-8 text-yellow-400" />
              <div className="text-white">
                <div className="font-playfair text-xl font-bold">VIP Transport</div>
                <div className="text-yellow-400 text-sm font-montserrat">Admin Panel</div>
              </div>
            </div>
            <h2 className="font-playfair text-2xl font-semibold text-white">
              {isSignUp ? 'Create Admin Account' : 'Admin Login'}
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block font-montserrat text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-black border border-gray-600 rounded-lg focus:outline-none focus:border-yellow-400 text-white font-montserrat"
                placeholder="admin@viptransport.co.uk"
              />
            </div>

            <div>
              <label htmlFor="password" className="block font-montserrat text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-black border border-gray-600 rounded-lg focus:outline-none focus:border-yellow-400 text-white font-montserrat pr-12"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-yellow-400"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded-lg font-montserrat text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-400 text-black px-6 py-3 rounded-lg font-montserrat font-medium hover:bg-yellow-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Please wait...' : (isSignUp ? 'Create Account' : 'Sign In')}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-yellow-400 hover:text-yellow-300 font-montserrat text-sm"
            >
              {isSignUp ? 'Already have an account? Sign in' : 'Need to create an account? Sign up'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;