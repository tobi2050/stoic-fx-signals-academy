
import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, Plus } from 'lucide-react';

export default function ShareTrade() {
  const [currencyPair, setCurrencyPair] = useState('');
  const [tradeType, setTradeType] = useState('buy');
  const [entryPrice, setEntryPrice] = useState('');
  const [stopLoss, setStopLoss] = useState('');
  const [takeProfit, setTakeProfit] = useState('');
  const [riskReward, setRiskReward] = useState('');
  const [riskLevel, setRiskLevel] = useState('medium');
  const [takeProfits, setTakeProfits] = useState(['']);

  const addTakeProfit = () => {
    setTakeProfits([...takeProfits, '']);
  };

  const updateTakeProfit = (index: number, value: string) => {
    const newTPs = [...takeProfits];
    newTPs[index] = value;
    setTakeProfits(newTPs);
  };

  const handlePublishTrade = () => {
    console.log('Publishing trade idea:', {
      currencyPair,
      tradeType,
      entryPrice,
      stopLoss,
      takeProfit,
      takeProfits,
      riskReward,
      riskLevel
    });
  };

  return (
    <MainLayout title="Share Trade">
      <div className="max-w-2xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>New Trade Idea</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Currency Pair */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Currency Pair
              </label>
              <Input
                value={currencyPair}
                onChange={(e) => setCurrencyPair(e.target.value)}
                placeholder="e.g., EUR/USD, XAU/USD"
              />
            </div>

            {/* Trade Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Trade Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant={tradeType === 'buy' ? 'default' : 'outline'}
                  className={tradeType === 'buy' ? 'bg-green-600 hover:bg-green-700' : ''}
                  onClick={() => setTradeType('buy')}
                >
                  Buy
                </Button>
                <Button
                  variant={tradeType === 'sell' ? 'default' : 'outline'}
                  className={tradeType === 'sell' ? 'bg-red-600 hover:bg-red-700' : ''}
                  onClick={() => setTradeType('sell')}
                >
                  Sell
                </Button>
              </div>
            </div>

            {/* Entry Price and Stop Loss */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Entry Price
                </label>
                <Input
                  value={entryPrice}
                  onChange={(e) => setEntryPrice(e.target.value)}
                  placeholder="e.g., 1.0850"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Stop Loss (SL)
                </label>
                <Input
                  value={stopLoss}
                  onChange={(e) => setStopLoss(e.target.value)}
                  placeholder="e.g., 1.0820"
                />
              </div>
            </div>

            {/* Take Profit */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Take Profit(s) (TP)
              </label>
              {takeProfits.map((tp, index) => (
                <Input
                  key={index}
                  value={tp}
                  onChange={(e) => updateTakeProfit(index, e.target.value)}
                  placeholder={`TP ${index + 1} (e.g., 1.0900)`}
                  className="mb-2"
                />
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={addTakeProfit}
                className="text-purple-600"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Another TP
              </Button>
            </div>

            {/* Risk/Reward and Risk Level */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Risk/Reward (R:R)
                </label>
                <Input
                  value={riskReward}
                  onChange={(e) => setRiskReward(e.target.value)}
                  placeholder="e.g., 1:2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Risk Level
                </label>
                <Select value={riskLevel} onValueChange={setRiskLevel}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Chart Screenshot */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Before Chart Screenshot
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">Click to upload image</p>
                <p className="text-xs text-gray-500">(JPG, PNG, max 5MB)</p>
              </div>
            </div>

            {/* Publish Button */}
            <Button
              onClick={handlePublishTrade}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white"
              disabled={!currencyPair || !entryPrice || !stopLoss}
            >
              Publish Trade Idea
            </Button>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
