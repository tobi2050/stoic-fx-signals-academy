
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, Check, X } from 'lucide-react';

interface NotificationPopupProps {
  onClose: () => void;
}

export function NotificationPopup({ onClose }: NotificationPopupProps) {
  const notifications = [
    {
      id: 1,
      title: 'New Signal Alert',
      message: 'ProFXMentor posted a new EUR/USD signal',
      time: '2 minutes ago',
      type: 'signal',
      unread: true
    },
    {
      id: 2,
      title: 'Subscription Renewal',
      message: 'Your premium subscription will expire in 3 days',
      time: '1 hour ago',
      type: 'subscription',
      unread: true
    },
    {
      id: 3,
      title: 'Community Post',
      message: 'ChidinmaO mentioned you in a comment',
      time: '3 hours ago',
      type: 'community',
      unread: false
    }
  ];

  return (
    <div className="absolute right-0 top-12 w-80 z-50">
      <Card className="bg-white border border-gray-200 shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <CardTitle className="text-lg font-semibold">Notifications</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="max-h-96 overflow-y-auto">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                  notification.unread ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-full ${
                    notification.type === 'signal' ? 'bg-green-100' :
                    notification.type === 'subscription' ? 'bg-yellow-100' :
                    'bg-blue-100'
                  }`}>
                    <Bell className={`h-4 w-4 ${
                      notification.type === 'signal' ? 'text-green-600' :
                      notification.type === 'subscription' ? 'text-yellow-600' :
                      'text-blue-600'
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <h4 className="text-sm font-medium text-gray-900">{notification.title}</h4>
                      {notification.unread && (
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-gray-100">
            <Button variant="outline" className="w-full text-sm">
              View All Notifications
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
