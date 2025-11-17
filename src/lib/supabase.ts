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
    storage: window.localStorage,
    // Add custom storage with auto-cleanup
    storageKey: `sb-${supabaseUrl.split('//')[1].split('.')[0]}-auth-token`,
  },
})

// Auto-cleanup invalid sessions on page load
const cleanupInvalidSessions = async () => {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error || !session) {
      // Clear invalid tokens
      const keysToRemove = Object.keys(localStorage).filter(key => 
        key.startsWith('sb-') || key.includes('supabase')
      );
      if (keysToRemove.length > 0) {
        console.log('Cleaning up invalid session data');
        keysToRemove.forEach(key => localStorage.removeItem(key));
      }
      return;
    }
    
    // Check if session is expired
    const expiresAt = session.expires_at;
    const now = Math.floor(Date.now() / 1000);
    
    if (expiresAt && expiresAt < now) {
      console.log('Cleaning up expired session');
      const keysToRemove = Object.keys(localStorage).filter(key => 
        key.startsWith('sb-') || key.includes('supabase')
      );
      keysToRemove.forEach(key => localStorage.removeItem(key));
      await supabase.auth.signOut();
    }
  } catch (err) {
    console.error('Session cleanup error:', err);
  }
};

// Run cleanup on import
cleanupInvalidSessions();

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
