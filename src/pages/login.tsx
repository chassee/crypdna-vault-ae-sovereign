import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('signin');
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();

  // Check for existing session and handle redirects
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/dashboard');
        return;
      }
    };

    checkSession();

    // Handle query params
    const emailParam = searchParams.get('email');
    const tabParam = searchParams.get('tab');
    
    if (emailParam) {
      setEmail(emailParam);
    }
    
    if (tabParam === 'signup') {
      setActiveTab('signup');
    }
  }, [navigate, searchParams]);

  const handleSignIn = async () => {
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          toast({
            title: "Invalid credentials",
            description: "Please check your email and password.",
            variant: "destructive",
          });
        } else if (error.message.includes('Email not confirmed')) {
          toast({
            title: "Email not verified",
            description: "Please check your email and click the verification link.",
            variant: "destructive",
          });
        } else {
          throw error;
        }
        return;
      }
      
      navigate('/dashboard');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    if (!email || !password || !confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match.",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`
        }
      });
      
      if (error) {
        if (error.message.includes('User already registered')) {
          toast({
            title: "Account exists",
            description: "An account with this email already exists. Please sign in instead.",
            variant: "destructive",
          });
          setActiveTab('signin');
        } else {
          throw error;
        }
        return;
      }
      
      toast({
        title: "Account created!",
        description: "Please check your email to verify your account.",
      });
      
      navigate('/dashboard');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden page-transition" style={{ background: '#121212' }}>
      {/* Premium Dark Background with Subtle Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 via-black to-gray-800/30"></div>
      
      {/* Floating Particles */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-500/40 rounded-full sparkle-animation"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-purple-400/30 rounded-full sparkle-animation" style={{animationDelay: '10s'}}></div>
        <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-purple-300/20 rounded-full sparkle-animation" style={{animationDelay: '20s'}}></div>
      </div>
      
      <div className="relative z-10 flex min-h-screen items-center justify-center p-6">
        <div className="glassmorphism-auth w-full max-w-lg p-8 rounded-3xl">
          <div className="text-center pb-6">
            {/* Animated Vault Logo */}
            <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-purple-600/30 to-purple-800/20 backdrop-blur-sm border border-purple-500/30 vault-logo-pulse">
              <div className="diamond-logo">
                <div className="h-10 w-10 rotate-45 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl shadow-2xl"></div>
              </div>
            </div>
            
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent mb-3">
              CrypDNA Vault
            </h1>
            <p className="text-gray-400 text-lg">
              Access your billionaire-class crypto portfolio
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6 bg-gray-800/50 rounded-xl p-1">
              <TabsTrigger 
                value="signin" 
                className="data-[state=active]:bg-purple-600 data-[state=active]:text-white text-gray-300 rounded-lg transition-all duration-200"
              >
                Sign In
              </TabsTrigger>
              <TabsTrigger 
                value="signup" 
                className="data-[state=active]:bg-purple-600 data-[state=active]:text-white text-gray-300 rounded-lg transition-all duration-200"
              >
                Create Account
              </TabsTrigger>
            </TabsList>

            <TabsContent value="signin" className="space-y-6">
              <div className="space-y-3">
                <label htmlFor="signin-email" className="block text-sm font-medium text-gray-300">
                  Email Address
                </label>
                <input
                  id="signin-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full h-12 px-4 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder:text-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all duration-300"
                  required
                />
              </div>
              
              <div className="space-y-3">
                <label htmlFor="signin-password" className="block text-sm font-medium text-gray-300">
                  Password
                </label>
                <input
                  id="signin-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full h-12 px-4 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder:text-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all duration-300"
                  required
                />
              </div>

              <button
                onClick={handleSignIn}
                disabled={loading}
                className="w-full h-12 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold rounded-xl shadow-xl hover:shadow-2xl disabled:opacity-50 transition-all duration-300 amex-cta"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="luxury-spinner w-5 h-5"></div>
                    Signing In...
                  </div>
                ) : (
                  'Access Vault'
                )}
              </button>
            </TabsContent>

            <TabsContent value="signup" className="space-y-6">
              <div className="space-y-3">
                <label htmlFor="signup-email" className="block text-sm font-medium text-gray-300">
                  Email Address
                </label>
                <input
                  id="signup-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full h-12 px-4 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder:text-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all duration-300"
                  required
                />
              </div>
              
              <div className="space-y-3">
                <label htmlFor="signup-password" className="block text-sm font-medium text-gray-300">
                  Password
                </label>
                <input
                  id="signup-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full h-12 px-4 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder:text-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all duration-300"
                  required
                />
              </div>

              <div className="space-y-3">
                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-300">
                  Confirm Password
                </label>
                <input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  className="w-full h-12 px-4 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder:text-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all duration-300"
                  required
                />
              </div>

              <button
                onClick={handleSignUp}
                disabled={loading}
                className="w-full h-12 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold rounded-xl shadow-xl hover:shadow-2xl disabled:opacity-50 transition-all duration-300 amex-cta"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="luxury-spinner w-5 h-5"></div>
                    Creating Account...
                  </div>
                ) : (
                  'Create Billionaire Account'
                )}
              </button>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Login;