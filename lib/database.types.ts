export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      update_tags: {
        Row: {
          id: number
          tags: string
        }
        Insert: {
          id?: number
          tags?: string
        }
        Update: {
          id?: number
          tags?: string
        }
      }
      updates: {
        Row: {
          date: string | null
          desc: string | null
          tag: string | null
          id: number
          image: string[] | null
          alt: string | null
        }
        Insert: {
          date?: string | null
          desc?: string | null
          tag?: string | null
          id?: number
          image?: string[] | null
          alt?: string | null
        }
        Update: {
          date?: string | null
          desc?: string | null
          tag?: string | null
          id?: number
          image?: string[] | null
          alt?: string | null
        }
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
  }
}
