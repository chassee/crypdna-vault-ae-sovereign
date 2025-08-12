import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import { Loader2, Shield, CreditCard, Zap, Gem, Sparkles } from 'lucide-react';
import { LuxuryThemeProvider, useTheme } from '@/components/LuxuryThemeProvider';

const LoginContent = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [activeTab, setActiveTab] = useState('signin');
  
  const emailParam = searchParams.get('email');

  useEffect(() => {
    // Check if user is already authenticated
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        navigate('/dashboard');
        return;
      }
    });

    // Pre-fill email from query param
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [emailParam, navigate]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          toast({
            title: "Sign In Failed",
            description: "Invalid email or password. Please check your credentials and try again.",
            variant: "destructive",
          });
        } else if (error.message.includes('Email not confirmed')) {
          toast({
            title: "Email Not Confirmed",
            description: "Please check your email and confirm your account before signing in.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Sign In Failed",
            description: error.message,
            variant: "destructive",
          });
        }
        return;
      }

      if (data.user) {
        toast({
          title: "Welcome Back!",
          description: "Successfully signed into your account.",
        });
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Sign in error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred during sign in.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match. Please try again.",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Password Too Short",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl
        }
      });

      if (error) {
        if (error.message.includes('User already registered')) {
          toast({
            title: "Account Already Exists",
            description: "An account with this email already exists. Please sign in instead.",
            variant: "destructive",
          });
          setActiveTab('signin');
        } else {
          toast({
            title: "Sign Up Failed",
            description: error.message,
            variant: "destructive",
          });
        }
        return;
      }

      if (data.user) {
        toast({
          title: "Account Created!",
          description: "Welcome to CrypDNA Vault. You're now signed in.",
        });
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Sign up error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred during sign up.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0A0A0A 0%, #121212 100%)' }}>
      {/* Animated Elements */}
      <div className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-br from-purple-600/30 to-blue-600/20 rounded-full blur-3xl animate-pulse vault-logo-pulse" />
      <div className="absolute bottom-20 right-20 w-56 h-56 bg-gradient-to-br from-amber-500/20 to-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-600/10 to-blue-600/5 rounded-full blur-3xl animate-pulse delay-500" />
      
      <Card className="w-full max-w-lg apple-card relative z-10 overflow-hidden border-white/10 shadow-2xl backdrop-blur-2xl bg-gradient-to-br from-black/40 to-gray-900/40">
        {/* CrypDNA Logo Animation */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-neon animate-pulse" />
        
        <CardHeader className="text-center relative">
          <div className="flex justify-center mb-6 relative">
            <div className="relative">
              <Gem className="h-16 w-16 text-luxury-purple animate-pulse" />
              <div className="absolute inset-0 h-16 w-16 border-2 border-luxury-gold/30 rounded-full animate-ping" />
              <Sparkles className="absolute -top-2 -right-2 h-6 w-6 text-luxury-gold animate-pulse" />
            </div>
          </div>
          
          <CardTitle className="text-3xl font-black bg-gradient-to-r from-luxury-purple via-luxury-gold to-luxury-blue bg-clip-text text-transparent mb-2">
            🔐 CrypDNA Vault
          </CardTitle>
          <CardDescription className="text-lg font-medium">
            Enter the billionaire-class financial ecosystem
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-8">
          {/* Luxury Features Grid */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 luxury-card hover:scale-105 transition-transform">
              <CreditCard className="h-8 w-8 mx-auto mb-3 text-luxury-purple" />
              <p className="text-sm font-bold">Elite Credit</p>
            </div>
            <div className="text-center p-4 luxury-card hover:scale-105 transition-transform">
              <Zap className="h-8 w-8 mx-auto mb-3 text-luxury-gold" />
              <p className="text-sm font-bold">Instant Rewards</p>
            </div>
            <div className="text-center p-4 luxury-card hover:scale-105 transition-transform">
              <Shield className="h-8 w-8 mx-auto mb-3 text-luxury-blue" />
              <p className="text-sm font-bold">Military Grade</p>
            </div>
          </div>

          {/* Tabbed Auth Forms */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-black/20 border border-white/10">
              <TabsTrigger value="signin" className="data-[state=active]:bg-luxury-purple/20 data-[state=active]:text-white">
                Sign In
              </TabsTrigger>
              <TabsTrigger value="signup" className="data-[state=active]:bg-luxury-purple/20 data-[state=active]:text-white">
                Create Account
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="signin" className="space-y-6 mt-6">
              <form onSubmit={handleSignIn} className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="signinEmail" className="text-sm font-semibold text-white">Email Address</Label>
                  <Input
                    id="signinEmail"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="luxury-input h-12 text-lg bg-black/20 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-500 focus:ring-purple-500/50 transition-all duration-300"
                    required
                    disabled={!!emailParam}
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="signinPassword" className="text-sm font-semibold text-white">Password</Label>
                  <Input
                    id="signinPassword"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="luxury-input h-12 text-lg bg-black/20 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-500 focus:ring-purple-500/50 transition-all duration-300"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-14 text-lg font-bold luxury-button bg-gradient-to-r from-luxury-purple via-luxury-gold to-luxury-blue hover:shadow-neon"
                  disabled={loading || !email || !password}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                      Signing In...
                    </>
                  ) : (
                    <>
                      <Gem className="mr-3 h-5 w-5" />
                      Sign In to Vault
                    </>
                  )}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="signup" className="space-y-6 mt-6">
              <form onSubmit={handleSignUp} className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="signupEmail" className="text-sm font-semibold text-white">Email Address</Label>
                  <Input
                    id="signupEmail"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="luxury-input h-12 text-lg bg-black/20 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-500 focus:ring-purple-500/50 transition-all duration-300"
                    required
                    disabled={!!emailParam}
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="signupPassword" className="text-sm font-semibold text-white">Password</Label>
                  <Input
                    id="signupPassword"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a secure password"
                    className="luxury-input h-12 text-lg bg-black/20 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-500 focus:ring-purple-500/50 transition-all duration-300"
                    required
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="confirmPassword" className="text-sm font-semibold text-white">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    className="luxury-input h-12 text-lg bg-black/20 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-500 focus:ring-purple-500/50 transition-all duration-300"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-14 text-lg font-bold luxury-button bg-gradient-to-r from-luxury-purple via-luxury-gold to-luxury-blue hover:shadow-neon"
                  disabled={loading || !email || !password || !confirmPassword}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      <Gem className="mr-3 h-5 w-5" />
                      Create Vault Account
                    </>
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="text-center space-y-3">
            <p className="text-sm text-muted-foreground font-medium">
              Join the exclusive billionaire-class financial ecosystem
            </p>
          </div>

          <div className="pt-6 border-t border-luxury-purple/30 text-center space-y-3">
            <p className="text-xs text-muted-foreground">
              🔒 Military-Grade Encryption • 🛡️ Zero-Knowledge Security • 💎 Your wealth stays private
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const Login = () => (
  <LuxuryThemeProvider>
    <LoginContent />
  </LuxuryThemeProvider>
);

export default Login;