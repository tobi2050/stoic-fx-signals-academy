
import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, Settings, Users, Eye } from 'lucide-react';

export default function Profile() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('signals');

  const signals = [
    { pair: 'EUR/USD', type: 'Buy', entry: '1.0850', target: '1.0920', result: '+70 pips', status: 'Closed', date: '2024-01-15' },
    { pair: 'GBP/USD', type: 'Sell', entry: '1.2650', target: '1.2580', result: '+70 pips', status: 'Closed', date: '2024-01-14' },
    { pair: 'USD/JPY', type: 'Buy', entry: '149.20', target: '150.50', result: 'Running', status: 'Active', date: '2024-01-16' }
  ];

  const subscriptions = [
    { mentor: 'ProFXMentor', plan: 'Premium', status: 'Active', nextBilling: '2024-02-15' },
    { mentor: 'KunleTrades', plan: 'Basic', status: 'Active', nextBilling: '2024-02-20' }
  ];

  const renderSignalsTab = () => (
    <Card>
      <CardHeader>
        <CardTitle>Signals Shared</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {signals.map((signal, index) => (
            <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <div className="font-bold">{signal.pair} - {signal.type}</div>
                <div className="text-sm text-gray-600">
                  Entry: {signal.entry} | Target: {signal.target}
                </div>
                <div className="text-xs text-gray-500">{signal.date}</div>
              </div>
              <div className="text-right">
                <Badge className={signal.status === 'Active' ? 'bg-blue-500' : 'bg-green-500'}>
                  {signal.status}
                </Badge>
                <div className="text-sm font-semibold mt-1">{signal.result}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const renderSubscriptionsTab = () => (
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
          <div className="space-y-4">
            {subscriptions.map((sub, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <div className="font-bold">{sub.mentor}</div>
                  <div className="text-sm text-gray-600">{sub.plan} Plan</div>
                </div>
                <div className="text-right">
                  <Badge className="bg-green-100 text-green-800">{sub.status}</Badge>
                  <div className="text-xs text-gray-500 mt-1">Next billing: {sub.nextBilling}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderSettingsTab = () => (
    <Card>
      <CardHeader>
        <CardTitle>Profile Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input id="firstName" defaultValue="Oluwatobi" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input id="lastName" defaultValue="Adebayo" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" defaultValue="oluwatobi@example.com" disabled />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea id="bio" placeholder="Tell us about your trading experience..." rows={3} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Select defaultValue="nigeria">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="nigeria">Nigeria</SelectItem>
                <SelectItem value="ghana">Ghana</SelectItem>
                <SelectItem value="kenya">Kenya</SelectItem>
                <SelectItem value="south-africa">South Africa</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" placeholder="+234 xxx xxx xxxx" />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold">KYC Verification</h3>
          <div className="space-y-2">
            <Label htmlFor="idType">ID Type</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select ID type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="passport">International Passport</SelectItem>
                <SelectItem value="drivers">Driver's License</SelectItem>
                <SelectItem value="nin">National ID (NIN)</SelectItem>
                <SelectItem value="voters">Voter's Card</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="idNumber">ID Number</Label>
            <Input id="idNumber" placeholder="Enter your ID number" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bvn">BVN (Bank Verification Number)</Label>
            <Input id="bvn" placeholder="Enter your BVN" />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold">Trading Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="experience">Trading Experience</Label>
              <Select defaultValue="2">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Beginner (0 years)</SelectItem>
                  <SelectItem value="1">1 year</SelectItem>
                  <SelectItem value="2">2 years</SelectItem>
                  <SelectItem value="3">3 years</SelectItem>
                  <SelectItem value="5">5+ years</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="accountType">Account Type</Label>
              <Select defaultValue="real">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="demo">Demo</SelectItem>
                  <SelectItem value="real">Real</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
          Save Changes
        </Button>
      </CardContent>
    </Card>
  );

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
                    <Button variant="outline" size="sm" className="ml-2 text-blue-600" onClick={() => navigate('/wallet')}>
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
          <Button 
            variant={activeTab === 'signals' ? 'default' : 'ghost'} 
            className={activeTab === 'signals' ? 'bg-purple-600 text-white' : 'text-gray-600'}
            onClick={() => setActiveTab('signals')}
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            Signals Shared
          </Button>
          <Button 
            variant={activeTab === 'subscriptions' ? 'default' : 'ghost'} 
            className={activeTab === 'subscriptions' ? 'bg-purple-600 text-white' : 'text-gray-600'}
            onClick={() => setActiveTab('subscriptions')}
          >
            <Users className="h-4 w-4 mr-2" />
            Subscriptions
          </Button>
          <Button 
            variant={activeTab === 'settings' ? 'default' : 'ghost'} 
            className={activeTab === 'settings' ? 'bg-purple-600 text-white' : 'text-gray-600'}
            onClick={() => setActiveTab('settings')}
          >
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>

        {/* Tab Content */}
        {activeTab === 'signals' && renderSignalsTab()}
        {activeTab === 'subscriptions' && renderSubscriptionsTab()}
        {activeTab === 'settings' && renderSettingsTab()}
      </div>
    </MainLayout>
  );
}
