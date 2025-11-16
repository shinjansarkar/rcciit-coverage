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
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Session recovery error:', error.message);
          // Clear invalid session data
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
      } catch (err) {
        console.error('Auth initialization error:', err);
        setUser(null);
        setLoading(false);
      }
    };

    initializeAuth();

    // onAuthStateChange handles any subsequent changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event);
        
        if (event === 'TOKEN_REFRESHED') {
          console.log('Token refreshed successfully');
        }
        
        if (event === 'SIGNED_OUT' || event === 'USER_DELETED') {
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
    return () => listener.subscription.unsubscribe();
  }, []) // The empty dependency array ensures this runs only once on mount

  const fetchUserRole = async (user: User) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.id)
        .single()

      if (error) {
        // Check for JWT/auth errors
        if (error.message?.includes('JWT') || error.code === 'PGRST301') {
          console.error('Auth token invalid, clearing session...');
          await supabase.auth.signOut();
          throw new Error('Session expired. Please login again.');
        }
        console.error('Error fetching role:', error.message)
        return { ...user, role: null }
      }
      
      return { ...user, role: data.role }
    } catch (err) {
      console.error('Failed to fetch user role:', err);
      return { ...user, role: null }
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