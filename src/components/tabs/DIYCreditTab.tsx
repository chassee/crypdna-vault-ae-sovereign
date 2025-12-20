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
  
  // Form state
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
      // Using type assertion since dispute_letters table exists but isn't in generated types
      const { data, error } = await (supabase as any)
        .from('dispute_letters')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching letters:', error);
      } else {
        setLetters(data || []);
      }
    } catch (err) {
      console.error('fetchLetters exception:', err);
    } finally {
      setLoading(false);
    }
  }

  async function handleGenerateLetter() {
    if (!templateType || !bureau) {
      toast({
        title: 'Missing Information',
        description: 'Please select a template type and credit bureau.',
        variant: 'destructive',
      });
      return;
    }

    setGenerating(true);
    try {
      // Get the current session to forward authorization
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !session) {
        console.error('Session error:', sessionError);
        throw new Error('You must be logged in to generate dispute letters.');
      }

      console.info('Invoking generate-dispute-letter Edge Function with auth');
      
      // Map template type to the label expected by Edge Function
      const templateLabel = DISPUTE_TEMPLATES.find(t => t.value === templateType)?.label || templateType;
      
    const { data: sessionData, error: sessionError } =
  await supabase.auth.getSession();

if (!sessionData?.session) {
  throw new Error('No active session');
}

const accessToken = sessionData.session.access_token;

const response = await fetch(
  ${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-dispute-letter,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: Bearer ${accessToken},
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

      if (error) {
        console.error('Edge Function error:', error);
        throw error;
      }

      console.info('Letter generated successfully:', data);
      
      // Save the letter to the database
      if (data?.letter) {
        const { error: saveError } = await (supabase as any)
          .from('dispute_letters')
          .insert({
            user_id: session.user.id,
            template_type: templateType,
            bureau,
            letter_content: data.letter,
            status: 'completed',
          });
        
        if (saveError) {
          console.error('Error saving letter to database:', saveError);
          // Don't throw - letter was generated, just not saved
        }
      }

      toast({
        title: 'Letter Generated',
        description: 'Your dispute letter has been created successfully.',
      });

      // Reset form
      setTemplateType('');
      setBureau('');
      setCreditorName('');
      setAccountNumber('');
      setDisputeReason('');

      // Refresh letters list
      fetchLetters();
    } catch (err: any) {
      console.error('Generate letter error:', err);
      const errorMessage = err.message || 'Failed to send a request to the Edge Function';
      toast({
        title: 'Generation Failed',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setGenerating(false);
    }
  }

  function getStatusIcon(status: string) {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-muted-foreground" />;
    }
  }

  function getStatusBadgeVariant(status: string) {
    switch (status) {
      case 'completed':
        return 'default';
      case 'pending':
        return 'secondary';
      default:
        return 'outline';
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-luxury-purple to-luxury-gold bg-clip-text text-transparent">
          DIY Credit Repair
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base">
          Generate professional dispute letters to repair your credit
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Generate Letter Form */}
        <Card className="luxury-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-luxury-purple" />
              Generate New Letter
            </CardTitle>
            <CardDescription>
              Select a template and provide details to generate your dispute letter
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="template">Dispute Type</Label>
              <Select value={templateType} onValueChange={setTemplateType}>
                <SelectTrigger id="template">
                  <SelectValue placeholder="Select dispute type" />
                </SelectTrigger>
                <SelectContent>
                  {DISPUTE_TEMPLATES.map((template) => (
                    <SelectItem key={template.value} value={template.value}>
                      {template.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bureau">Credit Bureau</Label>
              <Select value={bureau} onValueChange={setBureau}>
                <SelectTrigger id="bureau">
                  <SelectValue placeholder="Select credit bureau" />
                </SelectTrigger>
                <SelectContent>
                  {CREDIT_BUREAUS.map((b) => (
                    <SelectItem key={b.value} value={b.value}>
                      {b.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="creditor">Creditor Name (Optional)</Label>
              <Input
                id="creditor"
                placeholder="e.g., Capital One"
                value={creditorName}
                onChange={(e) => setCreditorName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="account">Account Number (Optional)</Label>
              <Input
                id="account"
                placeholder="Last 4 digits recommended"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reason">Additional Details (Optional)</Label>
              <Textarea
                id="reason"
                placeholder="Provide any additional context for your dispute..."
                value={disputeReason}
                onChange={(e) => setDisputeReason(e.target.value)}
                rows={3}
              />
            </div>

            <Button
              onClick={handleGenerateLetter}
              disabled={generating || !templateType || !bureau}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              {generating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <FileText className="mr-2 h-4 w-4" />
                  Generate Letter
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Letter History */}
        <Card className="luxury-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-luxury-gold" />
              Letter History
            </CardTitle>
            <CardDescription>
              Your previously generated dispute letters
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : letters.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No letters generated yet</p>
                <p className="text-sm">Generate your first dispute letter to get started</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                {letters.map((letter) => (
                  <div
                    key={letter.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border hover:bg-muted/70 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {getStatusIcon(letter.status)}
                      <div>
                        <p className="font-medium text-sm">
                          {DISPUTE_TEMPLATES.find((t) => t.value === letter.template_type)?.label ||
                            letter.template_type}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {CREDIT_BUREAUS.find((b) => b.value === letter.bureau)?.label || letter.bureau} •{' '}
                          {new Date(letter.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={getStatusBadgeVariant(letter.status) as any}>
                        {letter.status}
                      </Badge>
                      {letter.pdf_url && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => window.open(letter.pdf_url, '_blank')}
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DIYCreditTab;
