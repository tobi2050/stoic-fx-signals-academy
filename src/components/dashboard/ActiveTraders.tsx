
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users, Award } from 'lucide-react';

interface ActiveTradersProps {
  mentors: any[];
  students: any[];
}

export function ActiveTraders({ mentors, students }: ActiveTradersProps) {
  return (
    <div className="space-y-6">
      {/* Active Mentors */}
      <Card className="bg-white border-gray-200">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2 text-gray-900">
            <Award className="h-5 w-5 text-blue-600" />
            <span>Active Mentors</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {mentors.slice(0, 5).map((mentor) => (
            <div key={mentor.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50">
              <Avatar className="h-8 w-8">
                <AvatarImage src={mentor.avatar_url} />
                <AvatarFallback className="bg-blue-100 text-blue-600 text-xs">
                  {mentor.username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-1">
                  <span className="text-sm font-medium text-gray-900 truncate">
                    {mentor.username}
                  </span>
                  <Badge variant="default" className="text-xs">
                    {mentor.account_type}
                  </Badge>
                </div>
                <div className="text-xs text-gray-500">
                  {mentor.success_rate?.toFixed(1)}% • {mentor.total_pips} pips
                </div>
              </div>
            </div>
          ))}
          {mentors.length === 0 && (
            <p className="text-sm text-gray-500 text-center py-4">No active mentors</p>
          )}
        </CardContent>
      </Card>

      {/* Active Students */}
      <Card className="bg-white border-gray-200">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2 text-gray-900">
            <Users className="h-5 w-5 text-green-600" />
            <span>Active Students</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {students.slice(0, 5).map((student) => (
            <div key={student.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50">
              <Avatar className="h-8 w-8">
                <AvatarImage src={student.avatar_url} />
                <AvatarFallback className="bg-green-100 text-green-600 text-xs">
                  {student.username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-1">
                  <span className="text-sm font-medium text-gray-900 truncate">
                    {student.username}
                  </span>
                  <Badge variant="secondary" className="text-xs">
                    {student.account_type}
                  </Badge>
                </div>
                <div className="text-xs text-gray-500">
                  {student.trading_experience_years} years exp
                </div>
              </div>
            </div>
          ))}
          {students.length === 0 && (
            <p className="text-sm text-gray-500 text-center py-4">No active students</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
