import React, { createContext, useContext, useEffect, useState } from 'react'
import { Session, User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'
import { useNavigate } from 'react-router-dom'

interface AuthContextType {
  user: (User & { role: string | null }) | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  signup: (email: string, password: string) => Promise<void>
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within an AuthProvider')
  return context
}

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<(User & { role: string | null }) | null>(null)
  // Start with loading as true
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    // Check for existing session on mount
    const initializeAuth = async () => {
      try {
        setLoading(true);
        
        // Quick check if there's any auth data in localStorage
        const authKeys = Object.keys(localStorage).filter(key => 
          key.startsWith('sb-') && key.includes('auth-token')
        );
        
        // If no auth keys, don't bother checking session
        if (authKeys.length === 0) {
          console.log('No auth tokens found, skipping session recovery');
          setUser(null);
          setLoading(false);
          return;
        }
        
        // Try to get session with timeout
        const sessionPromise = supabase.auth.getSession();
        const timeoutPromise = new Promise<never>((_, reject) => {
          setTimeout(() => reject(new Error('Session check timeout')), 5000);
        });
        
        const result = await Promise.race([
          sessionPromise,
          timeoutPromise
        ]).catch((err) => {
          console.warn('Session check slow/failed:', err);
          // Don't clear on timeout - might just be slow network
          return { data: { session: null }, error: err };
        });
        
        const { data: { session }, error } = result;
        
        // Only clear if there's a definitive auth error (not timeout/network)
        if (error && error.message?.includes('JWT') && error.code) {
          console.log('Invalid JWT detected, clearing auth data');
          const keysToRemove = Object.keys(localStorage).filter(key => 
            key.startsWith('sb-') || key.includes('supabase')
          );
          keysToRemove.forEach(key => localStorage.removeItem(key));
          await supabase.auth.signOut();
          setUser(null);
          setLoading(false);
          return;
        }
        
        // If no session but no error, just set user to null (don't clear storage)
        if (!session) {
          setUser(null);
          setLoading(false);
          return;
        }

        // Validate session is not expired
        const expiresAt = session.expires_at;
        const now = Math.floor(Date.now() / 1000);
        
        if (expiresAt && expiresAt < now) {
          console.log('Session expired, clearing auth data');
          const keysToRemove = Object.keys(localStorage).filter(key => 
            key.startsWith('sb-') || key.includes('supabase')
          );
          keysToRemove.forEach(key => localStorage.removeItem(key));
          await supabase.auth.signOut();
          setUser(null);
          setLoading(false);
          return;
        }

        if (session?.user) {
          const userWithRole = await fetchUserRole(session.user);
          setUser(userWithRole);
        } else {
          setUser(null);
        }
        setLoading(false);
      } catch (err: any) {
        console.error('Auth initialization error:', err);
        // Only clear on actual auth errors, not network/timeout
        if (err.message?.includes('JWT') || err.code === 'PGRST301') {
          const keysToRemove = Object.keys(localStorage).filter(key => 
            key.startsWith('sb-') || key.includes('supabase')
          );
          keysToRemove.forEach(key => localStorage.removeItem(key));
        }
        setUser(null);
        setLoading(false);
      }
    };

    initializeAuth();

    // Handle visibility change - refresh session when user comes back to tab
    const handleVisibilityChange = async () => {
      if (document.visibilityState === 'visible' && user) {
        console.log('Tab became visible - checking session');
        try {
          const { data: { session }, error } = await supabase.auth.getSession();
          
          if (error && error.message?.includes('JWT')) {
            console.log('JWT error on visibility change, clearing auth');
            const keysToRemove = Object.keys(localStorage).filter(key => 
              key.startsWith('sb-') || key.includes('supabase')
            );
            keysToRemove.forEach(key => localStorage.removeItem(key));
            await supabase.auth.signOut();
            setUser(null);
            return;
          }
          
          // If no session but no JWT error, keep existing user state
          if (!session) {
            console.log('No session on visibility change, keeping current state');
            return;
          }
          
          // Check if session is expired
          const expiresAt = session.expires_at;
          const now = Math.floor(Date.now() / 1000);
          
          if (expiresAt && expiresAt < now) {
            console.log('Session expired on visibility change');
            const keysToRemove = Object.keys(localStorage).filter(key => 
              key.startsWith('sb-') || key.includes('supabase')
            );
            keysToRemove.forEach(key => localStorage.removeItem(key));
            await supabase.auth.signOut();
            setUser(null);
            return;
          }
          
          if (session?.user) {
            // Silently refresh user data without showing loading
            const userWithRole = await fetchUserRole(session.user);
            setUser(userWithRole);
          }
        } catch (err) {
          console.error('Error checking session on visibility change:', err);
          // Don't logout on errors, just keep existing state
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Keep-alive: Periodically check session every 5 minutes
    const keepAliveInterval = setInterval(async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          console.log('Keep-alive: Session is active');
        }
      } catch (err) {
        console.error('Keep-alive check failed:', err);
      }
    }, 5 * 60 * 1000); // Every 5 minutes

    // onAuthStateChange handles any subsequent changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event);
        
        if (event === 'TOKEN_REFRESHED') {
          console.log('Token refreshed successfully');
          // Update user with refreshed session
          if (session?.user) {
            const userWithRole = await fetchUserRole(session.user);
            setUser(userWithRole);
          }
          return;
        }
        
        if (event === 'SIGNED_OUT') {
          setUser(null);
          setLoading(false);
          return;
        }

        if (session?.user) {
          const userWithRole = await fetchUserRole(session.user);
          setUser(userWithRole);
        } else {
          setUser(null);
        }
        
        setLoading(false);
      }
    );

    // Cleanup the listener when the component unmounts
    return () => {
      listener.subscription.unsubscribe();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearInterval(keepAliveInterval);
    };
  }, []) // The empty dependency array ensures this runs only once on mount

  const fetchUserRole = async (user: User): Promise<User & { role: string | null }> => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.id)
        .maybeSingle()

      if (error) {
        // Only logout on critical auth errors, not on network/temporary errors
        if (error.code === 'PGRST301' && error.message?.includes('JWT expired')) {
          console.error('JWT token expired - logging out');
          await supabase.auth.signOut();
          setUser(null);
          setLoading(false);
          navigate('/login');
          throw new Error('Session expired. Please login again.');
        }
        
        // For other errors, just log and return cached role
        console.warn('Error fetching role (non-critical):', error.message);
        // Return user with existing role or default
        return { ...user, role: user.role || 'user' };
      }
      
      // If user doesn't exist in public.users table
      if (!data) {
        console.warn('User not found in public.users table. Creating entry...');
        // Try to insert the user into public.users
        const { error: insertError } = await supabase
          .from('users')
          .insert({ 
            id: user.id, 
            email: user.email || '', 
            role: 'user' 
          });
        
        if (insertError) {
          console.error('Failed to create user entry:', insertError.message);
        }
        
        return { ...user, role: 'user' };
      }
      
      return { ...user, role: data.role || 'user' };
    } catch (err: any) {
      console.error('Failed to fetch user role:', err);
      // Don't throw - return user with preserved role to prevent logout
      return { ...user, role: user.role || 'user' };
    }
  }

  const login = async (email: string, password: string) => {
    try {
      setLoading(true)
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      // Note: The onAuthStateChange listener will automatically handle setting the user state.
      // You can still navigate based on role here if you want immediate redirection.
      if (data.user) {
        const userWithRole = await fetchUserRole(data.user)
        if (userWithRole.role === 'admin') {
          navigate('/admin')
        } else {
          navigate('/')
        }
      }
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signOut()
      if (error) {
        console.error('Logout error:', error)
      }
      // Force clear user state and localStorage
      setUser(null)
      // Clear any remaining auth tokens from localStorage
      const keysToRemove = Object.keys(localStorage).filter(key => 
        key.startsWith('sb-') || key.includes('supabase')
      );
      keysToRemove.forEach(key => localStorage.removeItem(key));
      navigate('/')
    } catch (error) {
      console.error('Logout failed:', error)
      // Even if logout fails, clear local state
      setUser(null)
      navigate('/')
    } finally {
      setLoading(false)
    }
  }

  const signup = async (email: string, password: string) => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) throw error
    } catch (error) {
      console.error('Signup failed:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const value: AuthContextType = {
    user,
    loading,
    login,
    logout,
    signup,
    isAuthenticated: !!user,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;