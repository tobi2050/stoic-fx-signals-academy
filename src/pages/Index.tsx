
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Users, BookOpen, Trophy, Star, Clock, DollarSign, Target, BarChart3, Plus } from "lucide-react";
import { Navbar } from "@/components/navigation/Navbar";
import { SignalCard } from "@/components/signals/SignalCard";
import { CreateSignalModal } from "@/components/signals/CreateSignalModal";
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
        .limit(10);

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
        .limit(10);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              STOIC FX
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto">
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

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            <Card className="bg-slate-800/50 border-slate-700 text-center">
              <CardContent className="p-4">
                <div className="flex items-center justify-center mb-2">
                  <Users className="h-6 w-6 text-blue-400" />
                </div>
                <div className="text-2xl font-bold text-white">{topTraders.length}+</div>
                <div className="text-sm text-slate-400">Active Traders</div>
              </CardContent>
            </Card>
            <Card className="bg-slate-800/50 border-slate-700 text-center">
              <CardContent className="p-4">
                <div className="flex items-center justify-center mb-2">
                  <Target className="h-6 w-6 text-green-400" />
                </div>
                <div className="text-2xl font-bold text-white">
                  {topTraders.length > 0 ? Math.round(topTraders.reduce((acc, trader) => acc + trader.success_rate, 0) / topTraders.length) : 0}%
                </div>
                <div className="text-sm text-slate-400">Avg Success Rate</div>
              </CardContent>
            </Card>
            <Card className="bg-slate-800/50 border-slate-700 text-center">
              <CardContent className="p-4">
                <div className="flex items-center justify-center mb-2">
                  <BarChart3 className="h-6 w-6 text-purple-400" />
                </div>
                <div className="text-2xl font-bold text-white">{signals.length}+</div>
                <div className="text-sm text-slate-400">Signals Posted</div>
              </CardContent>
            </Card>
            <Card className="bg-slate-800/50 border-slate-700 text-center">
              <CardContent className="p-4">
                <div className="flex items-center justify-center mb-2">
                  <DollarSign className="h-6 w-6 text-yellow-400" />
                </div>
                <div className="text-2xl font-bold text-white">
                  {topTraders.length > 0 ? topTraders.reduce((acc, trader) => acc + trader.total_pips, 0) : 0}
                </div>
                <div className="text-sm text-slate-400">Total Pips</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-20">
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-slate-800 mb-8">
            <TabsTrigger value="signals" className="data-[state=active]:bg-blue-600">Live Signals</TabsTrigger>
            <TabsTrigger value="inactive" className="data-[state=active]:bg-yellow-600">Inactive Signals</TabsTrigger>
            <TabsTrigger value="leaderboard" className="data-[state=active]:bg-purple-600">Leaderboard</TabsTrigger>
            <TabsTrigger value="education" className="data-[state=active]:bg-green-600">Education</TabsTrigger>
          </TabsList>

          <TabsContent value="signals" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold text-white">Active Trading Signals</h2>
              {canCreateSignal && (
                <Button 
                  className="bg-green-600 hover:bg-green-700"
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
                <Card className="bg-slate-800/50 border-slate-700 text-center py-12">
                  <CardContent>
                    <TrendingUp className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-400">No active signals at the moment</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="inactive" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold text-white">Inactive Signals</h2>
              {canCreateSignal && (
                <Button 
                  className="bg-green-600 hover:bg-green-700"
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
                <Card className="bg-slate-800/50 border-slate-700 text-center py-12">
                  <CardContent>
                    <Clock className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-400">No inactive signals waiting to trigger</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="leaderboard" className="space-y-6">
            <h2 className="text-3xl font-bold text-white">Top Traders Leaderboard</h2>
            <div className="grid gap-4">
              {topTraders.map((trader, index) => (
                <Card key={trader.id} className="bg-slate-800/50 border-slate-700">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 font-bold">
                          #{index + 1}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-white font-semibold text-lg">{trader.username}</span>
                            <Badge variant={trader.role === 'mentor' ? 'default' : 'secondary'}>
                              {trader.role}
                            </Badge>
                            <Badge variant={trader.account_type === 'real' ? 'default' : 'outline'}>
                              {trader.account_type}
                            </Badge>
                          </div>
                          <div className="text-slate-400">Success Rate: {trader.success_rate.toFixed(1)}%</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-400">+{trader.total_pips}</div>
                        <div className="text-slate-400">{trader.total_signals} signals</div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <Progress value={trader.success_rate} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="education" className="space-y-6">
            <h2 className="text-3xl font-bold text-white">Educational Resources</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300">
                <CardHeader>
                  <BookOpen className="h-8 w-8 text-blue-400 mb-2" />
                  <CardTitle className="text-white">Forex Fundamentals</CardTitle>
                  <CardDescription>Master the basics of forex trading</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Start Learning</Button>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300">
                <CardHeader>
                  <BarChart3 className="h-8 w-8 text-green-400 mb-2" />
                  <CardTitle className="text-white">Technical Analysis</CardTitle>
                  <CardDescription>Learn chart patterns and indicators</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Explore</Button>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300">
                <CardHeader>
                  <Trophy className="h-8 w-8 text-purple-400 mb-2" />
                  <CardTitle className="text-white">Risk Management</CardTitle>
                  <CardDescription>Protect your capital effectively</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Learn More</Button>
                </CardContent>
              </Card>
            </div>
            
            <Card className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-white text-xl">Premium Education</CardTitle>
                <CardDescription>Unlock advanced trading strategies and mentorship</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-white text-2xl font-bold">$29/month</div>
                    <div className="text-slate-300">Cancel anytime</div>
                  </div>
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                    Start Free Trial
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
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
