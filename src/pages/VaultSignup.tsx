import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { Loader2, Shield, CreditCard, Zap } from 'lucide-react';

const VaultSignup = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [validatingToken, setValidatingToken] = useState(true);
  const [tokenValid, setTokenValid] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      toast({
        title: "Invalid Access",
        description: "No signup token provided.",
        variant: "destructive",
      });
      navigate('/');
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
          title: "Invalid Token",
          description: "This signup link is not valid.",
          variant: "destructive",
        });
        navigate('/');
        return;
      }

      if (data.used) {
        toast({
          title: "Token Already Used",
          description: "This signup link has already been used.",
          variant: "destructive",
        });
        navigate('/');
        return;
      }

      if (new Date(data.expires_at) < new Date()) {
        toast({
          title: "Token Expired",
          description: "This signup link has expired.",
          variant: "destructive",
        });
        navigate('/');
        return;
      }

      setUserEmail(data.email);
      setTokenValid(true);
    } catch (error) {
      console.error('Error validating token:', error);
      toast({
        title: "Error",
        description: "Failed to validate signup link.",
        variant: "destructive",
      });
      navigate('/');
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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="flex items-center justify-center p-8">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
              <p className="text-muted-foreground">Validating your access...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!tokenValid) {
    return null; // Component will redirect via useEffect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Shield className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">🔐 CrypDNA Vault</CardTitle>
          <CardDescription>
            Create your secure vault account to access exclusive financial tools.
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center p-3 bg-muted rounded-lg">
              <CreditCard className="h-6 w-6 mx-auto mb-2 text-primary" />
              <p className="text-xs font-medium">Credit Card</p>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <Zap className="h-6 w-6 mx-auto mb-2 text-primary" />
              <p className="text-xs font-medium">Rewards</p>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <Shield className="h-6 w-6 mx-auto mb-2 text-primary" />
              <p className="text-xs font-medium">Secure</p>
            </div>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={userEmail}
                disabled
                className="bg-muted"
              />
              <p className="text-xs text-muted-foreground">
                This email is linked to your purchase
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a secure password"
                required
                minLength={6}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                required
                minLength={6}
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={loading || !password || !confirmPassword}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Account...
                </>
              ) : (
                'Create Vault Account'
              )}
            </Button>
          </form>

          <div className="mt-6 pt-4 border-t text-center">
            <p className="text-xs text-muted-foreground">
              Secure • Encrypted • Your financial data stays private
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VaultSignup;