import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, DollarSign, Gift } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Index() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            Welcome to CrypDNA Vault
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Your secure gateway to credit building, identity management, and exclusive Crypdawgs benefits.
          </p>
          <p className="text-lg text-gray-400 mt-2">
            Access your vault, manage your CrypDNA File, and unlock exclusive rewards.
          </p>
        </div>

        {/* Call to Action */}
        <div className="max-w-md mx-auto mb-12 text-center">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Access Your Secure Vault</CardTitle>
              <CardDescription className="text-gray-300">
                Sign in to your CrypDNA Vault account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => navigate('/vault-login')}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-lg py-6"
              >
                Login to Your Vault
              </Button>
              <p className="text-xs text-gray-400 mt-3">
                Don't have an account? <a href="https://crypdawgs.com" className="text-purple-400 hover:text-purple-300">Visit Crypdawgs.com</a>
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Features */}
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
              <DollarSign className="w-8 h-8 mx-auto mb-2 text-green-400" />
              <CardTitle className="text-lg">Credit Building</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-300">
                Build and manage your credit score with our advanced tools.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardHeader className="text-center">
              <Gift className="w-8 h-8 mx-auto mb-2 text-blue-400" />
              <CardTitle className="text-lg">Exclusive Benefits</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-300">
                Access exclusive rewards and benefits as a Crypdawgs member.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}