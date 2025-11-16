import { supabase, User, Event, Period, ResourceLink } from '@/lib/supabase'

// Authentication API
export const authAPI = {
  // Login with email and password
  async login(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      
      if (error) throw error
      
      // Get user profile
      const { data: profile, error: profileError } = await supabase
        .from('users')
        .select('*')
        .eq('id', data.user.id)
        .single()
      
      if (profileError) throw profileError
      
      return { user: data.user, profile }
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  },

  // Logout
  async logout() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  // Get current user
  async getCurrentUser() {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return null
      
      const { data: profile, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single()
      
      if (error) throw error
      return profile
    } catch (error) {
      console.error('Get current user error:', error)
      return null
    }
  },

  // Check if user is authenticated
  async isAuthenticated() {
    const { data: { user } } = await supabase.auth.getUser()
    return !!user
  }
}

// Events API
export const eventsAPI = {
  // Get all events
  async getAll() {
    const { data, error } = await supabase
      .from('events')
      .select(`
        *,
        periods(name)
      `)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  // Get event by ID
  async getById(id: string) {
    const { data, error } = await supabase
      .from('events')
      .select(`
        *,
        periods(name),
        resource_links(*)
      `)
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  // Create new event
  async create(eventData: Omit<Event, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('events')
      .insert([eventData])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Update event
  async update(id: string, eventData: Partial<Event>) {
    const { data, error } = await supabase
      .from('events')
      .update({ ...eventData, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Delete event
  async delete(id: string) {
    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}

// Periods API
export const periodsAPI = {
  // Get all periods
  async getAll() {
    const { data, error } = await supabase
      .from('periods')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  // Get period by ID
  async getById(id: string) {
    const { data, error } = await supabase
      .from('periods')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  // Create new period
  async create(periodData: Omit<Period, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('periods')
      .insert([periodData])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Update period
  async update(id: string, periodData: Partial<Period>) {
    const { data, error } = await supabase
      .from('periods')
      .update(periodData)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Delete period
  async delete(id: string) {
    const { error } = await supabase
      .from('periods')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}

// Resource Links API
export const linksAPI = {
  // Get all links
  async getAll() {
    const { data, error } = await supabase
      .from('resource_links')
      .select(`
        *,
        events(title)
      `)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  // Get links by event ID
  async getByEventId(eventId: string) {
    const { data, error } = await supabase
      .from('resource_links')
      .select('*')
      .eq('event_id', eventId)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  // Create new link
  async create(linkData: Omit<ResourceLink, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('resource_links')
      .insert([linkData])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Update link
  async update(id: string, linkData: Partial<ResourceLink>) {
    const { data, error } = await supabase
      .from('resource_links')
      .update(linkData)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Delete link
  async delete(id: string) {
    const { error } = await supabase
      .from('resource_links')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}

// Dashboard API
export const dashboardAPI = {
  // Get dashboard stats
  async getStats() {
    const [
      { count: periodsCount },
      { count: eventsCount },
      { count: linksCount },
      { count: viewsCount }
    ] = await Promise.all([
      supabase.from('periods').select('*', { count: 'exact', head: true }),
      supabase.from('events').select('*', { count: 'exact', head: true }),
      supabase.from('resource_links').select('*', { count: 'exact', head: true }),
      supabase.from('views').select('*', { count: 'exact', head: true }) // optional table if you track views
    ])

    return {
      totalPeriods: periodsCount || 0,
      totalEvents: eventsCount || 0,
      totalLinks: linksCount || 0,
      recentViews: viewsCount || 0 // replaces the mock `1250`
    }
  },

  // Get recent activity
  async getRecentActivity() {
    try {
      // Try to fetch from activity_log table if it exists
      const { data, error } = await supabase
        .from('activity_log')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5)

      if (error) {
        // Table doesn't exist yet - return empty array silently
        return [];
      }

      return data || [];
    } catch (err) {
      return [];
    }
  }
}
