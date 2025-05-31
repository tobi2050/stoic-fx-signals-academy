
import { Card, CardContent } from '@/components/ui/card';
import { Users, Target, BarChart3, DollarSign } from 'lucide-react';

interface StatsCardsProps {
  topTraders: any[];
  signals: any[];
}

export function StatsCards({ topTraders, signals }: StatsCardsProps) {
  const avgSuccessRate = topTraders.length > 0 
    ? Math.round(topTraders.reduce((acc, trader) => acc + (trader.success_rate || 0), 0) / topTraders.length)
    : 0;

  const totalPips = topTraders.reduce((acc, trader) => acc + (trader.total_pips || 0), 0);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      <Card className="bg-white border-gray-200 shadow-sm">
        <CardContent className="p-6 text-center">
          <div className="flex items-center justify-center mb-2">
            <Users className="h-6 w-6 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{topTraders.length}+</div>
          <div className="text-sm text-gray-500">Active Traders</div>
        </CardContent>
      </Card>
      
      <Card className="bg-white border-gray-200 shadow-sm">
        <CardContent className="p-6 text-center">
          <div className="flex items-center justify-center mb-2">
            <Target className="h-6 w-6 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{avgSuccessRate}%</div>
          <div className="text-sm text-gray-500">Avg Success Rate</div>
        </CardContent>
      </Card>
      
      <Card className="bg-white border-gray-200 shadow-sm">
        <CardContent className="p-6 text-center">
          <div className="flex items-center justify-center mb-2">
            <BarChart3 className="h-6 w-6 text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{signals.length}+</div>
          <div className="text-sm text-gray-500">Signals Posted</div>
        </CardContent>
      </Card>
      
      <Card className="bg-white border-gray-200 shadow-sm">
        <CardContent className="p-6 text-center">
          <div className="flex items-center justify-center mb-2">
            <DollarSign className="h-6 w-6 text-yellow-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{totalPips}</div>
          <div className="text-sm text-gray-500">Total Pips</div>
        </CardContent>
      </Card>
    </div>
  );
}
