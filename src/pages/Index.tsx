import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, DollarSign, Gift } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Index() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 page-transition">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/3 left-1/3 w-60 h-60 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-white mb-6 animate-shimmer bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Welcome to CrypDNA Vault
          </h1>
          <p className="text-2xl text-white/80 max-w-3xl mx-auto mb-4">
            Your billionaire-class gateway to credit building, identity management, and exclusive Crypdawgs benefits.
          </p>
          <p className="text-lg text-white/60 mt-2">
            Access your vault, manage your CrypDNA File, and unlock luxury rewards.
          </p>
        </div>

        {/* Call to Action */}
        <div className="max-w-lg mx-auto mb-16 text-center">
          <Card className="glassmorphism-auth">
            <CardHeader className="text-center pb-6">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-500 via-blue-600 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 diamond-logo shadow-xl">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-3xl text-white font-bold">Access Your Secure Vault</CardTitle>
              <CardDescription className="text-white/70 text-lg">
                Enter the billionaire-class CrypDNA ecosystem
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Button 
                onClick={() => navigate('/vault-login')}
                className="w-full amex-cta text-white font-semibold py-4 text-xl mb-4"
              >
                Access Billionaire Vault
              </Button>
              <p className="text-sm text-white/60 mt-4">
                Don't have an account? <a href="https://crypdawgs.com" className="text-purple-300 hover:text-purple-200 transition-colors">Visit Crypdawgs.com</a>
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className="apple-card text-white">
            <CardHeader className="text-center pb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-xl font-bold">Secure Vault</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-white/70 text-center">
                Military-grade encryption protects your digital assets and identity data with Apple-level security.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="apple-card text-white">
            <CardHeader className="text-center pb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-xl font-bold">Credit Building</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-white/70 text-center">
                Build and manage your credit score with our advanced AI-powered tools and exclusive tradelines.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="apple-card text-white">
            <CardHeader className="text-center pb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Gift className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-xl font-bold">Exclusive Benefits</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-white/70 text-center">
                Access billionaire-tier rewards and benefits as a premium Crypdawgs member.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}