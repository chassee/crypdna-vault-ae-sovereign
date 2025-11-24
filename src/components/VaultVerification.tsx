import React, { useState, useEffect } from 'react';
import { FileText, Building } from 'lucide-react';
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
        .from('kyc_records')
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
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  const handleFileUpload = async (file: File, docType: string) => {
    setUploading(docType);

    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
    const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'application/pdf'];
    const ALLOWED_EXTENSIONS = ['jpg', 'jpeg', 'png', 'pdf'];

    if (file.size > MAX_FILE_SIZE) {
      toast({ title: "File too large", description: "Must be smaller than 10MB.", variant: "destructive" });
      setUploading(null);
      return;
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      toast({ title: "Invalid file type", description: "Only JPG, PNG, PDF allowed.", variant: "destructive" });
      setUploading(null);
      return;
    }

    const fileExt = file.name.split('.').pop()?.toLowerCase();
    if (!fileExt || !ALLOWED_EXTENSIONS.includes(fileExt)) {
      toast({ title: "Invalid extension", description: "Only .jpg, .jpeg, .png, .pdf allowed.", variant: "destructive" });
      setUploading(null);
      return;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const folder = docType === 'photo_id' ? 'photo_id' : 'net30_docs';
      const filePath = `${folder}/${user.id}_${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('vault-uploads')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('vault-uploads')
        .getPublicUrl(filePath);

      const fileUrl = data.publicUrl;
      const column = docType === 'photo_id' ? 'photo_id_url' : 'net30_doc_url';

      const { error: dbError } = await supabase
        .from('kyc_records')
        .upsert({
          user_id: user.id,
          [column]: fileUrl,
          tradeline_status: 'Pending Integration',
          reporting_agency: 'D&B',
        }, { onConflict: 'user_id' });

      if (dbError) throw dbError;

      toast({ title: "Uploaded!", description: `${docType === 'photo_id' ? 'Photo ID' : 'Net-30 Doc'} uploaded successfully.` });
      fetchVerificationStatus();
    } catch (error) {
      console.error('Upload error:', error);
      toast({ title: "Upload Failed", description: "Try again.", variant: "destructive" });
    } finally {
      setUploading(null);
    }
  };

  const UploadBox = ({ title, icon: Icon, docType }: { title: string; icon: any; docType: string }) => {
    const hasDocument = verification && verification[`${docType}_url`];
    return (
      <div className="group relative bg-background/40 backdrop-blur-xl border border-border/50 rounded-xl p-6 text-center transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(212,175,55,0.15)]">
        <Icon className="w-10 h-10 text-muted-foreground mx-auto mb-3 transition-colors group-hover:text-primary" />
        <p className="text-sm font-semibold text-foreground mb-1">{title}</p>

        {hasDocument && (
          <div className="flex items-center justify-center gap-2 mt-2 mb-2 animate-fade-in">
            <span className="text-primary text-xl animate-scale-in">✓</span>
            <p className="text-xs text-primary font-medium">Uploaded</p>
          </div>
        )}

        <div className="mt-4">
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFileUpload(file, docType);
            }}
            className="hidden"
            id={`upload-${docType}`}
          />
          <Button
            asChild
            variant="outline"
            size="sm"
            disabled={uploading === docType}
            className="text-xs border-primary/30 hover:bg-primary/10 hover:border-primary/50 transition-all"
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

  const kycStatus = verification?.tradeline_status || 'Pending Integration';

  return (
    <div className="bg-background/40 backdrop-blur-xl rounded-2xl p-6 border border-border/50">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-foreground">🔐 Vault Verification</h3>
        <Badge className={getStatusColor(kycStatus)}>
          {kycStatus}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <UploadBox title="Photo ID (Front)" icon={FileText} docType="photo_id" />
        <UploadBox title="Net-30 Verification Docs" icon={Building} docType="net30_doc" />
      </div>
    </div>
  );
};

export default VaultVerification;
