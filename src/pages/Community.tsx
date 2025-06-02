
import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useNavigate } from 'react-router-dom';
import { Heart, MessageCircle, Share2, Trophy, Rocket, Gift } from 'lucide-react';

export default function Community() {
  const navigate = useNavigate();

  const communityPosts = [
    {
      id: 1,
      user: 'ChidimaO',
      avatar: 'CO',
      time: '2 hours ago',
      content: 'Just spotted a potential head and shoulders pattern on EUR/USD! Keep an eye out.',
      likes: 15,
      comments: 1,
      chart: null
    },
    {
      id: 2,
      user: 'KunleTrades',
      avatar: 'KT',
      time: '4 hours ago',
      content: 'Anyone else seeing strength in JPY pairs today? Looking at GBP/JPY for a short.',
      likes: 22,
      comments: 0,
      chart: 'GBP/JPY Chart'
    },
    {
      id: 3,
      user: 'FatimaA',
      avatar: 'FA',
      time: '1 day ago',
      content: 'New article out on advanced Fibonacci retracement strategies. Link in bio!',
      likes: 30,
      comments: 1,
      chart: null
    }
  ];

  const trendingTopics = [
    {
      hashtag: '#USDCADAnalysis',
      posts: 120,
      participants: 85,
      color: 'text-blue-600'
    },
    {
      hashtag: '#GoldBreakout',
      posts: 95,
      participants: 60,
      color: 'text-purple-600'
    },
    {
      hashtag: '#TradingPsychology',
      posts: 70,
      participants: 45,
      color: 'text-green-600'
    }
  ];

  return (
    <MainLayout title="Community">
      <div className="space-y-6">
        {/* Community Action Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Trader Rankings */}
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white cursor-pointer hover:scale-105 transition-transform" onClick={() => navigate('/rankings')}>
            <CardContent className="p-6 text-center">
              <Trophy className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Trader Rankings</h3>
              <p className="opacity-90 mb-4">See who's leading</p>
              <Button variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                View Rankings
              </Button>
            </CardContent>
          </Card>

          {/* Mentorship Program */}
          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white cursor-pointer hover:scale-105 transition-transform" onClick={() => navigate('/create-content')}>
            <CardContent className="p-6 text-center">
              <Rocket className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Mentorship Program</h3>
              <p className="opacity-90 mb-4">Apply for guidance</p>
              <Button variant="secondary" className="bg-white text-green-600 hover:bg-gray-100">
                Create New Content
              </Button>
            </CardContent>
          </Card>

          {/* Giveaways */}
          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white cursor-pointer hover:scale-105 transition-transform" onClick={() => navigate('/create-giveaway')}>
            <CardContent className="p-6 text-center">
              <Gift className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Giveaways</h3>
              <p className="opacity-90 mb-4">Win cash prizes!</p>
              <Button variant="secondary" className="bg-white text-orange-600 hover:bg-gray-100">
                Create New Giveaway
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Connect with Stoic FX */}
        <Card>
          <CardHeader>
            <CardTitle>Connect with Stoic FX</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center space-x-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white font-bold text-lg">T</span>
                </div>
                <span className="text-sm text-gray-700">Telegram</span>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white font-bold text-lg">I</span>
                </div>
                <span className="text-sm text-gray-700">Instagram</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Community Posts */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Community Posts ({communityPosts.length})</CardTitle>
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
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Trending Topics */}
            <Card>
              <CardHeader>
                <CardTitle>Trending Topics ({trendingTopics.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trendingTopics.map((topic, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                      <div className={`font-semibold ${topic.color}`}>{topic.hashtag}</div>
                      <div className="text-sm text-gray-600">Posts: {topic.posts}</div>
                      <div className="text-sm text-gray-600">Participants: {topic.participants}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
