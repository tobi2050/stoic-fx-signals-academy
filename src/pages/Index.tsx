
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Users, BookOpen, Trophy, Star, Clock, DollarSign, Target, BarChart3, Plus, Award, Activity } from "lucide-react";
import { Navbar } from "@/components/navigation/Navbar";
import { SignalCard } from "@/components/signals/SignalCard";
import { CreateSignalModal } from "@/components/signals/CreateSignalModal";
import { ActiveTraders } from "@/components/dashboard/ActiveTraders";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [selectedTab, setSelectedTab] = useState("signals");
  const [createSignalOpen, setCreateSignalOpen] = useState(false);
  const [signals, setSignals] = useState<any[]>([]);
  const [topTraders, setTopTraders] = useState<any[]>([]);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    fetchSignals();
    fetchTopTraders();
    if (user) {
      fetchUserProfile();
    }
  }, [user]);

  const fetchSignals = async () => {
    try {
      const { data, error } = await supabase
        .from('signals')
        .select(`
          *,
          profiles (
            username,
            role,
            success_rate,
            avatar_url,
            account_type
          )
        `)
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;
      setSignals(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch signals",
        variant: "destructive"
      });
    }
  };

  const fetchTopTraders = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('success_rate', { ascending: false })
        .limit(20);

      if (error) throw error;
      setTopTraders(data || []);
    } catch (error: any) {
      toast({
        title: "Error", 
        description: "Failed to fetch top traders",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchUserProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (error) throw error;
      setUserProfile(data);
    } catch (error: any) {
      console.log('Profile not found, user may need to complete signup');
    }
  };

  const handleSignalCreated = () => {
    fetchSignals();
    fetchUserProfile();
  };

  const canCreateSignal = userProfile?.role === 'mentor';

  const mentors = topTraders.filter(trader => trader.role === 'mentor');
  const students = topTraders.filter(trader => trader.role === 'student');

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              STOIC FX
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Professional Forex Signals • Expert Mentorship • Trading Community
            </p>
            {user && userProfile && (
              <div className="flex items-center justify-center space-x-4 mb-8">
                <Badge variant={userProfile.role === 'mentor' ? 'default' : 'secondary'} className="text-lg px-4 py-2">
                  {userProfile.role === 'mentor' ? '🎓 Mentor' : '📚 Student'}
                </Badge>
                <Badge variant={userProfile.account_type === 'real' ? 'default' : 'outline'} className="text-lg px-4 py-2">
                  {userProfile.account_type === 'real' ? '💰 Real Account' : '🎮 Demo Account'}
                </Badge>
              </div>
            )}
          </div>

          <StatsCards topTraders={topTraders} signals={signals} />
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Active Traders */}
          <div className="lg:col-span-1">
            <ActiveTraders mentors={mentors} students={students} />
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-white border border-gray-200 mb-8">
                <TabsTrigger value="signals" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">Live Signals</TabsTrigger>
                <TabsTrigger value="inactive" className="data-[state=active]:bg-yellow-50 data-[state=active]:text-yellow-700">Inactive Signals</TabsTrigger>
                <TabsTrigger value="leaderboard" className="data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700">Leaderboard</TabsTrigger>
                <TabsTrigger value="education" className="data-[state=active]:bg-green-50 data-[state=active]:text-green-700">Education</TabsTrigger>
              </TabsList>

              <TabsContent value="signals" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-3xl font-bold text-gray-900">Active Trading Signals</h2>
                  {canCreateSignal && (
                    <Button 
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={() => setCreateSignalOpen(true)}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Post Signal
                    </Button>
                  )}
                </div>
                
                <div className="grid gap-6">
                  {signals.filter(signal => signal.status === 'active' || signal.status === 'closed').map((signal) => (
                    <SignalCard key={signal.id} signal={signal} />
                  ))}
                  {signals.filter(signal => signal.status === 'active' || signal.status === 'closed').length === 0 && (
                    <Card className="bg-white border-gray-200 text-center py-12">
                      <CardContent>
                        <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500">No active signals at the moment</p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="inactive" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-3xl font-bold text-gray-900">Inactive Signals</h2>
                  {canCreateSignal && (
                    <Button 
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={() => setCreateSignalOpen(true)}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Post Signal
                    </Button>
                  )}
                </div>
                
                <div className="grid gap-6">
                  {signals.filter(signal => signal.status === 'inactive').map((signal) => (
                    <SignalCard key={signal.id} signal={signal} />
                  ))}
                  {signals.filter(signal => signal.status === 'inactive').length === 0 && (
                    <Card className="bg-white border-gray-200 text-center py-12">
                      <CardContent>
                        <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500">No inactive signals waiting to trigger</p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="leaderboard" className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-900">Top Traders Leaderboard</h2>
                <div className="grid gap-4">
                  {topTraders.map((trader, index) => (
                    <Card key={trader.id} className="bg-white border-gray-200 hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold">
                              #{index + 1}
                            </div>
                            <div>
                              <div className="flex items-center space-x-2">
                                <span className="text-gray-900 font-semibold text-lg">{trader.username}</span>
                                <Badge variant={trader.role === 'mentor' ? 'default' : 'secondary'}>
                                  {trader.role}
                                </Badge>
                                <Badge variant={trader.account_type === 'real' ? 'default' : 'outline'}>
                                  {trader.account_type}
                                </Badge>
                              </div>
                              <div className="text-gray-500">Success Rate: {trader.success_rate?.toFixed(1)}%</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-green-600">+{trader.total_pips}</div>
                            <div className="text-gray-500">{trader.total_signals} signals</div>
                          </div>
                        </div>
                        <div className="mt-4">
                          <Progress value={trader.success_rate || 0} className="h-2" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="education" className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-900">Educational Resources</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card className="bg-white border-gray-200 hover:shadow-md transition-all duration-300">
                    <CardHeader>
                      <BookOpen className="h-8 w-8 text-blue-600 mb-2" />
                      <CardTitle className="text-gray-900">Forex Fundamentals</CardTitle>
                      <CardDescription>Master the basics of forex trading</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">Start Learning</Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-white border-gray-200 hover:shadow-md transition-all duration-300">
                    <CardHeader>
                      <BarChart3 className="h-8 w-8 text-green-600 mb-2" />
                      <CardTitle className="text-gray-900">Technical Analysis</CardTitle>
                      <CardDescription>Learn chart patterns and indicators</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full bg-green-600 hover:bg-green-700">Explore</Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-white border-gray-200 hover:shadow-md transition-all duration-300">
                    <CardHeader>
                      <Trophy className="h-8 w-8 text-purple-600 mb-2" />
                      <CardTitle className="text-gray-900">Risk Management</CardTitle>
                      <CardDescription>Protect your capital effectively</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full bg-purple-600 hover:bg-purple-700">Learn More</Button>
                    </CardContent>
                  </Card>
                </div>
                
                <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
                  <CardHeader>
                    <CardTitle className="text-gray-900 text-xl">Premium Education</CardTitle>
                    <CardDescription>Unlock advanced trading strategies and mentorship</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-gray-900 text-2xl font-bold">$29/month</div>
                        <div className="text-gray-600">Cancel anytime</div>
                      </div>
                      <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
                        Start Free Trial
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      <CreateSignalModal
        open={createSignalOpen}
        onOpenChange={setCreateSignalOpen}
        onSignalCreated={handleSignalCreated}
      />
    </div>
  );
};

export default Index;
