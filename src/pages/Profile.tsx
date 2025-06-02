
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/hooks/useAuth';

export default function Profile() {
  const { user } = useAuth();

  return (
    <MainLayout title="Profile">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Profile Header */}
        <Card>
          <CardContent className="p-8">
            <div className="flex items-start space-x-6">
              <Avatar className="h-24 w-24 bg-purple-500">
                <AvatarFallback className="text-white text-2xl font-bold">
                  OT
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-4">
                  <h1 className="text-3xl font-bold">Oluwatobi</h1>
                  <Badge className="bg-blue-100 text-blue-800">Student</Badge>
                  <Badge className="bg-gray-100 text-gray-800">Real Account</Badge>
                  <Badge className="bg-yellow-100 text-yellow-800">Premium</Badge>
                </div>
                
                <div className="grid grid-cols-3 gap-6 text-sm">
                  <div>
                    <div className="text-gray-600">Trading Duration:</div>
                    <div className="font-semibold">2 years</div>
                  </div>
                  <div>
                    <div className="text-gray-600">Overall Win Rate:</div>
                    <div className="font-semibold">72%</div>
                  </div>
                  <div>
                    <div className="text-gray-600">Total Pips:</div>
                    <div className="font-semibold">+2500</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-6 mt-4 text-sm">
                  <div>
                    <span className="text-gray-600">Wallet Balance:</span>
                    <span className="font-semibold text-green-600 ml-2">₦1,000.00</span>
                    <Button variant="outline" size="sm" className="ml-2 text-blue-600">
                      Manage Wallet
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 mt-4 text-sm text-gray-600">
                  <span>2 Followers</span>
                  <span>2 Following</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tab Navigation */}
        <div className="flex space-x-1">
          <Button variant="ghost" className="text-gray-600">
            Signals Shared
          </Button>
          <Button className="bg-purple-600 text-white">
            Subscriptions
          </Button>
          <Button variant="ghost" className="text-gray-600">
            Settings
          </Button>
        </div>

        {/* My Subscriptions */}
        <Card>
          <CardHeader>
            <CardTitle>My Subscriptions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-green-50 p-6 rounded-lg mb-6">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-green-600">✓</span>
                <span className="font-semibold">You are currently on the **Premium Plan**.</span>
              </div>
              <p className="text-gray-600 mb-4">
                Enjoy unlimited access to all signals, premium education, and exclusive features.
              </p>
              <Button className="bg-red-500 hover:bg-red-600 text-white">
                Manage Subscription
              </Button>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">Mentors You've Subscribed To</h3>
              <div className="text-gray-500 text-center py-8">
                No mentors subscribed yet
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
