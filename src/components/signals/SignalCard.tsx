
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { TrendingUp, TrendingDown, Clock, Star } from 'lucide-react';

interface SignalCardProps {
  signal: {
    id: string;
    pair: string;
    signal_type: 'BUY' | 'SELL';
    entry_price: string;
    tp1?: string;
    tp2?: string;
    stop_loss: string;
    risk_reward_ratio?: string;
    status: 'inactive' | 'active' | 'closed';
    pips_result?: number;
    description?: string;
    created_at: string;
    profiles: {
      username: string;
      role: string;
      success_rate: number;
      avatar_url?: string;
      account_type: string;
    };
  };
}

export function SignalCard({ signal }: SignalCardProps) {
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
      case 'inactive': return 'bg-yellow-500';
      case 'active': return 'bg-blue-500';
      case 'closed': return signal.pips_result && signal.pips_result > 0 ? 'bg-green-500' : 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const StatusIcon = signal.signal_type === 'BUY' ? TrendingUp : TrendingDown;

  return (
    <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={signal.profiles.avatar_url} />
              <AvatarFallback>{signal.profiles.username.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-white font-semibold">{signal.profiles.username}</span>
                <Badge variant={signal.profiles.role === 'mentor' ? 'default' : 'secondary'}>
                  {signal.profiles.role}
                </Badge>
                <Badge variant={signal.profiles.account_type === 'real' ? 'default' : 'outline'}>
                  {signal.profiles.account_type}
                </Badge>
              </div>
              <div className="flex items-center space-x-2 text-sm text-slate-400">
                <Clock className="h-3 w-3" />
                <span>{formatTime(signal.created_at)}</span>
                <div className="flex items-center space-x-1">
                  <Star className="h-3 w-3 text-yellow-400" />
                  <span>{signal.profiles.success_rate.toFixed(1)}%</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <div className="flex items-center space-x-2 mb-1">
              <StatusIcon className={`h-4 w-4 ${signal.signal_type === 'BUY' ? 'text-green-400' : 'text-red-400'}`} />
              <Badge variant={signal.signal_type === 'BUY' ? 'default' : 'destructive'} className="text-lg px-3 py-1">
                {signal.signal_type} {signal.pair}
              </Badge>
            </div>
            <Badge className={`${getStatusColor(signal.status)} text-white`}>
              {signal.status.toUpperCase()}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div>
            <div className="text-sm text-slate-400">Entry</div>
            <div className="text-white font-mono text-lg">{signal.entry_price}</div>
          </div>
          <div>
            <div className="text-sm text-slate-400">TP1 / TP2</div>
            <div className="text-green-400 font-mono">
              {signal.tp1 || 'N/A'} / {signal.tp2 || 'N/A'}
            </div>
          </div>
          <div>
            <div className="text-sm text-slate-400">Stop Loss</div>
            <div className="text-red-400 font-mono">{signal.stop_loss}</div>
          </div>
          <div>
            <div className="text-sm text-slate-400">
              {signal.status === 'closed' ? 'Result' : 'R:R'}
            </div>
            {signal.status === 'closed' && signal.pips_result ? (
              <div className={`font-semibold ${signal.pips_result > 0 ? 'text-green-400' : 'text-red-400'}`}>
                {signal.pips_result > 0 ? '+' : ''}{signal.pips_result} pips
              </div>
            ) : (
              <div className="text-slate-300">{signal.risk_reward_ratio || 'N/A'}</div>
            )}
          </div>
        </div>
        
        {signal.description && (
          <div className="mb-4">
            <div className="text-sm text-slate-400 mb-1">Analysis</div>
            <div className="text-slate-300 text-sm">{signal.description}</div>
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            <Button size="sm" variant="outline">
              Follow
            </Button>
            <Button size="sm" variant="outline">
              Share
            </Button>
          </div>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            Rate Signal
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
