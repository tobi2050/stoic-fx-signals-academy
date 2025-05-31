
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Users, BookOpen, Trophy, Star, Clock, DollarSign, Target, BarChart3 } from "lucide-react";

const Index = () => {
  const [selectedTab, setSelectedTab] = useState("signals");

  // Mock data for signals
  const signals = [
    {
      id: 1,
      pair: "EUR/USD",
      type: "BUY",
      entry: "1.0895",
      tp1: "1.0925",
      tp2: "1.0955",
      sl: "1.0865",
      riskReward: "1:2",
      provider: "Alex Thompson",
      avatar: "/placeholder.svg",
      rank: "Mentor",
      successRate: 87,
      time: "2 hours ago",
      status: "Active",
      pips: "+30"
    },
    {
      id: 2,
      pair: "GBP/JPY",
      type: "SELL",
      entry: "189.45",
      tp1: "188.95",
      tp2: "188.45",
      sl: "189.95",
      riskReward: "1:1.5",
      provider: "Sarah Chen",
      avatar: "/placeholder.svg",
      rank: "Top Student",
      successRate: 78,
      time: "4 hours ago",
      status: "Closed",
      pips: "+50"
    },
    {
      id: 3,
      pair: "USD/JPY",
      type: "BUY",
      entry: "148.25",
      tp1: "148.75",
      tp2: "149.25",
      sl: "147.75",
      riskReward: "1:2",
      provider: "Marcus Johnson",
      avatar: "/placeholder.svg",
      rank: "Student",
      successRate: 65,
      time: "6 hours ago",
      status: "Active",
      pips: "+15"
    }
  ];

  // Mock data for top traders
  const topTraders = [
    { name: "Alex Thompson", rank: 1, successRate: 87, totalSignals: 124, pips: 2150, type: "Real", level: "Mentor" },
    { name: "Sarah Chen", rank: 2, successRate: 78, totalSignals: 98, pips: 1875, type: "Real", level: "Top Student" },
    { name: "Marcus Johnson", rank: 3, successRate: 65, totalSignals: 156, pips: 1650, type: "Demo", level: "Student" },
    { name: "Emma Wilson", rank: 4, successRate: 72, totalSignals: 89, pips: 1420, type: "Real", level: "Student" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              STOIC FX
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto">
              Master Forex Trading with Professional Signals, Community Learning, and Expert Mentorship
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3">
                Start Learning Today
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-slate-900 px-8 py-3">
                View Live Signals
              </Button>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            <Card className="bg-slate-800/50 border-slate-700 text-center">
              <CardContent className="p-4">
                <div className="flex items-center justify-center mb-2">
                  <Users className="h-6 w-6 text-blue-400" />
                </div>
                <div className="text-2xl font-bold text-white">5,000+</div>
                <div className="text-sm text-slate-400">Active Traders</div>
              </CardContent>
            </Card>
            <Card className="bg-slate-800/50 border-slate-700 text-center">
              <CardContent className="p-4">
                <div className="flex items-center justify-center mb-2">
                  <Target className="h-6 w-6 text-green-400" />
                </div>
                <div className="text-2xl font-bold text-white">87%</div>
                <div className="text-sm text-slate-400">Success Rate</div>
              </CardContent>
            </Card>
            <Card className="bg-slate-800/50 border-slate-700 text-center">
              <CardContent className="p-4">
                <div className="flex items-center justify-center mb-2">
                  <BarChart3 className="h-6 w-6 text-purple-400" />
                </div>
                <div className="text-2xl font-bold text-white">15,000+</div>
                <div className="text-sm text-slate-400">Pips Generated</div>
              </CardContent>
            </Card>
            <Card className="bg-slate-800/50 border-slate-700 text-center">
              <CardContent className="p-4">
                <div className="flex items-center justify-center mb-2">
                  <DollarSign className="h-6 w-6 text-yellow-400" />
                </div>
                <div className="text-2xl font-bold text-white">$50K+</div>
                <div className="text-sm text-slate-400">Giveaways</div>
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
            <TabsTrigger value="leaderboard" className="data-[state=active]:bg-purple-600">Leaderboard</TabsTrigger>
            <TabsTrigger value="education" className="data-[state=active]:bg-green-600">Education</TabsTrigger>
            <TabsTrigger value="community" className="data-[state=active]:bg-orange-600">Community</TabsTrigger>
          </TabsList>

          <TabsContent value="signals" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold text-white">Live Trading Signals</h2>
              <Button className="bg-green-600 hover:bg-green-700">
                <TrendingUp className="h-4 w-4 mr-2" />
                Post Signal
              </Button>
            </div>
            
            <div className="grid gap-6">
              {signals.map((signal) => (
                <Card key={signal.id} className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage src={signal.avatar} />
                          <AvatarFallback>{signal.provider.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-white font-semibold">{signal.provider}</span>
                            <Badge variant={signal.rank === "Mentor" ? "default" : "secondary"}>
                              {signal.rank}
                            </Badge>
                          </div>
                          <div className="text-sm text-slate-400">{signal.time}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={signal.type === "BUY" ? "default" : "destructive"} className="text-lg px-3 py-1">
                          {signal.type} {signal.pair}
                        </Badge>
                        <div className="text-sm text-slate-400 mt-1">R:R {signal.riskReward}</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <div className="text-sm text-slate-400">Entry</div>
                        <div className="text-white font-mono">{signal.entry}</div>
                      </div>
                      <div>
                        <div className="text-sm text-slate-400">TP1/TP2</div>
                        <div className="text-green-400 font-mono">{signal.tp1}/{signal.tp2}</div>
                      </div>
                      <div>
                        <div className="text-sm text-slate-400">Stop Loss</div>
                        <div className="text-red-400 font-mono">{signal.sl}</div>
                      </div>
                      <div>
                        <div className="text-sm text-slate-400">Current P&L</div>
                        <div className={`font-semibold ${signal.pips.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                          {signal.pips} pips
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-400" />
                          <span className="text-white">{signal.successRate}%</span>
                        </div>
                        <Badge variant={signal.status === "Active" ? "default" : "secondary"}>
                          {signal.status}
                        </Badge>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">Share</Button>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">Rate Signal</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="leaderboard" className="space-y-6">
            <h2 className="text-3xl font-bold text-white">Top Traders Leaderboard</h2>
            <div className="grid gap-4">
              {topTraders.map((trader) => (
                <Card key={trader.rank} className="bg-slate-800/50 border-slate-700">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 font-bold">
                          #{trader.rank}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-white font-semibold text-lg">{trader.name}</span>
                            <Badge variant={trader.level === "Mentor" ? "default" : "secondary"}>
                              {trader.level}
                            </Badge>
                            <Badge variant={trader.type === "Real" ? "default" : "outline"}>
                              {trader.type} Account
                            </Badge>
                          </div>
                          <div className="text-slate-400">Success Rate: {trader.successRate}%</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-400">+{trader.pips}</div>
                        <div className="text-slate-400">{trader.totalSignals} signals</div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <Progress value={trader.successRate} className="h-2" />
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

          <TabsContent value="community" className="space-y-6">
            <h2 className="text-3xl font-bold text-white">Trading Community</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Weekly Giveaway</CardTitle>
                  <CardDescription>Win cash prizes and mentorship sessions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400 mb-2">$500</div>
                    <div className="text-slate-400 mb-4">This week's prize</div>
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      Enter Giveaway
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Referral Program</CardTitle>
                  <CardDescription>Earn rewards for bringing friends</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-400 mb-2">$50</div>
                    <div className="text-slate-400 mb-4">Per successful referral</div>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      Share Link
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Live Webinars</CardTitle>
                <CardDescription>Join our expert mentors for live trading sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                    <div>
                      <div className="text-white font-semibold">Market Analysis with Alex Thompson</div>
                      <div className="text-slate-400 flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        Tomorrow, 3:00 PM EST
                      </div>
                    </div>
                    <Button size="sm">Join</Button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                    <div>
                      <div className="text-white font-semibold">Risk Management Masterclass</div>
                      <div className="text-slate-400 flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        Friday, 7:00 PM EST
                      </div>
                    </div>
                    <Button size="sm">Register</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
