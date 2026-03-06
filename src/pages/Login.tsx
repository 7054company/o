import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Lock, ArrowRight } from 'lucide-react';
import { GlowText } from '../components/GlowText';
import { AuthCard } from '../components/auth/AuthCard';
import { AuthInput } from '../components/auth/AuthInput';
import { AuthButton } from '../components/auth/AuthButton';
import { useTheme } from '../contexts/ThemeContext';
import { authService } from '../services/auth.service';

export const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      setIsLoading(true);
      await authService.login(formData.email, formData.password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-white dark:bg-black overflow-hidden flex items-center justify-center transition-colors duration-300">
      <AuthCard>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">
            <GlowText className={`${isDark ? 'dark-glow' : ''} text-gray-900 dark:text-white`}>
              Welcome Back
            </GlowText>
          </h2>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Sign in to continue to your account
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <AuthInput
            label="Email Address"
            type="email"
            placeholder="Enter your email"
            icon={<User className="w-5 h-5" />}
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />

          <div className="space-y-1">
            <AuthInput
              label="Password"
              type="password"
              placeholder="Enter your password"
              icon={<Lock className="w-5 h-5" />}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
            <div className="flex justify-end">
              <Link
                to="/forgot-password"
                className={`text-sm ${
                  isDark 
                    ? 'text-blue-400 hover:text-blue-300' 
                    : 'text-blue-600 hover:text-blue-500'
                } transition-colors`}
              >
                Forgot password?
              </Link>
            </div>
          </div>

          <AuthButton type="submit" isLoading={isLoading}>
            Sign In
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </AuthButton>
        </form>

        <div className="mt-6 text-center">
          <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
            Don't have an account?{' '}
            <Link
              to="/signup"
              className={`${
                isDark 
                  ? 'text-blue-400 hover:text-blue-300' 
                  : 'text-blue-600 hover:text-blue-500'
              } transition-colors`}
            >
              Sign up
            </Link>
          </p>
        </div>
      </AuthCard>
    </div>
  );
};