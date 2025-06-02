
import { useState, useEffect } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, Users, TrendingUp, Plus, Heart, MessageCircle, Share2 } from 'lucide-react';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('watchlist');

  // Mock data for demonstration
  const communityPosts = [
    {
      id: 1,
      user: 'ChidimaO',
      avatar: 'CO',
      time: '2 hours ago',
      content: 'Just spotted a potential head and shoulders pattern on EUR/USD! Keep an eye out.',
      likes: 15,
      comments: 1,
      chart: 'EUR/USD Before'
    },
    {
      id: 2,
      user: 'KunleTrades',
      avatar: 'KT',
      time: '4 hours ago', 
      content: 'Anyone else seeing strength in JPY pairs today? Looking at GBP/JPY for a short.',
      likes: 30,
      comments: 1,
      chart: 'GBP/JPY Chart'
    },
    {
      id: 3,
      user: 'FatimaA',
      avatar: 'FA',
      time: '5 hours ago',
      content: 'New article out on advanced Fibonacci retracement strategies. Link in bio!',
      likes: 30,
      comments: 1
    }
  ];

  const quickSignals = [
    { pair: 'NZD/USD', type: 'Sell', entry: '0.612', pips: '-5', user: 'FF', color: 'bg-orange-500' },
    { pair: 'XAU/USD', type: 'Buy', entry: '2350', pips: '-100', user: 'KT', color: 'bg-red-500' },
    { pair: 'USD/CAD', type: 'Sell', entry: '1.36', pips: '+50', user: 'CO', color: 'bg-green-500' },
    { pair: 'EUR/USD', type: 'Buy', entry: '1.085', pips: '+15', user: 'PM', color: 'bg-yellow-500' }
  ];

  const watchlistItems = [
    { pair: 'EUR/USD', price: '1.0875', change: '+0.0012 (+0.11%)', positive: true },
    { pair: 'GBP/JPY', price: '182.65', change: '-0.0050 (-0.03%)', positive: false },
    { pair: 'XAU/USD', price: '2355.20', change: '+5.10 (+0.22%)', positive: true }
  ];

  const newsEvents = [
    { time: '08:30 AM', event: 'CPI Data', currency: 'USD', impact: 'High', forecast: '3.4%' },
    { time: '10:00 AM', event: 'ECB President Lagarde Speaks', currency: 'EUR', impact: 'Medium' },
    { time: '01:00 PM', event: 'Manufacturing PMI', currency: 'GBP', impact: 'Low', forecast: '51.8' },
    { time: '03:00 PM', event: 'Interest Rate Decision', currency: 'CAD', impact: 'High', forecast: '2.50%' }
  ];

  return (
    <MainLayout title="Dashboard">
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex justify-between items-center">
          <div className="flex space-x-4">
            <Button 
              variant={activeTab === 'watchlist' ? 'default' : 'outline'} 
              onClick={() => setActiveTab('watchlist')}
              className="bg-gray-100"
            >
              My Watchlist
            </Button>
            <Button 
              variant={activeTab === 'mentions' ? 'default' : 'outline'} 
              onClick={() => setActiveTab('mentions')}
            >
              Mentions 5
            </Button>
            <Button 
              variant={activeTab === 'calendar' ? 'default' : 'outline'} 
              onClick={() => setActiveTab('calendar')}
              className="bg-purple-600 text-white"
            >
              Calendar
            </Button>
          </div>
          
          <Button className="bg-blue-500 hover:bg-blue-600 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Create New Post
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Community Posts */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Community Posts (3)</CardTitle>
                  <Button variant="ghost" className="text-purple-600">View All</Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {communityPosts.map((post) => (
                  <div key={post.id} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
                    <div className="flex items-start space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-green-100 text-green-600">
                          {post.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold text-gray-900">{post.user}</span>
                          <span className="text-sm text-gray-500">{post.time}</span>
                        </div>
                        <p className="text-gray-700 mt-1">{post.content}</p>
                        
                        {post.chart && (
                          <div className="mt-4 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg p-6 text-white text-center">
                            <h3 className="text-xl font-bold">{post.chart}</h3>
                          </div>
                        )}
                        
                        <div className="flex items-center space-x-6 mt-4 text-gray-500">
                          <button className="flex items-center space-x-2 hover:text-red-500">
                            <Heart className="h-4 w-4" />
                            <span>{post.likes}</span>
                          </button>
                          <button className="flex items-center space-x-2 hover:text-blue-500">
                            <MessageCircle className="h-4 w-4" />
                            <span>{post.comments}</span>
                          </button>
                          <button className="flex items-center space-x-2 hover:text-green-500">
                            <Share2 className="h-4 w-4" />
                            <span>Share</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Trending Topics */}
            <Card>
              <CardHeader>
                <CardTitle>Trending Topics (3)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="text-blue-600 font-semibold">#USDCADAnalysis</div>
                    <div className="text-sm text-gray-600">Posts: 120</div>
                    <div className="text-sm text-gray-600">Participants: 85</div>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <div className="text-purple-600 font-semibold">#GoldBreakout</div>
                    <div className="text-sm text-gray-600">Posts: 95</div>
                    <div className="text-sm text-gray-600">Participants: 60</div>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="text-green-600 font-semibold">#TradingPsychology</div>
                    <div className="text-sm text-gray-600">Posts: 70</div>
                    <div className="text-sm text-gray-600">Participants: 45</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* My Work */}
            <Card>
              <CardHeader>
                <CardTitle>My Work (3)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-semibold">Review Mentor Signals</div>
                    <div className="text-sm text-gray-600">Progress: 3/10 Due: July, 22</div>
                    <Badge className="mt-1 text-xs">Signals/Mentors</Badge>
                  </div>
                  <div className="flex space-x-2">
                    <Avatar className="h-6 w-6 bg-purple-100 text-purple-600">
                      <AvatarFallback>D</AvatarFallback>
                    </Avatar>
                    <Avatar className="h-6 w-6 bg-blue-100 text-blue-600">
                      <AvatarFallback>E</AvatarFallback>
                    </Avatar>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-semibold">Complete Risk Management Course</div>
                    <div className="text-sm text-gray-600">Progress: 1/8 Due: July, 26</div>
                    <Badge className="mt-1 text-xs bg-green-100 text-green-800">Learning/Courses</Badge>
                  </div>
                  <Avatar className="h-6 w-6 bg-green-100 text-green-600">
                    <AvatarFallback>C</AvatarFallback>
                  </Avatar>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-semibold">Participate in Weekly Webinar</div>
                    <div className="text-sm text-gray-600">Progress: 2/14 Due: July, 26</div>
                    <Badge className="mt-1 text-xs bg-orange-100 text-orange-800">Community/Events</Badge>
                  </div>
                  <div className="flex space-x-2">
                    <Avatar className="h-6 w-6 bg-red-100 text-red-600">
                      <AvatarFallback>B</AvatarFallback>
                    </Avatar>
                    <Avatar className="h-6 w-6 bg-yellow-100 text-yellow-600">
                      <AvatarFallback>F</AvatarFallback>
                    </Avatar>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Interest Rate Decision */}
            <Card>
              <CardContent className="p-4">
                <div className="text-right mb-2">
                  <div className="text-sm font-semibold">03:00 PM Interest Rate Decision</div>
                  <div className="text-xs text-gray-500">CAD</div>
                </div>
                <Badge className="bg-red-100 text-red-800 text-xs mb-2">High Impact</Badge>
                <div className="text-xs text-gray-600">Forecast: 2.50%</div>
                <div className="text-xs text-gray-500 mt-2">
                  Data moved. In a real app, this would be fetched from ForexFactory API.
                </div>
              </CardContent>
            </Card>

            {/* Quick Signals */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">Quick Signals</CardTitle>
                  <Button variant="ghost" className="text-purple-600 text-sm">View More Signals</Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {quickSignals.map((signal, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Avatar className={`h-8 w-8 ${signal.color}`}>
                      <AvatarFallback className="text-white text-xs">
                        {signal.user}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-sm">{signal.pair}</span>
                        <Badge variant={signal.type === 'Buy' ? 'default' : 'destructive'} className="text-xs">
                          {signal.type}
                        </Badge>
                      </div>
                      <div className="text-xs text-gray-600">
                        Entry: {signal.entry} | Pips: {signal.pips}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Subscription Plans */}
            <div className="space-y-4">
              <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                <CardContent className="p-6 text-center">
                  <h3 className="font-bold text-xl mb-2">Basic Trader</h3>
                  <div className="text-2xl font-bold mb-4">$9.99/month</div>
                  <div className="space-y-2 text-sm mb-6">
                    <div className="flex items-center justify-center space-x-2">
                      <span>✓</span>
                      <span>Access to Free Signals</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <span>✓</span>
                      <span>Basic Learning Modules</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <span>✓</span>
                      <span>Community Forum Access</span>
                    </div>
                  </div>
                  <Button className="bg-white text-blue-600 hover:bg-gray-100">
                    Get Started
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                <CardContent className="p-6 text-center">
                  <h3 className="font-bold text-xl mb-2">Pro Trader</h3>
                  <div className="text-2xl font-bold mb-4">$29.99/month</div>
                  <div className="space-y-2 text-sm mb-6">
                    <div className="flex items-center justify-center space-x-2">
                      <span>✓</span>
                      <span>Unlimited Signals</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <span>✓</span>
                      <span>Advanced Learning Modules</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <span>✓</span>
                      <span>1-on-1 Mentor Sessions</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <span>✓</span>
                      <span>Exclusive Webinars</span>
                    </div>
                  </div>
                  <Button className="bg-white text-purple-600 hover:bg-gray-100">
                    Upgrade Now
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* My Watchlist */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">My Watchlist</CardTitle>
                  <Button variant="ghost" className="text-purple-600 text-sm">Manage Watchlist</Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {watchlistItems.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div>
                      <div className="font-semibold text-sm">{item.pair}</div>
                      <div className="text-xs text-gray-600">Current Price: {item.price}</div>
                    </div>
                    <div className={`text-xs ${item.positive ? 'text-green-600' : 'text-red-600'}`}>
                      {item.change}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Calendar */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">June 2025</CardTitle>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm">❮</Button>
                    <Button variant="ghost" size="sm" className="text-purple-600">Today</Button>
                    <Button variant="ghost" size="sm">❯</Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-1 text-center text-xs">
                  <div className="font-semibold p-2">Sun</div>
                  <div className="font-semibold p-2">Mon</div>
                  <div className="font-semibold p-2">Tue</div>
                  <div className="font-semibold p-2">Wed</div>
                  <div className="font-semibold p-2">Thu</div>
                  <div className="font-semibold p-2">Fri</div>
                  <div className="font-semibold p-2">Sat</div>
                  
                  {Array.from({ length: 30 }, (_, i) => (
                    <div key={i} className={`p-2 hover:bg-gray-100 cursor-pointer ${
                      i === 1 ? 'bg-purple-600 text-white rounded' : ''
                    }`}>
                      {i + 1}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming News */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Upcoming News (ForexFactory)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {newsEvents.map((event, index) => (
                  <div key={index} className="text-xs">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-semibold">{event.time} {event.event}</div>
                        <div className="text-gray-600">{event.currency}</div>
                      </div>
                      <div className="text-right">
                        <Badge className={`text-xs ${
                          event.impact === 'High' ? 'bg-red-100 text-red-800' :
                          event.impact === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {event.impact} Impact
                        </Badge>
                        {event.forecast && (
                          <div className="text-gray-600 mt-1">Forecast: {event.forecast}</div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
