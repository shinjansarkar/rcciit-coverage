# Supabase Database Migration Script

Run the following SQL commands in your Supabase SQL editor to update your existing database schema. This script will enable public user signups and automate user profile creation without deleting any of your existing data.

## Migration Steps

### 1. Drop the Restrictive Insert Policy

This command removes the policy that only allows admins to create new users.

```sql
DROP POLICY "Only admins can insert users" ON public.users;
```

### 2. Add Foreign Key to Link to Auth Users

This command links your `users` table to the `auth.users` table. This is crucial for connecting your user profiles to the authentication system.

**Note:** This command will fail if you have users in your `public.users` table that do not exist in the `auth.users` table. If it fails, you will need to manually align the tables by deleting the orphaned user records from `public.users`.

```sql
ALTER TABLE public.users 
ADD CONSTRAINT users_id_fkey 
FOREIGN KEY (id) 
REFERENCES auth.users(id) 
ON DELETE CASCADE;
```

### 3. Create Function to Handle New Users

This function will automatically run whenever a new user signs up. It inserts a new record into your `public.users` table, copying the `id` and `email` from the newly created authentication user.

```sql
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, name)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'name');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### 4. Create Trigger to Automate User Creation

This trigger calls the `handle_new_user` function every time a new user is added to the `auth.users` table.

```sql
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
```

### 5. Add a Permissive Insert Policy

This new policy allows new users to be inserted into the `public.users` table, which is necessary for the trigger to function correctly.

```sql
CREATE POLICY "Allow public insert for new users"
  ON public.users FOR INSERT
  WITH CHECK (true);
```

After running these commands, your database will be ready to handle public signups, and your existing data will remain intact.
