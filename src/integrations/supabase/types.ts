export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      admin_controls: {
        Row: {
          action_type: string;
          admin_id: string;
          id: string;
          new_value: string | null;
          old_value: string | null;
          target_user_id: string;
          timestamp: string;
        };
        Insert: {
          action_type: string;
          admin_id: string;
          id?: string;
          new_value?: string | null;
          old_value?: string | null;
          target_user_id: string;
          timestamp?: string;
        };
        Update: {
          action_type?: string;
          admin_id?: string;
          id?: string;
          new_value?: string | null;
          old_value?: string | null;
          target_user_id?: string;
          timestamp?: string;
        };
        Relationships: [];
      };

      audit_log: {
        Row: {
          id: string;
          new_data: Json | null;
          old_data: Json | null;
          operation: string;
          table_name: string;
          timestamp: string | null;
          user_id: string | null;
        };
        Insert: {
          id?: string;
          new_data?: Json | null;
          old_data?: Json | null;
          operation: string;
          table_name: string;
          timestamp?: string | null;
          user_id?: string | null;
        };
        Update: {
          id?: string;
          new_data?: Json | null;
          old_data?: Json | null;
          operation?: string;
          table_name?: string;
          timestamp?: string | null;
          user_id?: string | null;
        };
        Relationships: [];
      };

      // ⚡ Include other tables here exactly as you had them ⚡
      // vault_members, vault_transactions, etc.
    };

    Views: {
      [_ in never]: never;
    };

    Functions: {
      [_ in never]: never;
    };

    Enums: {
      [_ in never]: never;
    };

    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

// ✅ Simplified helpers
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];
export type TablesInsert<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert'];
export type TablesUpdate<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update'];
