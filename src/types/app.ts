
// App-specific types for Nexus features
export interface AppSettings {
  paid_signals_enabled: boolean;
  mentor_dm_fee: number;
  minimum_win_rate_for_paid_signals: number;
}

export interface UserProfile {
  id: string;
  username: string;
  first_name?: string;
  last_name?: string;
  role: 'student' | 'mentor'; // Removed 'admin' to match database schema
  account_type: 'demo' | 'real';
  trading_experience_years?: number;
  avatar_url?: string;
  bio?: string;
  success_rate?: number;
  total_signals?: number;
  successful_signals?: number;
  total_pips?: number;
  is_premium?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Signal {
  id: string;
  pair: string;
  signal_type: 'BUY' | 'SELL';
  entry_price: number;
  tp1?: number;
  tp2?: number;
  stop_loss: number;
  risk_reward_ratio?: string;
  status: 'inactive' | 'active' | 'closed';
  pips_result?: number;
  description?: string;
  risk_level?: 'low' | 'medium' | 'high';
  image_url?: string;
  is_paid?: boolean;
  price?: number;
  created_at: string;
  updated_at?: string;
  closed_at?: string;
  provider_id: string;
  profiles: UserProfile;
}

export interface SignalPurchase {
  id: string;
  signal_id: string;
  user_id: string;
  amount: number;
  purchased_at: string;
}

export interface NotificationData {
  id: string;
  user_id: string;
  type: 'signal_purchase' | 'signal_activation' | 'new_signal' | 'follow' | 'rating';
  title: string;
  message: string;
  data?: any;
  read: boolean;
  created_at: string;
}
