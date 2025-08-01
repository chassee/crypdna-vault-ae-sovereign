import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { Loader2, Shield, CreditCard, Zap, Sparkles, Gem } from 'lucide-react';
import { LuxuryThemeProvider, useTheme } from '@/components/LuxuryThemeProvider';

const VaultSignupContent = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [validatingToken, setValidatingToken] = useState(true);
  const [tokenValid, setTokenValid] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const token = searchParams.get('token');

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/vault-dashboard');
        return;
      }
    };
    checkAuth();

    if (!token) {
      toast({
        title: "Access Restricted",
        description: "Account creation requires an invitation. Please visit Crypdawgs.com to purchase access.",
        variant: "destructive",
      });
      // Redirect to Crypdawgs homepage
      window.location.href = 'https://crypdawgs.com';
      return;
    }

    validateToken();
  }, [token, navigate]);

  const validateToken = async () => {
    try {
      const { data, error } = await supabase
        .from('signup_tokens')
        .select('email, used, expires_at')
        .eq('token', token)
        .single();

      if (error || !data) {
        toast({
          title: "Invalid Invitation",
          description: "This signup link is not valid. Please visit Crypdawgs.com to purchase access.",
          variant: "destructive",
        });
        window.location.href = 'https://crypdawgs.com';
        return;
      }

      if (data.used) {
        toast({
          title: "Invitation Already Used",
          description: "This signup link has already been used. Please visit Crypdawgs.com for assistance.",
          variant: "destructive",
        });
        window.location.href = 'https://crypdawgs.com';
        return;
      }

      if (new Date(data.expires_at) < new Date()) {
        toast({
          title: "Invitation Expired",
          description: "This signup link has expired. Please visit Crypdawgs.com to purchase new access.",
          variant: "destructive",
        });
        window.location.href = 'https://crypdawgs.com';
        return;
      }

      setUserEmail(data.email);
      setTokenValid(true);
    } catch (error) {
      console.error('Error validating token:', error);
      toast({
        title: "Access Error",
        description: "Failed to validate signup link. Please visit Crypdawgs.com for assistance.",
        variant: "destructive",
      });
      window.location.href = 'https://crypdawgs.com';
    } finally {
      setValidatingToken(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match.",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Weak Password",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // Create the user account
      const { data, error } = await supabase.auth.signUp({
        email: userEmail,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/vault-dashboard`
        }
      });

      if (error) {
        if (error.message.includes('already registered')) {
          toast({
            title: "Account Exists",
            description: "An account with this email already exists. Please sign in instead.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Signup Failed",
            description: error.message,
            variant: "destructive",
          });
        }
        return;
      }

      if (data.user) {
        // Mark the token as used
        await supabase
          .from('signup_tokens')
          .update({ used: true })
          .eq('token', token);

        toast({
          title: "Account Created!",
          description: "Welcome to your CrypDNA Vault. Redirecting to dashboard...",
        });

        // Small delay for toast to show, then redirect
        setTimeout(() => {
          navigate('/vault-dashboard');
        }, 1500);
      }
    } catch (error) {
      console.error('Signup error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred during signup.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (validatingToken) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-luxury-charcoal via-luxury-purple/20 to-luxury-gold/10" />
        <div className="absolute inset-0 bg-gradient-neon opacity-10 blur-3xl animate-pulse" />
        
        <Card className="w-full max-w-md luxury-card relative z-10">
          <CardContent className="flex items-center justify-center p-8">
            <div className="text-center space-y-4">
              <div className="relative">
                <Loader2 className="h-12 w-12 animate-spin mx-auto text-luxury-purple" />
                <div className="absolute inset-0 h-12 w-12 mx-auto border-2 border-luxury-purple/30 rounded-full animate-ping" />
              </div>
              <p className="text-muted-foreground font-medium">Validating billionaire invitation...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!tokenValid) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className={`absolute inset-0 transition-all duration-1000 ${
        theme === 'light' 
          ? 'bg-gradient-to-br from-purple-100/90 via-blue-100/80 to-gold-100/70' 
          : 'bg-gradient-to-br from-black via-gray-900 to-luxury-charcoal'
      }`} />
      
      <div className="absolute inset-0 bg-gradient-neon opacity-20 blur-3xl animate-pulse" />
      <div className="absolute top-20 left-20 w-32 h-32 bg-luxury-purple/20 rounded-full blur-2xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-48 h-48 bg-luxury-gold/20 rounded-full blur-3xl animate-pulse delay-1000" />
      
      <Card className="w-full max-w-lg luxury-card relative z-10 overflow-hidden">
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
            Create your billionaire-class vault account
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-8">
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

          <form onSubmit={handleSignup} className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="email" className="text-sm font-semibold">Exclusive Email</Label>
              <Input
                id="email"
                type="email"
                value={userEmail}
                disabled
                className="luxury-card bg-muted/50 text-lg h-12 font-medium"
              />
              <p className="text-sm text-muted-foreground font-medium">
                This email is linked to your billionaire purchase
              </p>
            </div>

            <div className="space-y-3">
              <Label htmlFor="password" className="text-sm font-semibold">Vault Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create an ultra-secure password"
                className="luxury-card border-luxury-purple/30 focus:border-luxury-gold text-lg h-12"
                required
                minLength={6}
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="confirmPassword" className="text-sm font-semibold">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your secure password"
                className="luxury-card border-luxury-purple/30 focus:border-luxury-gold text-lg h-12"
                required
                minLength={6}
              />
            </div>

            <Button
              type="submit"
              className="w-full h-14 text-lg font-bold luxury-button bg-gradient-to-r from-luxury-purple via-luxury-gold to-luxury-blue hover:shadow-neon"
              disabled={loading || !password || !confirmPassword}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                  Creating Billionaire Account...
                </>
              ) : (
                <>
                  <Gem className="mr-3 h-5 w-5" />
                  Create Billionaire Vault
                </>
              )}
            </Button>
          </form>

          <div className="pt-6 border-t border-luxury-purple/30 text-center">
            <p className="text-sm text-muted-foreground">
              🔒 Military-Grade Encryption • 🛡️ Zero-Knowledge Security • 💎 Your wealth stays private
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const VaultSignup = () => (
  <LuxuryThemeProvider>
    <VaultSignupContent />
  </LuxuryThemeProvider>
);

export default VaultSignup;