
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart, MessageCircle, Share2, Plus } from 'lucide-react';

export default function Community() {
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
        {/* Create Post Button */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Community Posts</h1>
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
