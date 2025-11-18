// Auth Debug Utility
// Use in browser console: window.checkAuthStatus()

import { supabase } from '../lib/supabase';

declare global {
  interface Window {
    checkAuthStatus: () => Promise<void>;
    clearAllTokens: () => void;
  }
}

// Check current auth status
window.checkAuthStatus = async () => {
  console.log('=== AUTH STATUS DEBUG ===\n');
  
  // Check localStorage
  const authKeys = Object.keys(localStorage).filter(key => 
    key.startsWith('sb-') || key.includes('supabase')
  );
  
  console.log('📦 LocalStorage keys:', authKeys.length);
  authKeys.forEach(key => {
    const value = localStorage.getItem(key);
    if (value) {
      try {
        const parsed = JSON.parse(value);
        console.log(`\n🔑 ${key}:`);
        if (parsed.access_token) {
          console.log('  - Has access_token:', parsed.access_token.substring(0, 50) + '...');
        }
        if (parsed.refresh_token) {
          console.log('  - Has refresh_token:', parsed.refresh_token.substring(0, 20) + '...');
        }
        if (parsed.expires_at) {
          const expiresAt = new Date(parsed.expires_at * 1000);
          const now = new Date();
          const diff = expiresAt.getTime() - now.getTime();
          const minutes = Math.floor(diff / 1000 / 60);
          
          console.log(`  - Expires at: ${expiresAt.toLocaleString()}`);
          console.log(`  - Time remaining: ${minutes} minutes`);
          console.log(`  - Status: ${diff > 0 ? '✅ Valid' : '❌ Expired'}`);
        }
        if (parsed.user) {
          console.log('  - User email:', parsed.user.email);
          console.log('  - User ID:', parsed.user.id);
        }
      } catch (e) {
        console.log(`  - Raw value (${value.length} chars)`);
      }
    }
  });
  
  // Check current session
  console.log('\n🔐 Current Session:');
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error) {
      console.error('❌ Error getting session:', error.message);
    } else if (session) {
      console.log('✅ Active session found');
      console.log('  - User:', session.user.email);
      console.log('  - Expires:', new Date(session.expires_at! * 1000).toLocaleString());
      
      const now = Math.floor(Date.now() / 1000);
      const timeLeft = session.expires_at! - now;
      console.log(`  - Time left: ${Math.floor(timeLeft / 60)} minutes`);
      console.log(`  - Auto-refresh in: ~${Math.floor(timeLeft / 60) - 5} minutes`);
    } else {
      console.log('❌ No active session');
    }
  } catch (err) {
    console.error('❌ Failed to check session:', err);
  }
  
  console.log('\n=== END DEBUG ===');
};

// Clear all auth tokens
window.clearAllTokens = () => {
  const keysToRemove = Object.keys(localStorage).filter(key => 
    key.startsWith('sb-') || key.includes('supabase')
  );
  
  console.log(`🗑️ Clearing ${keysToRemove.length} auth tokens...`);
  keysToRemove.forEach(key => {
    console.log(`  - Removing: ${key}`);
    localStorage.removeItem(key);
  });
  
  console.log('✅ All tokens cleared. Refresh the page.');
};

console.log('🔧 Auth Debug loaded. Available commands:');
console.log('  - window.checkAuthStatus() - Check current auth status');
console.log('  - window.clearAllTokens() - Clear all auth tokens');
