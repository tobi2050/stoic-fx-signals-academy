
import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Wallet as WalletIcon, ArrowDownToLine, ArrowUpFromLine } from 'lucide-react';

export default function Wallet() {
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');

  return (
    <MainLayout title="Wallet">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Wallet Balance Card */}
        <Card>
          <CardContent className="p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-purple-100 p-4 rounded-full">
                <WalletIcon className="h-8 w-8 text-purple-600" />
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-2">My Wallet</h2>
            
            <div className="mb-6">
              <div className="text-gray-600 mb-2">Current Balance</div>
              <div className="text-4xl font-bold text-purple-600">₦1,000.00</div>
            </div>
          </CardContent>
        </Card>

        {/* Deposit Funds */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-green-100 p-2 rounded-lg">
                <ArrowDownToLine className="h-5 w-5 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold">Deposit Funds</h3>
            </div>
            
            <div className="space-y-4">
              <Input
                placeholder="Amount to deposit"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                className="h-12"
              />
              <Button className="w-full h-12 bg-green-600 hover:bg-green-700 text-white">
                <ArrowDownToLine className="h-4 w-4 mr-2" />
                Deposit
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Withdraw Funds */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-red-100 p-2 rounded-lg">
                <ArrowUpFromLine className="h-5 w-5 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold">Withdraw Funds</h3>
            </div>
            
            <div className="space-y-4">
              <Input
                placeholder="Amount to withdraw"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                className="h-12"
              />
              <Button className="w-full h-12 bg-red-600 hover:bg-red-700 text-white">
                <ArrowUpFromLine className="h-4 w-4 mr-2" />
                Withdraw
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
