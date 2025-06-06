
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/hooks/useAuth';
import { useAppSettings } from '@/hooks/useAppSettings';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface CreateSignalModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSignalCreated?: () => void;
}

export function CreateSignalModal({ open, onOpenChange, onSignalCreated }: CreateSignalModalProps) {
  const { user } = useAuth();
  const { settings } = useAppSettings();
  const { profile } = useUserProfile();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    pair: '',
    signal_type: 'BUY' as 'BUY' | 'SELL',
    entry_price: '',
    tp1: '',
    tp2: '',
    stop_loss: '',
    risk_reward_ratio: '',
    description: '',
    risk_level: 'medium' as 'low' | 'medium' | 'high',
    is_paid: false,
    price: ''
  });

  const canCreatePaidSignals = profile && profile.success_rate && 
    profile.success_rate >= settings.minimum_win_rate_for_paid_signals && 
    settings.paid_signals_enabled;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsLoading(true);

    try {
      const signalData = {
        pair: formData.pair,
        signal_type: formData.signal_type,
        entry_price: parseFloat(formData.entry_price),
        tp1: formData.tp1 ? parseFloat(formData.tp1) : null,
        tp2: formData.tp2 ? parseFloat(formData.tp2) : null,
        stop_loss: parseFloat(formData.stop_loss),
        risk_reward_ratio: formData.risk_reward_ratio || null,
        description: formData.description || null,
        provider_id: user.id,
        status: 'inactive' as const,
        // Extended fields for Nexus features
        risk_level: formData.risk_level,
        is_paid: canCreatePaidSignals ? formData.is_paid : false,
        price: (canCreatePaidSignals && formData.is_paid && formData.price) ? parseFloat(formData.price) : null
      };

      const { error } = await supabase
        .from('signals')
        .insert([signalData]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Signal created successfully!"
      });

      onSignalCreated?.();
      onOpenChange(false);
      
      // Reset form
      setFormData({
        pair: '',
        signal_type: 'BUY',
        entry_price: '',
        tp1: '',
        tp2: '',
        stop_loss: '',
        risk_reward_ratio: '',
        description: '',
        risk_level: 'medium',
        is_paid: false,
        price: ''
      });

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
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Share Trade Signal</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="pair">Currency Pair</Label>
              <Input
                id="pair"
                value={formData.pair}
                onChange={(e) => setFormData({...formData, pair: e.target.value})}
                placeholder="EURUSD"
                required
              />
            </div>
            <div>
              <Label htmlFor="signal_type">Direction</Label>
              <Select value={formData.signal_type} onValueChange={(value: 'BUY' | 'SELL') => setFormData({...formData, signal_type: value})}>
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
                step="any"
                value={formData.entry_price}
                onChange={(e) => setFormData({...formData, entry_price: e.target.value})}
                required
              />
            </div>
            <div>
              <Label htmlFor="tp1">TP1</Label>
              <Input
                id="tp1"
                type="number"
                step="any"
                value={formData.tp1}
                onChange={(e) => setFormData({...formData, tp1: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="tp2">TP2</Label>
              <Input
                id="tp2"
                type="number"
                step="any"
                value={formData.tp2}
                onChange={(e) => setFormData({...formData, tp2: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="stop_loss">Stop Loss</Label>
              <Input
                id="stop_loss"
                type="number"
                step="any"
                value={formData.stop_loss}
                onChange={(e) => setFormData({...formData, stop_loss: e.target.value})}
                required
              />
            </div>
            <div>
              <Label htmlFor="risk_level">Risk Level</Label>
              <Select value={formData.risk_level} onValueChange={(value: 'low' | 'medium' | 'high') => setFormData({...formData, risk_level: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="risk_reward_ratio">Risk:Reward Ratio</Label>
            <Input
              id="risk_reward_ratio"
              value={formData.risk_reward_ratio}
              onChange={(e) => setFormData({...formData, risk_reward_ratio: e.target.value})}
              placeholder="1:2"
            />
          </div>

          <div>
            <Label htmlFor="description">Analysis/Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Share your analysis..."
              rows={3}
            />
          </div>

          {canCreatePaidSignals && (
            <div className="space-y-3 p-4 bg-blue-50 rounded-lg border">
              <div className="flex items-center justify-between">
                <Label htmlFor="is_paid" className="text-sm font-medium">
                  Premium Signal
                </Label>
                <Switch
                  id="is_paid"
                  checked={formData.is_paid}
                  onCheckedChange={(checked) => setFormData({...formData, is_paid: checked})}
                />
              </div>
              
              {formData.is_paid && (
                <div>
                  <Label htmlFor="price">Price (USD)</Label>
                  <Input
                    id="price"
                    type="number"
                    min="1"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    placeholder="5.00"
                    required={formData.is_paid}
                  />
                </div>
              )}
              
              <p className="text-xs text-gray-600">
                You can create paid signals because your win rate is {profile?.success_rate?.toFixed(1)}%
              </p>
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating Signal..." : "Share Signal"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
