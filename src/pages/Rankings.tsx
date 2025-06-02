
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function Rankings() {
  const rankings = [
    {
      rank: 1,
      name: 'ProFXMentor',
      avatar: 'PM',
      role: 'Mentor',
      account: 'Real',
      winRate: '92%',
      totalPips: '+8500',
      color: 'bg-yellow-500'
    },
    {
      rank: 2,
      name: 'KunleTrades',
      avatar: 'KT',
      role: 'Mentor',
      account: 'Real',
      winRate: '88%',
      totalPips: '+7200',
      color: 'bg-red-500'
    },
    {
      rank: 3,
      name: 'AmakaFX',
      avatar: 'AF',
      role: 'Mentor',
      account: 'Real',
      winRate: '85%',
      totalPips: '+6000',
      color: 'bg-purple-500'
    },
    {
      rank: 4,
      name: 'Oluwatobi',
      avatar: 'OT',
      role: 'Student',
      account: 'Real',
      winRate: '72%',
      totalPips: '+2500',
      color: 'bg-purple-500'
    },
    {
      rank: 5,
      name: 'FatimaA',
      avatar: 'FA',
      role: 'Student',
      account: 'Demo',
      winRate: '70%',
      totalPips: '+900',
      color: 'bg-gray-400'
    },
    {
      rank: 6,
      name: 'ChidinmaO',
      avatar: 'CO',
      role: 'Student',
      account: 'Demo',
      winRate: '65%',
      totalPips: '+1800',
      color: 'bg-green-500'
    },
    {
      rank: 7,
      name: 'EmekaF',
      avatar: 'EF',
      role: 'Student',
      account: 'Real',
      winRate: '68%',
      totalPips: '+1200',
      color: 'bg-orange-500'
    }
  ];

  return (
    <MainLayout title="Rankings">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Filter Tabs */}
        <div className="space-y-4">
          {/* Time Period */}
          <div className="flex space-x-1">
            <Button className="bg-purple-600 text-white">Overall</Button>
            <Button variant="outline">Weekly</Button>
            <Button variant="outline">Monthly</Button>
          </div>
          
          {/* User Type */}
          <div className="flex space-x-1">
            <Button className="bg-blue-600 text-white">All Traders</Button>
            <Button variant="outline">Mentors</Button>
            <Button variant="outline">Students</Button>
          </div>
        </div>

        {/* Rankings List */}
        <Card>
          <CardContent className="p-0">
            <div className="space-y-1">
              {rankings.map((trader) => (
                <div key={trader.rank} className="flex items-center justify-between p-6 hover:bg-gray-50">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-3">
                      <span className={`text-2xl font-bold ${
                        trader.rank === 1 ? 'text-yellow-500' :
                        trader.rank === 2 ? 'text-red-500' :
                        trader.rank === 3 ? 'text-purple-500' :
                        'text-purple-600'
                      }`}>
                        #{trader.rank}
                      </span>
                      <Avatar className={`h-12 w-12 ${trader.color}`}>
                        <AvatarFallback className="text-white font-bold">
                          {trader.avatar}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    
                    <div>
                      <div className="font-semibold text-gray-900">{trader.name}</div>
                      <div className="flex items-center space-x-2">
                        <Badge className={`text-xs ${
                          trader.role === 'Mentor' 
                            ? 'bg-purple-100 text-purple-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {trader.role}
                        </Badge>
                        <Badge className={`text-xs ${
                          trader.account === 'Real'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {trader.account}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        Win Rate: {trader.winRate}
                      </div>
                      <div className="text-sm text-gray-600">
                        Total Pips: {trader.totalPips}
                      </div>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="text-purple-600">
                    View
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
