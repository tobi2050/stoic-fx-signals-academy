
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Search, Filter } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { SignalCard } from '@/components/signals/SignalCard';
import { CreateSignalModal } from '@/components/signals/CreateSignalModal';
import { supabase } from '@/integrations/supabase/client';
import type { Signal } from '@/types/app';

export default function Signals() {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const { data: signals = [], isLoading, refetch } = useQuery({
    queryKey: ['signals', searchTerm, statusFilter, typeFilter],
    queryFn: async () => {
      let query = supabase
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
        .order('created_at', { ascending: false });

      if (searchTerm) {
        query = query.ilike('pair', `%${searchTerm}%`);
      }

      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter as 'inactive' | 'active' | 'closed');
      }

      if (typeFilter !== 'all') {
        query = query.eq('signal_type', typeFilter as 'BUY' | 'SELL');
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as Signal[];
    }
  });

  const filteredSignals = signals.filter(signal => {
    if (searchTerm && !signal.pair.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <MainLayout title="Trading Signals">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Trading Signals</h1>
            <p className="text-gray-600">Follow professional traders and share your own signals</p>
          </div>
          <Button onClick={() => setCreateModalOpen(true)} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Share Signal
          </Button>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Filter Signals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search currency pairs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="BUY">BUY Signals</SelectItem>
                  <SelectItem value="SELL">SELL Signals</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
                setTypeFilter('all');
              }}>
                <Filter className="h-4 w-4 mr-2" />
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Signals Feed */}
        <div className="space-y-4">
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-600 mt-2">Loading signals...</p>
            </div>
          ) : filteredSignals.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-gray-600">No signals found matching your criteria.</p>
                <Button 
                  onClick={() => setCreateModalOpen(true)} 
                  className="mt-4 bg-blue-600 hover:bg-blue-700"
                >
                  Share the first signal
                </Button>
              </CardContent>
            </Card>
          ) : (
            filteredSignals.map((signal) => (
              <SignalCard 
                key={signal.id} 
                signal={signal} 
                onSignalUpdate={refetch}
              />
            ))
          )}
        </div>
      </div>

      <CreateSignalModal
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
        onSignalCreated={refetch}
      />
    </MainLayout>
  );
}
