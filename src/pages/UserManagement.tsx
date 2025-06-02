
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, TrendingUp, MessageSquare, AlertTriangle, Settings, BarChart3 } from 'lucide-react';

export default function UserManagement() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All Roles');
  const [statusFilter, setStatusFilter] = useState('All Statuses');

  const users = [
    { username: 'Oluwatobi', role: 'Student', status: 'Active', registered: '2023-01-15' },
    { username: 'ProFXMentor', role: 'Mentor', status: 'Active', registered: '2022-03-10' },
    { username: 'ChidinmaO', role: 'Student', status: 'Active', registered: '2024-02-20' },
    { username: 'EmekaF', role: 'Student', status: 'Active', registered: '2023-08-01' },
    { username: 'FatimaA', role: 'Student', status: 'Active', registered: '2024-04-10' },
    { username: 'KunleTrades', role: 'Mentor', status: 'Active', registered: '2022-07-20' },
    { username: 'AmakaFX', role: 'Mentor', status: 'Active', registered: '2023-05-05' }
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
                  item.path === '/admin/users' 
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
          <h1 className="text-3xl font-bold text-white mb-8">User Management</h1>
          
          {/* Filters */}
          <Card className="bg-gray-800 border-gray-700 mb-6">
            <CardContent className="p-4">
              <div className="flex space-x-4">
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white"
                />
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="w-40 bg-gray-700 border-gray-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All Roles">All Roles</SelectItem>
                    <SelectItem value="Student">Student</SelectItem>
                    <SelectItem value="Mentor">Mentor</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40 bg-gray-700 border-gray-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All Statuses">All Statuses</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Users Table */}
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Username</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Registered</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {users.map((user) => (
                      <tr key={user.username} className="hover:bg-gray-700">
                        <td className="px-6 py-4 whitespace-nowrap text-gray-300">{user.username}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            user.role === 'Mentor' 
                              ? 'bg-purple-100 text-purple-800' 
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-300">{user.registered}</td>
                        <td className="px-6 py-4 whitespace-nowrap space-x-2">
                          <Button variant="outline" size="sm" className="text-blue-400 border-blue-400">
                            Contact
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-400 border-red-400">
                            Block
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="p-4 border-t border-gray-700">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  View All Users
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
