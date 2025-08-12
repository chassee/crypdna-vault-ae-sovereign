import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import { Eye, EyeOff, Sparkles } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    // Check if user is already authenticated
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/dashboard');
        return;
      }
      setCheckingAuth(false);
    };

    checkAuth();

    // Pre-fill email from query string
    const emailParam = searchParams.get('email');
    if (emailParam) {
      setEmail(emailParam);
    }

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate('/dashboard');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, searchParams]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
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
            title: "Email Not Verified",
            description: "Please check your email and click the verification link.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Sign In Error",
            description: error.message,
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Welcome back!",
          description: "Successfully signed in to your CrypDNA Vault.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
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
            title: "Account Exists",
            description: "An account with this email already exists. Try signing in instead.",
            variant: "destructive",
          });
        } else if (error.message.includes('Password should be at least')) {
          toast({
            title: "Password Too Weak",
            description: "Password must be at least 8 characters long.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Sign Up Error",
            description: error.message,
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Account Created!",
          description: "Welcome to CrypDNA Vault! You're now signed in.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 mx-auto bg-gradient-to-r from-luxury-purple to-luxury-gold rounded-full flex items-center justify-center animate-pulse">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <p className="text-muted-foreground">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background luxury-transition">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-luxury-purple/5 via-transparent to-luxury-gold/5"></div>
      
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-luxury-purple/40 rounded-full sparkle-animation"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-luxury-gold/30 rounded-full sparkle-animation" style={{animationDelay: '10s'}}></div>
        <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-luxury-blue/20 rounded-full sparkle-animation" style={{animationDelay: '20s'}}></div>
      </div>
      
      <div className="relative z-10 flex min-h-screen items-center justify-center p-4 sm:p-6">
        <div className="luxury-card w-full max-w-lg p-6 sm:p-8 rounded-3xl border bg-card/50 backdrop-blur-xl">
          <div className="text-center pb-6 sm:pb-8">
            {/* Animated Vault Logo */}
            <div className="mx-auto mb-6 sm:mb-8 flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-luxury-purple/30 to-luxury-gold/20 backdrop-blur-sm border border-luxury-purple/30 vault-logo-pulse">
              <div className="diamond-logo">
                <div className="h-8 w-8 sm:h-10 sm:w-10 rotate-45 bg-gradient-to-br from-luxury-purple to-luxury-gold rounded-xl shadow-2xl"></div>
              </div>
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-luxury-purple to-luxury-gold bg-clip-text text-transparent mb-3">
              CrypDNA Vault
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg">
              Access your billionaire-class crypto portfolio
            </p>
          </div>

          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2 luxury-card mb-6">
              <TabsTrigger 
                value="signin" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-luxury-purple data-[state=active]:to-luxury-gold data-[state=active]:text-white"
              >
                Sign In
              </TabsTrigger>
              <TabsTrigger 
                value="signup"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-luxury-purple data-[state=active]:to-luxury-gold data-[state=active]:text-white"
              >
                Create Account
              </TabsTrigger>
            </TabsList>

            <TabsContent value="signin">
              <form onSubmit={handleSignIn} className="space-y-4 sm:space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="signin-email" className="text-sm font-medium text-foreground">
                    Email Address
                  </Label>
                  <Input
                    id="signin-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="h-11 sm:h-12 luxury-input"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="signin-password" className="text-sm font-medium text-foreground">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="signin-password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="h-11 sm:h-12 luxury-input pr-10"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-auto p-1"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-11 sm:h-12 bg-gradient-to-r from-luxury-purple to-luxury-gold hover:from-luxury-purple/90 hover:to-luxury-gold/90 text-white font-semibold rounded-xl shadow-xl hover:shadow-2xl disabled:opacity-50 transition-all duration-300 luxury-button text-sm sm:text-base"
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="luxury-spinner w-4 h-4 sm:w-5 sm:h-5"></div>
                      Signing In...
                    </div>
                  ) : (
                    'Access Vault'
                  )}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignUp} className="space-y-4 sm:space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="signup-email" className="text-sm font-medium text-foreground">
                    Email Address
                  </Label>
                  <Input
                    id="signup-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="h-11 sm:h-12 luxury-input"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="signup-password" className="text-sm font-medium text-foreground">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="signup-password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Create a strong password (min 8 characters)"
                      className="h-11 sm:h-12 luxury-input pr-10"
                      required
                      minLength={8}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-auto p-1"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Password must be at least 8 characters long
                  </p>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-11 sm:h-12 bg-gradient-to-r from-luxury-purple to-luxury-gold hover:from-luxury-purple/90 hover:to-luxury-gold/90 text-white font-semibold rounded-xl shadow-xl hover:shadow-2xl disabled:opacity-50 transition-all duration-300 luxury-button text-sm sm:text-base"
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="luxury-spinner w-4 h-4 sm:w-5 sm:h-5"></div>
                      Creating Account...
                    </div>
                  ) : (
                    'Create Billionaire Account'
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Login;