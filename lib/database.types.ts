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
      gallery: {
        Row: {
          id: number
          image: string | null
        }
        Insert: {
          id?: number
          image?: string | null
        }
        Update: {
          id?: number
          image?: string | null
        }
      }
      reviews: {
        Row: {
          date: string | null
          desc: string | null
          id: number
          name: string | null
          profile: string | null
        }
        Insert: {
          date?: string | null
          desc?: string | null
          id?: number
          name?: string | null
          profile?: string | null
        }
        Update: {
          date?: string | null
          desc?: string | null
          id?: number
          name?: string | null
          profile?: string | null
        }
      }
      updates: {
        Row: {
          alt: string | null
          date: string | null
          desc: string | null
          id: number
          image: string[] | null
          tag: string | null
          updated_at: string
        }
        Insert: {
          alt?: string | null
          date?: string | null
          desc?: string | null
          id?: number
          image?: string[] | null
          tag?: string | null
          updated_at?: string
        }
        Update: {
          alt?: string | null
          date?: string | null
          desc?: string | null
          id?: number
          image?: string[] | null
          tag?: string | null
          updated_at?: string
        }
      }
      users: {
        Row: {
          email: string | null
          id: number
        }
        Insert: {
          email?: string | null
          id?: number
        }
        Update: {
          email?: string | null
          id?: number
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
