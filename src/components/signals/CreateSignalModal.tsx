
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface CreateSignalModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSignalCreated: () => void;
}

export function CreateSignalModal({ open, onOpenChange, onSignalCreated }: CreateSignalModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const [signalData, setSignalData] = useState({
    pair: '',
    signal_type: 'BUY',
    entry_price: '',
    tp1: '',
    tp2: '',
    stop_loss: '',
    risk_reward_ratio: '',
    description: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', (await supabase.auth.getUser()).data.user?.id)
        .single();

      if (!profile) {
        throw new Error('Profile not found');
      }

      const { error } = await supabase
        .from('signals')
        .insert({
          provider_id: profile.id,
          pair: signalData.pair.toUpperCase(),
          signal_type: signalData.signal_type as 'BUY' | 'SELL',
          entry_price: parseFloat(signalData.entry_price),
          tp1: signalData.tp1 ? parseFloat(signalData.tp1) : null,
          tp2: signalData.tp2 ? parseFloat(signalData.tp2) : null,
          stop_loss: parseFloat(signalData.stop_loss),
          risk_reward_ratio: signalData.risk_reward_ratio || null,
          description: signalData.description || null,
          status: 'inactive'
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Signal created successfully!"
      });

      setSignalData({
        pair: '',
        signal_type: 'BUY',
        entry_price: '',
        tp1: '',
        tp2: '',
        stop_loss: '',
        risk_reward_ratio: '',
        description: ''
      });

      onSignalCreated();
      onOpenChange(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Create New Signal</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="pair">Currency Pair</Label>
              <Input
                id="pair"
                placeholder="e.g., EURUSD"
                value={signalData.pair}
                onChange={(e) => setSignalData({...signalData, pair: e.target.value})}
                required
              />
            </div>
            <div>
              <Label htmlFor="signal_type">Signal Type</Label>
              <Select value={signalData.signal_type} onValueChange={(value) => setSignalData({...signalData, signal_type: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BUY">BUY</SelectItem>
                  <SelectItem value="SELL">SELL</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="entry_price">Entry Price</Label>
              <Input
                id="entry_price"
                type="number"
                step="0.00001"
                placeholder="1.08950"
                value={signalData.entry_price}
                onChange={(e) => setSignalData({...signalData, entry_price: e.target.value})}
                required
              />
            </div>
            <div>
              <Label htmlFor="tp1">Take Profit 1</Label>
              <Input
                id="tp1"
                type="number"
                step="0.00001"
                placeholder="1.09250"
                value={signalData.tp1}
                onChange={(e) => setSignalData({...signalData, tp1: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="tp2">Take Profit 2</Label>
              <Input
                id="tp2"
                type="number"
                step="0.00001"
                placeholder="1.09550"
                value={signalData.tp2}
                onChange={(e) => setSignalData({...signalData, tp2: e.target.value})}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="stop_loss">Stop Loss</Label>
              <Input
                id="stop_loss"
                type="number"
                step="0.00001"
                placeholder="1.08650"
                value={signalData.stop_loss}
                onChange={(e) => setSignalData({...signalData, stop_loss: e.target.value})}
                required
              />
            </div>
            <div>
              <Label htmlFor="risk_reward_ratio">Risk:Reward</Label>
              <Input
                id="risk_reward_ratio"
                placeholder="1:2"
                value={signalData.risk_reward_ratio}
                onChange={(e) => setSignalData({...signalData, risk_reward_ratio: e.target.value})}
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="description">Analysis (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Share your technical analysis..."
              value={signalData.description}
              onChange={(e) => setSignalData({...signalData, description: e.target.value})}
              rows={3}
            />
          </div>
          
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating Signal..." : "Create Signal"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
