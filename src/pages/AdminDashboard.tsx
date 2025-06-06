
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  Settings,
  MessageSquare,
  FileText,
  LifeBuoy,
  Shield,
  BarChart3
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const navigate = useNavigate();

  const stats = [
    {
      title: "Total Users",
      value: "2,543",
      change: "+12%",
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Active Signals", 
      value: "156",
      change: "+5%",
      icon: TrendingUp,
      color: "text-green-600"
    },
    {
      title: "Revenue",
      value: "$12,480",
      change: "+23%",
      icon: DollarSign,
      color: "text-purple-600"
    },
    {
      title: "Support Tickets",
      value: "23",
      change: "-8%",
      icon: LifeBuoy,
      color: "text-orange-600"
    }
  ];

  const adminActions = [
    {
      title: "User Management",
      description: "Manage user accounts, roles, and permissions",
      icon: Users,
      action: () => navigate('/admin/users'),
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: "Content Moderation",
      description: "Review and moderate user-generated content",
      icon: FileText,
      action: () => navigate('/admin/content'),
      color: "bg-green-100 text-green-600"
    },
    {
      title: "Support Tickets",
      description: "Handle user support requests and issues",
      icon: LifeBuoy,
      action: () => navigate('/admin/support'),
      color: "bg-orange-100 text-orange-600"
    },
    {
      title: "Feature Management",
      description: "Control app features and settings",
      icon: Settings,
      action: () => navigate('/admin/features'),
      color: "bg-purple-100 text-purple-600"
    },
    {
      title: "Analytics",
      description: "View detailed analytics and reports",
      icon: BarChart3,
      action: () => navigate('/admin/analytics'),
      color: "bg-indigo-100 text-indigo-600"
    },
    {
      title: "Security",
      description: "Monitor security and fraud detection",
      icon: Shield,
      action: () => navigate('/admin/security'),
      color: "bg-red-100 text-red-600"
    }
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Manage and monitor the Nexus platform</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <Badge variant={stat.change.startsWith('+') ? 'default' : 'destructive'} className="mt-1">
                      {stat.change}
                    </Badge>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Admin Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {adminActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-auto p-4 justify-start"
                  onClick={action.action}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${action.color}`}>
                      <action.icon className="h-5 w-5" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium">{action.title}</p>
                      <p className="text-sm text-gray-600">{action.description}</p>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                "New user registered: trader123",
                "Signal reported for review: EURUSD BUY",
                "Payment processed: $25.00 premium subscription",
                "Support ticket resolved: #2341"
              ].map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 text-sm">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-600">{activity}</span>
                  <span className="text-gray-400 ml-auto">2 hours ago</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
