
import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PlayCircle, Clock, User } from 'lucide-react';

export default function Learn() {
  const [activeTab, setActiveTab] = useState('webinars');

  const webinars = [
    {
      id: 1,
      title: 'Weekly Market Outlook',
      instructor: 'KunleTrades',
      date: 'Fri, May 31 at 10:00 AM WAT',
      color: 'bg-orange-500',
      type: 'free',
      content: 'Outlook'
    },
    {
      id: 2,
      title: 'Trading Psychology Deep Dive',
      instructor: 'Stoic FX Academy',
      date: 'Wed, Jun 5 at 02:00 PM WAT',
      color: 'bg-red-500',
      type: 'premium',
      content: 'Psychology'
    }
  ];

  const courses = [
    {
      id: 1,
      title: 'Basics',
      subtitle: 'Forex Basics for Beginners',
      instructor: 'Stoic FX Academy',
      duration: '3h 30m',
      color: 'bg-blue-500',
      type: 'free'
    },
    {
      id: 2,
      title: 'Advanced',
      subtitle: 'Advanced Price Action Strategies',
      instructor: 'ProFXMentor',
      duration: '5h 15m',
      color: 'bg-green-500',
      type: 'premium'
    }
  ];

  const podcasts = [
    {
      id: 1,
      title: 'Mindset of a Consistent Trader',
      speaker: 'ProFXMentor',
      type: 'premium'
    },
    {
      id: 2,
      title: 'Overcoming Trading Losses',
      speaker: 'KunleTrades',
      type: 'premium'
    }
  ];

  return (
    <MainLayout title="Learn">
      <div className="space-y-6">
        {/* Tab Navigation */}
        <div className="flex space-x-1">
          <Button 
            className={activeTab === 'courses' ? 'bg-purple-600 text-white' : 'bg-gray-100'}
            onClick={() => setActiveTab('courses')}
          >
            Courses
          </Button>
          <Button 
            className={activeTab === 'webinars' ? 'bg-purple-600 text-white' : 'bg-gray-100'}
            onClick={() => setActiveTab('webinars')}
          >
            Webinars
          </Button>
          <Button 
            className={activeTab === 'podcasts' ? 'bg-purple-600 text-white' : 'bg-gray-100'}
            onClick={() => setActiveTab('podcasts')}
          >
            Podcasts
          </Button>
        </div>

        {activeTab === 'webinars' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Upcoming Webinars</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {webinars.map((webinar) => (
                <Card key={webinar.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className={`${webinar.color} h-32 rounded-t-lg flex items-center justify-center text-white`}>
                      <h3 className="text-3xl font-bold">{webinar.content}</h3>
                    </div>
                    <div className="p-6">
                      <h4 className="font-semibold text-lg mb-2">{webinar.title}</h4>
                      <div className="text-sm text-gray-600 mb-4">
                        <div>By: {webinar.instructor}</div>
                        <div>Date: {webinar.date}</div>
                      </div>
                      
                      {webinar.type === 'premium' && (
                        <Badge className="bg-yellow-100 text-yellow-800 mb-4">Premium</Badge>
                      )}
                      
                      <Button 
                        className={`w-full ${
                          webinar.type === 'premium' 
                            ? 'bg-purple-600 hover:bg-purple-700' 
                            : 'bg-blue-600 hover:bg-blue-700'
                        } text-white`}
                      >
                        {webinar.type === 'premium' ? 'Unlock Now' : 'View Content'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'courses' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Featured Courses</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {courses.map((course) => (
                <Card key={course.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className={`${course.color} h-32 rounded-t-lg flex items-center justify-center text-white`}>
                      <h3 className="text-3xl font-bold">{course.title}</h3>
                    </div>
                    <div className="p-6">
                      <h4 className="font-semibold text-lg mb-2">{course.subtitle}</h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                        <div className="flex items-center space-x-1">
                          <User className="h-4 w-4" />
                          <span>By: {course.instructor}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>Duration: {course.duration}</span>
                        </div>
                      </div>
                      
                      {course.type === 'premium' && (
                        <Badge className="bg-yellow-100 text-yellow-800 mb-4">Premium</Badge>
                      )}
                      
                      <Button 
                        className={`w-full ${
                          course.type === 'premium' 
                            ? 'bg-purple-600 hover:bg-purple-700' 
                            : 'bg-blue-600 hover:bg-blue-700'
                        } text-white`}
                      >
                        {course.type === 'premium' ? 'Unlock Now' : 'View Content'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'podcasts' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Trading Psychology Podcasts</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {podcasts.map((podcast) => (
                <Card key={podcast.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <h4 className="font-semibold text-lg mb-2">{podcast.title}</h4>
                    <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
                      <span>Speaker: {podcast.speaker}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Button variant="outline" className="text-purple-600">
                        Unlock Premium
                      </Button>
                      <Badge className="bg-yellow-100 text-yellow-800">Premium Content</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
