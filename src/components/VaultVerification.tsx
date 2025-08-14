
import React, { useState, useEffect } from 'react';
import { Upload, FileText, Home, Building } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

const VaultVerification = () => {
  const [verification, setVerification] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState<string | null>(null);

  useEffect(() => {
    fetchVerificationStatus();
  }, []);

  const fetchVerificationStatus = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('verification')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching verification:', error);
        return;
      }

      setVerification(data);
    } catch (error) {
      console.error('Error in fetchVerificationStatus:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  const handleFileUpload = async (file: File, docType: string) => {
    setUploading(docType);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Enhanced file validation
      const maxSize = 10 * 1024 * 1024; // 10MB limit
      if (file.size > maxSize) {
        toast({
          title: "File Too Large",
          description: "File size must be less than 10MB.",
          variant: "destructive",
        });
        setUploading(null);
        return;
      }

      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Invalid File Type",
          description: "Only JPG, PNG, and PDF files are allowed.",
          variant: "destructive",
        });
        setUploading(null);
        return;
      }

      // Sanitize filename
      const fileExt = file.name.split('.').pop()?.toLowerCase();
      const sanitizedDocType = docType.replace(/[^a-z0-9_]/gi, '');
      const fileName = `${user.id}/${sanitizedDocType}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('vault-documents')
        .upload(fileName, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('vault-documents')
        .getPublicUrl(fileName);

      // Update verification record
      const updateData: any = {};
      if (docType === 'photo_id') updateData.photo_id_url = publicUrl;
      if (docType === 'utility_bill') updateData.utility_bill_url = publicUrl;
      if (docType === 'business_docs') updateData.business_docs_url = publicUrl;

      const { error } = await supabase
        .from('verification')
        .update(updateData)
        .eq('user_id', user.id);

      if (error) throw error;

      toast({
        title: "Document Uploaded",
        description: "Your document has been uploaded successfully.",
      });

      fetchVerificationStatus();
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload Failed",
        description: "Failed to upload document. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploading(null);
    }
  };

  const UploadBox = ({ title, icon: Icon, docType, required = true }: { title: string; icon: any; docType: string; required?: boolean }) => {
    const hasDocument = verification && verification[`${docType}_url`];
    
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-4 text-center hover:bg-gray-50 transition-colors">
        <Icon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
        <p className="text-sm font-medium text-gray-700 mb-1">{title}</p>
        {!required && <p className="text-xs text-gray-500">(Optional)</p>}
        {hasDocument && <p className="text-xs text-green-600 mb-2">✓ Uploaded</p>}
        <div className="mt-3">
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                // Additional client-side validation
                if (file.size > 10 * 1024 * 1024) {
                  toast({
                    title: "File Too Large",
                    description: "File size must be less than 10MB.",
                    variant: "destructive",
                  });
                  return;
                }
                handleFileUpload(file, docType);
              }
            }}
            className="hidden"
            id={`upload-${docType}`}
          />
          <Button
            asChild
            variant="outline"
            size="sm"
            disabled={uploading === docType}
            className="text-xs"
          >
            <label htmlFor={`upload-${docType}`} className="cursor-pointer">
              {uploading === docType ? 'Uploading...' : hasDocument ? 'Replace' : 'Upload'}
            </label>
          </Button>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-6 border border-gray-200">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="h-24 bg-gray-200 rounded"></div>
            <div className="h-24 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  const kycStatus = verification?.status || 'Pending';

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-800">🔐 Vault Verification</h3>
        <Badge className={getStatusColor(kycStatus)}>
          {kycStatus}
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <UploadBox title="Photo ID (Front)" icon={FileText} docType="photo_id" />
        <UploadBox title="Utility Bill" icon={Home} docType="utility_bill" />
      </div>
    </div>
  );
};

export default VaultVerification;
