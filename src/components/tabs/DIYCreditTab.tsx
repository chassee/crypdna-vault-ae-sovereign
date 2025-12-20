import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { FileText, Download, Clock, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface DisputeLetter {
  id: string;
  created_at: string;
  template_type: string;
  bureau: string;
  status: string;
  letter_content?: string;
  pdf_url?: string;
}

const DISPUTE_TEMPLATES = [
  { value: 'late_payment', label: 'Late Payment Dispute' },
  { value: 'collection_account', label: 'Collection Account Dispute' },
  { value: 'inquiry_removal', label: 'Hard Inquiry Removal' },
  { value: 'identity_theft', label: 'Identity Theft Dispute' },
  { value: 'incorrect_balance', label: 'Incorrect Balance Dispute' },
  { value: 'account_not_mine', label: 'Account Not Mine' },
  { value: 'paid_collection', label: 'Paid Collection Removal' },
  { value: 'duplicate_account', label: 'Duplicate Account' },
];

const CREDIT_BUREAUS = [
  { value: 'equifax', label: 'Equifax' },
  { value: 'experian', label: 'Experian' },
  { value: 'transunion', label: 'TransUnion' },
];

const DIYCreditTab: React.FC = () => {
  const { toast } = useToast();
  const [letters, setLetters] = useState<DisputeLetter[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  const [templateType, setTemplateType] = useState('');
  const [bureau, setBureau] = useState('');
  const [creditorName, setCreditorName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [disputeReason, setDisputeReason] = useState('');

  useEffect(() => {
    fetchLetters();
  }, []);

  async function fetchLetters() {
    try {
      const { data } = await (supabase as any)
        .from('dispute_letters')
        .select('*')
        .order('created_at', { ascending: false });

      setLetters(data || []);
    } catch (err) {
      console.error('fetchLetters error:', err);
    } finally {
      setLoading(false);
    }
  }

  async function handleGenerateLetter() {
    if (!templateType || !bureau) {
      toast({
        title: 'Missing Information',
        description: 'Please select a dispute type and credit bureau.',
        variant: 'destructive',
      });
      return;
    }

    setGenerating(true);

    try {
      const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();

      if (sessionError || !sessionData?.session) {
        throw new Error('You must be logged in.');
      }

      const accessToken = sessionData.session.access_token;

      const templateLabel =
        DISPUTE_TEMPLATES.find(t => t.value === templateType)?.label ||
        templateType;

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-dispute-letter`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            disputeType: templateLabel,
            bureau,
            creditorName: creditorName || null,
            accountNumber: accountNumber || null,
            additionalDetails: disputeReason || null,
          }),
        }
      );

      if (!response.ok) {
        const errText = await response.text();
        console.error('Edge Function error:', errText);
        throw new Error('Edge Function request failed');
      }

      const data = await response.json();

      if (data?.letter) {
        await (supabase as any).from('dispute_letters').insert({
          user_id: sessionData.session.user.id,
          template_type: templateType,
          bureau,
          letter_content: data.letter,
          status: 'completed',
        });
      }

      toast({
        title: 'Letter Generated',
        description: 'Your dispute letter has been created.',
      });

      setTemplateType('');
      setBureau('');
      setCreditorName('');
      setAccountNumber('');
      setDisputeReason('');

      fetchLetters();
    } catch (err: any) {
      console.error('Generate letter error:', err);
      toast({
        title: 'Generation Failed',
        description: err.message || 'Failed to generate letter.',
        variant: 'destructive',
      });
    } finally {
      setGenerating(false);
    }
  }

  function getStatusIcon(status: string) {
    if (status === 'completed') return <CheckCircle className="w-4 h-4 text-green-500" />;
    if (status === 'pending') return <Clock className="w-4 h-4 text-yellow-500" />;
    return <AlertCircle className="w-4 h-4 text-muted-foreground" />;
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          DIY Credit Repair
        </h2>
        <p className="text-muted-foreground">
          Generate professional dispute letters instantly
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Generate Letter</CardTitle>
          <CardDescription>Select dispute type and bureau</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Select value={templateType} onValueChange={setTemplateType}>
            <SelectTrigger><SelectValue placeholder="Dispute Type" /></SelectTrigger>
            <SelectContent>
              {DISPUTE_TEMPLATES.map(t => (
                <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={bureau} onValueChange={setBureau}>
            <SelectTrigger><SelectValue placeholder="Credit Bureau" /></SelectTrigger>
            <SelectContent>
              {CREDIT_BUREAUS.map(b => (
                <SelectItem key={b.value} value={b.value}>{b.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input placeholder="Creditor Name (optional)" value={creditorName} onChange={e => setCreditorName(e.target.value)} />
          <Input placeholder="Account Number (optional)" value={accountNumber} onChange={e => setAccountNumber(e.target.value)} />
          <Textarea placeholder="Additional details (optional)" value={disputeReason} onChange={e => setDisputeReason(e.target.value)} />

          <Button onClick={handleGenerateLetter} disabled={generating}>
            {generating ? <Loader2 className="animate-spin mr-2" /> : <FileText className="mr-2" />}
            Generate Letter
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default DIYCreditTab;
