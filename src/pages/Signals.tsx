
import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageCircle, Share, Star } from 'lucide-react';

export default function Signals() {
  const [activeTab, setActiveTab] = useState('all');

  const signals = [
    {
      id: 1,
      provider: 'ProFXMentor',
      avatar: 'PM',
      role: 'Mentor',
      account: 'Real',
      time: '1 hour ago',
      pair: 'EUR/USD',
      type: 'Buy',
      entry: '1.085',
      sl: '1.082',
      tp1: '1.092',
      tp2: '1.092',
      riskReward: '1:1.6',
      risk: 'Medium',
      status: 'Active',
      pips: '+15',
      chart: 'EUR/USD Before',
      comments: 0,
      shares: 0,
      rating: 0,
      color: 'bg-yellow-500'
    },
    {
      id: 2,
      provider: 'ChidinmaO',
      avatar: 'CO',
      role: 'Student',
      account: 'Demo',
      time: '4 hours ago',
      pair: 'USD/CAD',
      type: 'Sell',
      entry: '1.36',
      sl: '1.363',
      tp1: '1.355',
      tp2: '1.355',
      riskReward: '1:1.6',
      risk: 'Low',
      status: 'Win',
      pips: '+50',
      chart: 'USD/CAD Before',
      comments: 1,
      shares: 0,
      rating: 4.8,
      ratings: 35,
      color: 'bg-green-500'
    },
    {
      id: 3,
      provider: 'KunleTrades',
      avatar: 'KT',
      role: 'Mentor',
      account: 'Real',
      time: '1 day ago',
      pair: 'XAU/USD',
      type: 'Buy',
      entry: '2350',
      sl: '2340',
      tp1: '2370',
      tp2: '2370',
      riskReward: '1:2',
      risk: 'High',
      status: 'Loss',
      pips: '-100',
      chart: 'XAU/USD Before',
      comments: 1,
      shares: 0,
      rating: 3.5,
      ratings: 28,
      color: 'bg-red-500'
    },
    {
      id: 4,
      provider: 'EmekaF',
      avatar: 'EF',
      role: 'Student',
      account: 'Real',
      time: '30 mins ago',
      pair: 'NZD/USD',
      type: 'Sell',
      entry: '0.612',
      sl: '0.614',
      tp1: '0.609',
      tp2: '0.609',
      riskReward: '1:1.5',
      risk: 'Medium',
      status: 'Active',
      pips: '-5',
      chart: 'NZD/USD Before',
      comments: 0,
      shares: 0,
      rating: 0,
      color: 'bg-orange-500'
    }
  ];

  const filteredSignals = signals.filter(signal => {
    if (activeTab === 'all') return true;
    if (activeTab === 'my') return signal.provider === 'YourUsername'; // This would be dynamic
    if (activeTab === 'following') return ['ProFXMentor', 'KunleTrades'].includes(signal.provider);
    return true;
  });

  return (
    <MainLayout title="Signals">
      <div className="space-y-6">
        {/* Tab Navigation */}
        <div className="flex space-x-1">
          <Button 
            className={activeTab === 'all' ? 'bg-purple-600 text-white' : 'bg-gray-100'}
            onClick={() => setActiveTab('all')}
          >
            All Signals
          </Button>
          <Button 
            variant="outline"
            onClick={() => setActiveTab('my')}
          >
            My Signals
          </Button>
          <Button 
            variant="outline"
            onClick={() => setActiveTab('following')}
          >
            Following
          </Button>
        </div>

        {/* Signals Grid */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredSignals.map((signal) => (
            <Card key={signal.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                {/* Provider Info */}
                <div className="flex items-center space-x-3 mb-4">
                  <Avatar className={`h-10 w-10 ${signal.color}`}>
                    <AvatarFallback className="text-white font-bold">
                      {signal.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="font-semibold">{signal.provider}</div>
                    <div className="flex items-center space-x-2 text-xs">
                      <Badge className={`${
                        signal.role === 'Mentor' 
                          ? 'bg-purple-100 text-purple-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {signal.role}
                      </Badge>
                      <Badge className={`${
                        signal.account === 'Real'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {signal.account}
                      </Badge>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">{signal.time}</span>
                </div>

                {/* Signal Details */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-lg">{signal.pair} - {signal.type}</h3>
                    <Badge className={`${
                      signal.status === 'Active' ? 'bg-blue-500 text-white' :
                      signal.status === 'Win' ? 'bg-green-500 text-white' :
                      'bg-red-500 text-white'
                    }`}>
                      {signal.status} {signal.pips}
                    </Badge>
                  </div>
                  
                  <div className="text-sm space-y-1">
                    <div>Entry: {signal.entry} | SL: {signal.sl} | TP: {signal.tp1}, {signal.tp2}</div>
                    <div>R/R: {signal.riskReward} | Risk: {signal.risk}</div>
                  </div>
                </div>

                {/* Chart Placeholder */}
                <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg p-8 text-white text-center mb-4">
                  <h4 className="font-bold text-lg">{signal.chart}</h4>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between text-gray-500 text-sm">
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-1 hover:text-gray-700">
                      <MessageCircle className="h-4 w-4" />
                      <span>{signal.comments}</span>
                    </button>
                    <button className="flex items-center space-x-1 hover:text-gray-700">
                      <Share className="h-4 w-4" />
                      <span>Share</span>
                    </button>
                    <button className="text-blue-600 hover:text-blue-700">
                      Explain Signal
                    </button>
                  </div>
                  
                  {signal.rating > 0 && (
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span>{signal.rating}</span>
                      <span className="text-xs">({signal.ratings} ratings)</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
