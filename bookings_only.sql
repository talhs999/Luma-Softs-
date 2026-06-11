-- Create the bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  service TEXT NOT NULL,
  booking_date TEXT NOT NULL,
  booking_time TEXT NOT NULL,
  status TEXT DEFAULT 'Pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Setup Row Level Security (RLS) for bookings
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Allow public insert on bookings" ON bookings;
DROP POLICY IF EXISTS "Allow full access to authenticated users on bookings" ON bookings;

-- Create policy to allow public inserts (so users can book)
CREATE POLICY "Allow public insert on bookings" 
  ON bookings FOR INSERT TO public WITH CHECK (true);

-- Create policy to allow all operations for authenticated users (Admin Panel)
CREATE POLICY "Allow full access to authenticated users on bookings" 
  ON bookings FOR ALL TO authenticated USING (true) WITH CHECK (true);
