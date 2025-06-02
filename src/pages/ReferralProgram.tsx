
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Copy, Link, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function ReferralProgram() {
  const { toast } = useToast();
  const referralLink = "https://stoicfx.com/referral/user123-gyz1r3";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    toast({
      title: "Copied!",
      description: "Referral link copied to clipboard",
    });
  };

  return (
    <MainLayout title="Referral Program">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Referral Program</h1>
          <p className="text-gray-600">Invite your friends to Stoic FX and earn rewards!</p>
        </div>

        {/* Referral Link Card */}
        <Card>
          <CardContent className="p-8">
            <div className="text-center space-y-4">
              <h3 className="text-xl font-semibold text-purple-600">Your Unique Referral Link</h3>
              
              <div className="flex items-center space-x-2 max-w-md mx-auto">
                <div className="flex items-center flex-1 bg-gray-50 rounded-lg p-3">
                  <Link className="h-4 w-4 text-gray-500 mr-2" />
                  <span className="text-sm text-gray-700 truncate">{referralLink}</span>
                </div>
                <Button 
                  onClick={copyToClipboard}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  Copy Link
                </Button>
              </div>
              
              <p className="text-sm text-gray-500">Share this link with your network</p>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Earn Rewards */}
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-green-800 mb-4">Earn Rewards</h3>
              <div className="space-y-3 text-sm text-green-700">
                <p>Get 10% of every premium subscription your referrals make!</p>
                <p>Your referrals also get a 5% discount on their first month.</p>
              </div>
            </CardContent>
          </Card>

          {/* Track Your Referrals */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-4">Track Your Referrals</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-blue-700">Total Referrals:</span>
                  <span className="font-semibold">7</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Active Referrals:</span>
                  <span className="font-semibold">3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Earned (USD):</span>
                  <span className="font-semibold">$150.75</span>
                </div>
              </div>
              <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white">
                View Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Back to Community */}
        <div className="text-center">
          <Button variant="outline" className="text-purple-600">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Community
          </Button>
        </div>
      </div>
    </MainLayout>
  );
}
