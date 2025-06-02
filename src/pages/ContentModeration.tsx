
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, TrendingUp, MessageSquare, AlertTriangle, Settings, BarChart3 } from 'lucide-react';

export default function ContentModeration() {
  const navigate = useNavigate();

  const mentorApplications = [
    { title: 'Beginner Forex Mentorship', mentor: 'N/A', status: 'Open' },
    { title: 'Advanced Price Action Coaching', mentor: 'KunleTrades', status: 'Open' }
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="flex">
        {/* Admin Sidebar */}
        <div className="w-64 bg-gray-800 h-screen p-4">
          <div className="text-white font-bold text-xl mb-8">Admin Panel</div>
          <nav className="space-y-2">
            {[
              { label: 'Dashboard Overview', icon: BarChart3, path: '/admin' },
              { label: 'User Management', icon: Users, path: '/admin/users' },
              { label: 'Signals & Mentors', icon: TrendingUp, path: '/signals' },
              { label: 'Content Moderation', icon: MessageSquare, path: '/admin/content' },
              { label: 'Support Tickets', icon: AlertTriangle, path: '/support' },
              { label: 'Platform Analytics', icon: BarChart3, path: '/analytics' },
              { label: 'Admin Settings', icon: Settings, path: '/settings' }
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  item.path === '/admin/content' 
                    ? 'bg-purple-600 text-white' 
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
          
          <Button
            onClick={() => navigate('/')}
            variant="outline"
            className="w-full mt-8 text-gray-300 border-gray-600 hover:bg-gray-700"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Main App
          </Button>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <h1 className="text-3xl font-bold text-white mb-8">Content Moderation</h1>
          
          {/* Reported Content */}
          <Card className="bg-gray-800 border-gray-700 mb-6">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                Reported Content: 5
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-4">Review user-reported posts and profiles for violations.</p>
              <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                Go to Reports
              </Button>
            </CardContent>
          </Card>

          {/* Pending Community Posts */}
          <Card className="bg-gray-800 border-gray-700 mb-6">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <MessageSquare className="h-5 w-5 text-blue-500 mr-2" />
                Pending Community Posts: 12
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-4">Review and approve/reject new community posts.</p>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Review Posts
              </Button>
            </CardContent>
          </Card>

          {/* Mentor Applications */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Users className="h-5 w-5 text-green-500 mr-2" />
                Mentor Applications (0 Pending)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-4">Review applications from aspiring mentors.</p>
              
              <div className="space-y-4">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left text-gray-300 pb-2">Title</th>
                      <th className="text-left text-gray-300 pb-2">Mentor</th>
                      <th className="text-left text-gray-300 pb-2">Status</th>
                      <th className="text-left text-gray-300 pb-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mentorApplications.map((application, index) => (
                      <tr key={index} className="border-b border-gray-700">
                        <td className="py-2 text-gray-300">{application.title}</td>
                        <td className="py-2 text-gray-300">{application.mentor}</td>
                        <td className="py-2">
                          <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                            {application.status}
                          </span>
                        </td>
                        <td className="py-2 text-gray-300">Reviewed</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
