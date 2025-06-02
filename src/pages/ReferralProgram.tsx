
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { Users, Gift, DollarSign, Share2, Copy, TrendingUp } from 'lucide-react';

export default function ReferralProgram() {
  const navigate = useNavigate();
  const referralCode = "STOIC_OT2024";
  const referralLink = `https://stoicfx.com/join?ref=${referralCode}`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const referralStats = [
    { title: 'Total Referrals', value: '12', icon: Users, color: 'bg-blue-500' },
    { title: 'Active Referrals', value: '8', icon: TrendingUp, color: 'bg-green-500' },
    { title: 'Total Earnings', value: '₦24,000', icon: DollarSign, color: 'bg-purple-500' },
    { title: 'This Month', value: '₦6,000', icon: Gift, color: 'bg-orange-500' }
  ];

  const recentReferrals = [
    { name: 'John Doe', date: '2024-01-15', status: 'Active', earnings: '₦2,000' },
    { name: 'Jane Smith', date: '2024-01-12', status: 'Active', earnings: '₦2,000' },
    { name: 'Mike Johnson', date: '2024-01-10', status: 'Pending', earnings: '₦0' }
  ];

  return (
    <MainLayout title="Referral Program">
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-lg p-6 text-white">
          <h2 className="text-2xl font-bold mb-2">Earn with Every Referral!</h2>
          <p className="opacity-90">Share Stoic FX with friends and earn ₦2,000 for each successful referral</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {referralStats.map((stat) => (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.color}`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Share Your Link */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Share2 className="h-5 w-5" />
                <span>Share Your Referral Link</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Your Referral Code</label>
                <div className="flex mt-1">
                  <Input value={referralCode} readOnly className="rounded-r-none" />
                  <Button
                    onClick={() => copyToClipboard(referralCode)}
                    className="rounded-l-none border-l-0"
                    variant="outline"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Your Referral Link</label>
                <div className="flex mt-1">
                  <Input value={referralLink} readOnly className="rounded-r-none text-xs" />
                  <Button
                    onClick={() => copyToClipboard(referralLink)}
                    className="rounded-l-none border-l-0"
                    variant="outline"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Share via WhatsApp
                </Button>
                <Button className="w-full" variant="outline">
                  Share via Telegram
                </Button>
                <Button className="w-full" variant="outline">
                  Share via Twitter
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Track Your Referrals */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Track Your Referrals</CardTitle>
                <Button 
                  onClick={() => navigate('/referral/dashboard')}
                  variant="outline" 
                  size="sm"
                >
                  View Dashboard
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentReferrals.map((referral, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium">{referral.name}</div>
                      <div className="text-sm text-gray-600">{referral.date}</div>
                    </div>
                    <div className="text-right">
                      <Badge className={referral.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                        {referral.status}
                      </Badge>
                      <div className="text-sm font-semibold mt-1">{referral.earnings}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* How It Works */}
        <Card>
          <CardHeader>
            <CardTitle>How It Works</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Share2 className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">1. Share Your Link</h3>
                <p className="text-gray-600 text-sm">Share your unique referral link with friends and family</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">2. Friends Sign Up</h3>
                <p className="text-gray-600 text-sm">When they join using your link and make their first deposit</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">3. You Earn Money</h3>
                <p className="text-gray-600 text-sm">Get ₦2,000 for each successful referral to your wallet</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
