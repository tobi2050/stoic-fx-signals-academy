
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { TrendingUp, TrendingDown, Clock, Star, Lock, AlertTriangle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import type { Signal } from '@/types/app';

interface SignalCardProps {
  signal: Signal;
  onSignalUpdate?: () => void;
}

export function SignalCard({ signal, onSignalUpdate }: SignalCardProps) {
  const { user } = useAuth();
  const { toast } = useToast();

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'inactive': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'active': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'closed': return signal.pips_result && signal.pips_result > 0 ? 'bg-green-100 text-green-800 border-green-200' : 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRiskLevelColor = (riskLevel?: string) => {
    switch (riskLevel) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleMarkAsActive = async () => {
    if (!user || signal.provider_id !== user.id) return;

    try {
      const { error } = await supabase
        .from('signals')
        .update({ 
          status: 'active',
          updated_at: new Date().toISOString()
        })
        .eq('id', signal.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Signal marked as active"
      });

      onSignalUpdate?.();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handleUnlockSignal = async () => {
    if (!signal.is_paid || !signal.price) return;

    // This would integrate with payment gateway in real implementation
    toast({
      title: "Payment Required",
      description: `This feature will integrate with payment gateway to unlock signal for $${signal.price}`,
    });
  };

  const StatusIcon = signal.signal_type === 'BUY' ? TrendingUp : TrendingDown;
  const isOwner = user?.id === signal.provider_id;
  const canViewDetails = !signal.is_paid || isOwner; // In real app, check if user has purchased

  return (
    <Card className="bg-white border-gray-200 hover:shadow-md transition-all duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={signal.profiles.avatar_url} />
              <AvatarFallback className="bg-blue-100 text-blue-600">
                {signal.profiles.username.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-900 font-semibold">{signal.profiles.username}</span>
                <Badge variant={signal.profiles.role === 'mentor' ? 'default' : 'secondary'}>
                  {signal.profiles.role}
                </Badge>
                <Badge variant={signal.profiles.account_type === 'real' ? 'default' : 'outline'}>
                  {signal.profiles.account_type}
                </Badge>
                {signal.is_paid && (
                  <Badge className="bg-purple-100 text-purple-800">
                    <Lock className="h-3 w-3 mr-1" />
                    Premium
                  </Badge>
                )}
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Clock className="h-3 w-3" />
                <span>{formatTime(signal.created_at)}</span>
                <div className="flex items-center space-x-1">
                  <Star className="h-3 w-3 text-yellow-500" />
                  <span>{signal.profiles.success_rate?.toFixed(1)}%</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <div className="flex items-center space-x-2 mb-1">
              <StatusIcon className={`h-4 w-4 ${signal.signal_type === 'BUY' ? 'text-green-600' : 'text-red-600'}`} />
              <Badge variant={signal.signal_type === 'BUY' ? 'default' : 'destructive'} className="text-lg px-3 py-1">
                {signal.signal_type} {signal.pair}
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className={`${getStatusColor(signal.status)} border`}>
                {signal.status.toUpperCase()}
              </Badge>
              {signal.risk_level && (
                <Badge className={getRiskLevelColor(signal.risk_level)}>
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  {signal.risk_level.toUpperCase()}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {signal.is_paid && !canViewDetails ? (
          <div className="text-center py-8">
            <Lock className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Premium Signal</h3>
            <p className="text-gray-600 mb-4">
              Unlock this signal to view entry, exit, and analysis details
            </p>
            <div className="text-2xl font-bold text-purple-600 mb-4">
              ${signal.price}
            </div>
            <Button 
              onClick={handleUnlockSignal}
              className="bg-purple-600 hover:bg-purple-700 text-white"
              disabled={signal.status === 'active' || signal.status === 'closed'}
            >
              {signal.status === 'active' || signal.status === 'closed' ? 'Signal Active/Closed' : 'Unlock Signal'}
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div>
                <div className="text-sm text-gray-500">Entry</div>
                <div className="text-gray-900 font-mono text-lg">{signal.entry_price}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">TP1 / TP2</div>
                <div className="text-green-600 font-mono">
                  {signal.tp1 || 'N/A'} / {signal.tp2 || 'N/A'}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Stop Loss</div>
                <div className="text-red-600 font-mono">{signal.stop_loss}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">
                  {signal.status === 'closed' ? 'Result' : 'R:R'}
                </div>
                {signal.status === 'closed' && signal.pips_result ? (
                  <div className={`font-semibold ${signal.pips_result > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {signal.pips_result > 0 ? '+' : ''}{signal.pips_result} pips
                  </div>
                ) : (
                  <div className="text-gray-700">{signal.risk_reward_ratio || 'N/A'}</div>
                )}
              </div>
            </div>
            
            {signal.description && (
              <div className="mb-4">
                <div className="text-sm text-gray-500 mb-1">Analysis</div>
                <div className="text-gray-700 text-sm">{signal.description}</div>
              </div>
            )}
          </>
        )}
        
        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            {!isOwner && (
              <>
                <Button size="sm" variant="outline" className="border-gray-300 text-gray-700">
                  Follow
                </Button>
                <Button size="sm" variant="outline" className="border-gray-300 text-gray-700">
                  Share
                </Button>
              </>
            )}
            {isOwner && signal.status === 'inactive' && (
              <Button 
                size="sm" 
                onClick={handleMarkAsActive}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Mark as Active
              </Button>
            )}
          </div>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
            Rate Signal
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
