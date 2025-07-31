import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import { Loader2, Shield, CreditCard, Zap, AlertCircle } from 'lucide-react';

const VaultLogin = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
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

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginEmail,
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Shield className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">🔐 CrypDNA Vault</CardTitle>
          <CardDescription>
            Access your exclusive financial vault
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

          {token && userEmail && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-green-600" />
                <p className="text-sm text-green-800">
                  Vault access confirmed for {userEmail}
                </p>
              </div>
            </div>
          )}

          {/* Login Only - No Signup */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="loginEmail">Email</Label>
              <Input
                id="loginEmail"
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="loginPassword">Password</Label>
              <Input
                id="loginPassword"
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={loading || !loginEmail || !loginPassword}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Logging In...
                </>
              ) : (
                'Access Vault'
              )}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-xs text-muted-foreground">
              Access is restricted to approved members only.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t text-center">
            <p className="text-xs text-muted-foreground">
              Don't have access? <a href="https://crypdawgs.com" className="text-primary hover:underline">Visit Crypdawgs.com</a> to purchase vault access.
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Secure • Encrypted • Your financial data stays private
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VaultLogin;