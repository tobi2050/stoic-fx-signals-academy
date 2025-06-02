
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface WatchlistModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function WatchlistModal({ open, onOpenChange }: WatchlistModalProps) {
  const watchlistItems = [
    { pair: 'EUR/USD', price: '1.0850', change: '+0.0023', percentage: '+0.21%', trend: 'up' },
    { pair: 'GBP/USD', price: '1.2645', change: '-0.0015', percentage: '-0.12%', trend: 'down' },
    { pair: 'USD/JPY', price: '149.85', change: '+0.45', percentage: '+0.30%', trend: 'up' },
    { pair: 'XAU/USD', price: '2025.50', change: '-5.25', percentage: '-0.26%', trend: 'down' },
    { pair: 'USD/CAD', price: '1.3620', change: '+0.0008', percentage: '+0.06%', trend: 'up' }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>My Watchlist</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          {watchlistItems.map((item) => (
            <div key={item.pair} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium text-gray-900">{item.pair}</div>
                <div className="text-lg font-bold">{item.price}</div>
              </div>
              <div className="text-right">
                <div className={`flex items-center space-x-1 ${
                  item.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {item.trend === 'up' ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )}
                  <span className="font-medium">{item.percentage}</span>
                </div>
                <div className={`text-sm ${
                  item.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {item.change}
                </div>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
