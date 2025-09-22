import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Toaster } from '@/components/ui/toaster';

export default function Reset() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check for valid reset token in URL
  useEffect(() => {
    const hashParams = new URLSearchParams(window.location.hash.split('#')[1]);
    const accessToken = hashParams.get('access_token');
    const refreshToken = hashParams.get('refresh_token');
    
    if (!accessToken || !refreshToken) {
      toast({
        title: 'Invalid reset link',
        description: 'This password reset link is invalid or has expired.',
        variant: 'destructive'
      });
      navigate('/auth');
    }
  }, [navigate, toast]);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!password || !confirmPassword) {
      toast({
        title: 'Missing information',
        description: 'Please enter and confirm your new password.',
        variant: 'destructive'
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: 'Passwords do not match',
        description: 'Please ensure both password fields match.',
        variant: 'destructive'
      });
      return;
    }

    if (password.length < 8) {
      toast({
        title: 'Password too short',
        description: 'Password must be at least 8 characters long.',
        variant: 'destructive'
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: password
      });

      if (error) throw error;

      toast({
        title: 'Password updated!',
        description: 'Your password has been successfully reset.'
      });
      
      navigate('/vault');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Password reset failed.';
      toast({
        title: 'Error',
        description: message,
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{
        background: 'radial-gradient(ellipse at top, hsl(262, 90%, 4%) 0%, hsl(0, 0%, 1%) 100%)'
      }}>
        {/* Subtle animated background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-luxury-purple/20 to-luxury-pink/10 rounded-full blur-3xl animate-pulse-glow" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-luxury-blue/15 to-luxury-cyan/10 rounded-full blur-3xl animate-float" />
        </div>
        
        <div className="w-full max-w-lg p-8 space-y-8 relative z-10">
          {/* Header */}
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="w-20 h-20 billionaire-card rounded-2xl flex items-center justify-center">
                <svg className="w-10 h-10 text-luxury-platinum" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 1L21.05 4L20 8.18L16.82 14L20 19.82L21.05 24L12 21L2.95 24L4 19.82L7.18 14L4 8.18L2.95 4L12 1Z" />
                </svg>
              </div>
            </div>
            
            <div className="space-y-3">
              <h1 className="text-4xl font-black font-billionaire" style={{
                background: 'linear-gradient(135deg, hsl(0, 0%, 98%) 0%, hsl(262, 90%, 75%) 30%, hsl(335, 78%, 70%) 70%, hsl(213, 92%, 70%) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Reset Password
              </h1>
              <p className="text-luxury-platinum/80 text-lg font-medium tracking-wide">
                Create a new secure password for your vault
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleReset} className="space-y-6">
            <div className="space-y-3">
              <label className="text-base font-semibold text-luxury-platinum tracking-wide">
                New Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-6 py-4 text-lg luxury-input rounded-xl text-white font-medium tracking-wide"
                placeholder="Enter your new secure password"
                disabled={loading}
                style={{ fontSize: '16px' }}
              />
            </div>

            <div className="space-y-3">
              <label className="text-base font-semibold text-luxury-platinum tracking-wide">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-6 py-4 text-lg luxury-input rounded-xl text-white font-medium tracking-wide"
                placeholder="Confirm your new password"
                disabled={loading}
                style={{ fontSize: '16px' }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-5 luxury-button text-white text-lg font-bold rounded-xl flex items-center justify-center space-x-3 tracking-wide disabled:opacity-50"
              style={{
                background: 'linear-gradient(135deg, hsl(335, 78%, 62%) 0%, hsl(262, 90%, 60%) 50%, hsl(213, 92%, 60%) 100%)'
              }}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 1L21.05 4L20 8.18L16.82 14L20 19.82L21.05 24L12 21L2.95 24L4 19.82L7.18 14L4 8.18L2.95 4L12 1Z" />
              </svg>
              <span>{loading ? 'Updating...' : 'Update Password'}</span>
            </button>
          </form>

          {/* Footer */}
          <div className="text-center">
            <button
              onClick={() => navigate('/auth')}
              className="text-luxury-platinum/70 text-sm hover:text-luxury-platinum transition-colors tracking-wide"
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
      <Toaster />
    </ThemeProvider>
  );
}