export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      admin_controls: {
        Row: {
          action_type: string
          admin_id: string
          id: string
          new_value: string | null
          old_value: string | null
          target_user_id: string
          timestamp: string
        }
        Insert: {
          action_type: string
          admin_id: string
          id?: string
          new_value?: string | null
          old_value?: string | null
          target_user_id: string
          timestamp?: string
        }
        Update: {
          action_type?: string
          admin_id?: string
          id?: string
          new_value?: string | null
          old_value?: string | null
          target_user_id?: string
          timestamp?: string
        }
        Relationships: []
      }
      audit_log: {
        Row: {
          id: string
          new_data: Json | null
          old_data: Json | null
          operation: string
          table_name: string
          timestamp: string | null
          user_id: string | null
        }
        Insert: {
          id?: string
          new_data?: Json | null
          old_data?: Json | null
          operation: string
          table_name: string
          timestamp?: string | null
          user_id?: string | null
        }
        Update: {
          id?: string
          new_data?: Json | null
          old_data?: Json | null
          operation?: string
          table_name?: string
          timestamp?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      balances: {
        Row: {
          available_credit: number | null
          balance: number
          card_balance: number | null
          cash_back_rate: number | null
          created_at: string
          id: string
          monthly_limit: number | null
          pending_balance: number | null
          score_boost: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          available_credit?: number | null
          balance?: number
          card_balance?: number | null
          cash_back_rate?: number | null
          created_at?: string
          id?: string
          monthly_limit?: number | null
          pending_balance?: number | null
          score_boost?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          available_credit?: number | null
          balance?: number
          card_balance?: number | null
          cash_back_rate?: number | null
          created_at?: string
          id?: string
          monthly_limit?: number | null
          pending_balance?: number | null
          score_boost?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      credit_activity: {
        Row: {
          amount: number | null
          created_at: string | null
          description: string | null
          event_type: string
          id: string
          user_id: string | null
        }
        Insert: {
          amount?: number | null
          created_at?: string | null
          description?: string | null
          event_type: string
          id?: string
          user_id?: string | null
        }
        Update: {
          amount?: number | null
          created_at?: string | null
          description?: string | null
          event_type?: string
          id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "credit_activity_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "vault_members"
            referencedColumns: ["user_id"]
          }
        ]
      }
      crypb0ts: {
        Row: {
          ai_core_version: string | null
          bot_name: string
          created_at: string | null
          emotional_sync: boolean | null
          id: string
          user_id: string | null
        }
        Insert: {
          ai_core_version?: string | null
          bot_name: string
          created_at?: string | null
          emotional_sync?: boolean | null
          id?: string
          user_id?: string | null
        }
        Update: {
          ai_core_version?: string | null
          bot_name?: string
          created_at?: string | null
          emotional_sync?: boolean | null
          id?: string
          user_id?: string | null
        }
        Relationships: []
      }
      crypbots: {
        Row: {
          bot_name: string | null
          created_at: string | null
          id: string
          tier: string | null
          user_id: string | null
        }
        Insert: {
          bot_name?: string | null
          created_at?: string | null
          id?: string
          tier?: string | null
          user_id?: string | null
        }
        Update: {
          bot_name?: string | null
          created_at?: string | null
          id?: string
          tier?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      crypdna_file: {
        Row: {
          created_at: string | null
          file_number: string
          id: string
          status: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          file_number: string
          id?: string
          status?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          file_number?: string
          id?: string
          status?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      crypscore: {
        Row: {
          last_update: string | null
          score: number | null
          user_id: string
        }
        Insert: {
          last_update?: string | null
          score?: number | null
          user_id: string
        }
        Update: {
          last_update?: string | null
          score?: number | null
          user_id?: string
        }
        Relationships: []
      }
      dnb_tracking: {
        Row: {
          id: string
          score: number | null
          status: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          id?: string
          score?: number | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          id?: string
          score?: number | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      drops: {
        Row: {
          description: string | null
          drop_date: string | null
          id: string
          status: string | null
          title: string
        }
        Insert: {
          description?: string | null
          drop_date?: string | null
          id?: string
          status?: string | null
          title: string
        }
        Update: {
          description?: string | null
          drop_date?: string | null
          id?: string
          status?: string | null
          title?: string
        }
        Relationships: []
      }
      exclusive_drops: {
        Row: {
          created_at: string | null
          description: string | null
          drop_number: number
          id: string
          mystery_asset: boolean | null
          reveal_link: string | null
          title: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          drop_number: number
          id?: string
          mystery_asset?: boolean | null
          reveal_link?: string | null
          title: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          drop_number?: number
          id?: string
          mystery_asset?: boolean | null
          reveal_link?: string | null
          title?: string
        }
        Relationships: []
      }
      leaderboards: {
        Row: {
          crypdna_score: number | null
          rank: number | null
          rewards_points: number | null
          user_id: string
        }
        Insert: {
          crypdna_score?: number | null
          rank?: number | null
          rewards_points?: number | null
          user_id: string
        }
        Update: {
          crypdna_score?: number | null
          rank?: number | null
          rewards_points?: number | null
          user_id?: string
        }
        Relationships: []
      }
      lifestyle_events: {
        Row: {
          description: string | null
          event_date: string | null
          id: string
          location: string | null
          tier_access: string | null
          title: string
        }
        Insert: {
          description?: string | null
          event_date?: string | null
          id?: string
          location?: string | null
          tier_access?: string | null
          title: string
        }
        Update: {
          description?: string | null
          event_date?: string | null
          id?: string
          location?: string | null
          tier_access?: string | null
          title?: string
        }
        Relationships: []
      }
      neuro_tech: {
        Row: {
          created_at: string | null
          feature_name: string | null
          id: string
          status: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          feature_name?: string | null
          id?: string
          status?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          feature_name?: string | null
          id?: string
          status?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      neuro_tech_sessions: {
        Row: {
          access_level: string | null
          brainwave_pattern: string
          created_at: string | null
          id: string
          user_id: string | null
        }
        Insert: {
          access_level?: string | null
          brainwave_pattern: string
          created_at?: string | null
          id?: string
          user_id?: string | null
        }
        Update: {
          access_level?: string | null
          brainwave_pattern?: string
          created_at?: string | null
          id?: string
          user_id?: string | null
        }
        Relationships: []
      }
      neurodrop_sessions: {
        Row: {
          eeg_score: number | null
          id: string
          session_date: string | null
          unlocked_features: string[] | null
          user_id: string | null
        }
        Insert: {
          eeg_score?: number | null
          id?: string
          session_date?: string | null
          unlocked_features?: string[] | null
          user_id?: string | null
        }
        Update: {
          eeg_score?: number | null
          id?: string
          session_date?: string | null
          unlocked_features?: string[] | null
          user_id?: string | null
        }
        Relationships: []
      }
      paid_customers: {
        Row: {
          created_at: string | null
          email: string
          source: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          source?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          source?: string | null
        }
        Relationships: []
      }
      paw_debit_card: {
        Row: {
          card_number: string
          created_at: string | null
          crypdna_score: number | null
          cvv: string
          expiry: string
          id: string
          status: string | null
          user_id: string
        }
        Insert: {
          card_number: string
          created_at?: string | null
          crypdna_score?: number | null
          cvv: string
          expiry: string
          id?: string
          status?: string | null
          user_id: string
        }
        Update: {
          card_number?: string
          created_at?: string | null
          crypdna_score?: number | null
          cvv?: string
          expiry?: string
          id?: string
          status?: string | null
          user_id?: string
        }
        Relationships: []
      }
      products: {
        Row: {
          category: string | null
          created_at: string | null
          description: string | null
          id: string
          image_url: string | null
          name: string
          price: number | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          name: string
          price?: number | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          name?: string
          price?: number | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          email: string | null
          full_name: string | null
          id: string
          is_member: boolean | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          is_member?: boolean | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          is_member?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      quests: {
        Row: {
          description: string | null
          id: string
          points_reward: number | null
          status: string | null
          title: string
          user_id: string | null
        }
        Insert: {
          description?: string | null
          id?: string
          points_reward?: number | null
          status?: string | null
          title: string
          user_id?: string | null
        }
        Update: {
          description?: string | null
          id?: string
          points_reward?: number | null
          status?: string | null
          title?: string
          user_id?: string | null
        }
        Relationships: []
      }
      reservations: {
        Row: {
          created_at: string | null
          id: string
          product_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          product_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          product_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reservations_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          }
        ]
      }
      rewards: {
        Row: {
          created_at: string
          id: string
          next_tier: string | null
          points: number | null
          progress_percent: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          next_tier?: string | null
          points?: number | null
          progress_percent?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          next_tier?: string | null
          points?: number | null
          progress_percent?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      signup_tokens: {
        Row: {
          created_at: string
          email: string
          expires_at: string
          id: string
          shopify_order_id: string | null
          token: string
          used: boolean | null
        }
        Insert: {
          created_at?: string
          email: string
          expires_at: string
          id?: string
          shopify_order_id?: string | null
          token: string
          used?: boolean | null
        }
        Update: {
          created_at?: string
          email?: string
          expires_at?: string
          id?: string
          shopify_order_id?: string | null
          token?: string
          used?: boolean | null
        }
        Relationships: []
      }
      transactions: {
        Row: {
          amount: number
          description: string | null
          id: string
          timestamp: string
          type: string
          user_id: string
        }
        Insert: {
          amount: number
          description?: string | null
          id?: string
          timestamp?: string
          type: string
          user_id: string
        }
        Update: {
          amount?: number
          description?: string | null
          id?: string
          timestamp?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      user_voice_intro: {
        Row: {
          cinematic_intro_enabled: boolean | null
          created_at: string | null
          id: string
          user_id: string | null
        }
        Insert: {
          cinematic_intro_enabled?: boolean | null
          created_at?: string | null
          id?: string
          user_id?: string | null
        }
        Update: {
          cinematic_intro_enabled?: boolean | null
          created_at?: string | null
          id?: string
          user_id?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string | null
          tier: string | null
          updated_at: string
          user_id: string
          vault_id: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          name?: string | null
          tier?: string | null
          updated_at?: string
          user_id: string
          vault_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string | null
          tier?: string | null
          updated_at?: string
          user_id?: string
          vault_id?: string | null
        }
        Relationships: []
      }
      vault_cards: {
        Row: {
          card_last_four: string
          card_status: string | null
          created_at: string | null
          id: string
          user_id: string | null
        }
        Insert: {
          card_last_four?: string
          card_status?: string | null
          created_at?: string | null
          id?: string
          user_id?: string | null
        }
        Update: {
          card_last_four?: string
          card_status?: string | null
          created_at?: string | null
          id?: string
          user_id?: string | null
        }
        Relationships: []
      }
      vault_documents: {
        Row: {
          created_at: string
          doc_type: string | null
          file_url: string | null
          id: number
          status: string
          user_id: string
        }
        Insert: {
          created_at?: string
          doc_type?: string | null
          file_url?: string | null
          id?: number
          status?: string
          user_id?: string
        }
        Update: {
          created_at?: string
          doc_type?: string | null
          file_url?: string | null
          id?: number
          status?: string
          user_id?: string
        }
        Relationships: []
      }
      vault_members: {
        Row: {
          approved: string | null
          card_balance: number | null
          created_at: string
          crypdna_id: string | null
          email: string | null
          full_name: string | null
          id: number
          notes: string | null
          status: boolean
          tally_id: string | null
          user_id: string
          vault_tier: string | null
          /** NEW: multilingual link */
          region_id: string | null
        }
        Insert: {
          approved?: string | null
          card_balance?: number | null
          created_at?: string
          crypdna_id?: string | null
          email?: string | null
          full_name?: string | null
          id?: number
          notes?: string | null
          status?: boolean
          tally_id?: string | null
          user_id?: string
          vault_tier?: string | null
          /** NEW */
          region_id?: string | null
        }
        Update: {
          approved?: string | null
          card_balance?: number | null
          created_at?: string
          crypdna_id?: string | null
          email?: string | null
          full_name?: string | null
          id?: number
          notes?: string | null
          status?: boolean
          tally_id?: string | null
          user_id?: string
          vault_tier?: string | null
          /** NEW */
          region_id?: string | null
        }
        Relationships: [
          /** NEW FK: vault_members.region_id -> regions.id */
          {
            foreignKeyName: "vault_members_region_id_fkey"
            columns: ["region_id"]
            isOneToOne: false
            referencedRelation: "regions"
            referencedColumns: ["id"]
          }
        ]
      }
      vault_rewards: {
        Row: {
          id: string
          points: number | null
          redeemed_items: string[] | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          id?: string
          points?: number | null
          redeemed_items?: string[] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          id?: string
          points?: number | null
          redeemed_items?: string[] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      vault_transactions: {
        Row: {
          amount: number | null
          created_at: string
          description: string | null
          id: number
          status: string | null
          transaction_type: string | null
          user_id: string | null
          vault_id: string | null
        }
        Insert: {
          amount?: number | null
          created_at?: string
          description?: string | null
          id?: number
          status?: string | null
          transaction_type?: string | null
          user_id?: string | null
          vault_id?: string | null
        }
        Update: {
          amount?: number | null
          created_at?: string
          description?: string | null
          id?: number
          status?: string | null
          transaction_type?: string | null
          user_id?: string | null
          vault_id?: string | null
        }
        Relationships: []
      }
      verification: {
        Row: {
          business_docs_url: string | null
          created_at: string
          id: string
          photo_id_url: string | null
          status: string | null
          updated_at: string
          user_id: string
          utility_bill_url: string | null
        }
        Insert: {
          business_docs_url?: string | null
          created_at?: string
          id?: string
          photo_id_url?: string | null
          status?: string | null
          updated_at?: string
          user_id: string
          utility_bill_url?: string | null
        }
        Update: {
          business_docs_url?: string | null
          created_at?: string
          id?: string
          photo_id_url?: string | null
          status?: string | null
          updated_at?: string
          user_id?: string
          utility_bill_url?: string | null
        }
        Relationships: []
      }

      /** NEW TABLE: regions */
      regions: {
        Row: {
          id: string
          name: string
          language_code: string
          created_at: string | null
        }
        Insert: {
          id?: string
          name: string
          language_code: string
          created_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          language_code?: string
          created_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
