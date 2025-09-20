# Supabase Setup Guide

This application uses Supabase for authentication and database management. Follow these steps to set up your Supabase project:

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Create a new project
3. Wait for the project to be set up (this may take a few minutes)

## 2. Get Your Project Credentials

1. Go to your project dashboard
2. Navigate to Settings > API
3. Copy your Project URL and anon/public key

## 3. Set Up Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Example:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 4. Set Up Database Tables

Run the following SQL commands in your Supabase SQL editor:

### Users Table
```sql
-- Create users table (extends Supabase auth.users)
CREATE TABLE public.users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('admin', 'user')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, name, role)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'name', 'user');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

### Periods Table
```sql
-- Create periods table
CREATE TABLE public.periods (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  is_active BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.periods ENABLE ROW LEVEL SECURITY;

-- Create policies (admin only for now)
CREATE POLICY "Admin can manage periods" ON public.periods
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE users.id = auth.uid() 
      AND users.role = 'admin'
    )
  );
```

### Events Table
```sql
-- Create events table
CREATE TABLE public.events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  period_id UUID REFERENCES public.periods(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- Create policies (admin only for now)
CREATE POLICY "Admin can manage events" ON public.events
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE users.id = auth.uid() 
      AND users.role = 'admin'
    )
  );

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_events_updated_at
  BEFORE UPDATE ON public.events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### Resource Links Table
```sql
-- Create resource_links table
CREATE TABLE public.resource_links (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.resource_links ENABLE ROW LEVEL SECURITY;

-- Create policies (admin only for now)
CREATE POLICY "Admin can manage resource links" ON public.resource_links
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE users.id = auth.uid() 
      AND users.role = 'admin'
    )
  );
```

### Public Users Table
```sql
-- Create a table for public users
CREATE TABLE users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  role TEXT DEFAULT 'user'
);

-- Function to add new users to the public users table
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, role)
  VALUES (new.id, 'user');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call the function when a new user signs up
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
```

## 5. Set Up Authentication

1. Go to Authentication > Settings in your Supabase dashboard
2. Configure your site URL (e.g., `http://localhost:5173` for development)
3. Add any additional redirect URLs as needed

## 6. Create an Admin User

1. Go to Authentication > Users in your Supabase dashboard
2. Create a new user or invite an existing user
3. Update the user's role to 'admin' in the SQL editor:

```sql
UPDATE public.users 
SET role = 'admin' 
WHERE email = 'your-admin-email@example.com';
```

## 7. Test the Setup

1. Start your development server: `npm run dev`
2. Navigate to `/login`
3. Try logging in with your admin credentials
4. You should be redirected to the admin dashboard

## Troubleshooting

- Make sure your environment variables are correctly set
- Check the browser console for any errors
- Verify that your Supabase project is active and accessible
- Ensure all database tables and policies are created correctly
- Check that your admin user has the correct role assigned

## Security Notes

- Never commit your `.env` file to version control
- Use environment-specific keys for production
- Regularly rotate your API keys
- Monitor your Supabase usage and billing
