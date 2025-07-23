
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';
import LoadingScreen from '../components/LoadingScreen';
import Dashboard from '../components/Dashboard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock, Shield, Database, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);

    // Check authentication state
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => {
      clearTimeout(timer);
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (user && session) {
      navigate('/vault-dashboard');
    }
  }, [user, session, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (isLogin) {
        // Login with email/username
        const { error } = await supabase.auth.signInWithPassword({
          email: email.includes('@') ? email : `${email}@temp.com`, // Allow username login
          password,
        });

        if (error) {
          toast.error(error.message);
        } else {
          toast.success('Login successful!');
        }
      } else {
        // Sign up
        if (!username) {
          toast.error('Username is required for signup');
          return;
        }

        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/vault-dashboard`,
            data: {
              username,
            }
          }
        });

        if (error) {
          toast.error(error.message);
        } else {
          toast.success('Account created successfully!');
        }
      }
    } catch (error: any) {
      toast.error('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/vault-dashboard`,
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Password reset email sent!');
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  // If not authenticated, show landing page with login option
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/10 opacity-20"></div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="mb-12">
          <div className="mx-auto w-24 h-24 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center mb-6">
            <Shield className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-6">
            Welcome to <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">CrypDNA Vault</span>
          </h1>
          <p className="text-lg text-gray-300 mb-8 max-w-xl mx-auto">
            Your secure gateway to credit building, identity management, and exclusive Crypdawgs benefits.
          </p>
          
          {/* Login/Signup Form */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white max-w-md mx-auto mb-8">
            <CardHeader className="text-center">
              <Lock className="w-8 h-8 mx-auto mb-2 text-purple-400" />
              <CardTitle className="text-xl">{isLogin ? 'Access Your Vault' : 'Create Your Vault'}</CardTitle>
              <CardDescription className="text-gray-300">
                {isLogin ? 'Sign in to manage your CrypDNA File' : 'Join the exclusive Crypdawgs community'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">Email {!isLogin && '/ Username'}</Label>
                  <Input
                    id="email"
                    type={isLogin ? 'email' : 'text'}
                    placeholder={isLogin ? 'Enter your email' : 'Enter email or username'}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-white/20 border-white/30 text-white placeholder:text-gray-400"
                  />
                </div>
                
                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-white">Username</Label>
                    <Input
                      id="username"
                      type="text"
                      placeholder="Choose a unique username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      className="bg-white/20 border-white/30 text-white placeholder:text-gray-400"
                    />
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="bg-white/20 border-white/30 text-white placeholder:text-gray-400 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                >
                  {isSubmitting ? 'Processing...' : isLogin ? 'Access Vault' : 'Create Vault'}
                </Button>
                
                {isLogin && (
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="w-full text-sm text-purple-400 hover:text-purple-300 underline"
                  >
                    Forgot your password?
                  </button>
                )}
                
                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-sm text-gray-300 hover:text-white"
                  >
                    {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
                  </button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardHeader className="text-center">
              <Shield className="w-8 h-8 mx-auto mb-2 text-purple-400" />
              <CardTitle className="text-lg">Secure Vault</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-300">
                Military-grade encryption protects your digital assets and identity data.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardHeader className="text-center">
              <Database className="w-8 h-8 mx-auto mb-2 text-blue-400" />
              <CardTitle className="text-lg">CrypDNA Files</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-300">
                Unique digital DNA for identity verification and vault access.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardHeader className="text-center">
              <Lock className="w-8 h-8 mx-auto mb-2 text-indigo-400" />
              <CardTitle className="text-lg">Tier Benefits</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-300">
                Unlock exclusive rewards and features based on your vault tier.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
