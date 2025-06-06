
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAppSettings } from '@/hooks/useAppSettings';
import { useToast } from '@/hooks/use-toast';

export default function FeatureManagement() {
  const { settings, updateSetting } = useAppSettings();
  const { toast } = useToast();

  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Feature settings have been updated successfully."
    });
  };

  return (
    <MainLayout title="Feature Management">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Feature Management</h1>
          <p className="text-gray-600">Control app-wide features and settings</p>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Paid Signals</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="paid-signals">Enable Paid Signals</Label>
                  <p className="text-sm text-gray-600">
                    Allow users with high win rates to create paid signals
                  </p>
                </div>
                <Switch
                  id="paid-signals"
                  checked={settings.paid_signals_enabled}
                  onCheckedChange={(checked) => updateSetting('paid_signals_enabled', checked)}
                />
              </div>
              
              <div>
                <Label htmlFor="min-win-rate">Minimum Win Rate (%)</Label>
                <Input
                  id="min-win-rate"
                  type="number"
                  value={settings.minimum_win_rate_for_paid_signals}
                  onChange={(e) => updateSetting('minimum_win_rate_for_paid_signals', parseInt(e.target.value))}
                  className="w-32"
                />
                <p className="text-sm text-gray-600 mt-1">
                  Users need this win rate to create paid signals
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Mentor Messaging</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <Label htmlFor="mentor-dm-fee">Direct Message Fee (USD)</Label>
                <Input
                  id="mentor-dm-fee"
                  type="number"
                  step="0.01"
                  value={settings.mentor_dm_fee}
                  onChange={(e) => updateSetting('mentor_dm_fee', parseFloat(e.target.value))}
                  className="w-32"
                />
                <p className="text-sm text-gray-600 mt-1">
                  Fee for students to send direct messages to mentors
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Additional Features</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">More feature toggles will be added here as the platform grows.</p>
            </CardContent>
          </Card>
        </div>

        <Button onClick={handleSaveSettings} className="bg-blue-600 hover:bg-blue-700">
          Save Settings
        </Button>
      </div>
    </MainLayout>
  );
}
