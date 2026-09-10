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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      change_log: {
        Row: {
          action: string
          actor: string
          created_at: string
          entity_id: string
          entity_label: string
          entity_type: string
          field: string
          field_label: string
          id: string
          new_value: string
          note: string | null
          old_value: string
          source_url: string | null
        }
        Insert: {
          action: string
          actor: string
          created_at?: string
          entity_id: string
          entity_label: string
          entity_type: string
          field: string
          field_label: string
          id?: string
          new_value?: string
          note?: string | null
          old_value?: string
          source_url?: string | null
        }
        Update: {
          action?: string
          actor?: string
          created_at?: string
          entity_id?: string
          entity_label?: string
          entity_type?: string
          field?: string
          field_label?: string
          id?: string
          new_value?: string
          note?: string | null
          old_value?: string
          source_url?: string | null
        }
        Relationships: []
      }
      data_overrides: {
        Row: {
          entity_id: string
          entity_type: string
          field: string
          id: string
          source_url: string | null
          updated_at: string
          updated_by: string
          value: string
        }
        Insert: {
          entity_id: string
          entity_type: string
          field: string
          id?: string
          source_url?: string | null
          updated_at?: string
          updated_by?: string
          value: string
        }
        Update: {
          entity_id?: string
          entity_type?: string
          field?: string
          id?: string
          source_url?: string | null
          updated_at?: string
          updated_by?: string
          value?: string
        }
        Relationships: []
      }
      link_checks: {
        Row: {
          certification_id: string
          checked_at: string
          error: string | null
          http_status: number | null
          id: string
          last_ok_at: string | null
          ok: boolean
          url: string
        }
        Insert: {
          certification_id: string
          checked_at?: string
          error?: string | null
          http_status?: number | null
          id?: string
          last_ok_at?: string | null
          ok?: boolean
          url: string
        }
        Update: {
          certification_id?: string
          checked_at?: string
          error?: string | null
          http_status?: number | null
          id?: string
          last_ok_at?: string | null
          ok?: boolean
          url?: string
        }
        Relationships: []
      }
      pending_changes: {
        Row: {
          created_at: string
          decided_at: string | null
          decided_by: string | null
          entity_id: string
          entity_label: string
          entity_type: string
          field: string
          field_label: string
          id: string
          new_value: string
          note: string | null
          old_value: string
          scan_run_id: string | null
          source_url: string | null
          status: string
        }
        Insert: {
          created_at?: string
          decided_at?: string | null
          decided_by?: string | null
          entity_id: string
          entity_label: string
          entity_type: string
          field: string
          field_label: string
          id?: string
          new_value: string
          note?: string | null
          old_value?: string
          scan_run_id?: string | null
          source_url?: string | null
          status?: string
        }
        Update: {
          created_at?: string
          decided_at?: string | null
          decided_by?: string | null
          entity_id?: string
          entity_label?: string
          entity_type?: string
          field?: string
          field_label?: string
          id?: string
          new_value?: string
          note?: string | null
          old_value?: string
          scan_run_id?: string | null
          source_url?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "pending_changes_scan_run_id_fkey"
            columns: ["scan_run_id"]
            isOneToOne: false
            referencedRelation: "scan_runs"
            referencedColumns: ["id"]
          },
        ]
      }
      scan_runs: {
        Row: {
          broken_links: number
          changes_found: number
          error: string | null
          finished_at: string | null
          id: string
          links_checked: number
          sources_checked: number
          started_at: string
          status: string
          trigger: string
        }
        Insert: {
          broken_links?: number
          changes_found?: number
          error?: string | null
          finished_at?: string | null
          id?: string
          links_checked?: number
          sources_checked?: number
          started_at?: string
          status?: string
          trigger?: string
        }
        Update: {
          broken_links?: number
          changes_found?: number
          error?: string | null
          finished_at?: string | null
          id?: string
          links_checked?: number
          sources_checked?: number
          started_at?: string
          status?: string
          trigger?: string
        }
        Relationships: []
      }
      scan_tokens: {
        Row: {
          created_at: string
          id: string
          token: string
        }
        Insert: {
          created_at?: string
          id?: string
          token: string
        }
        Update: {
          created_at?: string
          id?: string
          token?: string
        }
        Relationships: []
      }
      sources: {
        Row: {
          key: string
          last_note: string | null
          last_reviewed_at: string | null
          last_status: string | null
          name: string
          url: string
        }
        Insert: {
          key: string
          last_note?: string | null
          last_reviewed_at?: string | null
          last_status?: string | null
          name: string
          url: string
        }
        Update: {
          key?: string
          last_note?: string | null
          last_reviewed_at?: string | null
          last_status?: string | null
          name?: string
          url?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const
