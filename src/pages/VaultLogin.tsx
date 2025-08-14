import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import { Loader2, Shield, CreditCard, Zap, AlertCircle, Sparkles, Gem } from 'lucide-react';
import { LuxuryThemeProvider, useTheme } from '@/components/LuxuryThemeProvider';

const VaultLoginContent = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [validatingToken, setValidatingToken] = useState(false);
  const [tokenValid, setTokenValid] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  // Signup functionality removed
  
  const token = searchParams.get('token');

  useEffect(() => {
    // Check if user is already authenticated
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        navigate('/vault-dashboard');
        return;
      }
    });

    if (token) {
      validateToken();
    } else {
      setValidatingToken(false);
      setTokenValid(true); // Allow direct login without token
    }
  }, [token, navigate]);

  const validateToken = async () => {
    setValidatingToken(true);
    try {
      const { data, error } = await supabase.functions.invoke('validate-token', {
        body: { token }
      });

      if (error) {
        console.error('Error calling validate-token function:', error);
        toast({
          title: "Error",
          description: "Failed to validate access link. You can still login manually.",
          variant: "destructive",
        });
        setTokenValid(true);
        return;
      }

      if (!data.valid) {
        toast({
          title: "Invalid Access Link",
          description: data.error || "This access link is not valid. You can still login if you have an account.",
          variant: "destructive",
        });
        setTokenValid(true);
        return;
      }

      // Token is valid
      setUserEmail(data.email);
      setLoginEmail(data.email);
      setTokenValid(true);
      toast({
        title: "Access Confirmed",
        description: `Welcome! Your vault access has been verified for ${data.email}`,
      });
    } catch (error) {
      console.error('Error validating token:', error);
      toast({
        title: "Error",
        description: "Failed to validate access link. You can still login manually.",
        variant: "destructive",
      });
      setTokenValid(true);
    } finally {
      setValidatingToken(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Input validation and sanitization
    const sanitizedEmail = loginEmail.trim().toLowerCase();
    
    // Basic email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(sanitizedEmail)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    // Password validation
    if (loginPassword.length < 6) {
      toast({
        title: "Invalid Password",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: sanitizedEmail,
        password: loginPassword,
      });

      if (error) {
        toast({
          title: "Login Failed",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      if (data.user) {
        toast({
          title: "Welcome Back!",
          description: "Successfully logged into your vault.",
        });
        navigate('/vault-dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred during login.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Signup removed - login only for existing accounts

  if (validatingToken) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-luxury-charcoal via-luxury-purple/20 to-luxury-gold/10" />
        <div className="absolute inset-0 bg-gradient-neon opacity-10 blur-3xl animate-pulse" />
        
        <Card className="w-full max-w-md luxury-card relative z-10">
          <CardContent className="flex items-center justify-center p-8">
            <div className="text-center space-y-4">
              <div className="relative">
                <Loader2 className="h-12 w-12 animate-spin mx-auto text-luxury-purple" />
                <div className="absolute inset-0 h-12 w-12 mx-auto border-2 border-luxury-purple/30 rounded-full animate-ping" />
              </div>
              <p className="text-muted-foreground font-medium">Validating your billionaire access...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0A0A0A 0%, #121212 100%)' }}>
      {/* Animated Elements - Apple Card Aesthetic */}
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

          {token && userEmail && (
            <div className="luxury-card bg-gradient-to-r from-green-900/50 to-emerald-900/50 border-green-500/30">
              <div className="p-4 flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-green-400" />
                <p className="text-sm text-green-200 font-medium">
                  Billionaire access confirmed for {userEmail}
                </p>
              </div>
            </div>
          )}

          {/* Premium Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="loginEmail" className="text-sm font-semibold text-white">Email Address</Label>
              <Input
                id="loginEmail"
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="Enter your exclusive email"
                className="luxury-input h-12 text-lg bg-black/20 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-500 focus:ring-purple-500/50 transition-all duration-300"
                required
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="loginPassword" className="text-sm font-semibold text-white">Vault Password</Label>
              <Input
                id="loginPassword"
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="Enter your secure password"
                className="luxury-input h-12 text-lg bg-black/20 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-500 focus:ring-purple-500/50 transition-all duration-300"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full h-14 text-lg font-bold luxury-button bg-gradient-to-r from-luxury-purple via-luxury-gold to-luxury-blue hover:shadow-neon"
              disabled={loading || !loginEmail || !loginPassword}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                  Accessing Vault...
                </>
              ) : (
                <>
                  <Gem className="mr-3 h-5 w-5" />
                  Access Billionaire Vault
                </>
              )}
            </Button>
          </form>

          <div className="text-center space-y-3">
            <p className="text-sm text-muted-foreground font-medium">
              Access is restricted to verified billionaire-class members only.
            </p>
          </div>

          <div className="pt-6 border-t border-luxury-purple/30 text-center space-y-3">
            <p className="text-sm text-muted-foreground">
              Don't have access? <a href="https://crypdawgs.com" className="text-luxury-gold hover:text-luxury-purple transition-colors font-semibold">Visit Crypdawgs.com</a> to purchase vault access.
            </p>
            <p className="text-xs text-muted-foreground">
              🔒 Military-Grade Encryption • 🛡️ Zero-Knowledge Security • 💎 Your wealth stays private
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const VaultLogin = () => (
  <LuxuryThemeProvider>
    <VaultLoginContent />
  </LuxuryThemeProvider>
);

export default VaultLogin;