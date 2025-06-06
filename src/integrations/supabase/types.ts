export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      app_settings: {
        Row: {
          created_at: string | null
          id: string
          mentor_dm_fee: number | null
          minimum_win_rate_for_paid_signals: number | null
          paid_signals_enabled: boolean | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          mentor_dm_fee?: number | null
          minimum_win_rate_for_paid_signals?: number | null
          paid_signals_enabled?: boolean | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          mentor_dm_fee?: number | null
          minimum_win_rate_for_paid_signals?: number | null
          paid_signals_enabled?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      follows: {
        Row: {
          created_at: string | null
          follower_id: string | null
          following_id: string | null
          id: string
        }
        Insert: {
          created_at?: string | null
          follower_id?: string | null
          following_id?: string | null
          id?: string
        }
        Update: {
          created_at?: string | null
          follower_id?: string | null
          following_id?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "follows_follower_id_fkey"
            columns: ["follower_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "follows_following_id_fkey"
            columns: ["following_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          account_type: Database["public"]["Enums"]["account_type"]
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          first_name: string | null
          id: string
          is_premium: boolean | null
          last_name: string | null
          role: Database["public"]["Enums"]["user_role"]
          success_rate: number | null
          successful_signals: number | null
          total_pips: number | null
          total_signals: number | null
          trading_experience_years: number | null
          updated_at: string | null
          username: string
        }
        Insert: {
          account_type?: Database["public"]["Enums"]["account_type"]
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          first_name?: string | null
          id: string
          is_premium?: boolean | null
          last_name?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          success_rate?: number | null
          successful_signals?: number | null
          total_pips?: number | null
          total_signals?: number | null
          trading_experience_years?: number | null
          updated_at?: string | null
          username: string
        }
        Update: {
          account_type?: Database["public"]["Enums"]["account_type"]
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          first_name?: string | null
          id?: string
          is_premium?: boolean | null
          last_name?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          success_rate?: number | null
          successful_signals?: number | null
          total_pips?: number | null
          total_signals?: number | null
          trading_experience_years?: number | null
          updated_at?: string | null
          username?: string
        }
        Relationships: []
      }
      signal_ratings: {
        Row: {
          comment: string | null
          created_at: string | null
          id: string
          rater_id: string | null
          rating: number | null
          signal_id: string | null
        }
        Insert: {
          comment?: string | null
          created_at?: string | null
          id?: string
          rater_id?: string | null
          rating?: number | null
          signal_id?: string | null
        }
        Update: {
          comment?: string | null
          created_at?: string | null
          id?: string
          rater_id?: string | null
          rating?: number | null
          signal_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "signal_ratings_rater_id_fkey"
            columns: ["rater_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "signal_ratings_signal_id_fkey"
            columns: ["signal_id"]
            isOneToOne: false
            referencedRelation: "signals"
            referencedColumns: ["id"]
          },
        ]
      }
      signals: {
        Row: {
          closed_at: string | null
          created_at: string | null
          description: string | null
          entry_price: number
          id: string
          image_url: string | null
          is_paid: boolean | null
          pair: string
          pips_result: number | null
          price: number | null
          provider_id: string
          risk_level: string | null
          risk_reward_ratio: string | null
          signal_type: Database["public"]["Enums"]["signal_type"]
          status: Database["public"]["Enums"]["signal_status"] | null
          stop_loss: number
          tp1: number | null
          tp2: number | null
          updated_at: string | null
        }
        Insert: {
          closed_at?: string | null
          created_at?: string | null
          description?: string | null
          entry_price: number
          id?: string
          image_url?: string | null
          is_paid?: boolean | null
          pair: string
          pips_result?: number | null
          price?: number | null
          provider_id: string
          risk_level?: string | null
          risk_reward_ratio?: string | null
          signal_type: Database["public"]["Enums"]["signal_type"]
          status?: Database["public"]["Enums"]["signal_status"] | null
          stop_loss: number
          tp1?: number | null
          tp2?: number | null
          updated_at?: string | null
        }
        Update: {
          closed_at?: string | null
          created_at?: string | null
          description?: string | null
          entry_price?: number
          id?: string
          image_url?: string | null
          is_paid?: boolean | null
          pair?: string
          pips_result?: number | null
          price?: number | null
          provider_id?: string
          risk_level?: string | null
          risk_reward_ratio?: string | null
          signal_type?: Database["public"]["Enums"]["signal_type"]
          status?: Database["public"]["Enums"]["signal_status"] | null
          stop_loss?: number
          tp1?: number | null
          tp2?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "signals_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      account_type: "demo" | "real"
      signal_status: "inactive" | "active" | "closed"
      signal_type: "BUY" | "SELL"
      user_role: "student" | "mentor"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      account_type: ["demo", "real"],
      signal_status: ["inactive", "active", "closed"],
      signal_type: ["BUY", "SELL"],
      user_role: ["student", "mentor"],
    },
  },
} as const
