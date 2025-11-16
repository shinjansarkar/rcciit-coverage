import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key'

// Only throw error in production if env vars are missing
if (import.meta.env.PROD && (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY)) {
  console.warn('Missing Supabase environment variables. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    // Optional: Increase token refresh buffer (default is 10 seconds before expiry)
    // refreshTokenRotationEnabled: true,
    storage: window.localStorage,
  },
})

// Database types
export interface User {
  id: string
  email: string
  name?: string
  role: 'admin' | 'user'
  created_at: string
}

export interface Event {
  id: string
  title: string
  description: string
  period_id: string
  created_at: string
  updated_at: string
}

export interface Period {
  id: string
  name: string
  start_date: string
  end_date: string
  is_active: boolean
  created_at: string
}

export interface ResourceLink {
  id: string
  title: string
  url: string
  event_id: string
  created_at: string
}
