
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, Sparkles, Shield, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ViewerOnboardingForm = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  // Extract email from URL params on component mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const emailParam = urlParams.get('email');
    if (emailParam) {
      setEmail(emailParam);
    }
  }, []);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!fullName || !email || !uploadFile) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields and upload a document.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Here you would normally upload to Airtable
      // For now, we'll simulate the submission
      console.log('Submitting to Airtable:', {
        name: fullName,
        email: email,
        uploadFile: uploadFile.name,
        status: 'Submitted'
      });

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsSubmitted(true);
      
      toast({
        title: "Application Submitted!",
        description: "Thanks! You'll hear back from our team soon.",
      });
    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: "Submission Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-cyan-100 px-4 py-8">
        <div className="max-w-md mx-auto pt-16">
          <Card className="bg-white/90 backdrop-blur-sm border-2 border-pink-200 shadow-2xl">
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Application Submitted!</h2>
                <p className="text-gray-600">Thanks! You'll hear back from our team soon.</p>
              </div>
              <div className="bg-gradient-to-r from-pink-200 to-purple-200 rounded-xl p-4">
                <p className="text-sm text-gray-700">
                  Your verification is being processed. We'll contact you at <strong>{email}</strong> within 24-48 hours.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-cyan-100 px-4 py-8">
      <div className="max-w-md mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-2 mb-4">
            <Sparkles className="w-8 h-8 text-pink-500" />
            <Shield className="w-10 h-10 text-purple-600" />
            <Sparkles className="w-8 h-8 text-cyan-500" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent mb-4">
            Welcome to the CrypDNA Vault
          </h1>
          <div className="bg-gradient-to-r from-pink-200 to-purple-200 rounded-2xl p-4 border-2 border-pink-300 shadow-lg">
            <h2 className="text-xl font-bold text-purple-800 mb-2">Viewer Tier</h2>
            <p className="text-gray-700">
              Upload your info to get verified and begin your Vault journey.
            </p>
          </div>
        </div>

        {/* Form Section */}
        <Card className="bg-white/90 backdrop-blur-sm border-2 border-purple-200 shadow-2xl">
          <CardHeader className="bg-gradient-to-r from-pink-400 to-purple-500 text-white rounded-t-lg">
            <CardTitle className="text-center text-xl font-bold">
              🚀 Start Your Verification
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name Field */}
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-gray-800 font-semibold">
                  Full Name *
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                  className="border-2 border-pink-200 focus:border-purple-400 rounded-xl"
                  required
                />
              </div>

              {/* Email Field (Hidden but shown for reference) */}
              {email && (
                <div className="bg-gradient-to-r from-cyan-100 to-pink-100 rounded-xl p-4 border-2 border-cyan-200">
                  <Label className="text-gray-700 font-semibold text-sm">
                    Email Address
                  </Label>
                  <p className="text-gray-800 font-medium">{email}</p>
                </div>
              )}

              {/* File Upload Field */}
              <div className="space-y-2">
                <Label htmlFor="document" className="text-gray-800 font-semibold">
                  Business Document or Photo ID *
                </Label>
                <div className="relative">
                  <Input
                    id="document"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    onChange={handleFileUpload}
                    className="border-2 border-pink-200 focus:border-purple-400 rounded-xl file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-gradient-to-r file:from-pink-400 file:to-purple-500 file:text-white file:font-semibold"
                    required
                  />
                  <Upload className="absolute right-3 top-3 w-5 h-5 text-purple-500 pointer-events-none" />
                </div>
                {uploadFile && (
                  <p className="text-sm text-green-600 font-medium">
                    ✓ {uploadFile.name} uploaded
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl text-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Submitting...
                  </div>
                ) : (
                  '🎯 Submit for Verification'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-600 text-sm">
            CrypDNA Vault • Secure • Exclusive • Surreal
          </p>
          <div className="flex justify-center gap-2 mt-2">
            <Sparkles className="w-4 h-4 text-pink-400" />
            <Sparkles className="w-4 h-4 text-purple-400" />
            <Sparkles className="w-4 h-4 text-cyan-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewerOnboardingForm;
