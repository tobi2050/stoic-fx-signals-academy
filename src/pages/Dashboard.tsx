import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { WatchlistModal } from '@/components/modals/WatchlistModal';
import { CalendarModal } from '@/components/modals/CalendarModal';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Plus,
  Calendar,
  Clock,
  TrendingUp,
  Users,
  BookOpen,
  Gift,
  X,
  Eye
} from 'lucide-react';

export default function Dashboard() {
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [newPost, setNewPost] = useState('');
  const [showWatchlist, setShowWatchlist] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  const handleCreatePost = () => {
    if (newPost.trim()) {
      console.log('Creating post:', newPost);
      setNewPost('');
      setShowCreatePost(false);
    }
  };

  const communityPosts = [
    {
      id: 1,
      user: 'ChidimaO',
      avatar: 'CO',
      time: '2 hours ago',
      content: 'Just spotted a potential head and shoulders pattern on EUR/USD! Keep an eye out.',
      likes: 15,
      comments: 1
    },
    {
      id: 2,
      user: 'KunleTrades',
      avatar: 'KT',
      time: '4 hours ago',
      content: 'Anyone else seeing strength in JPY pairs today? Looking at GBP/JPY for a short.',
      likes: 22,
      comments: 0
    }
  ];

  const quickSignals = [
    { pair: 'EUR/USD', type: 'Buy', entry: '1.085', target: '1.092', provider: 'ProFXMentor', status: 'Active' },
    { pair: 'GBP/JPY', type: 'Sell', entry: '185.20', target: '182.50', provider: 'KunleTrades', status: 'Win' }
  ];

  const trendingTopics = [
    { hashtag: '#USDCADAnalysis', posts: 120 },
    { hashtag: '#GoldBreakout', posts: 95 },
    { hashtag: '#TradingPsychology', posts: 70 }
  ];

  const subscriptionPlans = [
    { name: 'Basic', price: '$29', features: ['5 Signals/month', 'Basic Analysis'] },
    { name: 'Premium', price: '$99', features: ['Unlimited Signals', 'Advanced Analysis', 'Community Access'] }
  ];

  const upcomingNews = [
    { time: '14:30', event: 'USD Non-Farm Payrolls', impact: 'High' },
    { time: '16:00', event: 'EUR ECB Press Conference', impact: 'Medium' }
  ];

  return (
    <MainLayout title="Dashboard">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg p-6 text-white">
          <h2 className="text-2xl font-bold mb-2">Welcome back, Oluwatobi!</h2>
          <p className="opacity-90">Ready to make some profitable trades today?</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Watchlist and Calendar Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setShowWatchlist(true)}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5" />
                    <span>My Watchlist</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center text-gray-500">
                    <Eye className="h-8 w-8 mx-auto mb-2" />
                    <p>Click to view watchlist</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setShowCalendar(true)}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5" />
                    <span>Calendar</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center text-gray-500">
                    <Calendar className="h-8 w-8 mx-auto mb-2" />
                    <p>Click to view calendar</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Create Post Section */}
            {showCreatePost && (
              <Card className="border-purple-200 bg-purple-50">
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                  <CardTitle className="text-purple-700">Create New Post</CardTitle>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setShowCreatePost(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    placeholder="Share your trading insights, analysis, or questions..."
                    rows={3}
                  />
                  <div className="flex justify-end space-x-2">
                    <Button 
                      variant="outline" 
                      onClick={() => setShowCreatePost(false)}
                    >
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleCreatePost}
                      className="bg-purple-600 hover:bg-purple-700 text-white"
                      disabled={!newPost.trim()}
                    >
                      Post
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Community Posts */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Community Posts</CardTitle>
                  <Button 
                    onClick={() => setShowCreatePost(true)}
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create Post
                  </Button>
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

            {/* Quick Signals */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Signals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {quickSignals.map((signal, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-bold">{signal.pair} - {signal.type}</div>
                        <div className="text-sm text-gray-600">
                          Entry: {signal.entry} | Target: {signal.target}
                        </div>
                        <div className="text-xs text-gray-500">by {signal.provider}</div>
                      </div>
                      <Badge className={signal.status === 'Active' ? 'bg-blue-500' : 'bg-green-500'}>
                        {signal.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* My Work */}
            <Card>
              <CardHeader>
                <CardTitle>My Work</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-semibold text-blue-800">Signals Shared</h3>
                    <p className="text-2xl font-bold text-blue-900">12</p>
                    <p className="text-sm text-blue-600">This month</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h3 className="font-semibold text-green-800">Win Rate</h3>
                    <p className="text-2xl font-bold text-green-900">72%</p>
                    <p className="text-sm text-green-600">Overall</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Watchlist */}
            {/* <Watchlist /> */}

            {/* Calendar */}
            {/* <CalendarComponent /> */}

            {/* Trending Topics */}
            <Card>
              <CardHeader>
                <CardTitle>Trending Topics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {trendingTopics.map((topic, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                      <div className="font-semibold text-purple-600">{topic.hashtag}</div>
                      <div className="text-sm text-gray-600">{topic.posts} posts</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Subscription Plans */}
            <Card>
              <CardHeader>
                <CardTitle>Subscription Plans</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {subscriptionPlans.map((plan, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold">{plan.name}</h3>
                        <span className="text-lg font-bold">{plan.price}</span>
                      </div>
                      <ul className="text-sm text-gray-600">
                        {plan.features.map((feature, i) => (
                          <li key={i}>• {feature}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming News */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>Upcoming News</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingNews.map((news, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <div className="flex-1">
                        <div className="text-sm font-medium">{news.time}</div>
                        <div className="text-sm text-gray-600">{news.event}</div>
                      </div>
                      <Badge className={
                        news.impact === 'High' ? 'bg-red-100 text-red-800' :
                        news.impact === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }>
                        {news.impact}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Modals */}
        <WatchlistModal open={showWatchlist} onOpenChange={setShowWatchlist} />
        <CalendarModal open={showCalendar} onOpenChange={setShowCalendar} />
      </div>
    </MainLayout>
  );
}
