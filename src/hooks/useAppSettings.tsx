
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { AppSettings } from '@/types/app';

export function useAppSettings() {
  const [settings, setSettings] = useState<AppSettings>({
    paid_signals_enabled: false,
    mentor_dm_fee: 5,
    minimum_win_rate_for_paid_signals: 35
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      // For now, we'll use local state. In a real app, this would fetch from a settings table
      setSettings({
        paid_signals_enabled: true, // Default enabled for demo
        mentor_dm_fee: 5,
        minimum_win_rate_for_paid_signals: 35
      });
    } catch (error) {
      console.error('Error fetching app settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateSetting = async (key: keyof AppSettings, value: any) => {
    try {
      setSettings(prev => ({ ...prev, [key]: value }));
      // In a real app, this would update the database
      console.log(`Updated ${key} to ${value}`);
    } catch (error) {
      console.error('Error updating setting:', error);
    }
  };

  return {
    settings,
    loading,
    updateSetting
  };
}
