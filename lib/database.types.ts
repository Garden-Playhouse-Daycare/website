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
          id: number
          date: string | null
          name: string | null
          desc: string | null
          profile: string | null
        }
        Insert: {
          id?: number
          date?: string | null
          name?: string | null
          desc?: string | null
          profile?: string | null
        }
        Update: {
          id?: number
          date?: string | null
          name?: string | null
          desc?: string | null
          profile?: string | null
        }
      }
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
      users: {
        Row: {
          id: number
          email: string | null
        }
        Insert: {
          id?: number
          email?: string | null
        }
        Update: {
          id?: number
          email?: string | null
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
