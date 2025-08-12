import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, DollarSign, Gift } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ThemeToggle } from '@/components/ui/theme-toggle';

export default function Index() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90 page-transition relative">
      {/* Theme Toggle */}
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-60 sm:w-80 h-60 sm:h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -right-40 w-60 sm:w-80 h-60 sm:h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/3 left-1/3 w-40 sm:w-60 h-40 sm:h-60 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="text-overlay mb-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 animate-shimmer bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Welcome to CrypDNA Vault
            </h1>
          </div>
          <div className="text-overlay mb-4">
            <p className="text-lg sm:text-xl lg:text-2xl text-foreground/80 max-w-3xl mx-auto mb-2 sm:mb-4">
              Your billionaire-class gateway to credit building, identity management, and exclusive Crypdawgs benefits.
            </p>
          </div>
          <div className="text-overlay">
            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground mt-2">
              Access your vault, manage your CrypDNA File, and unlock luxury rewards.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="max-w-sm sm:max-w-lg mx-auto mb-12 sm:mb-16 text-center">
          <Card className="glassmorphism-auth">
            <CardHeader className="text-center pb-4 sm:pb-6">
              <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500 via-blue-600 to-cyan-500 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 diamond-logo shadow-xl">
                <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <CardTitle className="text-xl sm:text-2xl lg:text-3xl text-card-foreground font-bold">Access Your Secure Vault</CardTitle>
              <CardDescription className="text-muted-foreground text-sm sm:text-base lg:text-lg">
                Enter the billionaire-class CrypDNA ecosystem
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
               <Button 
                onClick={() => navigate('/login')}
                className="w-full amex-cta text-white font-semibold py-3 sm:py-4 text-base sm:text-lg lg:text-xl mb-4"
              >
                Access Billionaire Vault
              </Button>
              <p className="text-xs sm:text-sm text-muted-foreground mt-4">
                Don't have an account? <a href="https://crypdawgs.com" className="text-luxury-purple hover:text-luxury-purple-light transition-colors">Visit Crypdawgs.com</a>
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-5xl mx-auto">
          <Card className="apple-card">
            <CardHeader className="text-center pb-4 sm:pb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <CardTitle className="text-lg sm:text-xl font-bold text-card-foreground">Secure Vault</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-overlay">
                <CardDescription className="text-muted-foreground text-center text-sm sm:text-base">
                  Military-grade encryption protects your digital assets and identity data with Apple-level security.
                </CardDescription>
              </div>
            </CardContent>
          </Card>

          <Card className="apple-card">
            <CardHeader className="text-center pb-4 sm:pb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <CardTitle className="text-lg sm:text-xl font-bold text-card-foreground">Credit Building</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-overlay">
                <CardDescription className="text-muted-foreground text-center text-sm sm:text-base">
                  Build and manage your credit score with our advanced AI-powered tools and exclusive tradelines.
                </CardDescription>
              </div>
            </CardContent>
          </Card>

          <Card className="apple-card sm:col-span-2 lg:col-span-1">
            <CardHeader className="text-center pb-4 sm:pb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Gift className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <CardTitle className="text-lg sm:text-xl font-bold text-card-foreground">Exclusive Benefits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-overlay">
                <CardDescription className="text-muted-foreground text-center text-sm sm:text-base">
                  Access billionaire-tier rewards and benefits as a premium Crypdawgs member.
                </CardDescription>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}