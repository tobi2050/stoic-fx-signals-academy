
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Users, TrendingUp, DollarSign, MessageSquare, UserCheck, AlertTriangle, Settings, BarChart3 } from 'lucide-react';

export default function AdminDashboard() {
  const navigate = useNavigate();

  const stats = [
    { title: 'Total Users', value: '7', icon: Users, color: 'bg-blue-500' },
    { title: 'Active Today', value: '340', icon: UserCheck, color: 'bg-green-500' },
    { title: 'Signals Posted', value: '4', icon: TrendingUp, color: 'bg-purple-500' },
    { title: 'Premium Subs', value: '4', icon: DollarSign, color: 'bg-orange-500' }
  ];

  const recentActivity = [
    { action: 'ChidinmaO joined the platform.', time: '10 mins ago', icon: Users, color: 'text-green-600' },
    { action: 'ProFXMentor posted a new EUR/USD signal.', time: '30 mins ago', icon: TrendingUp, color: 'text-purple-600' },
    { action: 'FatimaA upgraded to Pro Trader plan.', time: '1 hour ago', icon: DollarSign, color: 'text-yellow-600' },
    { action: 'Oluwatobi created a new post in community.', time: '2 hours ago', icon: MessageSquare, color: 'text-blue-600' },
    { action: 'AdminUser reviewed reported content.', time: '5 hours ago', icon: AlertTriangle, color: 'text-red-600' }
  ];

  const quickActions = [
    { label: 'Manage Users', action: () => navigate('/admin/users'), icon: Users, color: 'text-blue-600' },
    { label: 'Approve Mentors', action: () => navigate('/admin/content'), icon: UserCheck, color: 'text-green-600' },
    { label: 'Review Reports', action: () => navigate('/admin/content'), icon: AlertTriangle, color: 'text-red-600' },
    { label: 'View Tickets', action: () => navigate('/admin/support'), icon: MessageSquare, color: 'text-purple-600' }
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Admin Sidebar */}
      <div className="flex">
        <div className="w-64 bg-gray-800 h-screen p-4">
          <div className="text-white font-bold text-xl mb-8">Admin Panel</div>
          <nav className="space-y-2">
            {[
              { label: 'Dashboard Overview', icon: BarChart3, path: '/admin' },
              { label: 'User Management', icon: Users, path: '/admin/users' },
              { label: 'Signals & Mentors', icon: TrendingUp, path: '/signals' },
              { label: 'Content Moderation', icon: MessageSquare, path: '/admin/content' },
              { label: 'Support Tickets', icon: AlertTriangle, path: '/admin/support' },
              { label: 'Platform Analytics', icon: BarChart3, path: '/analytics' },
              { label: 'Admin Settings', icon: Settings, path: '/settings' }
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  item.path === '/admin' 
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
            Back to Main App
          </Button>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <h1 className="text-3xl font-bold text-white mb-8">Dashboard Overview</h1>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat) => (
              <Card key={stat.title} className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">{stat.title}</p>
                      <p className="text-3xl font-bold text-white">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-lg ${stat.color}`}>
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <activity.icon className={`h-5 w-5 ${activity.color}`} />
                      <div className="flex-1">
                        <p className="text-gray-300 text-sm">{activity.action}</p>
                        <p className="text-gray-500 text-xs">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {quickActions.map((action) => (
                    <Button
                      key={action.label}
                      variant="outline"
                      onClick={action.action}
                      className="h-20 flex flex-col items-center justify-center space-y-2 bg-gray-700 border-gray-600 hover:bg-gray-600 text-gray-300"
                    >
                      <action.icon className={`h-6 w-6 ${action.color}`} />
                      <span className="text-sm">{action.label}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
