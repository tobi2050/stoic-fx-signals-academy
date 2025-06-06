
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
      const { data, error } = await supabase
        .from('app_settings')
        .select('*')
        .limit(1)
        .single();

      if (error) {
        console.error('Error fetching app settings:', error);
        return;
      }

      if (data) {
        setSettings({
          paid_signals_enabled: data.paid_signals_enabled || false,
          mentor_dm_fee: data.mentor_dm_fee || 5,
          minimum_win_rate_for_paid_signals: data.minimum_win_rate_for_paid_signals || 35
        });
      }
    } catch (error) {
      console.error('Error fetching app settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateSetting = async (key: keyof AppSettings, value: any) => {
    try {
      // Get the current settings ID
      const { data: currentData } = await supabase
        .from('app_settings')
        .select('id')
        .limit(1)
        .single();

      if (currentData) {
        const { error } = await supabase
          .from('app_settings')
          .update({ [key]: value, updated_at: new Date().toISOString() })
          .eq('id', currentData.id);

        if (error) {
          console.error('Error updating setting:', error);
          return;
        }
      }

      setSettings(prev => ({ ...prev, [key]: value }));
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
